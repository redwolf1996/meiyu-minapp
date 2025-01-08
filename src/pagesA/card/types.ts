export interface ReqModel {
  /**
   * 分类id
   */
  categoryId?: number
  /**
   * 名称模糊查询
   */
  name?: string
  /**
   * 页码，默认1，页码，默认1
   */
  pageNum?: number
  /**
   * 每页条数，默认10，每页条数，默认10
   */
  pageSize?: number
  /**
   * 当前门店必填
   */
  storeId: number
}

export interface ListModel {
  list: List[]
  total: number
}

export interface List {
  categoryId?: number
  /**
   * 有效期
   */
  expires?: number
  /**
   * 充值卡赠送金额
   */
  gift?: number
  /**
   * 主键
   */
  id?: number
  /**
   * 卡名称
   */
  name?: string
  /**
   * 价格
   */
  price?: number
  /**
   * 次卡类型，0非次卡，1->有限次卡，2->不限次卡，3->通卡
   */
  secondType?: number
  /**
   * 类型，1->次卡，2->充值卡，3->折扣卡
   */
  type?: number
  /**
   * 有限次卡次数
   */
  avaTimes?: number
  /**
   * 不限次卡 次数上限
   */
  countLimit: number
  /**
   * 是否网店展示
   */
  discountDesc?: string
  isShow: boolean
  info: Info[]
}

export interface CardForm {
  /**
   * ID 编辑和复制的时候必填
   */
  id?: number | string | null
  /**
   * 分类
   */
  categoryId: ComputedRef<number | number[]> | null
  /**
   * 描述
   */
  desc: ComputedRef<string> | null
  /**
   * 有效期天数，0不限
   */
  expires: number | null
  /**
   * 充值卡赠送
   */
  gift?: number | null
  /**
   * 卡项所对应的服务列表
   */
  info: Info[] | null
  /**
   * 是否网店销售，0否，1是
   */
  isShow: number | null
  /**
   * 卡名
   */
  name: string | null
  /**
   * 售价，充值卡的充值金额
   */
  price: number | null
  /**
   * 次卡类型，0非次卡，1->有限次卡，2->不限次卡，3->通卡
   */
  secondType: number | null
  /**
   * 当前门店
   */
  storeId: number | null
  /**
   * 分类，1->次卡，2->充值卡，3->折扣卡
   */
  type: number | null
  /**
   * 已选服务共用次数
   */
  countLimit?: number | null
}

export interface Info {
  /**
   * 次卡表示数量，折扣充值卡表示折扣1-100
   */
  equity?: number | null
  /**
   * 产品id，与服务id只能存在一个有值的
   */
  productId?: number | null
  /**
   * 服务id
   */
  serviceId?: number | null
  /**
   * 产品或服务名称
   */
  name?: string | null
  price?: number | null
  price2?: number | null
  serviceName?: string
  productName?: string
  cardId?: number
}

export interface MakeCardModel {
  /**
   * 销售
   */
  adviserId?: number
  /**
   * 金额，充值卡售价
   */
  amount?: number
  /**
   * 卡id
   */
  cardId?: number
  /**
   * 备注
   */
  notes?: string
  /**
   * 下单时间
   */
  orderTime?: ComputedRef<string> | null
  /**
   * 支付方式
   */
  payType?: number
  /**
   * 客户id
   */
  storeCustomerId?: ComputedRef<number> | null
  /**
   * 购卡id
   */
  customerCardId?: number
  /**
   * 赠送金额
   */
  gift?: number
  [property: string]: any
}

export interface CusList {
  /**
   * 充值卡剩余金额
   */
  amount: number
  /**
   * 卡id
   */
  cardId: number
  /**
   * 卡名称
   */
  cardName: string
  /**
   * 卡类别
   */
  cardType: number
  /**
   * 卡类别
   */
  cardTypeDesc: string
  /**
   * 不限次卡次数上限；有限次卡总次数
   */
  countLimit: number
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 客户头像
   */
  customerAvatar: string
  /**
   * 客户id
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
   * 有效期结束时间
   */
  expiresTime: string
  /**
   * 到期时间
   */
  expiresTimeDesc: string
  /**
   * 充值卡剩余赠送
   */
  gift: number
  id: number
  /**
   * 是否长期卡
   */
  isLongTerm: number
  /**
   * 1有效，0无效
   */
  isValid: number
  /**
   * 订单id
   */
  orderId: number
  /**
   * 购买实付（储值卡首次支付金额）
   */
  payAmount: number
  /**
   * 有效开始时间
   */
  startTime: string
  /**
   * 门店客户id
   */
  storeCustomerId: number
  storeId: number
  /**
   * 累计充值
   */
  totalAmount: number
  /**
   * 累计赠送
   */
  totalGift: number
  /**
   * 次卡使用次数
   */
  useCount: number
}

export interface CusCardDetail {
  /**
   * 储值卡储值金额
   */
  amount: number
  /**
   * 卡id
   */
  cardId: number
  /**
   * 卡名
   */
  cardName: string
  /**
   * 次卡二级分类
   */
  cardSecondType: number
  /**
   * 卡类别 1->次卡，2->充值卡，3->折扣卡
   */
  cardType: number
  cardTypeDesc: string
  /**
   * 不限次卡，次数上限；有限次卡总次数
   */
  countLimit: number
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 客户id
   */
  customerId: number
  /**
   * 权益说明
   */
  equityDesc: string
  /**
   * 过期时间
   */
  expiresTime: string
  /**
   * 过期时间
   */
  expiresTimeDesc: string
  /**
   * 储值赠送
   */
  gift: number
  /**
   * 是否长期有效
   */
  isLongTerm: number
  /**
   * 订单id
   */
  orderId: number
  /**
   * 订单编号
   */
  orderNo: string
  /**
   * 实付，储值卡首次充值金额
   */
  payAmount: number
  /**
   * 退费id
   */
  refundId: number
  /**
   * 退费订单编号
   */
  refundTime: null
  /**
   * 有效期开始时间
   */
  startTime: string
  storeCustomerAvatar: string
  /**
   * 客户卡数量
   */
  storeCustomerCardC: number
  /**
   * 门店客户id
   */
  storeCustomerId: number
  /**
   * 客户名
   */
  storeCustomerName: string
  /**
   * 客户手机号
   */
  storeCustomerPhone: string
  /**
   * 储值卡卡累计充值
   */
  totalAmount: number
  /**
   * 储值卡卡累计赠送
   */
  totalGift: number
}

export interface CusRecord {
  list: CusRecordList[]
  /**
   * 次卡剩余次数，折扣卡抵扣金额，储值卡剩余金额
   */
  surplus: string | number
  total: number
  /**
   * 次卡折扣卡使用次数，储值卡使用金额
   */
  use: string | number
}

export interface CusRecordList {
  /**
   * 用卡优惠金额
   */
  cardReduceAmount: number
  /**
   * 时间
   */
  createTime: string
  /**
   * 商品数量
   */
  goodsCount: number
  goodsId: number
  /**
   * 商品名
   */
  goodsName: string
  /**
   * 商品类别，1服务，2产品，3卡，4预约，5充值
   */
  goodsType: number
  id: number
  /**
   * 备注
   */
  notes: string
  /**
   * 订单id
   */
  orderId: number
  /**
   * 储值卡消耗金额
   */
  orderItemAmount: number
  /**
   * 子订单id
   */
  orderItemId: number
  /**
   * 订单编号
   */
  orderNo: string
  payStatus: number
  /**
   * 描述
   */
  recordDesc: string
}

export interface CardEquity {
  /**
   * 服务次数，产品卡折扣1-100
   */
  equity?: number
  /**
   * 商品id
   */
  goodsId?: number
  /**
   * 商品名称
   */
  goodsName?: string
  /**
   * 商品类型 1产品 2服务
   */
  goodsType?: number
  /**
   * 商品价格
   */
  goodsPrice?: string | number
  /**
   * 详情得到的id
   */
  id?: number
  /**
   * 是否权益可修改
   */
  editable?: boolean
}

export interface CardInfo {
  /**
   * 分类id
   */
  categoryId: number
  /**
   * 分类名, 这一项如果用不到可以跟我说
   */
  categoryName: string
  /**
   * 不限次卡，次数上限
   */
  countLimit: number
  /**
   * 创建人
   */
  createBy: number
  createTime: string
  /**
   * 1未删除，2已删除
   */
  deleteStatus: number
  /**
   * 描述
   */
  desc: string
  /**
   * 有效期天数, 0不限
   */
  expires: number
  /**
   * 充值卡赠送
   */
  gift: number
  /**
   * 主键
   */
  id: number
  /**
   * 关联权益
   */
  info: Partial<Equity>[]
  /**
   * 是否网店售卖
   */
  isShow: number
  /**
   * 卡名称
   */
  name: string
  orgId: number
  /**
   * 售价
   */
  price: number
  /**
   * 次卡分类, 0非次卡，1->有限次卡，2->不限次卡，3->通卡
   */
  secondType: number
  secondTypeDesc: string
  storeId: number
  /**
   * 类型, 1->次卡，2->充值卡，3->折扣卡
   */
  type: number
  typeDesc: string
  updateBy: number
  updateTime: null
}

export interface Equity {
  cardId: number
  /**
   * 权益值, 次卡表示次数，充值卡折扣卡表示折扣1-100
   */
  equity: number
  price: number
  price2: number
  /**
   * 产品id
   */
  productId: number
  /**
   * 产品名
   */
  productName: string
  /**
   * 服务id, 服务和产品每条只存在一个
   */
  serviceId: number
  /**
   * 服务名
   */
  serviceName: string
}
