<route lang="yaml">
style:
  navigationBarTitleText: 选择卡项
</route>

<script lang="ts" setup>
import type { List, ReqModel } from './types'
import { sumBy } from 'lodash-es'
import { selectedCardsStore } from '@/stores/common'

const reqParams = reactive<ReqModel>({
  storeId: storeId.value,
  pageNum: 1,
  pageSize: 1000,
  name: '',
})
const dataList = ref<List[]>([])
const total = ref(0)
const selectedCardIds = ref<Set<number>>(new Set())
const loading = ref(true) // 加载状态，控制骨架屏显示

// 骨架屏配置 - 卡项列表
const skeletonRowCol = ref([
  // 每个卡项占用的高度
  { height: '140rpx' },
  { height: '140rpx' },
  { height: '140rpx' },
  { height: '140rpx' },
  { height: '140rpx' },
] as any)

async function queryList() {
  try {
    const res = await request.get<ListRes<List>>('/business/card', reqParams)
    total.value = res.data.total
    dataList.value = res.data.list.map((v) => {
      return {
        ...v,
        avaTimes: sumBy(v.info, v1 => v1.equity),
      }
    })
    // 恢复选中状态
    restoreSelectedCards()
  }
  finally {
    // 确保图片有时间加载，稍微延迟一下再隐藏骨架屏
    setTimeout(() => {
      loading.value = false
    }, 300)
  }
}

function restoreSelectedCards() {
  if (selectedCardsStore.value.ids) {
    const ids = selectedCardsStore.value.ids.split(',').map(id => Number(id))
    selectedCardIds.value = new Set(ids)
  }
}

function toggleCardSelection(cardId: number, val: boolean) {
  if (val) {
    selectedCardIds.value.add(cardId)
  }
  else {
    selectedCardIds.value.delete(cardId)
  }
  selectedCardIds.value = new Set(selectedCardIds.value)
}

function confirmSelection() {
  const selectedIds = Array.from(selectedCardIds.value).join(',')
  const selectedNames = dataList.value
    .filter(item => selectedCardIds.value.has(item.id))
    .map(item => item.name)

  // 保存到全局 store，如果没有选中任何卡项则清空
  selectedCardsStore.value = {
    ids: selectedIds,
    names: selectedIds ? selectedNames : [],
  }
  uni.navigateBack()
}

onLoad(() => {
  // 在页面加载时恢复选中状态
  restoreSelectedCards()
})

onShow(() => {
  loading.value = true
  queryList()
})
</script>

<template>
  <wd-skeleton
    :loading="loading"
    animation="gradient"
    :row-col="skeletonRowCol"
  >
    <view mx-14px p-16px bg-white rd-b-8px pb-120px>
      <view
        v-for="(item, index) in dataList" :key="`card-${index}`"
        mt-12px flex flex-bt flex-ac gap-40rpx
        pb-10px style="border-bottom: 1px solid #EFEFEF;"
        @click="toggleCardSelection(item.id, !selectedCardIds.has(item.id))"
      >
        <wd-img
          :width="100"
          :height="100"
          mode="aspectFill"
          :radius="12"
          :src="`${IMG_BASE}/detail/${cardImgMap[item.type]}.png`"
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
                  {{ item.countLimit }}次
                </text>
                <text v-if="item.secondType === 2" f12>
                  不限次
                </text>
                <text v-if="item.secondType === 3" f12>
                  {{ item.countLimit }}次
                </text>
              </template>
              <template v-if="item.type === 2">
                <text f12>
                  赠送{{ item.gift }}
                </text>
              </template>
              <template v-if="item.type === 3">
                <text f12>
                  {{ item?.discountDesc }}
                </text>
              </template>
            </view>
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
        <wd-checkbox
          :modelValue="selectedCardIds.has(item.id)"
          style="pointer-events: none;"
        />
      </view>
    </view>
  </wd-skeleton>
  <view class="button-container">
    <view class="selected-count">
      已选 ({{ selectedCardIds.size }}) 个卡项
    </view>
    <button class="confirm-btn" @click="confirmSelection">
      确定
    </button>
  </view>
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
.button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 14px;
  background-color: #fff;
  z-index: 100;
  box-sizing: border-box;
}
.selected-count {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
}
.confirm-btn {
  width: 262rpx;
  height: 72rpx;
  line-height: 72rpx;
  background-color: #1a66ff;
  color: #fff;
  border: none;
  font-size: 16px;
  padding: 0;
  margin: 0;
}
</style>
