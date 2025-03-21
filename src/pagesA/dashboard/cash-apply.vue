<route lang="yaml">
style:
  navigationBarTitleText: 提现申请
</route>

<script lang="ts" setup>
const cashAmount = ref<number>(null)
const totalAmount = ref<number>(0)

function handleSubmit() {
  uni.navigateTo({
    url: '/pagesA/dashboard/cash-results',
  })
}
</script>

<template>
  <view p-32rpx>
    <view wp-100 h-170px color-fff pr>
      <wd-img
        width="100%"
        :height="170"
        mode="aspectFill"
        :radius="12"
        :src="`${IMG_BASE}/cardbg@2x.png`"
      />

      <view wp100 h-170px pa left-0 top-0>
        <view fs-36 pt-20px pl-20px>
          可提现金额<text fs-28>
            （元）
          </text>
        </view>
        <view fs-64 fb tc abs-cc>
          ¥{{ totalAmount }}
        </view>
      </view>
    </view>

    <view p-40rpx bg-white color-888 fs-28 flex flex-ac gap-4px mt-32rpx>
      <wd-icon name="warning" size="16px" />
      <view>
        <view lh-42rpx>
          商家单日提现最高限额为2万元，最低为0.1元
        </view>
        <view lh-42rpx>
          商家一天只能提现1笔
        </view>
      </view>
    </view>

    <view p-40rpx bg-white color-#000 fs-28 flex flex-ac gap-4px mt-32rpx>
      <view>
        <view fs-18px>
          提现金额
        </view>
        <view fb fs-20px px-16px py-12px flex flex-ac gap20px>
          <text>
            ￥
          </text>
          <wd-input v-model="cashAmount" fs-20px size="large" placeholder="请输入提现金额" no-border custom-input-class="input-class" />
        </view>
      </view>
    </view>

    <view mt-64rpx color-white>
      <wd-button size="large" custom-class="theme-bg" block @click="handleSubmit">
        <view flex flex-cc>
          <text>确认提交</text>
        </view>
      </wd-button>
    </view>
    <!-- <view mx-40rpx color-white>
      <wd-button size="large" type="text" block>
        <view flex flex-cc color-1A66FF>
          <text>取消</text>
        </view>
      </wd-button>
    </view> -->
  </view>
</template>

<style lang='scss' scoped>
.input-class {
  font-size: 20px;
}
</style>
