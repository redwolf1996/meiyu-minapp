<route lang="yaml">
style:
  navigationBarTitleText: 主动退款
</route>

<script lang="ts" setup>
const refundTypes = ref([
  {
    code: 20,
    desc: '原路退回',
  },
  {
    code: 1,
    desc: '现金',
  },
  {
    code: 4,
    desc: '微信',
  },
  {
    code: 5,
    desc: '支付宝',
  },
])

function confirmRefund() {
  uni.navigateTo({ url: '/pagesA/order/refund-detail' })
}
</script>

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
    <view class="h24rpx" />
    <view pt40rpx bg-white rd-8rpx>
      <view px20px>
        退款说明
      </view>
      <view bg-white>
        <wd-textarea
          :maxlength="200"
          placeholderStyle="font-size: 14px;color:#C9CDD4;"
          placeholder="请输入要备注的内容，200字内"
          clearable show-word-limit
        />
      </view>
    </view>
    <view class="h150px" />
  </view>

  <view class="footer">
    <view>
      <view flex flex-ac>
        <text fs-14px>
          合计退款金额：
        </text>
        <text fs-20px c-#FA483C>
          ￥18.00
        </text>
      </view>
    </view>
    <!-- <wd-button plain :round="false" block>
      确定退款
    </wd-button> -->

    <view bg-white tc h40px w136px flex flex-cc c-#1A66FF style="border: 1px solid #1A66FF;" @click="confirmRefund()">
      确定退款
    </view>
  </view>
</template>

<style lang='scss' scoped>
:deep(textarea) {
  height: 100px;
}
:deep(.wd-button) {
  border-radius: 0;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  position: fixed;
  padding: 0 20px;
  width: 100%;
  bottom: 0;
  background-color: #fff;
}
.sp {
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #1a66ff;
  border: 1px solid #1a66ff;
  border-radius: 4px;
}
</style>
