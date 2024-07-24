<route lang="yaml">
style:
  navigationBarTitleText: 我的
</route>

<script lang="ts" setup></script>

<template>
  <view p20px bg-white>
    <view flex flex-ac gap12px>
      <wd-img
        :round="true"
        :width="56"
        :height="56"
        :src="`${IMG_BASE}/cat.png`"
      />
      <view flex-1 flex flex-y flex-bt h64px pr>
        <view c-#141414 f18>
          Hailey
        </view>
        <view flex flex-ac gap5px>
          <text class="yy">
            营业中
          </text>
          <text f14 c-#969699>
            18888888888
          </text>
        </view>
        <view c-#969699>
          店铺拥有者
        </view>
        <view tc pa right-0 top-4px>
          <view c-#969699 fs-20 mb2px>
            积分
          </view>
          <view f18>
            100
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.yy {
  padding: 2px 4px;
  font-size: 11px;
  line-height: 12px;
  color: #fff;
  background-color: #ff6619;
  text-align: center;
}
</style>
