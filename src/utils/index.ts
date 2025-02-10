import type { StaffModel } from '@/pagesA/api'
import type { UserInfo } from '@/stores/modules/user'
import dayjs from 'dayjs'
import { max, min, reject } from 'lodash-es'

const envVersion = import.meta.env.VITE_ENV_VERSION
export const IMG_BASE = import.meta.env.VITE_APP_IMG_BASE
export const DEFAULT_AVATAR = `${IMG_BASE}/avatar-default.png`

const makeLog = 1
export function logReqInfo(url, params) {
  if (envVersion === 'develop' && makeLog)
    console.log(url, params)
}

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

/**
 * 获取卡项服务折扣的范围 如6-9折
 */
export function getDiscounts(itm: any) {
  if (!itm?.info?.length)
    return '--'
  const arr = itm.info?.map((v) => {
    return v.equity
  })
  if (arr.length === 1)
    return arr[0]
  else
    return `${min(arr)}-${max(arr)}`
}

/**
 * 格式化消息推送的时间: 如果是当天显示时分，否则显示月日
 */
export function formatMsgTimeShow(timestr: string) {
  const inputDate = dayjs(timestr)
  const today = dayjs()

  const isToday = inputDate.isSame(today, 'day')

  return isToday
    ? inputDate.format('HH:mm')
    : inputDate.format('MM-DD')
}

/**
 * 设置员工列表，用于表单选择手艺人、销售等
 */
export async function setStaffList() {
  const res = await request.get<StaffModel>('/business/staff', { storeId: storeId.value })
  const artList = res.data.list?.filter(v => v.jobCode.includes('2'))
  const salesList = res.data.list?.filter(v => v.jobCode.includes('3'))
  artistListStore.value = artList?.map((v) => {
    return { label: v.userName, value: v.storeStaffId }
  })
  salesListStore.value = salesList?.map((v) => {
    return { label: v.userName, value: v.storeStaffId }
  })
  staffListStore.value = artList?.map((v) => {
    return { label: v.userName, value: v.storeStaffId }
  })
}

/**
 * 设置user基础信息
 */
export async function setUserBaseInfo() {
  const res = await request.get<UserInfo>('/business/info')
  useUserStore().setUserInfo(res.data)
}

/**
 * 营业时间为15分钟的整数倍
 */
export function filter15Minutes(type, values) {
  if (type === 'minute') {
    return values.filter(value => value % 15 === 0)
  }
  return values
}

/**
 * 返回给定开始时间和结束时间之间的数组，每15分钟一个
 */
export function generateTimeSlots(startTime: string, endTime: string) {
  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
  }

  const formatTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60)
    const mins = totalMinutes % 60
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
  }

  const start = parseTime(startTime)
  const end = parseTime(endTime)
  const timeSlots: Times[] = []

  if (start >= end)
    return timeSlots // 处理无效输入

  for (let current = start; current < end; current += 15) { // 修改循环条件
    timeSlots.push({
      selected: false,
      disabled: false,
      value: formatTime(current),
    })
  }
  return timeSlots
}

/**
 * 判断时间是否超出范围
 * mode: 1 表示判断是否超出结束时间，2 表示判断是否超出中间某一段的结束时间
 */
export function isTimeExceeding(startTime, endTime, durationMinutes, mode = 1) {
  // 将时间字符串转换为分钟数
  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
  }

  const start = parseTime(startTime)
  const end = parseTime(endTime)
  const totalMinutes = start + durationMinutes

  // 判断是否跨天
  const isCrossDay = totalMinutes >= 1440 // 1440 分钟 = 24 小时

  // 如果跨天，直接算作超出
  if (isCrossDay) {
    return true
  }

  // 如果不跨天，判断是否超出结束时间
  if (end < start) {
    // 如果结束时间小于开始时间（跨天场景），需要额外判断
    return mode === 1
      ? totalMinutes >= end && totalMinutes < start
      : totalMinutes > end && totalMinutes < start
  }
  else {
    // 正常情况，直接比较
    return totalMinutes >= end
  }
}

/**
 * 将数组分组，每组包含连续的数字
 */
export function groupSortedConsecutive(arr) {
  if (arr.length === 0)
    return []

  // 先创建副本再排序，避免修改原数组
  const sortedArr = arr.slice().sort((a, b) => a - b)
  const result = []
  let currentGroup = [sortedArr[0]]

  for (let i = 1; i < sortedArr.length; i++) {
    // 判断当前元素与前一个元素的差值是否为1
    if (sortedArr[i] - sortedArr[i - 1] === 1) {
      currentGroup.push(sortedArr[i])
    }
    else {
      result.push(currentGroup)
      currentGroup = [sortedArr[i]]
    }
  }
  result.push(currentGroup)

  return result
}

/**
 * 生成两个数之间的数值的数组
 */
export function generateArray(start, end) {
  const result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}
