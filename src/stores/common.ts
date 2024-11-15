import type { CusList } from '@/pagesA/tabs/types'
import type { BillModel } from '@/pagesA/billing/types'
import type { CardList } from '@/pagesA/types'

/** 当前选中的客户 */
export const curCustomer = ref<CusList>(null)

/** 当前待支付的开单 */
export const curBilling = ref<BillModel>(null)

/** 当前选中的卡项 */
export const curSelectedCard = ref<CardList>(null)
