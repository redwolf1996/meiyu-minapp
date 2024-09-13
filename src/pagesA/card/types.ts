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
