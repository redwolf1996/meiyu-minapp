<route lang="yaml">
style:
  navigationBarTitleText: 联系客服
</route>

<script lang="ts" setup>
function toBWeChat() {
  uni.navigateTo({ url: '/pagesA/my/qiwei' })
}

function call() {
  uni.makePhoneCall({ phoneNumber: '13263301397' })
}

function email() {
  uni.setClipboardData({
    data: 'support@xunhuazn.com', // 要被复制的内容
    success: () => { // 复制成功的回调函数
      uni.showToast({ // 提示
        title: '复制邮箱成功',
      })
    },
  })
}
</script>

<template>
  <view
    h276rpx pr
    :style="{ background: `url(${IMG_BASE}/rectangle.png)` }"
    style="background-size: cover;
     background-repeat: no-repeat;
    background-position: center"
  >
    <view wp100 px40rpx py24rpx color-white>
      <view fs-36>
        Hi，
      </view>
      <view fs-36 lh-36rpx>
        欢迎来到服务中心，很高兴为您服务
      </view>
      <view f12 mt12px>
        无论遇到任何问题都可通过以下联系方式联系客服，我们将第一时间为您解决问题！
      </view>
    </view>
  </view>
  <view h18px />
  <view style="z-index: 999999;">
    <MyCellGroup>
      <MyCell label="企业微信" @myclick="toBWeChat" />
      <MyCell label="客服电话" @myclick="call">
        <text f14 c-3B3D3D>
          13263301397
        </text>
      </MyCell>
      <MyCell label="客服邮箱" @myclick="email">
        <text f14 c-3B3D3D>
          support@xunhuazn.com
        </text>
      </MyCell>
    <!-- <MyCell label="问题留言" /> -->
    </MyCellGroup>
  </view>
</template>

<style lang='scss' scoped></style>
