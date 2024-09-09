export interface Customer {
  /**
   * 详细地址
   */
  address?: string
  /**
   * 顾问，员工列表storeStaffId
   */
  adviserId?: number | null
  /**
   * 手艺人，员工列表storeStaffId
   */
  artisanId?: number | null
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
}
