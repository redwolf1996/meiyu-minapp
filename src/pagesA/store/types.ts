export interface StoreInfo {
  /**
   * 头像url，头像
   */
  avatar: string
  /**
   * 生日，生日
   */
  birthday: null
  /**
   * 商户id，登录人的唯一标识
   */
  businessId: number
  /**
   * 新手指引-卡项
   */
  cardSkip: number
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 邮箱，邮箱
   */
  email: string
  /**
   * 性别
   */
  gender: string
  /**
   * 我的邀请码
   */
  inviteCode: string
  /**
   * 是否过期，0未过期，1已过期
   */
  isExpires: number
  lastStore: null
  /**
   * 最近登录门店id
   */
  lastStoreId: number
  /**
   * 最近登录门店id
   */
  lastStoreName: string
  /**
   * 最近登录时间
   */
  loginDate: string
  /**
   * 我的组织id，店铺拥有者才有值
   */
  orgId: number
  /**
   * 组织信息（owenr才返回），组织信息（owenr才返回）
   */
  orgInfo: OrgInfo
  /**
   * 被邀请的邀请码
   */
  othersInviteCode: string
  /**
   * 手机号，手机号：为空标识未完善信息
   */
  phone: string
  /**
   * 新手指引-产品， // 0未添加 1已添加 2稍后添加
   */
  productSkip: number
  /**
   * 续费单价
   */
  renewPrice: number
  /**
   * 新手指引-服务
   */
  serviceSkip: number
  /**
   * 新手指引-员工
   */
  staffSkip: number
  /**
   * 状态，1->正常，2->禁用
   */
  status: number
  /**
   * 我关联的店铺
   */
  storeList: any[]
  updateTime: null
  /**
   * 用户名，姓名
   */
  userName: string
  [property: string]: any
}

/**
 * 组织信息（owenr才返回），组织信息（owenr才返回）
 */
export interface OrgInfo {
  /**
   * owner
   */
  adminId: number
  /**
   * 卡数
   */
  cardCount: number
  createTime: string
  expiresTime: string
  /**
   * 累计积分
   */
  historyIntegration: number
  id: number
  /**
   * 可用积分
   */
  integration: number
  /**
   * 产品数
   */
  productCount: number
  /**
   * 服务数
   */
  serviceCount: number
  /**
   * 员工数
   */
  staffCount: number
  /**
   * 店铺数量
   */
  storeCount: number
  [property: string]: any
}
