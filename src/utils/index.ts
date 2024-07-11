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
