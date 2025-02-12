<route lang="yaml">
style:
  navigationBarTitleText: 收支明细
</route>

<script lang="ts" setup>
import type { DetailList, IncomeDetail } from './types'

const option1 = ref<Record<string, any>[]>([
  { label: '全部', value: 0 },
  { label: '近一个月', value: 1 },
  { label: '近三个月', value: 2 },
  { label: '近半年', value: 3 },
  { label: '近一年', value: 4 },
])
const reqParams = reactive({
  storeId: storeId.value,
  pageNum: 1,
  pageSize: 10,
  timeType: 0,
})

const paging = ref<ZPagingInstance<DetailList> | null>(null)
const dataList = ref<DetailList[]>([])
const total = ref(0)
const income = ref(0)
const expend = ref(0)

async function queryList(page: number, pageSize: number) {
  reqParams.pageNum = page
  reqParams.pageSize = pageSize
  const res = await request.get<IncomeDetail>('/business/store-account-record', reqParams)
  total.value = res.data.total
  income.value = res.data.income
  expend.value = res.data.expend
  paging.value.complete(res.data.list)
}
onShow(async () => {
  search()
})

function search() {
  paging.value?.reload()
}

function handleChange1() {
  paging.value?.reload()
}
</script>

<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    lower-threshold="100" auto-show-back-to-top :default-page-size="10"
    @query="queryList"
  >
    <template #top>
      <wd-drop-menu>
        <wd-drop-menu-item v-model="reqParams.timeType" :options="option1" @change="handleChange1" />
      </wd-drop-menu>
      <view flex flex-ac flex-bt f14 c-888888 bg-white px-30rpx pb-20rpx>
        <text>收入：{{ income || 0 }}&#12288;支出：{{ expend || 0 }}</text>
        <text>共 {{ total || 0 }} 条记录</text>
      </view>
    </template>

    <template #bottom>
      <view class="h50px" />
    </template>

    <view mx-32rpx my-32rpx px-32rpx py-24rpx bg-fff rd-16rpx>
      <view py-24rpx flex flex-y gap48rpx>
        <view v-for="(item, index) in dataList" :key="`asd-${index}`" pb-32rpx style="border-bottom: 1px solid #eee;">
          <view flex flex-ac flex-bt>
            <view fs-28>
              {{ item.createTime }}
            </view>
            <view fs-34 fb>
              {{ item.type === 1 ? '+' : '-' }} {{ item.amount }}
            </view>
          </view>
          <view flex flex-ac flex-bt>
            <view f14>
              订单：{{ item.orderNo }}
            </view>
            <view fs-24 mt8rpx>
              {{ item.type === 1 ? '收入' : '支出' }}
            </view>
          </view>
        </view>

        <!-- <view pb-32rpx style="border-bottom: 1px solid #eee;">
          <view flex flex-ac flex-bt>
            <view fs-28>
              2020-12-23 12:34:01
            </view>
            <view fs-34 fb>
              -1000
            </view>
          </view>
          <view flex flex-ac flex-bt>
            <view f14>
              订单：324345566677754
            </view>
            <view fs-24 mt8rpx>
              支出
            </view>
          </view>
        </view> -->
      </view>
    </view>
  </z-paging>
</template>

<style lang='scss' scoped></style>
