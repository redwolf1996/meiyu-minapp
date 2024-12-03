export interface BillModel {
  /**
   * 销售
   */
  adviserId: number
  /**
   * 待付总金额
   */
  amount: number
  /**
   * 消费项目
   */
  billingGoods: BillingGood[]
  /**
   * 储值卡id，储值卡支付时必填
   */
  customerCardId?: number
  /**
   * 备注
   */
  notes: string
  /**
   * 开单时间
   */
  orderTime: string | ComputedRef<string>
  /**
   * 支付方式，暂时只支持一种支付方式，不支持组合支付 0:稍后支付 1:微信支付
   */
  payType?: number
  /**
   * 门店客户id
   */
  storeCustomerId: ComputedRef<number>
  /**
   * 当前门店id
   */
  storeId: number
  [property: string]: any
}

export interface BillingGood {
  /**
   * 商品优惠后总价
   */
  amount?: ComputedRef<number> | number | null
  /**
   * 手艺人id
   */
  artisanId?: number
  /**
   * 手艺人
   */
  artisan?: string
  /**
   * 卡id
   */
  cardId?: number
  /**
   * 卡优惠金额
   */
  cardReduceAmount?: number
  /**
   * 购卡id，符合已购卡优惠时填写
   */
  customerCardId?: number
  /**
   * 商品数量
   */
  goodsCount?: number
  /**
   * 商品id
   */
  goodsId?: number
  /**
   * 商品原价
   */
  goodsPrice?: number
  /**
   * 商品类型，1服务，2产品，3卡
   */
  goodsType?: number
  /**
   * 商品原价总价
   */
  totalAmount?: ComputedRef<number> | number | null
  /**
   * 服务或产品名称
   */
  name?: string
  /**
   * 使用卡项显示的名称 例：5折折扣卡-￥10.00
   */
  cardShowName?: string
  [property: string]: any
}
