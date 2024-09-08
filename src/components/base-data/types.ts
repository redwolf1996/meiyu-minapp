export interface FormService {
  /**
   * 分类id
   */
  categoryId: ComputedRef<number | number[]>
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
}

export interface Color {
  value: string
  isActive: boolean
}

export interface FormProduct {
  /**
   * 分类id
   */
  categoryId: ComputedRef<number | number[]>
  /**
   * 描述
   */
  desc?: ComputedRef<string>
  /**
   * 图片地址
   */
  imgs: ComputedRef<string[]>
  /**
   * 库存
   */
  inventory: number
  /**
   * 是否网店销售，0否，1是
   */
  isShow: number
  /**
   * 服务名
   */
  name: string
  /**
   * 售价两位小数，60.00
   */
  price: number
  /**
   * 划线价两位小数
   */
  price2?: number
  /**
   * 当前门店
   */
  storeId: number
  /**
   * 单位
   */
  unit: string
}

export interface FormStaff {
  /**
   * 头像
   */
  avatar: ComputedRef<string>
  /**
   * 性别，0未知，1男，2女
   */
  gender?: number
  /**
   * 职务必填
   */
  jobCode: number
  /**
   * 备注
   */
  notes?: string
  /**
   * 电话
   */
  phone: string
  /**
   * 角色
   */
  roleCode?: number
  /**
   * 工作时间
   */
  scheduling: ComputedRef<Scheduling[]>
  /**
   * 服务分类id
   */
  serviceCategory: ComputedRef<number | number[]>
  storeId: number
  /**
   * 姓名
   */
  userName: string
}

export interface Scheduling {
  /**
   * 结束，21:00
   */
  endTime: string
  /**
   * 开始时间，08:00
   */
  startTime: string
  /**
   * 周几，1-7
   */
  weekCode: number
}
