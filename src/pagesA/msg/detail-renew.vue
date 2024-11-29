<route lang="yaml">
style:
  navigationBarTitleText: 续费消息提醒
</route>

<script lang="ts" setup>

</script>

<template>
  <view px-32rpx py-40rpx>
    <view flex flex-bt flex-ac gap-14px>
      <wd-img
        :width="32"
        :height="32"
        :src="`${IMG_BASE}/icon-ring.png`"
      />
      <view flex-grow-1>
        <view flex flex-bt flex-ac>
          <view f16 fb>
            续费成功
          </view>
        </view>
        <view flex flex-bt tc flex-ac mt-10rpx>
          <view f12 color-999>
            {{ storeMsgDetail?.ext?.expiresTime ?? '--' }}
          </view>
        </view>
      </view>
    </view>
    <view fs-14px c-#2E3331 lh-22px mt20px>
      <view mb22px>
        尊敬的客户：
      </view>
      <view mb22px>
        您好！
      </view>
      <view mb22px>
        我们很高兴地通知您，您的小程序服务续费已经成功！感谢您对我们服务的持续信任与支持。
      </view>
      <view mb22px>
        此次续费后，您的服务到期日期将延长至[新的到期日期]。在此期间，您将继续享受我们提供的专业功能和优质服务，包括私域客户管理、高级功能解锁、专属客服支持以及定期更新与升级等。
      </view>
      <view mb22px>
        我们始终致力于为您提供更好的服务体验，助力您的业务发展。如有任何疑问或需要进一步的支持，请随时联系我们的客服团队。
      </view>
      <view mb22px>
        再次感谢您对我们服务的支持！
      </view>
      <view mb22px>
        祝您生意兴隆，财源广进！
      </view>
      <view>
        <view>勋华科技</view>
        <view>
          {{ storeMsgDetail?.ext?.today ?? '--' }}
        </view>
      </view>
    </view>
  </view>
  <view class="h50px" />
</template>

<style>
  page {
  background-color: #fff;
}
</style>
