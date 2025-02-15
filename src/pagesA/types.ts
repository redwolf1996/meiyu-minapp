export interface AllItems {
  cardCategory: Category[]
  cardList: CardList[]
  productCategory: Category[]
  productList: ProductList[]
  serviceCategory: Category[]
  serviceList: ServiceList[]
}

export interface Category {
  id: number
  name: string
  storeId: number
}

export interface CardList {
  id: number
  /**
   * 卡类型 1->次卡，2->充值卡，3->折扣卡
   */
  type: 1 | 2 | 3
  secondType: number
  gift: number
  name: string
  categoryId: number
  price: number
  expires: number
  countLimit?: number
  isShow?: boolean
  totalCount?: number
  discount?: number
  info?: Info[]
  checked?: boolean
  disabled?: boolean
}

export interface Info {
  cardId: number
  equity: number
  price: number
  price2: number
  productId: number
  productName: string
  serviceId: number
  serviceName: string
  [property: string]: any
}

export interface ProductList {
  categoryId?: number
  categoryName?: string
  coverImg?: string
  desc?: string
  id?: number
  inventory?: number
  isShow?: number
  name?: string
  price?: number
  price2?: number
  storeId?: number
  unit?: string
  checked?: boolean
  disabled?: boolean
  prodType?: 2 // 1服务 2产品
  /**
   * 购买的数量
   */
  goodsCount?: any
  /**
   * 次卡表示数量，折扣充值卡表示折扣1.0-10.0
   */
  equity?: any
  /**
   * 服务优惠前总价
   */
  totalAmount?: any
  /**
   * 服务优惠后总价
   */
  amount?: any
  /**
   * 使用卡项时 卡项优惠(扣减)的金额
   */
  cardReduceAmount?: any
  /**
   * 使用卡项时 卡项展示的名称 例如：洗发次卡 -1次
   */
  cardShowName?: any
  [property: string]: any
}

export interface ServiceList {
  categoryId?: number
  categoryName?: string
  coverImg?: string
  desc?: string
  duration?: number
  durationUnit?: string
  id?: number
  isShow?: number
  isToDoor?: number
  isToStore?: number
  name?: string
  payType?: number
  price?: number
  price2?: number
  serviceColor?: string
  storeId?: number
  checked?: boolean
  disabled?: boolean
  prodType?: 1 // 1服务 2产品
  /**
   * 购买的数量
   */
  goodsCount?: any
  /**
   * 次卡表示数量，折扣充值卡表示折扣1.0-10.0
   */
  equity?: any
  /**
   * 服务优惠前总价
   */
  totalAmount?: any
  /**
   * 服务优惠后总价
   */
  amount?: any
  /**
   * 使用卡项时 卡项优惠(扣减)的金额
   */
  cardReduceAmount?: any
  /**
   * 使用卡项时 卡项展示的名称 例如：洗发次卡 -1次
   */
  cardShowName?: any
  [property: string]: any
}

export interface CatsItemsTree<T> {
  id: number
  label: string
  items: T[]
}

export interface AvailableCard {
  amount: number
  /**
   * 卡id
   */
  cardId: number
  /**
   * 卡名称
   */
  cardName: string
  /**
   * 卡二级分类，次卡 0非次卡，1->有限次卡，2->不限次卡，3->通卡
   */
  cardSecondType?: number
  /**
   * 卡类别 1->次卡，2->充值卡，3->折扣卡
   */
  cardType?: number
  cardTypeDesc: string
  /**
   * 共用次数上限，无限次通卡
   */
  countLimit: number
  /**
   * 购卡id
   */
  customerCardId: number
  /**
   * 次卡表示数量，折扣充值卡表示折扣1.0-10.0
   */
  equity: number
  /**
   * 有效期结束
   */
  expiresTime: string
  expiresTimeDesc: string
  gift: number
  /**
   * 商品id
   */
  goodsId: number
  /**
   * 商品名
   */
  goodsName: string
  /**
   * 商品类型，1服务 2产品 3卡 4预约
   */
  goodsType: number
  /**
   * 是否长期有效
   */
  isLongTerm: number
  /**
   * 是否可用
   */
  isValid: number
  /**
   * 不可用原因
   */
  reason: string
  /**
   * 有效期开始
   */
  startTime: string
  /**
   * 储值卡总可用金额
   */
  totalAmount: number
  [property: string]: any
}

/**
 * 上一页面
 * billing：开单
 * card：卡项设置
 * equity：修改卡项权益
 */
export type FromType = 'billing' | 'card' | 'equity'
