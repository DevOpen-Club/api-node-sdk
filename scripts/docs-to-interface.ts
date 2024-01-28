import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { XMLParser } from 'fast-xml-parser'
import { editor, select } from '@inquirer/prompts'

/** 保存文件路径。 */
const SAVED_FILENAME = 'generated.d.ts'

/**
 * 转换的类型来源。
 *
 * `method`: API 可用方法
 * `interface`: API 可用类型
 */
type OriginType = 'method' | 'interface'

/** 生成的接口属性。 */
interface Property {
  /** 属性键。 */
  name: string
  /** 属性类型。 */
  type: string
  /** 是否必填。 */
  required: boolean
  /** 注释。 */
  comment: string
}
type DomElement = Record<'#text' | `@_${string}`, string>

type ParseResult = Array<[string, DomElement[]]>
/**
 * 解析文档 HTML 结构。
 * @param html - HTML
 * @returns 解析出的所有类型的属性 DOM 列表
 */
function parse(html: string): ParseResult {
  // 解析 HTML
  const parser = new XMLParser({
    ignoreAttributes: false,
    htmlEntities: true,
  })
  const ans: Array<[string, DomElement[]]> = []
  const obj = parser.parse(html)
  if (!Array.isArray(obj.h2)) { // 单个类型
    obj.h2 = [obj.h2]
    obj.p = [obj.table]
    obj.table = [obj.table]
  }
  for (let i = 0; i < obj.h2.length; ++i) { // 遍历每个类型
    if (!Array.isArray(obj.table[i].tbody.tr))
      obj.table[i].tbody.tr = [obj.table[i].tbody.tr]
    const cur: DomElement[] = obj.table[i].tbody.tr.map((({ td }: { td: string }) => td)) // 遍历类型属性每一行
    ans.push([obj.h2[i]?.['#text'] ?? 'Options', cur])
  }
  return ans
}

/**
 * 转换类型。
 * @param dom - 类型
 * @returns 类型文本
 */
function transformType(dom: DomElement) {
  switch (dom['#text']) {
    case 'Boolean':
    case 'bool': return 'boolean'
    case 'Float':
    case 'Integer':
    case 'i32': return 'number'
    case 'i64': return 'bigint'
    case 'String': return 'string'
    case 'True': return 'true'
  }
  let ans = dom['#text']
  if (typeof ans !== 'string')
    return 'unknown'
  // eslint-disable-next-line dot-notation
  if (dom['a'])
    ans += dom.a['#text']
  if (ans.startsWith('Array of'))
    ans = `${ans.slice(8).trim()}[]` // 数组
  if (ans.startsWith('['))
    ans = ans.slice(1, ans.indexOf(']')) // Markdown 链接
  return ans
}

/**
 * 将解析后的 DOM 列表转换为属性列表。
 * @param parsed - DOM 列表
 * @param type - 转换的类型
 * @returns 属性列表
 */
function transform(parsed: DomElement[], type: OriginType): Property[] {
  return parsed.map((prop) => { // 转换每一个属性
    const comment: string | undefined = prop[type === 'interface' ? 2 : 3]['#text']
    return {
      name: prop[0]['#text'].replace(' 对象', ''),
      type: transformType(prop[1]),
      // eslint-disable-next-line dot-notation
      required: type === 'interface' ? !prop[1]['em'] : prop[2]['#text'] === '是',
      comment: comment?.startsWith('. ') ? comment.slice(2, comment.length) : comment,
    }
  })
}

/**
 * 根据类型名称、属性拼接出声明。
 * @param name - 名称
 * @param properties - 属性
 * @returns 声明
 */
function generate(name: string, properties: Property[]) {
  let ans = `export interface ${name} {\n`
  for (const prop of properties) {
    if (prop.comment)
      ans += `  /** ${prop.comment} */\n`
    ans += `  ${prop.name}${prop.required ? '' : '?'}: ${prop.type};\n`
  }
  ans = ans.slice(0, -1) // 去除最后一个属性末尾的换行
  ans += '\n}\n'
  return ans
}

(async () => {
  const type = await select({
    message: '请选择需要转换的 HTML 的来源',
    choices: [
      { name: 'API 可用方法', value: 'method' },
      { name: 'API 可用类型', value: 'interface' },
    ],
  }) as OriginType
  const html = await editor({
    message: '请在打开的窗口中输入需要转换的 HTML',
  })
  if (!html)
    return // 无内容
  const parsed = parse(html)
  const properties = parsed.map(v => [v[0], transform(v[1], type)] as const) // 第一项（类型名称）不变，第二项（DOM 列表）转换
  return properties.map(v => generate(v[0], v[1])).join('\n') // 每一项都转换为声明，每一项中间添加换行
})().then((data) => {
  const dir = path.resolve(__dirname, SAVED_FILENAME)
  writeFileSync(dir, data)
  console.log('✅ 生成成功，已保存至', dir)
  console.log('❕ 生成结果仅供参考，请确认无误后上传')
}).catch((e) => {
  console.group('❌ 生成失败')
  console.error(e)
  console.groupEnd()
})
