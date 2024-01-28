/** 荣誉对象。 */
export interface GuildCredit {
  /** 荣誉颁发者。 */
  authority: CreditAuthority
  /** 荣誉称号，展示在成员头像右边。 */
  title?: CreditTitle
  /** 荣誉卡槽，展示在成员个人信息页。 */
  slots: CreditSlot[][]
}

/** 荣誉颁发者。 */
export interface CreditAuthority {
  /** 图标图片地址。 */
  icon: string
  /** 名称。 */
  name: string
}

/** 荣誉称号。 */
export interface CreditTitle {
  /** 图标图片地址。 */
  img: string
}

/** 荣誉卡槽。 */
export interface CreditSlot {
  /**
   * 荣誉标签。
   *
   * 与 {@link img} 互斥。
   */
  label?: string
  /**
   * 荣誉图标图片地址。
   *
   * 与 {@link label} 互斥。
   */
  img?: string
  badge?: string
  /** 荣誉的值，展示在标签右、图标下。 */
  value: string
}
