import { defineStore } from 'pinia'

export const useMerchantStore = defineStore(
  'merchant',
  () => {
    const merchantInfo = ref(null)

    function setMerchantInfo(val: any) {
      merchantInfo.value = val
    }
    function clearMerchantInfo() {
      merchantInfo.value = null
    }

    return {
      merchantInfo,
      setMerchantInfo,
      clearMerchantInfo,
    }
  },
  {
    // 小程序端配置
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
    // 网页端配置
    // persist: true,
  },
)
