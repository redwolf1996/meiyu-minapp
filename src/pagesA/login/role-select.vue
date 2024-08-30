<route lang="yaml">
style:
  navigationBarTitleText: 角色选择
</route>

<script lang="ts" setup>
function toBusinessRegister() {
  uni.navigateTo({ url: '/pagesA/login/info?role=business' })
}

function toStaffRegister() {
  uni.navigateTo({ url: '/pagesA/login/info?role=staff' })
}
</script>

<template>
  <view p16px>
    <wd-img
      :height="105"
      width="100%"
      :src="`${IMG_BASE}/login_s1.png`"
    />
    <view flex mt-60px gap-12px>
      <wd-img
        :height="184"
        width="50%"
        :src="`${IMG_BASE}/login_s2.png`"
        @click="toBusinessRegister()"
      />
      <wd-img
        :height="184"
        width="50%"
        :src="`${IMG_BASE}/login_s3.png`"
        @click="toStaffRegister()"
      />
    </view>
  </view>
</template>

<style lang='scss' scoped></style>
