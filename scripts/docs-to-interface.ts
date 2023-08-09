import { writeFileSync } from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';
import { editor } from '@inquirer/prompts';

const SAVED_FILENAME = 'generated.d.ts';

/** 生成的接口属性。 */
interface Property {
  /** 属性键。 */
  name: string;
  /** 属性类型。 */
  type: string;
  /** 是否必填。 */
  required: boolean;
  /** 注释。 */
  comment: string;
}
type DomElement = Record<'#text' | `@_${string}`, string>;

type ParseResult = Array<[string, DomElement[]]>;
/**
 * 解析文档 HTML 结构。
 * @param html HTML
 * @returns 解析出的所有类型的属性 DOM 列表
 */
function parse(html: string): ParseResult {
  // 解析 HTML
  const parser = new XMLParser({
    ignoreAttributes: false,
    htmlEntities: true,
  });
  let ans: Array<[string, DomElement[]]> = [];
  let obj = parser.parse(html);
  if (!Array.isArray(obj.h2)) { // 单个类型
    obj.h2 = [obj.h2];
    obj.p = [obj.table];
    obj.table = [obj.table];
  }
  for (let i = 0; i < obj.h2.length; ++i) { // 遍历每个类型
    let cur: DomElement[] = obj.table[i].tbody.tr.map(((v: any) => v.td)); // 遍历类型属性每一行
    ans.push([obj.h2[i]['#text'], cur]);
  }
  return ans;
}

/**
 * 转换类型。
 * @param dom 类型
 * @returns 类型文本
 */
function transformType(dom: DomElement) {
  switch (dom['#text']) {
    case 'Boolean': return 'boolean';
    case 'Integer': return 'number';
    case 'i64': return 'bigint';
    case 'String': return 'string';
    case 'True': return 'true';
  }
  let ans = dom['#text'] ?? '';
  if (dom['a']) ans += dom['a']['#text'];
  if (ans.startsWith('Array of')) ans = ans.slice(8).trim() + '[]'; // 数组
  if (ans.startsWith('[')) ans = ans.slice(1, ans.indexOf(']')) // Markdown 链接
  return ans;
}

/**
 * 将解析后的 DOM 列表转换为属性列表。
 * @param parsed DOM 列表
 * @returns 属性列表
 */
function transform(parsed: DomElement[]): Property[] {
  return parsed.map((prop) => { // 转换每一个属性
    const comment: string | undefined = prop[2]['#text'];
    return {
      name: prop[0]['#text'],
      type: transformType(prop[1]),
      required: !prop[1]['em'],
      comment: comment.startsWith('. ') ? comment.slice(2, comment.length) : comment,
    };
  });
}

/**
 * 根据类型名称、属性拼接出声明。
 * @param name 名称
 * @param properties 属性
 * @returns 声明
 */
function generate(name: string, properties: Property[]) {
  let ans = `declare interface ${name} {\n`;
  for (const prop of properties) {
    if (prop.comment) ans += `  /** ${prop.comment} */\n`;
    ans += `  ${prop.name}${prop.required ? '' : '?'}: ${prop.type};\n`;
  }
  ans = ans.slice(0, -1); // 去除最后一个属性末尾的换行
  ans += '\n}\n';
  return ans;
}

(async () => {
  const html = await editor({
    message: '请在打开的窗口中输入需要转换的 HTML',
  });;
  const parsed = parse(html);
  const properties = parsed.map((v) => [v[0], transform(v[1])] as const); // 第一项（类型名称）不变，第二项（DOM 列表）转换
  return properties.map((v) => generate(v[0], v[1])).join('\n'); // 每一项都转换为声明，每一项中间添加换行
})().then((data) => {
  const dir = path.resolve(__dirname, SAVED_FILENAME);
  writeFileSync(dir, data);
  console.log('✅ 生成成功，已保存至', dir);
  console.log('❕ 生成结果仅供参考，请确认无误后上传');
}).catch((e) => {
  console.group('❌ 生成失败');
  console.error(e);
  console.groupEnd();
});
