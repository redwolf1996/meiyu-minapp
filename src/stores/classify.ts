export enum CatType {
  Service,
  Product,
  Card,
}

interface Classify {
  id: number | number[] | null
  storeId: number | null
  name: string | null
  type: CatType.Service | CatType.Product | CatType.Card // 0服务 1产品 2卡项
  multiple: boolean // 是否多选
}

export const curClassify = ref<Classify>({
  id: null,
  storeId: null,
  name: null,
  type: CatType.Service,
  multiple: false,
})

export function resetCurClassify() {
  Object.assign(curClassify.value, {
    id: null,
    storeId: null,
    name: null,
    type: CatType.Service,
    multiple: false,
  })
}
