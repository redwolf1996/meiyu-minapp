const arr = [
  { id: 3, timeScope: '09:00-12:00' },
  { id: 6, timeScope: '16:00-18:00' },
  { id: 1, timeScope: '07:00-09:00' },
  { id: 4, timeScope: '13:00-14:00' },
  { id: 2, timeScope: '08:30-11:00' },
  { id: 5, timeScope: '15:30-16:30' },
]

// 将时间转换为方便比较的数字
function sNumber(timeScope) {
  return Number.parseInt(timeScope.split('-')[0].replace(':', ''))
}
function eNumber(timeScope) {
  return Number.parseInt(timeScope.split('-')[1].replace(':', ''))
}

// 按时间范围排序
const sortedArr = arr.sort((a, b) => sNumber(a.timeScope) - sNumber(b.timeScope)).map((v) => {
  return {
    ...v,
    start: sNumber(v.timeScope),
    end: eNumber(v.timeScope),
  }
})

let index = 0
const finalArr: any = []
function dealSortedArr() {
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
}

dealSortedArr()
