<route lang="yaml">
style:
  navigationBarTitleText: 关于我们
</route>

<script lang="ts" setup>
const version = uni.getAppBaseInfo()?.appVersion
uni.showShareMenu({
  withShareTicket: true,
  menus: ['shareAppMessage', 'shareTimeline'],
})

onShareAppMessage((res) => {
  if (res.from === 'button') {
    // 来自页面内分享按
    return {
      title: '美预',
      path: `/pagesA/tabs/tab-business-dashboard`,
      // imageUrl: '',
    }
  }
  else {
    return {
      title: '美预',
      path: `/pagesA/tabs/tab-business-dashboard`,
      // imageUrl: '',
    }
  }
})
onShareTimeline(() => {
  return {
    title: '美预',
    // query: `share=${state.share}`, // 可不填 传递的参数，只能是这种格式
    // imageUrl: urlImg,
  }
})
</script>

<template>
  <view flex flex-cc flex-y h250px>
    <wd-img
      :width="72"
      :height="72"
      :src="`${IMG_BASE}/logo@3x.png`"
    />
    <view c-666666 tc fs-40 mt10px>
      美预
    </view>
    <view c-999999 tc f14>
      v{{ version }}
    </view>
  </view>

  <view style="height: calc(100vh - 250px)" bg-white px20px py30px pr>
    <view mb16px flex flex-ac>
      <view h-40rpx w-3.5px bg-1A66FF rd-8rpx />
      <view fs-48 pl-10px>
        详细介绍
      </view>
    </view>
    <view f14 lh-34px c-666666 mt20px>
      美预是一款专门为美业打造的一款方便快捷的门店管理软件。从客户预约服务，购买产品 到购买会员卡成为门店会员等进行客户全生命周期进行信息化进行管理。
    </view>
  </view>
  <view pa wp100 bottom-0 flex flex-cc flex-ac h70px pb40px px70rpx bg-white>
    <button open-type="share" style="background-color: #ffffff;">
      <wd-img
        :width="70"
        mode="widthFix"
        :src="`${IMG_BASE}/img-weixin.png`"
      />
    </button>

    <!-- <wd-img
      :width="70"
      mode="widthFix"
      :src="`${IMG_BASE}/img-pengyou.png`"
    /> -->
    <!-- <wd-img
      :width="70"
      mode="widthFix"
      :src="`${IMG_BASE}/img-qq.png`"
    />
    <wd-img
      :width="70"
      mode="widthFix"
      :src="`${IMG_BASE}/img-weibo.png`"
    /> -->
  </view>
</template>

<style lang='scss' scoped></style>
