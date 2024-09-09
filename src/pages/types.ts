export interface DashBoardData {
  /**
   * 当天收入
   */
  currentDayIncome: number
  /**
   * 本月预约量
   */
  currentMonthBooking: number
  /**
   * 当月卡充值
   */
  currentMonthCardIncome: number
  /**
   * 当月支出
   */
  currentMonthDisburse: number
  /**
   * 当月收入
   */
  currentMonthIncome: number
  /**
   * 客户数
   */
  customerCount: number
  orgExpiresTime: string
  /**
   * 今日预约
   */
  todayBookingList: any[]
  /**
   * vip客户数
   */
  vipCustomerCount: number
  waitCount: number
}
