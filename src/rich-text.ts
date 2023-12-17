/** 图片数据。 */
export interface RichTextImageContent {
  _type: 'image';
  /** 图片文件名。 */
  name: string;
  /** 图片地址。 */
  source: string;
  /** 图片宽度。 */
  width?: number;
  /** 图片高度。 */
  height?: number;
  /** @unused */
  checkPath?: unknown;
  /** 是否行内图片。 */
  _inline: boolean;
}

/** 富文本内容节点。 */
export interface RichTextContentNode {
  /** 内容。 */
  insert: string | RichTextImageContent;
  /** 属性。 */
  attributes?: {
    /**
     * \@ 的对象。
     *
     * 格式：
     * - 用户：`${@!<用户ID>}`，如 `${@!477511007129165824}`。
     * - 身份组：`${@&<角色ID>}`，如 `${@&483266628902318082}`。
     * - 全体成员：`${@&<服务器ID>}`，如 `${@&481087610740391936}`。
     */
    at?: string;
    /** 粗体。 */
    bold?: boolean;
    /** 斜体。 */
    italic?: boolean;
    /** 下划线。 */
    underline?: boolean;
    /** 删除线。 */
    strike?: boolean;
    /** 链接地址。 */
    link?: string;
  };
}
/** 换行节点。 */
export interface RichTextBrNode {
  insert: '\n';
  /** 被此节点所结束的一行的属性。 */
  attributes?: {
    /** 标题等级。 */
    header?: 1 | 2 | 3;
    /** 列表类型。 */
    list?: 'ordered' | 'bullet';
    /** 引用。 */
    blockquote?: boolean;
    /** 代码块。 */
    'code-block'?: boolean;
  };
}
/** 富文本节点。 */
export type RichTextNode = RichTextContentNode | RichTextBrNode;

/** 富文本。 */
export class RichText {
  /**
   * 从纯文本创建富文本对象。
   * @param text 纯文本
   * @returns 富文本对象
   */
  public static fromText(text: string) {
    const obj = new RichText();
    for (const line of text.split('\n')) {
      obj.nodes.push({ insert: line });
      obj.nodes.push({ insert: '\n' });
    }
    return obj;
  }

  /**
   * 从富文本节点创建富文本对象。
   * @param nodes 富文本节点
   * @returns 富文本对象
   */
  public static fromNodes(nodes: RichTextNode[]) {
    const obj = new RichText();
    obj.nodes = nodes;
    return obj;
  }

  /** 节点列表。 */
  public nodes: RichTextNode[] = [];

  /**
   * 转 fanbook 富文本。
   *
   * 可用于发送消息。
   * @param title 富文本标题
   * @returns fanbook 富文本
   */
  public toString(title?: string) {
    return JSON.stringify({
      v: 2,
      type: 'richText',
      title,
      v2: JSON.stringify(this.nodes),
    });
  }
}
