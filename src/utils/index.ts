import { useUserStore } from '@/stores/modules/user'

export const IMG_BASE = import.meta.env.VITE_APP_IMG_BASE

export function getMenuButtonInfo() {
  // 获取距上
  const barTop = wx.getSystemInfoSync().statusBarHeight
  // 获取胶囊按钮位置信息
  const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
  // 获取导航栏高度
  const barHeight = menuButtonInfo.height + (menuButtonInfo.top - barTop) * 2
  const barWidth = menuButtonInfo.width
  const windowHeight = wx.getSystemInfoSync().windowHeight
  const windowWidth = wx.getSystemInfoSync().windowWidth
  const screenWidth = wx.getSystemInfoSync().screenWidth
  const restHeight = wx.getSystemInfoSync().windowHeight - barHeight - barTop - 52

  return {
    barHeight,
    barTop,
    barWidth,
    restHeight,
    windowHeight,
    windowWidth,
    screenWidth,
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

export const my = {
  navigateTo(url: string) { // 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
    uni.navigateTo({ url })
  },
  switchTab(url: string) { // 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
    uni.switchTab({ url })
  },
  redirectTo(url: string) { // 关闭当前页面，跳转到应用内的某个页面。
    uni.redirectTo({ url })
  },
  reLaunch(url: string) { // 关闭所有页面，打开到应用内的某个页面。
    uni.reLaunch({ url })
  },
  navigateBack() { // 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
    uni.navigateBack()
  },
}

export function getStoreId() {
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
