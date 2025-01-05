export interface List {
  /**
   * 金额
   */
  amount: number
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 订单id
   */
  id: number
  orderItem: OrderItem[]
  /**
   * 订单编号
   */
  orderNo: string
  /**
   * 支付状态，1待支付，2已支付，3未支付取消，4退款
   */
  payStatus: number
  /**
   * 支付状态名
   */
  payStatusDesc: string
}

export interface OrderItem {
  artisanId?: number
  artisanName?: string
  cardName?: string
  customerCardId?: number
  /**
   * 商品总价
   */
  amount: number
  /**
   * 商品数量
   */
  goodsCount: number
  /**
   * 商品头图
   */
  goodsCoverImg: string
  /**
   * 商品id
   */
  goodsId: number
  /**
   * 商品名
   */
  goodsName: string
  /**
   * 商品价格
   */
  goodsPrice: number
  /**
   * 订单项类别，1服务，2产品，3卡，4预约
   */
  goodsType: number
  /**
   * 商品卡类型，1次卡，2折扣卡 3充值卡
   */
  goodsCardType?: number
}

export interface Detail {
  adviserId: number
  /**
   * 销售
   */
  adviserName: number
  /**
   * 订单支付金额
   */
  amount: number
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 客户头像
   */
  customerAvatar: string
  /**
   * 客户卡数量
   */
  customerCardCount: number
  /**
   * 客户注册id
   */
  customerId: number
  /**
   * 客户名
   */
  customerName: string
  /**
   * 客户手机号
   */
  customerPhone: string
  /**
   * 备注
   */
  notes: string
  /**
   * 订单id
   */
  orderId: number
  orderItem: OrderItem[]
  /**
   * 订单编号
   */
  orderNo: string
  /**
   * 创建源头，1开单，2预约，3开卡，4充值
   */
  createSource: number
  /**
   * 支付状态，1待支付，2已支付，3未支付取消，4已退费
   */
  payStatus: number
  payTime: string
  /**
   * 支付类型
   */
  payType: number
  /**
   * 支付类型
   */
  payTypeDesc: string
  /**
   * 退款金额
   */
  refundAmount: number
  /**
   * 退单取消id
   */
  refundId: number
  /**
   * 退单取消时间
   */
  refundTime: string
  /**
   * 门店客户id
   */
  storeCustomerId: number
  storeId: number
}

export interface RefundDetail {
  /**
   * 退单创建时间
   */
  createTime: string
  /**
   * 备注
   */
  notes: string
  /**
   * 退款金额
   */
  refundAmount: number
  /**
   * 退卡权益次数
   */
  refundCardEquity: number
  /**
   * 退款编号
   */
  refundNo: string
  /**
   * 退款状态，1待支付，2已支付，3未支付取消
   */
  refundStatus: number
  /**
   * 退款状态
   */
  refundStatusDesc: string
  /**
   * 退单付款时间
   */
  refundTime: string
  /**
   * 支付方式
   */
  refundType: number
  /**
   * 支付方式
   */
  refundTypeDesc: string
}
