<route lang="yaml">
style:
  navigationBarTitleText: 上门服务时间
</route>

<script lang="ts" setup>
const val = ref()
const sources: any = [
  { label: '周一', value: 1, isActive: false },
  { label: '周二', value: 2, isActive: false },
  { label: '周三', value: 3, isActive: false },
  { label: '周四', value: 4, isActive: false },
  { label: '周五', value: 5, isActive: false },
  { label: '周六', value: 6, isActive: false },
  { label: '周日', value: 7, isActive: false },
]
</script>

<template>
  <view px-20px py-12px f12 lh-18px c-#FF6619 bg-#FFEFE6>
    可服务时间指的是您可上门服务的时间，该时间内您需要及时响应用户上门服务的新订单。设置与您服务能力相符的服务时间可以降低取消率，提高店铺业绩。
  </view>
  <view p-20px bg-#fff my-10px>
    <view c-#141414 f16 fb mb-16px>
      选择每周可服务的天数
    </view>
    <GridTagSelect v-model="val" :sources="sources" :columns="3" mode="multiple" />
  </view>
  <MyCellGroup>
    <MyCell label="每天可服务时段">
      <span f14 c-#3B3D3D>09:00-21:00</span>
    </MyCell>
  </MyCellGroup>
</template>

<style lang='scss' scoped></style>
