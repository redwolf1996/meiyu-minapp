export enum CatType {
  Service,
  Product,
  Card,
}

interface Classify {
  id: number | number[] | null
  storeId: number | null
  name: string | null
  type: CatType.Service | CatType.Product | CatType.Card // 1服务 2产品 3卡项
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
    type: 0,
    multiple: false,
  })
}
