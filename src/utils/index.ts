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
  const restHeight = wx.getSystemInfoSync().windowHeight - barHeight - barTop - 52

  return {
    barHeight,
    barTop,
    barWidth,
    restHeight,
    windowHeight,
  }
}

export const themeColor = '#1a66ff'
