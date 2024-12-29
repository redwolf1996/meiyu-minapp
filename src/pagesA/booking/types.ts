export interface Data {
  /**
   * 地址
   */
  address: string
  /**
   * 看板格子时长, 分钟
   */
  bookingDuration: number
  /**
   * 市
   */
  city: string
  /**
   * 区
   */
  county: string
  createTime: string
  /**
   * 简介
   */
  desc: string
  /**
   * 主键id
   */
  id: number
  /**
   * 经纬度
   */
  locationX: string
  /**
   * 经纬度
   */
  locationY: string
  /**
   * 门店logo
   */
  logo: string
  /**
   * 所属组织
   */
  orgId: number
  /**
   * 联系电话
   */
  phone: string
  /**
   * 可提现收入
   */
  platformAmount: number
  /**
   * 省
   */
  province: string
  /**
   * 状态, 1营业中，2停业
   */
  status: number
  /**
   * 状态中文描述
   */
  statusDesc: string
  /**
   * 门店名
   */
  storeName: string
  toDoorEtime: string
  toDoorStime: string
  /**
   * 上门时间
   */
  toDoorWeek: number[]
  /**
   * 累计收入
   */
  totalAmount: number
  /**
   * 修改时间
   */
  updateTime: string
  workEtime: string
  workStime: string
  /**
   * 营业时间
   */
  workWeek: number[]
}
