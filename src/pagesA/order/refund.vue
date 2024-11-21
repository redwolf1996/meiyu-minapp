<route lang="yaml">
style:
  navigationBarTitleText: 主动退款
</route>

<script lang="ts" setup></script>

<template>
  <view p-32rpx>
    <view py40rpx px32rpx bg-white rd-8rpx flex flex-y gap28rpx>
      <view flex gap20rpx pb14px style="border-bottom: 1px solid #eeeeee;">
        <wd-img
          :width="76"
          :height="76"
          :src="`${IMG_BASE}/cat.png`"
        />
        <view flex-1 h76px flex flex-y flex-bt>
          <view>
            <view f14 mb2px>
              产品名称1
            </view>
            <view f12 flex flex-ac flex-bt>
              <view c-7973F9>
                产品
              </view>
              <view>x1</view>
            </view>
          </view>
          <view flex flex-xr f14>
            <text>可退款金额&nbsp;&nbsp;￥9.00</text>
          </view>
        </view>
      </view>
      <view flex gap20rpx pb14px style="border-bottom: 1px solid #eeeeee;">
        <wd-img
          :width="76"
          :height="76"
          :src="`${IMG_BASE}/cat.png`"
        />
        <view flex-1 h76px flex flex-y flex-bt>
          <view>
            <view f14 mb2px>
              产品名称1
            </view>
            <view f12 flex flex-ac flex-bt>
              <view c-7973F9>
                产品
              </view>
              <view>x1</view>
            </view>
          </view>
          <view flex flex-xr f14>
            <text>可退款金额&nbsp;&nbsp;￥9.00</text>
          </view>
        </view>
      </view>
    </view>
    <view class="h24rpx" />
    <view py40rpx px32rpx bg-white rd-8rpx>
      <view>
        退款金额
      </view>
      <view class="h20px" />
      <MyCell label="订单支付方式" :showArrow="false">
        <text f14>
          现金
        </text>
      </MyCell>
      <MyCell label="退款方式">
        <text f14>
          现金退款
        </text>
      </MyCell>
      <MyCell label="退款金额" :showArrow="false">
        <text f14>
          ￥18.00
        </text>
      </MyCell>
    </view>
  </view>
</template>

<style lang='scss' scoped></style>
