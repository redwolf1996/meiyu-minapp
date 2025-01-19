import type { PayModeEnum } from '@/utils/consts'

export interface GrigSelectItem {
  label: string
  value: number | string | null
  isActive: boolean
  disabled?: boolean
}

export interface GeneralColumn {
  label: string
  value: number | string | null
  isActive?: boolean
  disabled?: boolean
  [property: string]: any
}

/**
 * 服务、产品、卡项分类
 */
export interface CatItem {
  /**
   * 分类id
   */
  id: number
  /**
   * 分类名
   */
  name: string
  /**
   * 门店id
   */
  storeId: number
  /**
   * 是否选中
   */
  checked?: boolean
}
