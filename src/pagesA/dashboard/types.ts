export interface Wallet {
  /**
   * 冻结
   */
  frozenAmount: number
  /**
   * 可提现余额
   */
  platformAmount: number
  /**
   * 累计收入
   */
  totalAmount: number
  /**
   * 已提现
   */
  withdrawAmount: number
}
