<route lang="yaml">
style:
  navigationBarTitleText: 邀请朋友
  navigationBarBackgroundColor: '#fff9e6'
</route>

<script lang="ts" setup>
uni.showShareMenu({
  withShareTicket: true,
  menus: ['shareAppMessage', 'shareTimeline'],
})

const url = ref('')

onLoad(async () => {
  const res = await request.get2('/business/get-unlimited-qrcode', {
    scene: useUserStore().userInfo.inviteCode,
    page: 'pages/index',
  })
  url.value = `data:image/png;base64,${uni.arrayBufferToBase64(res)}`
})

onShareAppMessage((res) => {
  if (res.from === 'button') {
    // 来自页面内分享按
    return {
      title: '美预',
      path: `/pages/index?scene=${useUserStore().userInfo.inviteCode}`,
      // imageUrl: '',
    }
  }
  else {
    return {
      title: '美预',
      path: `/pages/index?scene=${useUserStore().userInfo.inviteCode}`,
      // imageUrl: '',
    }
  }
})
onShareTimeline(() => {
  return {
    title: '美预',
    query: `scene=${useUserStore().userInfo.inviteCode}`, // 可不填 传递的参数，只能是这种格式
    // query: `share=${state.share}`, // 可不填 传递的参数，只能是这种格式
    // imageUrl: urlImg,
  }
})

function toMyInvite() {
  uni.navigateTo({ url: '/pagesA/my/my-invite' })
}
</script>

<template>
  <view tc pr>
    <wd-img
      :height="113"
      mode="heightFix"
      :src="`${IMG_BASE}/invite.png`"
    />
    <view style="transform: translateY(-10px);">
      <wd-img
        :height="494"
        mode="heightFix"
        :src="`${IMG_BASE}/invite-bg.png`"
      />
    </view>
    <view pa left-50% transform-translate-x--50% top-120px>
      <wd-img
        :height="54"
        mode="heightFix"
        :src="`${IMG_BASE}/decorator.png`"
      />
    </view>
    <view tc pa top-120px wp100>
      <view h20px />
      <view c-434343 f18>
        邀请码
      </view>
      <view fs-64 mt10px>
        {{ useUserStore().userInfo.inviteCode }}
      </view>
      <view h40px />
      <view tc flex flex-cc>
        <!-- <ikun-qrcode
          width="296"
          height="296"
          unit="rpx"
          color="#000000"
          data="字符串变量"
        /> -->
        <wd-img
          :width="148"
          :height="148"
          mode="aspectFit"
          :src="url"
        />
      </view>
      <view h24px />
      <view tc c-888888 f14>
        扫码注册
      </view>
      <view mt40px flex flex-cc>
        <view class="btn b1">
          保存图片
        </view>
        <view w32rpx />
        <!-- <view class="btn b2">
          分享邀请
        </view> -->

        <button class="btn b2" open-type="share" style="background-color: #ffffff;">
          分享邀请
        </button>
      </view>
      <view mt24px flex flex-cc tc @click="toMyInvite()">
        <text fs-34 c-1A66FF>
          我的邀请
        </text>
        <wd-icon name="arrow-right" size="16px" color="#1A66FF" />
      </view>
    </view>
  </view>
  <view tl f12 c-E66711 px-46rpx py-22rpx>
    🎉 只需您的朋友成功激活并使用，双方即可赠送一个月免费使用特权！如此良机，切勿错过！🎁
  </view>
  <view h50px />
</template>

<style>
page {
  background-color: #fff9e6;
}
</style>

<style lang="scss" scoped>
button {
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.btn {
  width: 295rpx;
  height: 80rpx;
  font-size: 34rpx;
  line-height: 34rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 80px;
  text-align: center;
  &.b1 {
    color: #1a66ff;
    border: 2px solid #1a66ff;
    background-color: #ffffff;
  }
  &.b2 {
    color: #ffffff;
    background: linear-gradient(285deg, #1a66ff 0%, #15d48a 100%);
  }
}
</style>
