<route lang="yaml">
style:
  navigationBarTitleText: 卡项管理
</route>

<script lang="ts" setup>
import type { List, ReqModel } from './types'

const visCardType = ref(false)
const visAction = ref(false)
const cardList = ref<any>([
  { name: '次卡' },
  { name: '折扣卡' },
  { name: '充值卡' },
])
const actionList = ref<any>([
  { name: '修改' },
  { name: '删除' },
  { name: '复制' },
])
const reqParams = reactive<ReqModel>({
  storeId,
  pageNum: 1,
  pageSize: 10,
  name: '',
})
const paging = ref<ZPagingInstance<List> | null>(null)
const dataList = ref<List[]>([])

async function queryList(page: number, pageSize: number) {
  reqParams.pageNum = page
  reqParams.pageSize = pageSize
  const res = await request.get<ListRes<List>>('/business/card', reqParams)
  paging.value.complete(res.data.list)
}

function search() {
  paging.value.reload()
}

function selCard(e) {
  if (e.index === 0)
    uni.navigateTo({ url: '/pagesA/card/card-add-cika' })
  if (e.index === 1)
    uni.navigateTo({ url: '/pagesA/card/card-add-zhekouka' })
  if (e.index === 2)
    uni.navigateTo({ url: '/pagesA/card/card-add-chongzhika' })
}

function selAction(e) {
  console.log(e)
}
</script>

<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    lower-threshold="5" auto-show-back-to-top :default-page-size="10"
    @query="queryList"
  >
    <template #top>
      <TopSearch v-model="reqParams.name" placeholder="请输入卡项名称" @search="search()" />
      <view class="h16px" />
      <view mx-14px p-16px pb6px bg-white rd-t-8px>
        <view class="title">
          <view flex flex-ac>
            <view class="bd-left" />
            <div pl-10px>
              卡项列表
            </div>
            <span f14>
              （共<span style="color:#1A66FF">10</span>项）
            </span>
          </view>
          <view class="plus" @click="visCardType = true">
            <wd-img
              :width="14"
              :height="14"
              :src="`${IMG_BASE}/icon-plus.png`"
            />
          </view>
        </view>
      </view>
    </template>

    <view mx-14px p-16px bg-white rd-b-8px>
      <div mt-12px flex flex-bt flex-ac gap-40rpx pb-10px style="border-bottom: 1px solid #EFEFEF;">
        <wd-img
          :width="100"
          :height="100"
          mode="widthFix"
          :radius="12"
          :src="`${IMG_BASE}/detail/list-cika.png`"
        />
        <div flex flex-y flex-bt flex-1 h-108px>
          <div flex flex-bt>
            <div flex flex-ac gap-5px>
              <wd-img
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-star.png`"
              />
              <span f12>80</span>
            </div>
            <wd-img
              :width="20"
              :height="20"
              :src="`${IMG_BASE}/icon-more.png`"
              @click="visAction = true"
            />
          </div>
          <div fb f16>
            幻彩悦光爽肤水
          </div>
          <div f12 color-9A9FA5>
            网店展示
          </div>
          <div>
            <span fb f12 px-12rpx py-7rpx bg-B5E4CA rd-12rpx>￥128</span>
          </div>
        </div>
      </div>
      <div mt-12px flex flex-bt flex-ac gap-40rpx pb-10px style="border-bottom: 1px solid #EFEFEF;">
        <wd-img
          :width="100"
          :height="100"
          mode="center"
          :radius="12"
          :src="`${IMG_BASE}/cat.png`"
        />
        <div flex flex-y flex-bt flex-1 h-108px>
          <div flex flex-bt>
            <div flex flex-ac gap-5px>
              <wd-img
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-time.png`"
              />
              <span f12>80分钟</span>
            </div>
            <wd-img
              :width="20"
              :height="20"
              :src="`${IMG_BASE}/icon-more.png`"
            />
          </div>
          <div fb f16>
            幻彩悦光爽肤水
          </div>
          <div f12 color-9A9FA5>
            网店展示
          </div>
          <div>
            <span fb f12 px-12rpx py-7rpx bg-B5E4CA rd-12rpx>￥128</span>
          </div>
        </div>
      </div>
    </view>

    <wd-action-sheet v-model="visCardType" :actions="cardList" @select="selCard" />
    <wd-action-sheet v-model="visAction" :actions="actionList" @select="selAction" />
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
