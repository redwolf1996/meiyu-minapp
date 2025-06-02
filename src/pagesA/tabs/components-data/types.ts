export interface StatOverview {
  /**
   * 预约单数，客户分析
   */
  bookingCount: number
  /**
   * 开卡充值客户数，客户分析
   */
  cardSaleCount: number
  /**
   * 新增客户数，客户分析
   */
  customerCount: number
  /**
   * 成交客户数，客户分析
   */
  orderCustomerCount: number
  /**
   * 退款金额，经营概况
   */
  refundAmount: number
  /**
   * 服务产品收入，经营概况
   */
  serviceProductIncome: number
  /**
   * 开卡充值金额，经营概况
   */
  storedAdd: number
  /**
   * 客户消耗金额，经营概况
   */
  storedUse: number
  /**
   * 实际收款金额，经营概况
   */
  totalIncome: number
  /**
   * 新增会员数，客户分析
   */
  vipCustomerCount: number
}

export interface StatStaff {
  /**
   * 成交卡类客户数
   */
  orderCardCustomerCount: number
  /**
   * 成交客户数
   */
  orderCustomerCount: number
  /**
   * 服务客次
   */
  orderServeCustomerCount: number
  /**
   * 销售现金收入
   */
  saleCashAmount: number
  /**
   * 销售客户数
   */
  saleCustomerCount: number
  /**
   * 销售抵扣卡
   */
  saleDeductionCard: number
  /**
   * 服务现金收入
   */
  serveCashAmount: number
  /**
   * 服务客户数
   */
  serveCustomerCount: number
  /**
   * 服务抵扣卡
   */
  serveDeductionCard: number
}

export interface Ranking {
  /**
   * 销售排行
   */
  saleRanking: SaleRanking[]
  /**
   * 服务排行
   */
  serviceRanking: ServiceRanking[]
}

export interface SaleRanking {
  /**
   * 金额
   */
  income?: number
  /**
   * 员工org_staff_id
   */
  orgStaffId?: number
  /**
   * 员工姓名
   */
  orgStaffName?: string
}

export interface ServiceRanking {
  /**
   * 金额
   */
  income?: number
  /**
   * 员工org_staff_id
   */
  orgStaffId?: number
  /**
   * 员工姓名
   */
  orgStaffName?: string
}

export interface StaffAchievementsDetail {
  /**
   * 员工org_staff_id
   */
  orgStaffId: number
  /**
   * 销售-卡收入
   */
  saleCard: number
  /**
   * 销售-产品收入
   */
  saleProduct: number
  /**
   * 销售-充值
   */
  saleRecharge: number
  /**
   * 销售-服务收入
   */
  saleService: number
  /**
   * 服务-劳动收入
   */
  serviceArtisan: number
  /**
   * 服务-赠送抵扣
   */
  serviceGift: number
  /**
   * 服务-次卡抵扣
   */
  serviceTimesCard: number
  /**
   * 服务-充值卡耗（余额支付）
   */
  serviceValueCard: number
  /**
   * 员工姓名
   */
  orgStaffName: string
  /**
   * 员工角色
   */
  orgStaffRole: string
  /**
   * 员工手机号
   */
  orgStaffPhone: string
  /**
   * 销售业绩
   */
  salesAmount: number
  /**
   * 服务业绩
   */
  serviceAmount: number
}
