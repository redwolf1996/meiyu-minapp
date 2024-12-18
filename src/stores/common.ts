import type { CusList } from '@/pagesA/tabs/types'
import type { BillModel } from '@/pagesA/billing/types'
import type { AvailableCard, CardList } from '@/pagesA/types'
import type { List as MsgDetail } from '@/pagesA/msg/types'
import type { MakeCardModel } from '@/pagesA/card/types'
import pinia from '@/stores/index'
import { useUserStore } from '@/stores/modules/user'

/** 当前选中的客户 */
export const curCustomer = ref<Partial<CusList>>(null)

/** 当前待支付的开单 */
export const curBilling = ref<BillModel>(null)

/** 当前选中的卡项 */
export const curSelectedCard = ref<CardList>(null)

/** 当前选中的需要充值的充值卡 */
export const curSelectedCardToCash = ref<AvailableCard>(null)

/** 当前在读的消息详情 */
export const storeMsgDetail = ref<MsgDetail>(null)

/**
 * 当前选中的开卡充值类型
 * 1: '折扣卡'
 * 2: '充值卡'
 * 3: '通卡'
 * 4: '有限次卡'
 * 5: '不限次卡'
 * 6: '充值'
 */
export const curCardRechargeType = ref<number>(null)

/** 当前待提交的开卡充值表单数据 */
export const curCardRechargeFormData = ref<MakeCardModel>(null)

export const storeId = computed(() => {
  return useUserStore(pinia).userInfo?.lastStoreId || useUserStore(pinia).userInfo?.storeList?.[0]?.storeId || null
})

export const cusPointsParams = ref<{
  id: number | string
  name: number | string
  avatar: string
  points: number | string
}>(null)
