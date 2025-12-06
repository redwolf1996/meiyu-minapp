<route lang="yaml">
style:
  navigationBarTitleText: 选择卡项
</route>

<script lang="ts" setup>
import type { List, ReqModel } from './types'
import { sumBy } from 'lodash-es'

const reqParams = reactive<ReqModel>({
  storeId: storeId.value,
  pageNum: 1,
  pageSize: 1000,
  name: '',
})
const dataList = ref<List[]>([])
const total = ref(0)
const selectedCardIds = ref<Set<number>>(new Set())

async function queryList() {
  const res = await request.get<ListRes<List>>('/business/card', reqParams)
  total.value = res.data.total
  dataList.value = res.data.list.map((v) => {
    return {
      ...v,
      avaTimes: sumBy(v.info, v1 => v1.equity),
    }
  })
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

  // 通过事件或全局状态传递选中的卡片
  uni.setStorageSync('selected_cards', {
    ids: selectedIds,
    names: selectedNames,
  })
  uni.navigateBack()
}

onShow(() => {
  queryList()
})
</script>

<template>
  <view mx-14px p-16px bg-white rd-b-8px pb-120px>
    <view
      v-for="(item, index) in dataList" :key="`card-${index}`"
      mt-12px flex flex-bt flex-ac gap-40rpx
      pb-10px style="border-bottom: 1px solid #EFEFEF;"
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
        @update:model-value="toggleCardSelection(item.id, $event)"
      />
    </view>
  </view>
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
