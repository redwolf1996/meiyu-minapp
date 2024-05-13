import { defineStore } from 'pinia'

export const useMerchantStore = defineStore(
  'business',
  () => {
    const businessInfo = ref(null)

    function setBusinessInfo(val: any) {
      businessInfo.value = val
    }
    function clearBusinessInfo() {
      businessInfo.value = null
    }

    return {
      businessInfo,
      setBusinessInfo,
      clearBusinessInfo,
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
