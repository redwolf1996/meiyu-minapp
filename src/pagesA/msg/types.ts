export interface List {
  /**
   * 内容
   */
  content: string
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 扩展字段暂无内容
   */
  ext: { [key: string]: any }
  /**
   * 主键id
   */
  id: number
  /**
   * 类型，1系统通知（续费信息），2业务通知 （预约），3系统通知（会员到期提醒）
   */
  noticeType: number
  /**
   * 状态，1未读，2已读
   */
  status: number
  /**
   * 标题
   */
  title: string
  /**
   * 已读时间
   */
  updateTime: string
  [property: string]: any
}
