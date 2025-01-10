export interface BookForm {
  /**
   * 上门服务地址
   */
  customerAddress?: string | null
  /**
   * 分配的手艺人
   */
  artisanId: number
  /**
   * 储值卡id，储值卡支付时必填
   */
  customerCardId?: number
  /**
   * 备注
   */
  notes: string
  /**
   * 支付方式，立即支付时必填
   */
  payType: number
  /**
   * 预约的服务列表
   */
  service: Partial<Service>[]
  /**
   * 支付总金额
   */
  amount?: number | ComputedRef<number>
  /**
   * 服务开始时间，yyyy-MM-dd HH:mm:ss
   */
  startTime: ComputedRef<string>
  /**
   * 手机号查询到的门店客户id
   */
  storeCustomerId?: any
  /**
   * 客户姓名
   */
  storeCustomerName: any
  /**
   * 客户手机号
   */
  storeCustomerPhone: any
  /**
   * 当前门店id，当前门店id
   */
  storeId: number
  /**
   * 服务类型，1到店，2上门
   */
  storeServiceType: number
}

export interface Service {
  /**
   * 上门服务地址
   */
  customerAddress?: string | null
  /**
   * 卡id
   */
  cardId?: number
  /**
   * 用的购卡id
   */
  customerCardId?: number
  /**
   * 数量
   */
  goodsCount?: number
  /**
   * 服务id
   */
  storeServiceId?: number
  /**
   * 优惠前总金额
   */
  totalAmount?: number | ComputedRef<number>
  /**
   * 使用卡项优惠(扣减)金额
   */
  cardReduceAmount?: number | ComputedRef<number>
  /**
   * 服务优惠后总金额
   */
  amount?: number | ComputedRef<number>
  /**
   * 选择卡项并有优惠时候显示的名字 例: xxx卡项 -1次
   */
  cardShowName?: string
  cardName?: string // 卡项名称
  /**
   * 卡类别 1->次卡，2->充值卡，3->折扣卡
   */
  cardType?: number
  /**
   * 卡二级分类，次卡 0非次卡，1->有限次卡，2->不限次卡，3->通卡
   */
  cardSecondType?: number
  name?: string
  duration?: number
  price?: number
  price2?: number
  coverImg?: string
  [property: string]: any
}

export interface BookDetail {
  /**
   * 手艺人，0表示未分配
   */
  artisanId: number
  /**
   * 手艺人
   */
  artisanName: string
  /**
   * 预约操作记录
   */
  bookingRecord: BookingRecord
  /**
   * 预约的服务列表
   */
  bookingService: BookingService[]
  /**
   * 地址
   */
  customerAddress: string
  /**
   * 客户id
   */
  customerId: number
  /**
   * 卡数量
   */
  customerCardC: number
  /**
   * 备注
   */
  notes: string
  /**
   * 预约开始时间
   */
  startTime: string
  /**
   * 客户头像
   */
  storeCustomerAvatar: string
  /**
   * 门店客户id
   */
  storeCustomerId: number
  /**
   * 客户名
   */
  storeCustomerName: string
  /**
   * 客户名拼音
   */
  storeCustomerNamePY: string
  /**
   * 门店客户手机号
   */
  storeCustomerPhone: string
  /**
   * 门店名
   */
  storeName: string
  /**
   * 服务类型：1到店 2上门
   */
  storeServiceType: number
  storeServiceTypeDesc: string
  /**
   * 预约状态：1待服务 2服务中 3已完成 4已取消
   */
  bookingStatus: number
  /**
   * 预约单的订单号
   */
  orderId: number
  /**
   * 预约单号
   */
  bookingId?: number
  [property: string]: any
}

export interface BookingRecord {
  /**
   * 取消人
   */
  cancelHandleType: number
  cancelHandleTypeDesc: string
  /**
   * 取消时间
   */
  cancelTime: string
  /**
   * 创建人
   */
  createBy: string
  /**
   * 创建人类型
   */
  createHandleType: number
  /**
   * 创建人类型
   */
  createHandleTypeDesc: string
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 完成人
   */
  finishHandleType: number
  finishHandleTypeDesc: string
  /**
   * 完成时间
   */
  finishTime: string
  /**
   * 签到人
   */
  signHandleType: number
  signHandleTypeDesc: string
  /**
   * 签到时间
   */
  signTime: string
}

export interface BookingService {
  /**
   * 金额
   */
  amount: number
  /**
   * 数量
   */
  count: number
  /**
   * 时长分钟
   */
  duration: number
  /**
   * 服务头图
   */
  serviceCoverImg: string
  /**
   * 服务名
   */
  serviceName: string
  /**
   * 服务id
   */
  storeServiceId: number
  [property: string]: any
}

export interface TimeOccupy {
  /**
   * 手艺人id
   */
  artisanId: number
  /**
   * 日期
   */
  currentDate: string
  /**
   * 时长
   */
  duration: number
  /**
   * 占用时段格子index
   */
  employIndex: number[]
  /**
   * 开始时间
   */
  startTime: string
  [property: string]: any
}
