export interface Customer {
  /**
   * 详细地址
   */
  address?: string
  /**
   * 顾问，员工列表storeStaffId
   */
  adviserId?: number | null | ''
  /**
   * 手艺人，员工列表storeStaffId
   */
  artisanId?: number | null | ''
  /**
   * 头像
   */
  avatar?: string
  /**
   * 生日
   */
  birthday?: string
  /**
   * 市
   */
  city?: string
  /**
   * 区
   */
  county?: string
  /**
   * 性别，0->未知；1->男；2->女
   */
  gender: number
  /**
   * 会员等级，1->普通客户，2->vip客户
   */
  level?: number
  /**
   * 姓名，名称
   */
  name: string
  /**
   * 备注名
   */
  noteName?: string
  /**
   * 备注
   */
  notes?: string
  /**
   * 手机号
   */
  phone: string
  /**
   * 省
   */
  province?: string
  /**
   * 来源，ON_LINE(1,"线上"),     OFFLINE(2,"线下"),     INTRODUCE(3,"转介绍"),
   * WALK_IN(4,"walk-in"),     OTHER(5,"其他"),;
   */
  source?: number
  /**
   * 当前门店id，当前门店id
   */
  storeId: number
  /**
   * 微信
   */
  wechatCode?: string
  id?: string | number | null
}

export interface CustomerDetail {
  /**
   * 地址
   */
  address: string
  /**
   * 顾问
   */
  adviserId: number
  /**
   * 顾问姓名
   */
  adviserName: string
  /**
   * 余额
   */
  amount: number
  /**
   * 手艺人
   */
  artisanId: number
  /**
   * 手艺人姓名
   */
  artisanName: string
  /**
   * 头像
   */
  avatar: string
  birthday: string
  /**
   * 购卡数
   */
  cardC: number
  /**
   * 市
   */
  city: string
  /**
   * 区
   */
  county: string
  createBy: number
  createTime: string
  /**
   * 客户id
   */
  customerId: number
  /**
   * 消费次数
   */
  expendC: number
  /**
   * 性别，1男，2女，0未知
   */
  gender: string
  /**
   * 累计消费
   */
  historyExpend: number
  /**
   * 累计获取积分
   */
  historyIntegration: number
  /**
   * 店铺客户id
   */
  id: number
  /**
   * 可用积分
   */
  integration: number
  lastPayTime: string
  /**
   * 会员等级，1->普通客户，2->vip客户
   */
  level: string | number
  /**
   * 姓名
   */
  name: string
  /**
   * 备注名
   */
  noteName: string
  /**
   * 备注
   */
  notes: string
  orgId: number
  /**
   * 手机号
   */
  phone: string
  /**
   * 省
   */
  province: string
  /**
   * 来源
   */
  source: string
  /**
   * 店铺
   */
  storeId: number
  updateBy: number
  updateTime: string
  /**
   * 微信
   */
  wechatCode: string
}

export interface ListPoints {
  /**
   * 时间
   */
  createTime: string
  customerId: number
  id: number
  /**
   * 积分数
   */
  integration: number
  notes: string
  orderId: number
  /**
   * 订单类别
   */
  orderNo: string
  /**
   * 订单支付状态
   */
  orderPayStatus: number
  orgId: number
  /**
   * 门店客户id
   */
  storeCustomerId: number
  storeId: number
  /**
   * 类别，1得到，2扣除
   */
  type: number
}
