<route lang="yaml">
style:
  navigationBarTitleText: 选择服务和产品
</route>

<script lang="ts" setup>
const tab = ref<number>(0)
const items = [{
  label: '所有服务',
  value: 0,
}, {
  label: '所有产品',
  value: 1,
}]
// const servs = ref([])
// const prods = ref([])
const checked = ref(false)
const active = ref<number>(1)
const scrollTop = ref<number>(0)
const subCategories: any = Array.from({ length: 24 }).fill({ title: '标题文字', label: '这是描述这是描述' }, 0, 24)
const categories = ref([
  {
    label: '分类一',
    title: '标题一',
    icon: 'thumb-up',
    items: subCategories,
    disabled: false,
  },
  {
    label: '分类二',
    title: '标题二',
    icon: 'thumb-up',
    items: subCategories,
    disabled: false,
  },
  {
    label: '分类三',
    title: '标题三',
    icon: 'thumb-up',
    items: subCategories.slice(0, 18),
    disabled: false,
  },
  {
    label: '分类四',
    title: '标题四',
    icon: 'thumb-up',
    items: subCategories.slice(0, 21),
    disabled: false,
  },
  {
    label: '分类五',
    title: '标题五',
    icon: 'thumb-up',
    items: subCategories,
    disabled: false,
  },
  {
    label: '分类六',
    title: '标题六',
    icon: 'thumb-up',
    items: subCategories.slice(0, 18),
    disabled: false,
  },
  {
    label: '分类七',
    title: '标题七',
    icon: 'thumb-up',
    items: subCategories,
    disabled: true,
  },
])

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
  <wd-tabs v-model="tab" custom-class="this-tab" :lineHeight="2" :lineWidth="24" color="#1A66FF" swipeable>
    <block v-for="item in items" :key="`t${item.value}`">
      <wd-tab :title="item.label" />
    </block>
  </wd-tabs>

  <view class="wraper">
    <wd-sidebar v-model="active" @change="handleChange">
      <wd-sidebar-item
        v-for="(item, index) in categories"
        :key="index"
        :value="index"
        :label="item.label"
        :icon="item.icon"
        :disabled="item.disabled"
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
        <wd-cell-group :title="item.title" border>
          <wd-cell v-for="(cell, index1) in item.items" :key="index1" :title="cell.title" :label="cell.label">
            <wd-icon name="github-filled" size="24px" />
          </wd-cell>
        </wd-cell-group>
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
      <view class="h5px" />
      <view flex flex-cc>
        <checkbox-group @change="select">
          <checkbox
            value="cb"
            :checked="checked"
          />
        </checkbox-group>
        <text f14>
          所有服务和产品
        </text>
      </view>
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
  height: calc(100vh - var(--window-top) - 122px);
  height: calc(100vh - var(--window-top) - 122px - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - 122px - env(safe-area-inset-bottom));
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
  height: 80px;
  padding: 0 20rpx;
  position: fixed;
  width: 100%;
  bottom: 0;
}
.this-tab {
  padding: 0 100rpx;
}
</style>
