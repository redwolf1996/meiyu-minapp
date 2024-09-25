import { useUserStore } from '@/stores/modules/user'

export const IMG_BASE = import.meta.env.VITE_APP_IMG_BASE

export function getMenuButtonInfo() {
  // 获取距上
  const barTop = uni.getSystemInfoSync().statusBarHeight
  // 获取胶囊按钮位置信息
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
  // 获取导航栏高度
  const barHeight = menuButtonInfo.height + (menuButtonInfo.top - barTop) * 2
  const barWidth = menuButtonInfo.width
  const windowHeight = uni.getSystemInfoSync().windowHeight
  const windowWidth = uni.getSystemInfoSync().windowWidth
  const screenWidth = uni.getSystemInfoSync().screenWidth
  const restHeight = uni.getSystemInfoSync().windowHeight - barHeight - barTop - 52
  const navHeight = barHeight + barTop

  return {
    barHeight,
    barTop,
    barWidth,
    restHeight,
    windowHeight,
    windowWidth,
    screenWidth,
    navHeight,
  }
}

export const themeColor = '#1a66ff'

export function get24Hours() {
  const arr: string[] = []
  for (let i = 0; i < 24; i++) {
    const prefix = i < 10 ? `0${i}` : i.toString()
    arr.push(`${prefix}:00`)
  }
  return arr
}

export function get24HoursHalf() {
  const times: any = []
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i.toString().padStart(2, '0')
      const minute = j.toString().padStart(2, '0')
      times.push(`${hour}:${minute}`)
    }
  }
  return times
}

export function safeBottom() {
  return uni.getSystemInfoSync().safeAreaInsets?.bottom
}

export function getStoreId() {
  // TODO 28是有测试数据的id，开发完毕后去掉
  // return 28

  const lastStoreId = useUserStore().userInfo?.lastStoreId
  // TODO [0]前面不加问号会导致一个大坑=》在开发者工具上不报错，到了真机调试的时候各种报错
  const firstStoreId = useUserStore().userInfo?.storeList?.[0]?.storeId
  if (lastStoreId !== 0)
    return lastStoreId
  if (firstStoreId)
    return firstStoreId
  return 0
}

export const storeId = getStoreId()

export const uniPlatform = uni.getSystemInfoSync().uniPlatform
export const isH5 = uniPlatform === 'web'
