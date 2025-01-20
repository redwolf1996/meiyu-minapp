<route lang="yaml">
style:
  navigationBarTitleText: 预约管理
</route>

<script lang="ts" setup>
import type { Data } from './types'

const info = ref<Data>(null)
const checked = ref(false)

onShow(async () => {
  const res = await request.get<Data>(`/business/store/${storeId.value}`)
  info.value = res.data
  if (info.value.status === 1) {
    checked.value = true
  }
  else {
    checked.value = false
  }
})

function toStoreTime() {
  uni.navigateTo({
    url: '/pagesA/booking/storeTime',
  })
}

// function toD2dTime() {
//   uni.navigateTo({
//     url: '/pagesA/booking/d2dTime',
//   })
// }

async function change({ value }) {
  await request.put('/business/store-status', {
    storeId: storeId.value,
    status: value ? 1 : 2,
  })
}

function getWeeksDesc(weeks: number[] | null) {
  if (!weeks)
    return '日期未设置'
  if (weeks.length === 7)
    return '周一至周日'
  const weeksDesc = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  return weeks.map(week => weeksDesc[week - 1]).join('、')
}
</script>

<template>
  <view>
    <MyCellGroup>
      <MyCell label="门店营业状态" :show-arrow="false">
        <wd-switch v-model="checked" :active-color="themeColor" @change="change" />
      </MyCell>
      <MyCell noBorder label="门店营业时间" @myclick="toStoreTime">
        <view f12 c-3B3D3D tr>
          <view>
            {{ info?.workStime?.slice(0, -3) }}-{{ info?.workEtime?.slice(0, -3) }}
          </view>
          <view>{{ getWeeksDesc(info?.workWeek) }}</view>
        </view>
      </MyCell>
      <!-- <MyCell label="上门服务时间" no-border @myclick="toD2dTime">
        <view tr f12 c-3B3D3D>
          <view>
            {{ info?.toDoorStime?.slice(0, -3) }}-{{ info?.toDoorEtime?.slice(0, -3) }}
          </view>
          <view>{{ getWeeksDesc(info?.toDoorWeek) }}</view>
        </view>
      </MyCell> -->
    </MyCellGroup>

    <!-- <view mt-22px mb-11px pl-20px f14 c-969699>
        开店
      </view>

      <MyCellGroup>
        <MyCell label="店铺主页" />
        <MyCell label="店铺二维码" no-border @myclick="test">
          <wd-img
            :width="20"
            :height="20"
            :src="`${IMG_BASE}/icon-qrcode.png`"
          />
        </MyCell>
      </MyCellGroup> -->
  </view>
</template>

<style lang='scss' scoped>
.cell {
  border-bottom: 1px solid #ebeef1;
}
</style>
