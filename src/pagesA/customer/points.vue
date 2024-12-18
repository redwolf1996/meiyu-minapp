<route lang="yaml">
style:
  navigationBarTitleText: 积分账单
</route>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { ListPoints } from './types'

const timeArr = ref<any[]>([dayjs().subtract(1, 'year').valueOf(), Date.now()])
const showSTime = computed(() => dayjs(timeArr.value[0]).format('YYYY-MM-DD'))
const showETime = computed(() => dayjs(timeArr.value[1]).format('YYYY-MM-DD'))

const reqParams = reactive({
  storeCustomerId: computed(() => cusPointsParams.value?.id),
  pageNum: 1,
  pageSize: 10,
  sDate: computed(() => dayjs(timeArr.value[0]).format('YYYY-MM-DD')),
  eDate: computed(() => dayjs(timeArr.value[1]).format('YYYY-MM-DD')),
})

const paging = ref<ZPagingInstance<ListPoints> | null>(null)
const dataList = ref<ListPoints[]>([])
const total = ref(0)

async function queryList(page: number, pageSize: number) {
  reqParams.pageNum = page
  reqParams.pageSize = pageSize
  const res = await request.get<ListRes<ListPoints>>('/business/store-customer/integration', reqParams)
  total.value = res.data.total
  paging.value.complete(res.data.list)
}
</script>

<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    lower-threshold="100" auto-show-back-to-top :default-page-size="10"
    @query="queryList"
  >
    <template #bottom>
      <view class="h50px" />
    </template>

    <template #top>
      <view bg-#EFF0F2 p16px flex flex-ac flex-bt>
        <view flex flex-ac gap10px>
          <wd-img
            :width="64"
            :height="64"
            :round="true"
            mode="aspectFill"
            :src="cusPointsParams.avatar"
          />
          <view h48px flex flex-y flex-bt>
            <view fs-18px>
              {{ cusPointsParams.name }}
            </view>
            <view fs-12px>
              {{ cusPointsParams.points }}&nbsp;积分
            </view>
          </view>
        </view>
        <view />
      </view>

      <view px16px bg-white py16px style="border-bottom: 1px solid #EBEBF0;">
        <wd-datetime-picker v-model="timeArr" type="date" use-default-slot>
          <view fs-14px c-#FF5A5F flex flex-ac flex-bt>
            <view>请选择日期区间</view>
            <view>
              {{ showSTime }} - {{ showETime }}
            </view>
          </view>
        </wd-datetime-picker>
      </view>
    </template>

    <view px16px bg-white>
      <view v-for="(item, index) in dataList" :key="index" class="item2" py10px>
        <view flex flex-ac flex-bt fs-16px mb5px>
          <text c-#343331>
            {{ item?.type === 1 ? '获得' : '消耗' }}积分
          </text>
          <text c-#F53F3F>
            {{ item?.type === 1 ? '+' : '-' }}{{ item?.integration }}
          </text>
        </view>
        <view fs-12px c-#9B9B9B>
          {{ item?.createTime }}
        </view>
        <view fs-12px c-#9B9B9B>
          {{ item?.orderNo }}
        </view>
      </view>
    </view>
  </z-paging>
</template>

<style lang='scss' scoped>
.item2:not(:last-child) {
  border-bottom: 1px solid #ebebf0;
}
</style>
