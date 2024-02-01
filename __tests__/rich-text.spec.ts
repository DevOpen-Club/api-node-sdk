import type { RichTextNode } from '../src/rich-text'
import { RichText } from '../src/rich-text'

const BR_NODE: RichTextNode = { insert: '\n' }

describe('富文本', () => {
  const nodes: RichTextNode[] = [{
    insert: '@机器人 Demo',
    // eslint-disable-next-line no-template-curly-in-string
    attributes: { at: '${@!477511007129165824}' },
  }, BR_NODE, {
    insert: {
      name: 'v2-3b1ac0d7e0cce26472bccff2b85ec4b7_1440w.webp',
      source: 'https://fb-cdn.fanbook.mobi/fanbook/app/files/chatroom/unKnow/72d7d21666cf819d1d32c86131359f00.webp',
      width: 500.0,
      height: 420.0,
      checkPath: null,
      _type: 'image',
      _inline: false,
    },
  }, {
    insert: '\n\n[赞]\nH1',
  }, {
    insert: '\n',
    attributes: { header: 1 },
  }, {
    insert: 'H2',
  }, {
    insert: '\n',
    attributes: { header: 2 },
  }, {
    insert: 'H3',
  }, {
    insert: '\n',
    attributes: { header: 3 },
  }, {
    insert: 'ol',
  }, {
    insert: '\n',
    attributes: { list: 'ordered' },
  }, {
    insert: 'ul',
  }, {
    insert: '\n',
    attributes: { list: 'bullet' },
  }, {
    insert: 'blockquote',
  }, {
    insert: '\n',
    attributes: { blockquote: true },
  }, {
    insert: 'pre',
  }, {
    insert: '\n',
    attributes: { 'code-block': true },
  }, {
    insert: 'bold',
    attributes: { bold: true },
  }, BR_NODE, {
    insert: 'italic',
    attributes: { italic: true },
  }, BR_NODE, {
    insert: 'underline',
    attributes: { underline: true },
  }, BR_NODE, {
    insert: 'del',
    attributes: { strike: true },
  }, BR_NODE, {
    insert: 'a',
    attributes: { link: 'https://example.com' },
  }, BR_NODE]

  it('节点初始值', () => {
    expect(new RichText().nodes).toHaveLength(0)
  })

  it('从纯文本构造', () => {
    expect(RichText.fromText('Hello\nWorld').nodes).toMatchObject<RichTextNode[]>([{
      insert: 'Hello',
    }, BR_NODE, {
      insert: 'World',
    }, BR_NODE])
  })

  it('从富文本节点构造', () => {
    expect(RichText.fromNodes(nodes).nodes).toBe(nodes)
  })

  it('转富文本字符串', () => {
    expect(JSON.parse(
      RichText.fromNodes(nodes).toString(),
    )).toMatchObject({
      type: 'richText',
      v: 2,
      v2: JSON.stringify(nodes),
    })

    expect(JSON.parse(
      RichText.fromNodes(nodes).toString('标题123'),
    )).toMatchObject({
      type: 'richText',
      v: 2,
      title: '标题123',
      v2: JSON.stringify(nodes),
    })
  })
})
