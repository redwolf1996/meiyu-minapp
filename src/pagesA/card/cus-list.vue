<route lang="yaml">
style:
  navigationBarTitleText: 会员购卡列表
</route>

<script lang="ts" setup>
import type { CusList as List } from './types'

const visCardType = ref(false)
const cardImg = {
  1: 'list-cika',
  2: 'list-chongzhi',
  3: 'list-zhekou',
}
const reqParams = reactive({
  storeId: storeId.value,
  pageNum: 1,
  pageSize: 10,
  keyword: '',
})
const paging = ref<ZPagingInstance<List> | null>(null)
const dataList = ref<List[]>([])
const total = ref(0)

async function queryList(page: number, pageSize: number) {
  reqParams.pageNum = page
  reqParams.pageSize = pageSize
  const res = await request.get<ListRes<List>>('/business/store-customer-card', reqParams)
  total.value = res.data.total
  paging.value.complete(res.data.list)
}

function search() {
  paging.value?.reload()
}

onShow(() => {
  search()
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
      <TopSearch v-model="reqParams.keyword" placeholder="请输入客户姓名或手机号" @search="search()" />
      <view class="h16px" />
      <view mx-14px p-16px pb6px bg-white rd-t-8px>
        <view class="title">
          <view flex flex-ac>
            <view class="bd-left" />
            <view pl-10px>
              会员卡项记录
            </view>
            <text f14>
              （共<text style="color:#1A66FF">
                {{ total }}
              </text>项）
            </text>
          </view>
          <view class="plus" @click="visCardType = true">
            <wd-img
              :width="14"
              :height="14"
              :src="`${IMG_BASE}/icon-usr.png`"
            />
          </view>
        </view>
      </view>
    </template>

    <template #bottom>
      <view class="h50px" />
    </template>

    <view mx-14px p-16px bg-white rd-b-8px>
      <view
        v-for="(item, index) in dataList" :key="`card-${index}`"
        mt-12px flex flex-bt flex-ac gap-40rpx
        pb-10px style="border-bottom: 1px solid #EFEFEF;"
      >
        <wd-img
          :width="100"
          :height="100"
          mode="widthFix"
          :radius="12"
          :src="`${IMG_BASE}/detail/${cardImg[item.cardType]}.png`"
        />
        <view flex flex-y flex-bt flex-1 h-108px>
          <view flex flex-bt>
            <view flex flex-ac gap-5px>
              <wd-img
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-star.png`"
              />
              <text>王丽丽(1266632323)</text>
            </view>
          </view>
          <view fb f16>
            7980面部精雕30次
          </view>
          <view f12 color-9A9FA5>
            2024/3/1 - 永久
          </view>
          <view>
            <text fb f12 px-12rpx py-7rpx bg-B5E4CA rd-12rpx>
              ¥128/¥12000
            </text>
          </view>
        </view>
      </view>
    </view>
  </z-paging>
</template>

<style lang='scss' scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .bd-left {
    width: 3.5px;
    height: 20px;
    border-radius: 4px;
    background: #a7c4fd;
  }
}
.plus {
  width: 36px;
  height: 36px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #fcfcfc;
  border-radius: 8px;
  box-shadow:
    -1px -1px 16px rgba(0, 0, 0, 0.08),
    2px 1px 4px rgba(0, 0, 0, 0.08);
}
</style>
