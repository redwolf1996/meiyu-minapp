<route lang="yaml">
style:
  navigationBarTitleText: 预约管理
</route>

<script lang="ts" setup>
const toast = useToast()
const form = ref()
const model: any = reactive({})
const checked = ref(true)

function test() {
  toast.show('世界你好')
}
</script>

<template>
  <view>
    <wd-form ref="form" :model="model">
      <MyCellGroup>
        <MyCell label="门店营业状态">
          <wd-switch v-model="checked" />
        </MyCell>
        <MyCell label="门店营业时间" @click="test">
          <view f12 c-#3B3D3D tr>
            <view>
              09:00-21:00
            </view>
            <view>周一, 周二，周三，周四，周日</view>
          </view>
        </MyCell>
        <MyCell label="上门服务时间" no-border @click="test">
          <view tr f12 c-#3B3D3D>
            <view>
              09:00-21:00
            </view>
            <view>
              周一至周日
            </view>
          </view>
        </MyCell>
      </MyCellGroup>
    </wd-form>
  </view>
</template>

<style lang='scss' scoped>
.cell {
  border-bottom: 1px solid #ebeef1;
}
</style>
