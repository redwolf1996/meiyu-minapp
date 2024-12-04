<route lang="yaml">
style:
  navigationBarTitleText: 订单列表
</route>

<script lang="ts" setup>
import type { List } from './types'

const valMap = [null, 101, 103, 104]
const tabs = [{
  label: '全部',
  value: 0,
}, {
  label: '待支付',
  value: 1,
}, {
  label: '已完成',
  value: 2,
}, {
  label: '已取消',
  value: 3,
}]
const tab = ref(0)
const reqParams = reactive({
  storeId: storeId.value,
  pageNum: 1,
  pageSize: 10,
  searchStatus: computed(() => valMap[tab.value]),
})
const paging = ref<ZPagingInstance<List> | null>(null)
const dataList = ref<List[]>([])

function toOrderDetail(id) {
  uni.navigateTo({
    url: `/pagesA/order/detail?id=${id}`,
  })
}

async function queryList(page: number, pageSize: number) {
  reqParams.pageNum = page
  reqParams.pageSize = pageSize
  const res = await request.get<ListRes<List>>('/business/order', reqParams)
  paging.value.complete(res.data.list)
}

onShow(async () => {
  search()
})

function search() {
  paging.value?.reload()
}

async function handleClick({ index }) {
  tab.value = index
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
      <wd-tabs v-model="tab" :lineHeight="2" :lineWidth="24" color="#1A66FF" swipeable @change="handleClick">
        <block v-for="(item, index) in tabs" :key="`k-${index}`">
          <wd-tab :title="item.label" />
        </block>
      </wd-tabs>
    </template>

    <template #bottom>
      <view class="h50px" />
    </template>

    <view p-32rpx flex flex-y gap16px>
      <view v-for="(item, index) in dataList" :key="item.id" px16px py20px bg-white rd-8px @click="toOrderDetail(item.id)">
        <view flex flex-ac flex-bt>
          <view f14>
            {{ item.createTime }}
          </view>
          <view v-if="item.payStatus === 1" class="my-status-tag to-service">
            待支付
          </view>
          <view v-if="item.payStatus === 2" class="my-status-tag end-service">
            已完成
          </view>
          <view v-if="item.payStatus === 4" class="my-status-tag end-service">
            已完成(退款成功)
          </view>
          <view v-if="item.payStatus === 3" class="my-status-tag cancel-service">
            已取消
          </view>
        </view>
        <view mt20px flex flex-y gap-12px>
          <view v-for="(item2, index2) in item.orderItem" :key="`k-${index}-${index2}`" flex flex-ac flex-bt gap-8px>
            <wd-img
              :width="40"
              :height="40"
              :radius="8"
              mode="aspectFill"
              :src="item2.goodsCoverImg"
            />
            <view h40px flex flex-y flex-bt flex-1>
              <view c-28282B f14 flex-bt flex flex-ac>
                <view>{{ item2.goodsName }}</view>
                <view>￥{{ item2.goodsPrice }}</view>
              </view>
              <view c-717171 f12>
                x{{ item2.goodsCount }}
              </view>
            </view>
          </view>
        </view>
        <view h1px mt10px bg-EBEBF0 />
        <view mt12px flex flex-bt flex-ac>
          <view f12>
            {{ item.orderNo }}
          </view>
          <view c-FF4070 f16>
            合计收款：¥{{ item.amount }}
          </view>
        </view>
      </view>
      <!-- <view px16px py20px bg-white rd-8px>
        <view flex flex-ac flex-bt>
          <view f14>
            2024-04-20 17:34:20
          </view>
          <view class="my-status-tag end-service">
            已完成(退款成功)
          </view>
        </view>
        <view flex flex-ac flex-bt gap-8px mt20px>
          <wd-img
            :width="40"
            :height="40"
            :radius="8"
            :src="`${IMG_BASE}/cat.png`"
          />
          <view h40px flex flex-y flex-bt flex-1>
            <view c-28282B f14 flex-bt flex flex-ac>
              <view>面部清洁补水</view>
              <view>￥98</view>
            </view>
            <view c-717171 f12>
              基础版&nbsp;&nbsp;x1
            </view>
          </view>
        </view>
        <view h1px mt10px bg-EBEBF0 />
        <view mt12px flex flex-bt flex-ac>
          <view f12>
            MY2024040910101000045
          </view>
          <view c-FF4070 f16>
            合计收款：¥98
          </view>
        </view>
      </view> -->
    </view>
  </z-paging>

  <view p16px />
</template>

<style lang='scss' scoped></style>
