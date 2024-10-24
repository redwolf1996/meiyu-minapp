import pinia from '@/stores/index'
import { useUserStore } from '@/stores/modules/user'
import dayjs from 'dayjs'

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

export interface Times {
  selected: boolean
  disabled: boolean
  value: string
}

export function get24HoursQuarter(): Times[] {
  const times: Times[] = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedHour = hour.toString().padStart(2, '0')
      const formattedMinute = minute.toString().padStart(2, '0')
      times.push(
        {
          selected: false,
          disabled: false,
          value: `${formattedHour}:${formattedMinute}`,
        },
      )
    }
  }
  return times
}

export function safeBottom() {
  return uni.getSystemInfoSync().safeAreaInsets?.bottom
}

export function getStoreId() {
  const lastStoreId = useUserStore(pinia).userInfo?.lastStoreId
  // TODO [0]前面不加问号会导致一个大坑=》在开发者工具上不报错，到了真机调试的时候各种报错
  const firstStoreId = useUserStore(pinia).userInfo?.storeList?.[0]?.storeId
  if (lastStoreId !== 0)
    return lastStoreId
  if (firstStoreId)
    return firstStoreId
  return 0
}

export const storeId = getStoreId()

export const uniPlatform = uni.getSystemInfoSync().uniPlatform
export const isH5 = uniPlatform === 'web'

export function fd(tag: number | string, smb: string = '-') {
  if (!tag)
    return '--'
  return dayjs(tag).format(`YYYY${smb}MM${smb}DD`)
}

export function fdt(tag: number | string, smb: string = '-') {
  if (!tag)
    return '--'
  return dayjs(tag).format(`YYYY${smb}MM${smb}DD HH:mm`)
}

export function calculateEndTime(startTime: string, duration: number | string) {
  if (!startTime || !duration)
    return ''
  // 将开始时间转换为Date对象
  const startDate = new Date(`1970-01-01T${startTime}:00`)

  // 将持续时长（分钟）转换为毫秒
  const durationMs = Number(duration) * 60 * 1000

  // 计算结束时间
  const endDate = new Date(startDate.getTime() + durationMs)

  // 将结束时间转换为字符串格式
  const endTime = endDate.toTimeString().split(' ')[0]

  // 将结束时间格式化为hh:mm格式
  const formattedEndTime = endTime.replace(/^(\d{2}):(\d{2}):(\d{2})$/, '$1:$2')

  return formattedEndTime
}

/**
 * 休眠函数
 * @param ms 延迟毫秒数
 * @returns Promise
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
