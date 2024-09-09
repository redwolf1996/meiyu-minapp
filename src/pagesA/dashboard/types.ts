export interface Wallet {
  /**
   * 冻结
   */
  frozenAmount: number
  /**
   * 可提现余额
   */
  platformAmount: number
  /**
   * 累计收入
   */
  totalAmount: number
  /**
   * 已提现
   */
  withdrawAmount: number
}

export interface BusinessInfo {
  /**
   * 头像url，头像
   */
  avatar: string
  /**
   * 生日，生日
   */
  birthday: string
  /**
   * 商户id，登录人的唯一标识
   */
  businessId: number
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
  /**
   * 最近登录门店id
   */
  lastStoreId: number
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
   * 状态，1->正常，2->禁用
   */
  status: number
  /**
   * 我关联的店铺
   */
  storeList: StoreList[]
  updateTime: string
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

export interface StoreList {
  /**
   * 地址
   */
  address?: string
  createTime?: string
  /**
   * 简介
   */
  desc?: string
  /**
   * 是否店铺拥有者，1是，0否
   */
  isOwner?: number
  /**
   * 门店logo
   */
  logo?: string
  /**
   * 所属组织
   */
  orgId?: number
  /**
   * 联系电话
   */
  phone?: string
  /**
   * 可提现余额
   */
  platformAmount?: number
  /**
   * 门店状态，1->营业中，2->停业
   */
  status?: number
  /**
   * 店铺id
   */
  storeId?: number
  /**
   * 店铺名
   */
  storeName?: string
  /**
   * 累计收入
   */
  totalAmount?: number
  updateBy?: number
  updateTime?: string
  [property: string]: any
}

export interface CashingRecords {
  list: CashList[]
  total: number
}

export interface CashList {
  /**
   * 提现金额
   */
  amount: number
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 完成时间
   */
  finishTime: string
  id: number
  /**
   * 审核状态，1待审核，2通过，3驳回
   */
  inspectRemark: number
  inspectRemarkDesc: string
  /**
   * 审核时间
   */
  inspectTime: string
  orgId: number
  /**
   * 驳回原因
   */
  overruleReason: string
  /**
   * 完成状态，：1->初始，2->进行中，3->完成
   */
  status: number
  statusDesc: string
  storeId: number
  /**
   * 提现方式，1银行卡，2微信零钱
   */
  type: number
  typeDesc: string
  /**
   * 编号
   */
  withdrawNo: string
}
