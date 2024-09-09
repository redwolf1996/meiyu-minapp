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
  jobCode?: number
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
  staffId: number
  userName: string
}
