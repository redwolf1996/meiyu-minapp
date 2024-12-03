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
}
