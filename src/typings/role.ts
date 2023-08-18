/** 身份组对象。 */
export interface GuildRole {
  /** 身份组唯一 ID。 */
  id: bigint;
  /** 身份组名称。 */
  name: string;
  /** 身份组优先级。 */
  position: number;
  /** 身份组权限。 */
  permissions: number;
  /** 身份组标签颜色值。 */
  color: number;
  /**
   * 是否有管理者。
   *
   * 有管理者的身份组无法删除、添加用户。
   */
  managed?: boolean;
  /** 身份组人数。 */
  member_count?: number;
  /** 有管理者时，管理者机器人。 */
  tag?: {
    bot_id: string;
  };
}
