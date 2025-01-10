import type { CusList } from '@/pagesA/tabs/types'
import type { BillModel, PayRefundType } from '@/pagesA/billing/types'
import type { AvailableCard, CardList, ProductList, ServiceList } from '@/pagesA/types'
import type { List as MsgDetail } from '@/pagesA/msg/types'
import type { CardEquity, MakeCardModel } from '@/pagesA/card/types'
import pinia from '@/stores/index'
import { useUserStore } from '@/stores/modules/user'
import type { GeneralColumn } from '@/types'

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

/** 当前选中的门店id */
export const storeId = computed(() => {
  return useUserStore(pinia).userInfo?.lastStore?.storeId || null
})

/** 当前积分查询参数 */
export const cusPointsParams = ref<{
  id: number | string
  name: number | string
  avatar: string
  points: number | string
}>(null)

export interface WeekTime {
  weekCode: number
  startTime: string
  endTime: string
}

/** 员工日程 */
export const staffScheduling = ref<WeekTime[]>([])

/** 当前选中的服务列表 */
export const checkedServs = ref<Partial<ServiceList>[]>([])

/** 当前选中的产品列表 */
export const checkedProds = ref<Partial<ProductList>[]>([])

/** 当前购卡详情权益 */
export const cusOriCardEquity = ref<Partial<CardEquity>[]>([])

/** 重置选项卡产品服务选项卡内容 */
export function resetGoods() {
  checkedProds.value = []
  checkedServs.value = []
  cusOriCardEquity.value = []
}

/** 重置选项卡开卡充值选项卡内容 */
export function resetCards() {
  curSelectedCard.value = null
  curSelectedCardToCash.value = null
}

/** 手艺人列表 */
export const artistListStore = ref<GeneralColumn[]>([])

/** 销售列表 */
export const salesListStore = ref<GeneralColumn[]>([])

/** 所有员工列表 */
export const staffListStore = ref<GeneralColumn[]>([])

/** 付款方式列表 */
export const payTypesStore = ref<PayRefundType['payType']>([])

/** 退款方式列表 */
export const refundTypesStore = ref<PayRefundType['refundType']>([])
