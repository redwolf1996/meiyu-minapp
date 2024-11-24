import type { BookingList } from './types'

// const arr = [
//   { id: 3, startTimeStr: '09:00-12:00' },
//   { id: 6, startTimeStr: '16:00-18:00' },
//   { id: 1, startTimeStr: '07:00-09:00' },
//   { id: 4, startTimeStr: '13:00-14:00' },
//   { id: 2, startTimeStr: '08:30-11:00' },
//   { id: 5, startTimeStr: '15:30-16:30' },
// ]

// 将时间转换为方便比较的数字 1分钟 = 2像素
function sNumber(timeScope) {
  return timeToMinutes(timeScope.split('-')[0]) * 2
}
function eNumber(timeScope) {
  return timeToMinutes(timeScope.split('-')[1]) * 2
}

function timeToMinutes(timeStr) {
  // 将时间字符串拆分为小时和分钟
  const [hours, minutes] = timeStr.split(':').map(Number)
  // 计算总分钟数
  const totalMinutes = hours * 60 + minutes
  return totalMinutes
}

function getSortedArr(arr: BookingList[]) {
  // 按时间范围排序
  const sortedArr = arr.sort((a, b) => sNumber(a.startTimeStr) - sNumber(b.startTimeStr)).map((v) => {
    return {
      ...v,
      start: sNumber(v.startTimeStr),
      end: eNumber(v.startTimeStr),
      top: sNumber(v.startTimeStr),
      height: eNumber(v.startTimeStr) - sNumber(v.startTimeStr),
    }
  })

  return sortedArr
}

export function getFinalArr(arr: BookingList[]) {
  const sortedArr = getSortedArr(arr)
  let index = 0
  const finalArr: any = []
  sortedArr.map((item, idx) => {
    if (idx > 0) {
      if (item.start >= sortedArr[idx - 1].start && item.start <= sortedArr[idx - 1].end) {
        if (!finalArr[index]) {
          finalArr[index] = [item]
        }
        else {
          finalArr[index].push(item)
        }
      }
      else {
        index++
        finalArr[index] = [item]
      }
    }
    else {
      finalArr[index] = [item]
    }
  })

  return finalArr
}
