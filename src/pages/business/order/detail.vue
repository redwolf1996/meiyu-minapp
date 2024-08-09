<route lang="yaml">
style:
  navigationBarTitleText: 订单详情
</route>

<script lang="ts" setup></script>

<template>
  <view px15px py10px>
    <view p16px bg-white>
      <view flex flex-ac flex-bt>
        <view f14>
          <text>收款</text>
          <text f18>
            ￥18
          </text>
        </view>
        <view class="my-status-tag end-service">
          已完成(退款成功)
        </view>
      </view>
      <view class="h20px" />
      <view>
        <MyCell label="退款金额">
          <span f14>￥18</span>
        </MyCell>
        <view class="h12px" />
      </view>
      <view f12 c-#434343>
        <view flex flex-ac flex-bt mb12px>
          <view>订单编号</view>
          <view>MY2024042215384700000001</view>
        </view>
        <view flex flex-ac flex-bt mb12px>
          <view>创建时间</view>
          <view>2024-04-22 15:38:47</view>
        </view>
        <view flex flex-ac flex-bt>
          <view>销售员</view>
          <view>小妹</view>
        </view>
        <view flex flex-ac flex-bt mt12px>
          <view>取消时间</view>
          <view>2024-04-22 15:38:47</view>
        </view>
        <view flex flex-ac flex-bt mt12px>
          <view c-#FF5B05>
            剩余支付时间: 12:23:12（用户端线上支付时再考虑）
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped></style>
