import type { Service } from '@/pagesA/book/types'

interface BookTempInfo {
  /**
   * 上门服务地址
   */
  customerAddress?: string | null
  /**
   * 分配的手艺人
   */
  artisanId?: number
  /**
   * 储值卡id，储值卡支付时必填
   */
  customerCardId?: number
  /**
   * 备注
   */
  notes?: string
  /**
   * 支付方式，立即支付时必填
   */
  payType?: number
  /**
   * 预约的服务列表
   */
  service?: Service[]
  /**
   * 服务开始时间，yyyy-MM-dd HH:mm:ss
   */
  startTime?: ComputedRef<string>
  /**
   * 手机号查询到的门店客户id
   */
  storeCustomerId?: number
  /**
   * 客户姓名
   */
  storeCustomerName?: string
  /**
   * 客户手机号
   */
  storeCustomerPhone?: string
  /**
   * 当前门店id，当前门店id
   */
  storeId?: number
  /**
   * 服务类型，1到店，2上门
   */
  storeServiceType?: number
  /**
   * 手艺人
   */
  artName?: string
  bookId?: number
  amount?: number
  [property: string]: any
}

export const bookInfo = ref<Partial<BookTempInfo>>({
  bookId: null,
  artisanId: null,
  artName: null,
  service: [],
  amount: 0,
})
