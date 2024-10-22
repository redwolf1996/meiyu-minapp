<route lang="yaml">
style:
  navigationBarTitleText: 选择卡项
</route>

<script lang="ts" setup>
import type { AllItems, CardList, CatsItemsTree } from '../types'
import { flatten } from 'lodash-es'

const active = ref<number>(0)
const scrollTop = ref<number>(0)
const categories = ref<CatsItemsTree<CardList>[]>([])

onLoad(async () => {
  const res = await request.get<AllItems>('/business/goods_all', { storeId })
  const cardCats = res.data.cardCategory!
  cardCats.unshift({
    id: 0,
    name: '所有分类',
    storeId: null,
  })
  const cards = res.data.cardList
  categories.value = cardCats.map((v) => {
    return {
      id: v.id,
      label: v.name,
      items: v.id === 0
        ? cards
        : cards.filter(v1 => v.id === v1.categoryId).map((v2) => {
          return { ...v2, checked: false }
        }),
    }
  })
})

function handleChange({ value }) {
  active.value = value
  scrollTop.value = -1
  nextTick(() => {
    scrollTop.value = 0
  })
}

function changeCheck() {
  let servs = []
  servs = categories.value.filter((v) => {
    return v.items.length > 0
  }).map(v1 => toRaw(v1.items))
  servs = flatten(toRaw(servs))
  checkedServs.value = servs.filter(v => v.checked)
}
</script>

<template>
  <view class="wrapper">
    <wd-sidebar v-model="active" @change="handleChange">
      <wd-sidebar-item
        v-for="(item, index) in categories"
        :key="index"
        :value="index"
        :label="item.label"
      />
    </wd-sidebar>
    <view class="content" :style="`transform: translateY(-${active * 100}%)`">
      <scroll-view
        v-for="(item, index) in categories"
        :key="`cat-${index}`"
        class="category"
        scroll-y
        scroll-with-animation
        :show-scrollbar="true"
        :scroll-top="scrollTop"
        :throttle="false"
      >
        <view p12px>
          <view v-for="(itm, idx) in item.items" :key="`itm-${idx}`" h132px mb12px>
            <image
              style="width: 100%;height: 132px;"
              mode="aspectFit"
              :src="`${IMG_BASE}/bg_czk.png`"
            />
            <!-- <view>1</view>
            <view>2</view>
            <view>3</view>
            <view>4</view> -->
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style>
page {
  height: 100vh;
  background: #fff;
  overflow-y: hidden;
}
</style>

<style lang='scss' scoped>
.wrapper {
  display: flex;
  height: calc(100vh - 50px);
  overflow: hidden;
}
.content {
  flex: 1;
  background: #fff;
  transition: transform 0.3s ease;
  height: 100%;
}
.category {
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  position: fixed;
  padding: 0 20px;
  width: 100%;
  bottom: 0;
  background-color: #fff;
}
.this-tab {
  padding: 0 100rpx;
}
</style>
