import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({
      name: null,
      token: null,
    })

    function setUserInfo(val: any) {
      userInfo.value = val
    }
    function clearUserInfo() {
      userInfo.value = {
        name: null,
        token: null,
      }
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
