<script lang="ts" setup>
const props = withDefaults(defineProps<{
  tabIndex?: number // 展示第几个tab
  placeholder?: boolean // 底部是否占位
  fixed?: boolean
}>(), {
  tabIndex: 1,
  placeholder: true,
  fixed: true,
})
const tabbar = ref(props.tabIndex)
const tabUrls: NavigateToOptions['url'][] = [
  '/pagesA/tabs/tab-business-dashboard',
  '/pagesA/tabs/tab-business-book',
  '/pagesA/tabs/tab-business-customer',
  '/pagesA/tabs/tab-business-my',
]

function changeBar(index: number) {
  uni.redirectTo({ url: tabUrls[index], animationType: 'none' })
}
</script>

<template>
  <uv-tabbar
    :zIndex="99999"
    :value="tabbar" active-color="#1A66FF" inactive-color="#A7A8AC"
    @change="changeBar"
  >
    <uv-tabbar-item text="工作台">
      <template #active-icon>
        <image class="icon" src="./icons/icon-tab-dashboard-act.png" />
      </template>
      <template #inactive-icon>
        <image class="icon" src="./icons/icon-tab-dashboard.png" />
      </template>
    </uv-tabbar-item>
    <uv-tabbar-item text="预约">
      <template #active-icon>
        <image class="icon" src="./icons/icon-tab-order-act.png" />
      </template>
      <template #inactive-icon>
        <image class="icon" src="./icons/icon-tab-order.png" />
      </template>
    </uv-tabbar-item>
    <uv-tabbar-item text="客户">
      <template #active-icon>
        <image class="icon" src="./icons/icon-tab-customer-act.png" />
      </template>
      <template #inactive-icon>
        <image class="icon" src="./icons/icon-tab-customer.png" />
      </template>
    </uv-tabbar-item>
    <uv-tabbar-item text="我的">
      <template #active-icon>
        <image class="icon" src="./icons/icon-tab-my-act.png" />
      </template>
      <template #inactive-icon>
        <image class="icon" src="./icons/icon-tab-my.png" />
      </template>
    </uv-tabbar-item>
    <!-- <uv-tabbar-item text="工作台" icon="home" />
    <uv-tabbar-item text="预约" icon="phone" />
    <uv-tabbar-item text="客户" icon="account-fill" />
    <uv-tabbar-item text="我的" icon="account" /> -->
  </uv-tabbar>
</template>

<style lang='scss' scoped>
.icon {
  width: 40rpx;
  height: 40rpx;
}
</style>
