import request from '@/utils/request'

export default {
  getStaffList(params: StaffQueryModel) {
    return request.get<StaffModel>('/business/staff', params)
  },
}

export interface StaffQueryModel {
  /**
   * 职务
   */
  jobCode?: number | string
  /**
   * 角色
   */
  roleCode?: number
  /**
   * 当前门店
   */
  storeId: number
  /**
   * 名称
   */
  userName?: string
}

export interface StaffModel {
  total: number
  list: StaffModelList[]
}

export interface StaffModelList {
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
   * 职务 1店长，2手艺人，3销售
   */
  jobCode: any
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
   * 角色 1店长，2销售，3手艺人
   */
  roleCode: number
  /**
   * 角色描述
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
}
