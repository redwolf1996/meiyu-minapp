<route lang="yaml">
style:
  navigationBarTitleText: 关注公众号
</route>

<script lang="ts" setup>
// 公众号二维码图片地址
const qrcodeUrl = `${IMG_BASE}/qrcode-official.jpg`

// === 以下为备用方案（web-view 方式），保留不删除 ===
// 直接使用公众号文章链接，用户可通过文章顶部进入公众号主页关注
// const officialAccountUrl = 'https://mp.weixin.qq.com/s/HmYvUMUjoUWqOWs4lxHdlA'
</script>

<template>
  <view p20px>
    <view bg-white rd-12px p20px>
      <view tc mb20px>
        <view f18 c-333 mb8px>
          关注公众号
        </view>
        <view f14 c-999>
          长按下方二维码识别关注
        </view>
      </view>

      <!-- 长按识别二维码，show-menu-by-longpress 开启长按菜单 -->
      <view flex flex-cc>
        <image
          :src="qrcodeUrl"
          mode="aspectFit"
          show-menu-by-longpress
          style="width: 400rpx; height: 400rpx;"
        />
      </view>

      <view tc f14 c-999 mt20px>
        接收预约提醒、消费通知等
      </view>
    </view>
  </view>

  <!-- === 备用方案：web-view 方式 === -->
  <!-- #ifdef MP-WEIXIN -->
  <!-- <web-view :src="officialAccountUrl" /> -->
  <!-- #endif -->
</template>

<style lang='scss' scoped></style>
