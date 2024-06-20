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

      <view mt-22px mb-11px pl-20px f14 c-#969699>
        开店
      </view>

      <MyCellGroup>
        <MyCell label="店铺主页" />
        <MyCell label="店铺二维码" @click="test">
          <wd-img
            :width="20"
            :height="20"
            :src="`${IMG_BASE}/icon-qrcode.png`"
          />
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
