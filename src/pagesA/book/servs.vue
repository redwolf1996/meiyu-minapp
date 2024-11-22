<route lang="yaml">
style:
  navigationBarTitleText: 选择服务
</route>

<script lang="ts" setup>
import type { AllItems, CatsItemsTree, ServiceList } from '../types'
import { flatten } from 'lodash-es'

const active = ref<number>(0)
const scrollTop = ref<number>(0)
const categories = ref<CatsItemsTree<ServiceList>[]>([])
const checkedCount = computed(() => {
  return checkedServs.value.length + checkedProds.value.length
})

onShow(async () => {
  const res = await request.get<AllItems>('/business/goods_all', { storeId })
  const serviceCats = res.data.serviceCategory!
  const services = res.data.serviceList
  categories.value = serviceCats.map((v) => {
    return {
      id: v.id,
      label: v.name,
      items: services.filter(v1 => v.id === v1.categoryId).map((v2) => {
        if (checkedServs.value.find(v3 => v3.id === v2.id)) {
          v2.checked = true
        }
        else {
          v2.checked = false
        }

        return { ...v2 }
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

function confirm() {
  uni.navigateBack()
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
          <view v-for="(itm, idx) in item.items" :key="`itm-${idx}`" flex flex-ac flex-bt pb14px mb14px style="border-bottom: 1px solid #EBEEF1">
            <view flex gap12px>
              <wd-img
                :width="72"
                :height="72"
                mode="center"
                :src="`${IMG_BASE}/cat.png`"
              />
              <view>
                <view f14>
                  {{ itm.name }}
                </view>
                <view f12 c-#FF1919 mt6px>
                  ￥{{ itm.price2 }}
                </view>
                <view f10 c-#D4D4D4 mt6px>
                  <text line-through>
                    ￥{{ itm.price }}
                  </text>
                </view>
              </view>
            </view>
            <view flex flex-cc>
              <wd-checkbox v-model="itm.checked" size="large" @change="changeCheck" />
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>

  <view class="footer">
    <view>
      <view>已选择 {{ checkedCount }} 项</view>
    </view>
    <view w120px>
      <wd-button size="large" custom-class="theme-bg" block @click="confirm()">
        <view flex flex-cc>
          <text>确定</text>
        </view>
      </wd-button>
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
  height: calc(100vh - 90px);
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
