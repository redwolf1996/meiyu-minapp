<script lang="ts" setup>
const props = withDefaults(defineProps<{
  tabIndex?: number // 展示第几个tab
}>(), {
  tabIndex: 1,
})

const tabbar = ref(props.tabIndex)
</script>

<template>
  <wd-tabbar v-model="tabbar" bordered safeAreaInsetBottom placeholder active-color="#1A66FF" inactive-color="#A7A8AC" @change="handleChange1">
    <wd-tabbar-item title="工作台" icon="desktop" />
    <wd-tabbar-item title="预约" icon="call" />
    <wd-tabbar-item title="客户" icon="usergroup" />
    <wd-tabbar-item title="我的" icon="user" />
  </wd-tabbar>
</template>

<style lang='scss' scoped>

</style>
