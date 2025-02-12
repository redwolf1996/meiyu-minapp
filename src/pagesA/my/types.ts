export interface List {
  businessId?: number
  /**
   * 姓名
   */
  businessName?: string
  /**
   * 被邀请人手机号
   */
  businessPhone?: string
  businessRenewId?: number
  /**
   * 时间
   */
  createTime?: string
  /**
   * 奖励天数
   */
  days?: number
  id?: number
  inviteBusinessId?: number
  inviteCode?: string
  /**
   * 备注
   */
  notes?: string
  /**
   * 状态, 1待发放，2已发放
   */
  status?: string
  [property: string]: any
}
