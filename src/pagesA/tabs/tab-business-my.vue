<route lang="yaml">
style:
  navigationBarTitleText: 我的
  navigationStyle: "custom"
</route>

<script lang="ts" setup>
const userInfo = computed(() => useUserStore()?.userInfo)
const storeInfo = computed(() => userInfo.value?.storeList?.[0])

function toRenew() {
  uni.navigateTo({ url: '/pagesA/my/renew' })
}
function toMyStore() {
  uni.navigateTo({ url: '/pagesA/my/store' })
}
function toAddNewStore() {
  uni.navigateTo({ url: '/pagesA/my/new-store' })
}
function toServ() {
  uni.navigateTo({ url: '/pagesA/my/service' })
}
function toInvite() {
  uni.navigateTo({ url: '/pagesA/my/invite' })
}
function toSettings() {
  uni.navigateTo({ url: '/pagesA/my/settings' })
}
function toAbout() {
  uni.navigateTo({ url: '/pagesA/my/about' })
}
function toFeedBack() {
  wx.openEmbeddedMiniProgram({
    appId: 'wx8abaf00ee8c3202e',
    extraData: {
      id: '673474',
      customData: {
        clientInfo: `iPhone OS 10.3.1 / 3.2.0.43 / 0`,
      },
    },
  })
}
</script>

<template>
  <MyNavBar title="我的" :capsule="false" />
  <view p20px bg-white>
    <view flex flex-ac gap12px>
      <wd-img
        :round="true"
        :width="56"
        :height="56"
        :src="`${IMG_BASE}/cat.png`"
      />
      <view flex-1 flex flex-y flex-bt h64px pr>
        <view c-141414 f18>
          {{ userInfo.userName }}
        </view>
        <view flex flex-ac gap5px>
          <text class="yy">
            营业中
          </text>
          <text f14 c-969699>
            {{ userInfo.phone }}
          </text>
        </view>
        <view c-969699 f14>
          {{ storeInfo.isOwner ? '店铺拥有者' : storeInfo.roleDesc }}
        </view>
        <view tc pa right-0 top-4px>
          <view c-969699 fs-20 mb2px>
            积分
          </view>
          <view f18>
            {{ userInfo.orgInfo.integration }}
          </view>
        </view>
      </view>
    </view>
    <view
      :style="{
        backgroundImage: `url(${IMG_BASE}/bg-my.png)`,
      }" px16px py12px flex flex-ac flex-bt mt-12px
    >
      <view flex flex-y flex-bt gap-10px>
        <view flex flex-ac>
          <wd-img
            :round="true"
            :width="18"
            :height="18"
            :src="`${IMG_BASE}/icon-v.png`"
          />
          <text color-white opacity-50 f12>
            {{ userInfo.orgInfo.expiresTime }} 到期
          </text>
        </view>
        <view f12 color-white>
          最低60/月，也可积分抵扣
        </view>
      </view>
      <view class="xf" @click="toRenew()">
        立即续费
      </view>
    </view>
  </view>
  <view px16px py8px @click="toInvite()">
    <wd-img
      height="48px"
      width="100%"
      :src="`${IMG_BASE}/banner-my.png`"
    />
  </view>
  <MyCellGroup>
    <MyCell label="我的店铺" noBorder @myclick="toMyStore()">
      <template #icon>
        <wd-icon name="home" size="18px" />
      </template>
      <span f14 c-3B3D3D>{{ storeInfo.storeName }}</span>
    </MyCell>
    <MyCell label="联系客服" noBorder @myclick="toServ()">
      <template #icon>
        <wd-icon name="user-talk" size="18px" />
      </template>
    </MyCell>
    <MyCell label="意见反馈" noBorder @myclick="toFeedBack()">
      <template #icon>
        <wd-icon name="evaluation" size="18px" />
      </template>
      <span f14 c-B6BDBD>欢迎反馈您使用中遇到的问题</span>
    </MyCell>
    <MyCell label="关于我们" noBorder @myclick="toAbout()">
      <template #icon>
        <wd-icon name="warning" size="18px" />
      </template>
    </MyCell>
  </MyCellGroup>
  <view h16px />
  <MyCellGroup>
    <MyCell label="设置" noBorder @myclick="toSettings()">
      <template #icon>
        <wd-icon name="setting" size="18px" />
      </template>
    </MyCell>
  </MyCellGroup>
  <!-- <view c-1A66FF mt20px tc lh-20px @click="toAddNewStore()">
    <text style="border-bottom: 1px solid #1A66FF;">
      我要开新店
    </text>
  </view> -->
  <view h100px />
  <MyTabBar :tab-index="3" />
</template>

<style lang='scss' scoped>
.xf {
  padding: 4px 12px;
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  height: 24px;
  align-items: center;
  background-color: #e3c377;
  color: #ffffff;
  display: inline-block;
  border-radius: 30px;
}
.yy {
  padding: 2px 4px;
  font-size: 11px;
  line-height: 12px;
  color: #fff;
  background-color: #ff6619;
  text-align: center;
}
</style>
