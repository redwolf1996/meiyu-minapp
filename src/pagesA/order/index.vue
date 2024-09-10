<route lang="yaml">
style:
  navigationBarTitleText: 订单列表
</route>

<script lang="ts" setup>
const tab = ref<number>(0)
const items = [{
  label: '待支付',
  value: 0,
}, {
  label: '待服务',
  value: 1,
}, {
  label: '已完成',
  value: 2,
}, {
  label: '已取消',
  value: 3,
}, {
  label: '全部',
  value: 4,
}]
</script>

<template>
  <wd-tabs v-model="tab" :lineHeight="2" :lineWidth="24" color="#1A66FF">
    <block v-for="item in items" :key="`t${item.value}`">
      <wd-tab :title="item.label" />
    </block>
  </wd-tabs>
  <view p16px>
    <view px16px py20px bg-white rd-8px>
      <view flex flex-ac flex-bt>
        <view f14>
          2024-04-20 17:34:20
        </view>
        <view class="my-status-tag end-service">
          已完成(退款成功)
        </view>
      </view>
      <view flex flex-ac flex-bt gap-8px mt20px>
        <wd-img
          :width="40"
          :height="40"
          :radius="8"
          :src="`${IMG_BASE}/cat.png`"
        />
        <view h40px flex flex-y flex-bt flex-1>
          <view c-28282B f14 flex-bt flex flex-ac>
            <view>面部清洁补水</view>
            <view>￥98</view>
          </view>
          <view c-717171 f12>
            基础版&nbsp;&nbsp;x1
          </view>
        </view>
      </view>
      <view h1px mt10px bg-EBEBF0 />
      <view mt12px flex flex-bt flex-ac>
        <view f12>
          MY2024040910101000045
        </view>
        <view c-FF4070 f16>
          合计收款：¥98
        </view>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped></style>
