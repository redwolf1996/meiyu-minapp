export interface BookForm {
  /**
   * 分配的手艺人
   */
  artisanId: number
  /**
   * 储值卡id，储值卡支付时必填
   */
  customerCardId?: number
  /**
   * 备注
   */
  notes: string
  /**
   * 支付方式，立即支付时必填
   */
  payType: number
  /**
   * 预约的服务列表
   */
  service: any[]
  /**
   * 服务开始时间，yyyy-MM-dd HH:mm:ss
   */
  startTime: ComputedRef<string>
  /**
   * 手机号查询到的门店客户id
   */
  storeCustomerId?: number
  /**
   * 客户姓名
   */
  storeCustomerName: string
  /**
   * 客户手机号
   */
  storeCustomerPhone: string
  /**
   * 当前门店id，当前门店id
   */
  storeId: number
  /**
   * 服务类型，1到店，2上门
   */
  storeServiceType: number
}

export interface Service {
  /**
   * 优惠后金额
   */
  amount: number
  /**
   * 卡id
   */
  cardId?: number
  /**
   * 卡优惠金额
   */
  cardReduceAmount?: number
  /**
   * 用的购卡id
   */
  customerCardId?: number
  /**
   * 数量
   */
  goodsCount: number
  /**
   * 服务id
   */
  storeServiceId: number
  /**
   * 优惠前金额
   */
  totalAmount: number
}
