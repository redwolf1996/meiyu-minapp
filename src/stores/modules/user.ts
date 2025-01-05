import { merge } from 'lodash-es'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<Partial<UserInfo>>({
      guidStatus: {
        productCountStatus: 0, // 0未添加 1已添加 2稍后添加
        serviceCountStatus: 0,
        staffCountStatus: 0,
      },
    })

    function setUserInfo(val: Partial<UserInfo>) {
      if (val?.orgInfo?.productCount)
        userInfo.value.guidStatus.productCountStatus = 1
      if (val?.orgInfo?.serviceCount)
        userInfo.value.guidStatus.serviceCountStatus = 1
      if (val?.orgInfo?.staffCount)
        userInfo.value.guidStatus.staffCountStatus = 1

      merge(userInfo.value, val)
    }
    function clearUserInfo() {
      userInfo.value.token = null
      userInfo.value.storeList = []
    }

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
    }
  },
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)

/**
 * 引导页各模块添加的状态
 * 0未添加 1已添加 2稍后添加
 */
export interface GuidStatus {
  productCountStatus: 0 | 1 | 2 // 0未添加 1已添加 2稍后添加
  serviceCountStatus: 0 | 1 | 2 // 0未添加 1已添加 2稍后添加
  staffCountStatus: 0 | 1 | 2 // 0未添加 1已添加 2稍后添加
}

export interface UserInfo {
  token?: string
  isRegister?: 1 | 0 // 1已注册 2未注册
  guidStatus: Partial<GuidStatus>
  /**
   * 我关联的店铺
   */
  storeList: StoreList[]
  /**
   * 组织信息（owenr才返回），组织信息（owenr才返回）
   */
  orgInfo: OrgInfo
  /**
   * 头像url，头像
   */
  avatar: string
  /**
   * 生日，生日
   */
  birthday: string
  /**
   * 商户id，登录人的唯一标识
   */
  businessId: number
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 邮箱，邮箱
   */
  email: string
  /**
   * 性别
   */
  gender: string
  /**
   * 我的邀请码
   */
  inviteCode: string
  /**
   * 是否过期，0未过期，1已过期
   */
  isExpires: number
  /**
   * 最近登录门店id
   */
  lastStoreId: number
  /**
   * 最近登录门店名称
   */
  lastStoreName: string
  /**
   * 最近登录门店信息
   */
  lastStore: StoreList
  /**
   * 最近登录时间
   */
  loginDate: string
  /**
   * 我的组织id，店铺拥有者才有值
   */
  orgId: number
  /**
   * 被邀请的邀请码
   */
  othersInviteCode: string
  /**
   * 手机号，手机号：为空标识未完善信息
   */
  phone: string
  /**
   * 状态，1->正常，2->禁用
   */
  status: number
  updateTime: string
  /**
   * 用户名，姓名
   */
  userName: string
  [property: string]: any
}

/**
 * 组织信息（owenr才返回），组织信息（owenr才返回）
 */
export interface OrgInfo {
  /**
   * owner
   */
  adminId: number
  /**
   * 卡数
   */
  cardCount: number
  createTime: string
  expiresTime: string
  /**
   * 累计积分
   */
  historyIntegration: number
  id: number
  /**
   * 可用积分
   */
  integration: number
  /**
   * 产品数
   */
  productCount: number
  /**
   * 服务数
   */
  serviceCount: number
  /**
   * 员工数
   */
  staffCount: number
  /**
   * 店铺数量
   */
  storeCount: number
  [property: string]: any
}

export interface StoreList {
  /**
   * 地址
   */
  address?: string
  /**
   * 市
   */
  city?: string
  /**
   * 区
   */
  county?: string
  createTime?: string
  /**
   * 简介
   */
  desc?: string
  /**
   * 是否店铺拥有者，1是，0否
   */
  isOwner?: number
  locationX?: string
  locationY?: string
  /**
   * 门店logo
   */
  logo?: string
  /**
   * 所属组织
   */
  orgId?: number
  /**
   * 联系电话
   */
  phone?: string
  /**
   * 可提现余额
   */
  platformAmount?: number
  /**
   * 省
   */
  province?: string
  roleCode?: number
  roleDesc?: string
  /**
   * 门店状态，1->营业中，2->停业
   */
  status?: number
  /**
   * 店铺id
   */
  storeId?: number
  /**
   * 店铺名
   */
  storeName?: string
  /**
   * 累计收入
   */
  totalAmount?: number
  updateBy?: number
  updateTime?: string
  [property: string]: any
}
