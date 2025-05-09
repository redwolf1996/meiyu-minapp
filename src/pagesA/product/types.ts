export interface List {
  /**
   * 分类id
   */
  categoryId?: number
  /**
   * 分类名
   */
  categoryName?: string
  /**
   * 封面图
   */
  coverImg?: string
  /**
   * 简介
   */
  desc?: string
  /**
   * 主键id
   */
  id?: number
  /**
   * 库存
   */
  inventory?: number
  /**
   * 是否网上售卖
   */
  isShow?: number
  /**
   * 产品名
   */
  name?: string
  /**
   * 原价
   */
  price?: number
  /**
   * 优惠价
   */
  price2?: number | null
  /**
   * 门店id
   */
  storeId?: number
  /**
   * 单位
   */
  unit?: string
  [property: string]: any
}

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
