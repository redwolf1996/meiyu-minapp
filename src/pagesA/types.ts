export interface AllItems {
  cardCategory: CardCategory[]
  cardList: CardList[]
  productCategory: ProductCategory[]
  productList: ProductList[]
  serviceCategory: ServiceCategory[]
  serviceList: ServiceList[]
}

export interface CardCategory {
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
}

export interface ProductCategory {
  id: number
  name: string
  storeId: number
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
}

export interface ServiceCategory {
  id: number
  name: string
  storeId: number
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
}
