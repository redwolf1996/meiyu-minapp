import Big from 'big.js'

// ----------- 精确计算封装 -------------------
export function get2(num: number) {
  return Math.floor(num * 100) / 100
}

/**
 * 加法：舍去法保留2位有效数据
 */
export function func_add(a, b) {
  if (!a)
    a = 0
  if (!b)
    b = 0
  return get2(Number(new Big(a).add(b)))
}

/**
 * 减法：舍去法保留2位有效数据
 */
export function func_sub(a, b) {
  if (!a)
    a = 0
  if (!b)
    b = 0
  return get2(Number(new Big(a).sub(b)))
}

/**
 * 乘法：舍去法保留2位有效数据
 */
export function func_mul(a, b) {
  if (!a)
    a = 0
  if (!b)
    b = 0
  return get2(Number(new Big(a).mul(b)))
}

/**
 * 除法：舍去法保留2位有效数据
 */
export function func_div(a, b) {
  if (!b)
    return Number(0)
  if (!a)
    a = 0
  return get2(Number(new Big(a).div(b)))
}

/**
 * 数组所有数相加
 */
export function sumArray(arr, scale = 2) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum = Number(func_add(sum, arr[i], scale))
  }
  return sum
}
