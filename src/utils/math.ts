import Big from 'big.js'

// ----------- 精确计算封装 -------------------

/**
 * 加法：四舍五入保留2位有效数据
 */
export function func_add(a, b, scale = 2) {
  if (!a)
    a = 0
  if (!b)
    b = 0
  return Number(new Big(a).add(b).toFixed(scale))
}

/**
 * 减法：四舍五入保留2位有效数据
 */
export function func_sub(a, b, scale = 2) {
  if (!a)
    a = 0
  if (!b)
    b = 0
  return Number(new Big(a).sub(b).toFixed(scale))
}

/**
 * 乘法：四舍五入保留2位有效数据
 */
export function func_mul(a, b, scale = 2) {
  if (!a)
    a = 0
  if (!b)
    b = 0
  return Number(new Big(a).mul(b).toFixed(scale))
}

/**
 * 除法：四舍五入保留2位有效数据
 */
export function func_div(a, b, scale = 2) {
  if (!b)
    return Number(0)
  if (!a)
    a = 0
  return Number(new Big(a).div(b).toFixed(scale))
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
