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
