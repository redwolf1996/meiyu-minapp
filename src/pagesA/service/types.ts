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
   * 时长
   */
  duration?: number
  /**
   * 服务时长单位分钟minute，暂时固定分钟minute
   */
  durationUnit?: string
  /**
   * 服务主键id
   */
  id?: number
  /**
   * 是否在线销售
   */
  isShow?: number
  /**
   * 是否支持上门
   */
  isToDoor?: number
  /**
   * 是否支持到店
   */
  isToStore?: number
  /**
   * 服务名
   */
  name?: string
  /**
   * 预约支付，1付全款，2到店
   */
  payType?: number
  /**
   * 价格
   */
  price?: number
  /**
   * 划线价
   */
  price2?: number
  /**
   * 颜色
   */
  serviceColor?: string
  /**
   * 所属门店
   */
  storeId?: number
  [property: string]: any
}
