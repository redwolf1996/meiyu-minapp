export interface BookForm {
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
  service: Service[]
  /**
   * 服务开始时间，yyyy-MM-dd HH:mm:ss
   */
  startTime: ComputedRef<string>
  /**
   * 手机号查询到的门店客户id
   */
  storeCustomerId?: number
  /**
   * 客户姓名
   */
  storeCustomerName: string
  /**
   * 客户手机号
   */
  storeCustomerPhone: string
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
   * 优惠后金额
   */
  amount: number
  /**
   * 卡id
   */
  cardId?: number
  /**
   * 卡优惠金额
   */
  cardReduceAmount?: number
  /**
   * 用的购卡id
   */
  customerCardId?: number
  /**
   * 数量
   */
  goodsCount: number
  /**
   * 服务id
   */
  storeServiceId: number
  /**
   * 优惠前金额
   */
  totalAmount: number
  name?: string
  duration?: number
  price?: number
  price2?: number
  coverImg?: string
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
  bookingRecord: BookingRecord[]
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
  [property: string]: any
}

export interface BookingRecord {
  createBy?: number
  /**
   * 操作时间
   */
  createTime?: string
  /**
   * 操作人类型，1客户，2商家
   */
  handleType?: number
  /**
   * 操作人类别名
   */
  handleTypeDesc?: string
  id?: number
  /**
   * 类别，1创建，2签到，3完成，4取消
   */
  type?: number
  /**
   * 类别名
   */
  typeDesc?: string
  [property: string]: any
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
