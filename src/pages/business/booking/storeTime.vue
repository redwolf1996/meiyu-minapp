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
    门店营业时间指的是店铺上班的时间，该时间内您需要及时响应客户到店的预约。设置门店正确的营业时间可以降低取消率，提高店铺业绩。
  </view>
  <view p-20px bg-#fff my-10px>
    <view c-#141414 f16 fb mb-16px>
      选择每周可营业的天数
    </view>
    <GridTagSelect v-model="val" :sources="sources" :columns="3" mode="multiple" />
  </view>
  <MyCellGroup>
    <MyCell label="每天可营业时段">
      <span f14 c-#3B3D3D>09:00-21:00</span>
    </MyCell>
  </MyCellGroup>
</template>

  <style lang='scss' scoped></style>

<route lang="yaml">
style:
  navigationBarTitleText: 门店营业时间
</route>

<style lang='scss' scoped></style>
