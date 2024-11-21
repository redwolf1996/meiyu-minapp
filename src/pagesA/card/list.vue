<route lang="yaml">
style:
  navigationBarTitleText: 卡项管理
</route>

<script lang="ts" setup>
import type { List, ReqModel } from './types'
import { sumBy } from 'lodash-es'

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
const cardImg = {
  1: 'list-cika',
  2: 'list-chongzhi',
  3: 'list-zhekou',
}
const reqParams = reactive<ReqModel>({
  storeId,
  pageNum: 1,
  pageSize: 10,
  name: '',
})
const paging = ref<ZPagingInstance<List> | null>(null)
const dataList = ref<List[]>([])
const curItem = ref<List>(null)
const total = ref(0)
const deleteDialogRef = ref()

async function queryList(page: number, pageSize: number) {
  reqParams.pageNum = page
  reqParams.pageSize = pageSize
  const res = await request.get<ListRes<List>>('/business/card', reqParams)
  total.value = res.data.total
  paging.value.complete(res.data.list.map((v) => {
    return {
      ...v,
      avaTimes: sumBy(v.info, v1 => v1.equity),
    }
  }))
}

function search() {
  paging.value?.reload()
}

onShow(() => {
  search()
})

function resetStoreData() {
  resetCurClassify()
  richData.value.content = ''
  checkedProds.value = []
  checkedServs.value = []
}

function selCard(e) { // 添加会员卡
  resetStoreData()
  if (e.index === 0)
    uni.navigateTo({ url: '/pagesA/card/card-add-cika' })
  if (e.index === 1)
    uni.navigateTo({ url: '/pagesA/card/card-add-zhekouka' })
  if (e.index === 2)
    uni.navigateTo({ url: '/pagesA/card/card-add-chongzhika' })
}

function selAction(e) { // 修改、删除、复制当前卡项
  if (e.index === 0) { // 修改
    if (curItem.value.type === 1) // 次卡
      uni.navigateTo({ url: `/pagesA/card/card-add-cika?id=${curItem.value.id}&mode=edit` })
    if (curItem.value.type === 2) // 充值卡
      uni.navigateTo({ url: `/pagesA/card/card-add-chongzhika?id=${curItem.value.id}&mode=edit` })
    if (curItem.value.type === 3) // 折扣卡
      uni.navigateTo({ url: `/pagesA/card/card-add-zhekouka?id=${curItem.value.id}&mode=edit` })
  }

  if (e.index === 1) { // 删除
    deleteDialogRef.value.open()
  }

  if (e.index === 2) { // 复制
    if (curItem.value.type === 1) // 次卡
      uni.navigateTo({ url: `/pagesA/card/card-add-cika?id=${curItem.value.id}&mode=copy` })
    if (curItem.value.type === 2) // 充值卡
      uni.navigateTo({ url: `/pagesA/card/card-add-chongzhika?id=${curItem.value.id}&mode=copy` })
    if (curItem.value.type === 3) // 折扣卡
      uni.navigateTo({ url: `/pagesA/card/card-add-zhekouka?id=${curItem.value.id}&mode=copy` })
  }
}

async function dialogConfirm() { // 删除卡项
  await request.delete<any>(`/business/card/${curItem.value.id}`)
  search()
  deleteDialogRef.value.close()
}

function showItemMenu(item: List) {
  curItem.value = item
  visAction.value = true
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
      <TopSearch v-model="reqParams.name" placeholder="请输入卡项名称" @search="search()" />
      <view class="h16px" />
      <view mx-14px p-16px pb6px bg-white rd-t-8px>
        <view class="title">
          <view flex flex-ac>
            <view class="bd-left" />
            <view pl-10px>
              卡项列表
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
              :src="`${IMG_BASE}/icon-plus.png`"
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
          :src="`${IMG_BASE}/detail/${cardImg[item.type]}.png`"
        />
        <view flex flex-y flex-bt flex-1 h-108px>
          <view flex flex-bt>
            <view flex flex-ac gap-5px>
              <wd-img
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-star.png`"
              />
              <template v-if="item.type === 1">
                <text v-if="item.secondType === 1" f12>
                  {{ item.avaTimes }}次
                </text>
                <text v-if="item.secondType === 2" f12>
                  不限次
                </text>
                <text v-if="item.secondType === 3" f12>
                  不限次
                </text>
              </template>
              <template v-if="item.type === 3">
                <text v-for="(it, idx) in item.info" :key="`zk-${index}-${idx}`" f12>
                  {{ it.equity }}折&nbsp;
                </text>
              </template>
              <template v-if="item.type === 2">
                <text f12>
                  赠送{{ item.gift }}
                </text>
              </template>
            </view>
            <wd-img
              :width="20"
              :height="20"
              :src="`${IMG_BASE}/icon-more.png`"
              @click="showItemMenu(item)"
            />
          </view>
          <view fb f16>
            {{ item.name }}
          </view>
          <view f12 color-9A9FA5>
            <text v-if="item.expires === 0">
              永久有效
            </text>
            <text v-if="item.expires">
              购买后{{ item.expires }}天内有效
            </text>
          </view>
          <view>
            <text fb f12 px-12rpx py-7rpx bg-B5E4CA rd-12rpx>
              ￥{{ item.price }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <wd-action-sheet v-model="visCardType" :actions="cardList" @select="selCard" />
    <wd-action-sheet v-model="visAction" :actions="actionList" @select="selAction" />

    <uni-popup ref="deleteDialogRef" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消" confirmText="确定"
        title="提示" content="删除后不可恢复，确定删除吗？"
        @confirm="dialogConfirm"
      />
    </uni-popup>
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
