import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserInfo>({} as UserInfo)

    function setUserInfo(val: any) {
      userInfo.value = Object.assign(userInfo.value, val)
    }
    function clearUserInfo() {
      userInfo.value = Object.assign(userInfo.value, {
        token: null,
      })
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

interface UserInfo {
  token: string
  isRegister: 1 | 0 // 1已注册 2未注册
  avatar: string
  birthday: string
  businessId: string
  createTime: string
  email: string
  gender: string
  inviteCode: string // 我的邀请码
  isExpires: 1 | 0 // 1已过期 0未过期
  lastStoreId: number
  loginDate: string
  orgId: number
  orgInfo: OrgInfo
  othersInviteCode: string // 被邀请的邀请码
  phone: string
  status: 1 | 2 // 1正常 2禁用
  storeList: StoreInfo[]
  updateTime: string
  userName: string
}

interface OrgInfo {
  adminId: number // 店铺所有者id
  cardCount: number // 卡数
  createTime: string
  expiresTime: string
  historyIntegration: number // 累计积分
  id: number
  integration: number // 可用积分
  productCount: number // 产品数
  serviceCount: number // 服务数
  staffCount: number // 员工数
  storeCount: number // 店铺数
}

interface StoreInfo {
  address: string
  amount: number // 累计收入
  createTime: string
  desc: string
  isOwner: 1 | 0
  logo: string
  orgId: 1
  phone: string
  platformAccount: string // 可提现余额
  status: 1 | 2 // 1营业中 2停业
  storeId: number
  storeName: string
  updateBy: number
  updateTime: string
}
