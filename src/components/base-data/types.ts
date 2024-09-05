export interface FormService {
  /**
   * 分类id
   */
  categoryId: ComputedRef<number>
  /**
   * 描述
   */
  desc?: ComputedRef<string>
  /**
   * 服务时长
   */
  duration: number
  /**
   * 时长单位，暂时只支持minute分钟
   */
  durationUnit: string
  /**
   * 图片地址
   */
  imgs: ComputedRef<string[]>
  /**
   * 是否网店销售，0否，1是
   */
  isShow: number
  /**
   * 是否支持上门，1支持，0不支持
   */
  isToDoor?: number
  /**
   * 是否支持到店，1支持，0不支持
   */
  isToStore?: number
  /**
   * 服务类型，1上门，2到店
   */
  serverToType: any[]
  /**
   * 服务名
   */
  name: string
  /**
   * 预约支付类型，1全款，2到店付
   */
  payType: number
  /**
   * 售价两位小数，60.00
   */
  price: number
  /**
   * 划线价两位小数
   */
  price2?: number
  /**
   * 服务标记色
   */
  serviceColor: string
  /**
   * 当前门店
   */
  storeId: number
  [property: string]: any
}

export interface Color {
  value: string
  isActive: boolean
}
