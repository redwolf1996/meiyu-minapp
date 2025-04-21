<route lang="yaml">
style:
  navigationBarTitleText: 会员到期提醒
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
            会员到期提醒
          </view>
        </view>
        <view flex flex-bt tc flex-ac mt-10rpx>
          <view f12 color-999>
            {{ storeMsgDetail?.createTime ?? '--' }}
          </view>
        </view>
      </view>
    </view>
    <view fs-14px c-#2E3331 lh-22px mt20px>
      <view mb22px>
        尊敬的客户：
      </view>
      <view mb22px>
        您好！感谢您一直以来对我们平台的支持与信赖。
      </view>
      <view mb22px>
        我们温馨提醒您，您的小程序管理服务到期日期为{{ storeMsgDetail?.ext?.expiresTime ?? '--' }}。为了确保您能够继续享受我们平台提供的各项商家特权和服务，我们建议您尽快进行续费操作。
      </view>
      <view mb22px>
        会员服务优势：
      </view>
      <view mb22px>
        <view indent-20px>
          私域客户管理：您可以轻松维护自己的私域客户，实现精准营销和客户关系管理。
        </view>
        <view indent-20px>
          高级功能解锁：作为会员，您将享有更多高级功能的使用权限，提升业务运营效率。
        </view>
        <view indent-20px>
          专属客服支持：我们的客服团队将为您提供更快速、更专业的服务，解决您在使用过程中的疑问和问题。
        </view>
        <view indent-20px>
          定期更新与升级：您将优先获得我们软件的最新功能和优化更新，保持竞争优势。
        </view>
      </view>
      <view mb22px>
        如何续费：
      </view>
      <view mb22px>
        <view indent-20px>
          登录小程序进入“我的”。
        </view>
        <view indent-20px>
          点击“续费”并按照提示完成操作。
        </view>
      </view>
      <view mb22px>
        如有任何疑问或需要帮助，请随时联系我们的客服团队。联系方式如下：
      </view>
      <view mb22px>
        <view indent-20px>
          电话：{{ storeMsgDetail?.ext?.platformPhone ?? '--' }}
        </view>
        <view indent-20px>
          邮箱：{{ storeMsgDetail?.ext?.platformEmail ?? '--' }}
        </view>
      </view>
      <view mb22px>
        我们期待与您继续携手合作，共创美好未来！
      </view>
      <view mb22px>
        祝您生意兴隆！
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

<style lang='scss' scoped>
</style>
