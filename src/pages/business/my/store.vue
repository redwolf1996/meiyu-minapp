<route lang="yaml">
style:
  navigationBarTitleText: 门店信息
</route>

<script lang="ts" setup>
const value = ref()
</script>

<template>
  <view
    py-24rpx px-40rpx flex flex-bt flex-ac bg-white
  >
    <view c-#3B3D3D f14>
      <view mb-2px>
        员工头像
      </view>
      <view f12 c-#C9CDD4>
        建议上传门店图片，方便客户了解你
      </view>
    </view>
    <view flex flex-ac gap-6px>
      <wd-upload :limit="1" action="https://ftf.jd.com/api/uploadImg" />
      <!-- <wd-icon name="arrow-right" size="16px" color="#bfbfbf" /> -->
    </view>
  </view>
  <view h-12px />
  <view mb12px>
    <view c-#969699 f14 mb-12px pl20px>
      门店名称
    </view>
    <view px40rpx py12px bg-white>
      <wd-input v-model="value" :maxlength="20" show-word-limit :no-border="true" />
    </view>
  </view>
  <view mb12px>
    <view c-#969699 f14 mb-12px pl20px>
      联系电话
    </view>
    <view px40rpx py12px bg-white>
      <wd-input v-model="value" :maxlength="20" show-word-limit :no-border="true" />
    </view>
  </view>
  <view mb12px>
    <view c-#969699 f14 mb-12px pl20px>
      所在地区
    </view>
    <view px40rpx py12px bg-white flex flex-ac flex-bt>
      <text f14 c-#C9CDD4>
        请选择省市区县、乡镇等
      </text>
      <wd-icon name="arrow-right" size="16px" color="#bfbfbf" />
    </view>
  </view>
  <view mb12px>
    <view c-#969699 f14 mb-12px pl20px>
      详细地址
    </view>
    <view px40rpx py12px bg-white>
      <wd-input v-model="value" :maxlength="20" show-word-limit :no-border="true" />
    </view>
  </view>
  <view mb12px>
    <view c-#969699 f14 mb-12px pl20px>
      门店简介
    </view>
    <view px40rpx py12px bg-white>
      <wd-textarea v-model="value" :auto-height="true" placeholderStyle="font-size: 14px;color:#bfbfbf;" :maxlength="100" show-word-limit :no-border="true" />
    </view>
  </view>
  <view mx-40rpx mt-64rpx color-white>
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>保存</text>
      </view>
    </wd-button>
  </view>
  <view h50px />
</template>

<style lang='scss' scoped>
:deep(.wd-textarea.is-no-border::after) {
  display: none !important;
}
:deep(.wd-radio-group) {
  line-height: 32 !important;
}
:deep(.wd-upload__evoke) {
  margin-bottom: 0 !important;
}
:deep(.wd-upload__evoke-num) {
  display: none;
}
:deep(.wd-upload__preview) {
  margin: 0 0 0 0 !important;
}
</style>
