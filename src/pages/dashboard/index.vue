<script lang="ts" setup>
const { name, token } = useUserStore().userInfo
</script>

<template>
  <demo>
    <div class="">
      世界你好
    </div>
  </demo>

  <div class="dashboard">
    <div>姓名：{{ name }}</div>
    <div>token: {{ token }}</div>
  </div>
</template>

<style lang="scss" scoped bd px-0>
</style>

<route lang="yaml">
layout: home
style:
  navigationBarTitleText: 工作台
</route>
