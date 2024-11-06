export interface ListStaff {
  /**
   * 头像
   */
  avatar: string
  createBy: number
  createTime: string
  /**
   * 性别
   */
  gender: number
  /**
   * 职务
   */
  jobCode: number
  /**
   * 职务
   */
  jobDesc: string
  /**
   * 机构员工id
   */
  orgStaffId: number
  /**
   * 手机号
   */
  phone: string
  /**
   * 角色
   */
  roleCode: number
  /**
   * 角色
   */
  roleDesc: string
  /**
   * 登录人平台唯一id
   */
  staffId: number
  /**
   * 门店员工id
   */
  storeStaffId: number
  /**
   * 姓名
   */
  userName: string
  /**
   * 是否选中（用于列表选择）
   */
  active?: boolean
}

export interface Staff {
  /**
   * 头像
   */
  avatar: string
  /**
   * 预约数量
   */
  bookingCount: number
  createTime: string
  /**
   * 客户数
   */
  customerCount: number
  /**
   * 性别
   */
  gender: string
  /**
   * 职务
   */
  jobCode: number
  /**
   * 职务
   */
  jobDesc: string
  /**
   * 备注
   */
  notes: string
  /**
   * 业绩
   */
  performance: number
  /**
   * 手机号
   */
  phone: string
  /**
   * 角色
   */
  roleCode: number
  /**
   * 角色
   */
  roleDesc: string
  /**
   * 工作时间
   */
  scheduling: Scheduling[]
  /**
   * 服务分类
   */
  serviceCategory: ServiceCategory[]
  staffId: number
  storeId: number
  /**
   * 门店员工id
   */
  storeStaffId: number
  /**
   * 姓名
   */
  userName: string
  [property: string]: any
}

export interface Scheduling {
  endTime: string
  startTime: string
  weekCode: number
  [property: string]: any
}

export interface ServiceCategory {
  serviceCategoryId: number
  serviceCategoryName: null | string
  [property: string]: any
}
