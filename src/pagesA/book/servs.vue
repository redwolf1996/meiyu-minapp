<route lang="yaml">
style:
  navigationBarTitleText: 选择服务
</route>

<script lang="ts" setup>
import type { AllItems } from '../types'

// const servs = ref([])
const checked = ref(false)
const active = ref<number>(1)
const scrollTop = ref<number>(0)
const subCategories: any = Array.from({ length: 24 }).fill({ title: '标题文字', label: '这是描述这是描述' }, 0, 24)
const categories = ref([
  {
    label: '分类一',
    id: 1,
    title: '标题一',
    items: subCategories,
  },
  {
    id: 2,
    label: '分类二',
    title: '标题二',
    items: subCategories,
  },
  {
    id: 3,
    label: '分类三',
    title: '标题三',
    items: subCategories,
  },
])

const cats = {
  services: { // 大类
    catId1: [{}], // key是小类id， value是实际小分类下的具体model数组
    catId2: [{}],
  },
  products: {
    catId1: [{}],
    catId2: [{}],
  },
  cards: {
    catId1: [],
    catId2: [],
  },
}

onLoad(() => {
  const res = request.get<AllItems>('/business/goods_all', { storeId })
})

function handleChange({ value }) {
  active.value = value
  scrollTop.value = -1
  nextTick(() => {
    scrollTop.value = 0
  })
}

function select(e: UniHelper.CheckboxGroupOnChangeEvent) {
  checked.value = !!e.detail.value.includes('cb')
}

// function toAdd() {}
</script>

<template>
  <view class="wraper">
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
        :key="index"
        class="category"
        scroll-y
        scroll-with-animation
        :show-scrollbar="true"
        :scroll-top="scrollTop"
        :throttle="false"
      >
        <view p12px>
          <view flex flex-ac flex-bt pb14px mb14px style="border-bottom: 1px solid #EBEEF1">
            <view flex gap12px>
              <wd-img
                :width="72"
                :height="72"
                mode="center"
                :src="`${IMG_BASE}/cat.png`"
              />
              <view>
                <view f14>
                  产品名称1
                </view>
                <view f12 c-#FF1919 mt6px>
                  ￥499
                </view>
              </view>
            </view>
            <view flex flex-cc>
              <wd-checkbox size="large" />
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>

  <!-- <view v-if="(tab === 0 && servs.length === 0) || (tab === 1 && prods.length === 0)" class="empty">
    <view tc mt56rpx f12 c-#979797>
      暂无数据
    </view>
    <view>
      <view mx-200rpx mt-64rpx color-white @click="toAdd()">
        <wd-button size="large" custom-class="theme-bg" block>
          <view flex flex-cc>
            <text>添加{{ tab ? '产品' : '服务' }}</text>
          </view>
        </wd-button>
      </view>
    </view>
  </view> -->

  <view class="footer">
    <view>
      <view>已选择 7 项</view>
    </view>
    <view w120px>
      <wd-button size="large" custom-class="theme-bg" block>
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
.wraper {
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
