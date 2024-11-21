<route lang="yaml">
style:
  navigationBarTitleText: 提现申请
</route>

<script lang="ts" setup></script>

<template>
  <view p-32rpx>
    <view px-40rpx py-48rpx bg-blue h-340rpx color-fff pr>
      <view fs-36>
        申请金额<text fs-28>
          （元）
        </text>
      </view>
      <view fs-64 fb tc abs-cc>
        ¥9985.88
      </view>
    </view>

    <view p-40rpx bg-white color-888 fs-28 flex flex-ac gap-4px mt-32rpx>
      <wd-icon name="warning" size="16px" />
      <view>
        <view lh-42rpx>
          商家单日提现最高限额为2万元，最低为0.1元；
        </view>
        <view lh-42rpx>
          商家一天只能提现1笔
        </view>
      </view>
    </view>

    <view mt-64rpx color-white>
      <wd-button size="large" custom-class="theme-bg" block>
        <view flex flex-cc>
          <text>进入工作台</text>
        </view>
      </wd-button>
    </view>
    <view mx-40rpx color-white>
      <wd-button size="large" type="text" block>
        <view flex flex-cc color-1A66FF>
          <text>取消</text>
        </view>
      </wd-button>
    </view>
  </view>
</template>

<style lang='scss' scoped>
</style>
