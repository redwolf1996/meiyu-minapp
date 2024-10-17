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
}

export interface CardForm {
  /**
   * 分类
   */
  categoryId: ComputedRef<number | number[]>
  /**
   * 描述
   */
  desc: ComputedRef<string>
  /**
   * 有效期天数，0不限
   */
  expires: number | null
  /**
   * 充值卡赠送
   */
  gift?: number
  /**
   * 卡项所对应的服务列表
   */
  info: Info[]
  /**
   * 是否网店销售，0否，1是
   */
  isShow: number
  /**
   * 卡名
   */
  name: string
  /**
   * 售价，充值卡的充值金额
   */
  price: number
  /**
   * 次卡类型，0非次卡，1->有限次卡，2->不限次卡，3->通卡
   */
  secondType: number
  /**
   * 当前门店
   */
  storeId: number
  /**
   * 分类，1->次卡，2->充值卡，3->折扣卡
   */
  type: number
  /**
   * 已选服务共用次数
   */
  countLimit?:number
}

export interface Info {
  /**
   * 次卡表示数量，折扣充值卡表示折扣1-100
   */
  equity: number
  /**
   * 产品id，与服务id只能存在一个有值的
   */
  productId?: number
  /**
   * 服务id
   */
  serviceId?: number
  /**
   * 产品或服务名称
   */
  name?: string
  price?: number
  price2?: number
}
