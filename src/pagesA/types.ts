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
  categoryId: number
  expires: number
  gift: number
  id: number
  name: string
  price: number
  secondType: number
  type: number
  checked?: boolean
}

export interface ProductList {
  categoryId: number
  categoryName: string
  coverImg: string
  desc: string
  id: number
  inventory: number
  isShow: number
  name: string
  price: number
  price2: number
  storeId: number
  unit: string
  checked?: boolean
  prodType?: 1 // 1产品 2服务
  [property: string]: any
}

export interface ServiceList {
  categoryId: number
  categoryName: string
  coverImg: string
  desc: string
  duration: number
  durationUnit: string
  id: number
  isShow: number
  isToDoor: number
  isToStore: number
  name: string
  payType: number
  price: number
  price2: number
  serviceColor: string
  storeId: number
  checked?: boolean
  prodType?: 2 // 1产品 2服务
  [property: string]: any
}

export interface CatsItemsTree<T> {
  id: number
  label: string
  items: T[]
}
