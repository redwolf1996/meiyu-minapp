<route lang="yaml">
style:
  navigationBarTitleText: 我的邀请
</route>

<script lang="ts" setup>
import type { List } from './types'

const reqParams = reactive({
  storeId: storeId.value,
  pageNum: 1,
  pageSize: 10,
})
const paging = ref<ZPagingInstance<List> | null>(null)
const dataList = ref<List[]>([])
const total = ref(0)
const totalDays = ref(0)

async function queryList(page: number, pageSize: number) {
  reqParams.pageNum = page
  reqParams.pageSize = pageSize
  const res = await request.get<any>('/business/invite-record', reqParams)
  total.value = res.data.total
  totalDays.value = +res.data.accumulate
  paging.value.complete(res.data.list)
}

uni.showShareMenu({
  withShareTicket: true,
  menus: ['shareAppMessage', 'shareTimeline'],
})

onShareAppMessage((res) => {
  if (res.from === 'button') {
    // 来自页面内分享按
    return {
      title: '美预',
      path: `/pagesA/tabs/tab-business-dashboard`,
      // imageUrl: '',
    }
  }
  else {
    return {
      title: '美预',
      path: `/pagesA/tabs/tab-business-dashboard`,
      // imageUrl: '',
    }
  }
})

onShareTimeline(() => {
  return {
    title: '美预',
    // query: `share=${state.share}`, // 可不填 传递的参数，只能是这种格式
    // imageUrl: urlImg,
  }
})

onShow(() => {
  paging.value?.reload()
})
</script>

<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    lower-threshold="100" auto-show-back-to-top :default-page-size="10"
    @query="queryList"
  >
    <template #top>
      <view flex flex-bt flex-ac c-888888 f14 px16px py8px bg-white>
        <text>累积奖励：{{ totalDays }} 天</text>
        <text>共{{ total }}条记录</text>
      </view>
    </template>

    <template #bottom>
      <view class="h50px" />
    </template>

    <view v-if="dataList.length" px16px py26px>
      <view px16px py12px bg-white>
        <view v-for="item in dataList" :key="item.id" py12px>
          <view flex flex-ac flex-bt>
            <view c-434343>
              {{ fdt(item.createTime) }}
            </view>
            <view>+ {{ item.days }}天</view>
          </view>
          <view flex flex-ac flex-bt mt4px>
            <view>{{ item.businessPhone }}</view>
            <view c-00C777>
              {{ item.status }}
            </view>
          </view>
        </view>
        <!-- <view py12px>
          <view flex flex-ac flex-bt>
            <view c-434343>
              2024-12-17 12:34:01
            </view>
            <view>+ 1个月</view>
          </view>
          <view flex flex-ac flex-bt mt4px>
            <view>158****7527</view>
            <view c-00C777>
              已完成
            </view>
          </view>
        </view> -->
      </view>
    </view>
  </z-paging>
</template>

<style lang='scss' scoped></style>
