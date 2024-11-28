<route lang="yaml">
style:
  navigationBarTitleText: 消息
</route>

<script lang="ts" setup>
import type { List } from './types'

const tab = ref<number>(0)
const tabs = [{
  label: '全部',
  value: null,
}, {
  label: '未读',
  value: 1,
}, {
  label: '已读',
  value: 2,
}]

const reqParams = reactive({
  storeId,
  pageNum: 1,
  pageSize: 10,
  status: null, // 1未读 2已读 null全部
})
const paging = ref<ZPagingInstance<List> | null>(null)
const dataList = ref<List[]>([])

async function queryList(page: number, pageSize: number) {
  reqParams.pageNum = page
  reqParams.pageSize = pageSize
  const res = await request.get<List>('/business/notice', reqParams)
  paging.value.complete(res.data.list)
}

onShow(async () => {
  search()
})

function search() {
  paging.value?.reload()
}

function handleClick({ index }) {
  reqParams.status = tabs[index].value
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
      <wd-tabs v-model="tab" :swipeable="true" @click="handleClick">
        <block v-for="item in tabs" :key="item.value">
          <wd-tab :title="item.label" />
        </block>
      </wd-tabs>
    </template>

    <template #bottom>
      <view class="h50px" />
    </template>

    <view p-32rpx>
      <template v-for="item in dataList" :key="item.id">
        <MsgClock v-if="item.noticeType === 2" :data="item" />
        <MsgRing :data="item" />
      </template>
    </view>
  </z-paging>
</template>

<style lang='scss' scoped>
</style>
