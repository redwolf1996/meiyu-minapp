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

export interface CusReqModel {
  /**
   * 生日结束日期
   */
  birthdayE?: string
  /**
   * 生日开始日期
   */
  birthdayS?: string
  /**
   * =1 任意卡项；指定卡id或者卡类型是传值0
   */
  cardAll?: number | string
  /**
   * 知道卡类型，id逗号分隔（指定类型时，类型id）
   */
  cardCIds?: string
  /**
   * 指定卡，id逗号分隔（指定卡项时，卡id）
   */
  cardIds?: string
  /**
   * 成为客户结束
   */
  cDateE?: string
  /**
   * 成为客户开始
   */
  cDateS?: string
  /**
   * 姓名手机号模糊查询
   */
  keyword?: string
  /**
   * 页码，默认1，页码，默认1
   */
  pageNum?: number
  /**
   * 每页条数，默认10，每页条数，默认10
   */
  pageSize?: number
  /**
   * 手机号精确查询
   */
  phone?: string
  /**
   * 当前门店id，当前门店id
   */
  storeId: number
}

export interface CusModel {
  list: CusList[]
  total: number
}

export interface CusList {
  /**
   * 顾问门店员工id
   */
  adviserId: number
  adviserUserName: string
  /**
   * 余额
   */
  amount: number
  /**
   * 手艺人
   */
  artisanId: number
  /**
   * 手艺人名
   */
  artisanUserName: string
  /**
   * 头像
   */
  avatar: string
  /**
   * 生日
   */
  birthday: null | string
  /**
   * 客户id
   */
  customerId: number
  gender: string
  /**
   * 性别中文
   */
  genderDesc: null
  /**
   * 积分
   */
  integration: number
  lastPayTime: null | string
  /**
   * 会员
   */
  level: number
  /**
   * 门店客户姓名
   */
  name: string
  /**
   * 门店客户备注名
   */
  noteName: string
  /**
   * 门店客户手机号
   */
  phone: string
  /**
   * 门店客户id
   */
  storeCustomerId: number
}
