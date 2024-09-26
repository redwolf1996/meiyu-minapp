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
  active: boolean
}
