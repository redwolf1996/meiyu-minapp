<script lang="ts" setup>
const props = withDefaults(defineProps<{
  tabIndex?: number // 展示第几个tab
}>(), {
  tabIndex: 1,
})
const tabbar = ref(props.tabIndex)
const tabUrls: NavigateToOptions['url'][] = [
  '/pagesA/tabs/tab-business-dashboard',
  '/pagesA/tabs/tab-business-book',
  '/pagesA/tabs/tab-business-customer',
  '/pagesA/tabs/tab-business-my',
]

function changeBar({ value }: { value: string }) {
  uni.navigateTo({ url: tabUrls[value] })
}
</script>

<template>
  <wd-tabbar
    v-model="tabbar"
    :bordered="true"
    :safeAreaInsetBottom="true"
    :fixed="true"
    :placeholder="true"
    active-color="#1A66FF"
    inactive-color="#A7A8AC"
    @change="changeBar"
  >
    <wd-tabbar-item title="工作台" icon="desktop" />
    <wd-tabbar-item title="预约" icon="call" />
    <wd-tabbar-item title="客户" icon="usergroup" />
    <wd-tabbar-item title="我的" icon="user" />
  </wd-tabbar>
</template>

<style lang='scss' scoped>

</style>
