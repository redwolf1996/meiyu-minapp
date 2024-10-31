import type { CusList } from '@/pagesA/tabs/types'
import type { BillModel } from '@/pagesA/billing/types'

/** 当前选中的客户 */
export const curCustomer = ref<CusList>(null)

/** 当前待支付的开单 */
export const curBilling = ref<BillModel>(null)
