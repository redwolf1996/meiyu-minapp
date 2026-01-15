<route lang="yaml">
style:
  navigationBarTitleText: 关注公众号
</route>

<script lang="ts" setup>
// official-account 组件只在以下场景显示：
// 1. 扫描小程序码
// 2. 搜索小程序
// 3. 从其他小程序返回
// 4. 从 App 分享消息卡片进入
// 5. 小程序绑定的公众号文章内打开

const showTip = ref(false)

onLoad(() => {
  // 检查是否支持显示公众号组件
  // 如果不支持，显示二维码引导关注
  showTip.value = true
})
</script>

<template>
  <view p20px>
    <!-- 公众号关注组件，仅在特定场景下显示 -->
    <!-- #ifdef MP-WEIXIN -->
    <view mb20px>
      <official-account />
    </view>
    <!-- #endif -->

    <view bg-white rd-12px p20px>
      <view tc mb20px>
        <view f14 c-999>
          关注后可接收预约提醒、消费通知等消息
        </view>
      </view>

      <!-- 公众号二维码 -->
      <view flex flex-cc mb20px>
        <wd-img
          :width="200"
          :height="200"
          :src="`${IMG_BASE}/qrcode-official.jpg`"
          mode="aspectFit"
        />
      </view>

      <view tc f14 c-666>
        长按识别二维码关注
      </view>
    </view>

    <view v-if="showTip" mt20px p16px bg-FFF9E6 rd-8px>
      <view f14 c-FF9500 lh-22px>
        提示：如果上方未显示关注按钮，请长按保存二维码图片，在微信中扫码关注公众号。
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped></style>
