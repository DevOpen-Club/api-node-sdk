import type { CirclePostDetail } from './general';
import type { User } from './user';

/** 圈子动态对象。 */
export interface CirclePost {
  /** 发布者。 */
  user: User;
  /** 内容。 */
  post: CirclePostContent;
  /** 其它详情。 */
  sub_info: CirclePostSubInfo;
  /** 文章详情。 */
  doc_info: CirclePostDocInfo;
  /** 打赏咖啡详情。 */
  coffee_info: CirclePostCoffeeInfo;
}

/** 圈子动态内容对象。 */
export interface CirclePostContent {
  /** 唯一 ID。 */
  post_id: string;
  /** 所在服务器 ID。 */
  guild_id: string;
  /** 所在频道 ID。 */
  channel_id: string;
  /** 所属的主题（分类）名称。 */
  topic_name: string;
  /** 标题。 */
  title: string;
  /** 发布时间。 */
  created_at: string;
  /** 内容。 */
  content: string;
  /** 分类主题 ID。 */
  topic_id: string;
}

/** 圈子动态其他详情。 */
export interface CirclePostSubInfo {
  /** 评论数量 */
  comment_total: number;
  /** 点赞数。 */
  like_total: number;
  /** 是否可被当前用户删除。 */
  can_del: number;
  /** 当前用户是否点赞。 */
  liked: number;
  /** 当前用户 user id。 */
  like_id: string;
  /** 是否被置顶。 */
  is_top: boolean;
  /** 是否被当前用户关注。 */
  is_follow: boolean;
}

/** 圈子动态点赞对象。 */
export interface CirclePostReaction {
  /** 表态的记录列表 */
  records: CirclePostReactionRecord[];
  /** 当前分页大小。 */
  size: number;
  /** 当前分页最后一条表态 ID。 */
  list_id: string;
  /** 是否还有下一分页。 */
  next: boolean;
}

/** 圈子动态点赞记录。 */
export interface CirclePostReactionRecord {
  /** 点赞的用户 user id。 */
  user_id: string;
  /** 点赞的用户的头像。 */
  avatar: string;
  /** 点赞的用户昵称。 */
  nickname: string;
  /** 点赞的用户 Fanbook ID。 */
  username: string;
  /** 点赞记录唯一 ID。 */
  reaction_id: string;
}

/** 圈子动态评论对象。 */
export interface CirclePostComment {
  /** 记录列表。 */
  records: CirclePostCommentRecord[];
  /** 动态详情。 */
  post: CirclePostDetail;
  /** 被回复的评论记录。 */
  item?: CirclePostCommentRecord;
  /** 当前分页大小。 */
  size: number;
  /** 当前分页最后一条表态 ID。 */
  list_id: string;
  /** 是否还有下一分页。 */
  next: boolean;
}

/** 圈子动态评论记录。 */
export interface CirclePostCommentRecord {
  /** 评论者。 */
  user: User;
  /** 被回复的评论内容。 */
  comment: CirclePostCommentContent;
}

/** 圈子动态评论内容。 */
export interface CirclePostCommentContent {
  /** 评论唯一 ID。 */
  comment_id: string;
  /** 被回复的评论或动态 ID。 */
  quote_l1: string;
  /** 被回复的内容。 */
  content: string;
  /** 回复时间。 */
  created_at: number;
  /** 点赞数。 */
  like_total: number;
  /** 回复此评论的评论数。 */
  comment_total: number;
  /** 回复此评论的记录列表。 */
  replay_list: CirclePostCommentRecord;
}

/**
 * 文档权限。
 *
 * `1`: 可阅读。
 * `2`: 可编辑。
 */
export type CirclePostDocInfoRole = 1 | 2;

/** 圈子动态文档信息。 */
export interface CirclePostDocInfo {
  /** 类型。 */
  type: string;
  /** 标题。 */
  title: string;
  /** 作者。 */
  user_id: string;
  /** 所在服务器 ID。 */
  guild_id: string;
  /** 创建时间。 */
  created_at: string;
  /** 权限：1表示阅读权限,2表示编辑权限 */
  role: CirclePostDocInfoRole;
}

/**
 * 当前用户是否已递咖啡。
 *
 * `0`: 未递咖啡。
 * `1`: 已递咖啡。
 */
export type CirclePostIsGiveCoffee = 0 | 1;

/** 圈子动态咖啡信息。 */
export interface CirclePostCoffeeInfo {
  /** 咖啡总数。 */
  give_coffee_total: number;
  /** 递咖啡的总人数。 */
  give_coffee_real_number: number;
  /** 当前用户是否有打赏。 */
  is_give_coffee: CirclePostIsGiveCoffee;
  /** 打赏详情。 */
  give_coffee_detail: CoffeeDetail;
}

/** 圈子动态咖啡详情。 */
export interface CoffeeDetail {
  /** 打赏详情记录 ID。 */
  id: number;
  /** 打赏用户 user id。 */
  user_id: string;
  /** 打赏数量。 */
  cnt: number;
  /** 打赏时间。 */
  created_at: number;
}
