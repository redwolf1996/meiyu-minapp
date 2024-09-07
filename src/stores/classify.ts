export enum CatType {
  Service,
  Product,
  Card,
}

interface Classify {
  id: number
  storeId: number
  name: string
  type: CatType.Service | CatType.Product | CatType.Card // 1服务 2产品 3卡项
}

export const curClassify = ref<Classify>({
  id: null,
  storeId: null,
  name: null,
  type: 0,
})

export function resetCurClassify() {
  Object.assign(curClassify.value, {
    id: null,
    storeId: null,
    name: null,
  })
}
