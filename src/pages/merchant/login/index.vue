<route lang="yaml">
layout: default
style:
  navigationBarTitleText: 登录-商家端
</route>

<script lang="ts" setup>
const checked = ref(false)
function select(e: any) {
  checked.value = !!e.detail.value.includes('cb')
}
</script>

<template>
  <div h-screen w-screen tc pr>
    <div pt-100rpx font-size-36rpx font-bold>
      欢迎来到美预预约
    </div>
    <div mt-80rpx>
      <wd-img
        :width="72"
        :height="72"
        :src="`${IMG_BASE}/logo@3x.png`"
      />
    </div>
    <div mt-80rpx>
      走近千家万户，共享轻松生活
    </div>
    <div mx-60rpx mt-112rpx color-white>
      <wd-button :disabled="!checked" size="large" custom-class="theme-bg" block>
        <div flex flex-cc>
          <span i-tdesign-logo-wechat font-size-36rpx />
          <span>&nbsp;微信一键登录</span>
        </div>
      </wd-button>
    </div>
    <div mt120rpx>
      切换为用户端登录
    </div>
    <div bottom-160rpx w-full color-gray-6 pf>
      <div flex flex-cc>
        <checkbox-group @change="select">
          <checkbox
            value="cb"
            :checked="checked"
          />
        </checkbox-group>
        <span>登录代表同意</span>
        <span theme-color>《服务协议》</span>
        <span>及</span>
        <span theme-color>《隐私协议》</span>
      </div>
      <div pt-10rpx>
        登录前请阅读
      </div>
    </div>
  </div>
</template>
