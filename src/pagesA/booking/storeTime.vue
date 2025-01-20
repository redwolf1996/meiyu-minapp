<route lang="yaml">
style:
  navigationBarTitleText: 门店营业时间
</route>

<script lang="ts" setup>
import type { Data } from './types'

const val = ref()
const sources: any = ref([
  { label: '周一', value: 1, isActive: false },
  { label: '周二', value: 2, isActive: false },
  { label: '周三', value: 3, isActive: false },
  { label: '周四', value: 4, isActive: false },
  { label: '周五', value: 5, isActive: false },
  { label: '周六', value: 6, isActive: false },
  { label: '周日', value: 7, isActive: false },
])
const info = ref<Data>(null)
const showPop = ref(false)
const value1 = ref<string>('09:00')
const value2 = ref<string>('21:00')

onShow(async () => {
  const res = await request.get<Data>(`/business/store/${storeId.value}`)
  info.value = res.data
  val.value = info.value.workWeek
  value1.value = info.value.workStime?.slice(0, -3)
  value2.value = info.value.workEtime?.slice(0, -3)
})

function showPicker() {
  showPop.value = true
}

function confirm() {
  showPop.value = false
}

watch(
  () => val.value,
  async (newValue) => {
    sources.value.forEach((item: any) => {
      item.isActive = newValue?.includes(item.value)
    })
  },
  {
    deep: true,
    immediate: true,
  },
)

async function save() {
  await request.put(`/business/store-work-time`, {
    storeId: storeId.value,
    start: `${value1.value}:00`,
    end: `${value2.value}:00`,
    week: val.value,
  })
  uni.navigateBack()
}
</script>

<template>
  <view px-20px py-12px f12 lh-18px c-FF6619 bg-FFEFE6>
    门店营业时间指的是店铺上班的时间，该时间内您需要及时响应客户到店的预约。设置门店正确的营业时间可以降低取消率，提高店铺业绩。
  </view>
  <view p-20px bg-fff my-10px>
    <view c-141414 f16 fb mb-16px>
      选择每周可营业的天数
    </view>
    <GridTagSelect v-model="val" :sources="sources" :columns="3" mode="multiple" />
  </view>
  <MyCellGroup>
    <MyCell label="每天可营业时段" noBorder @myclick="showPicker">
      <text f14 c-3B3D3D>
        {{ value1 }}-{{ value2 }}
      </text>
    </MyCell>
  </MyCellGroup>

  <view color-white fixed bottom-30px x-center style="width: calc(100% - 40px);" @click="save">
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>保存</text>
      </view>
    </wd-button>
  </view>

  <wd-popup v-model="showPop" position="bottom" custom-style="height: 350px;">
    <view tc mt10px fb>
      工作时间
    </view>
    <view h-12px />
    <view flex flex-cc gap-10px>
      <view wp50>
        <wd-datetime-picker-view v-model="value1" :filter="filter15Minutes" type="time" />
      </view>
      <view>-</view>
      <view wp50>
        <wd-datetime-picker-view v-model="value2" :filter="filter15Minutes" type="time" />
      </view>
    </view>

    <view mx-40rpx mt-20rpx color-white @click="confirm">
      <wd-button size="large" custom-class="theme-bg" block>
        <view flex flex-cc>
          <text>确定</text>
        </view>
      </wd-button>
    </view>
  </wd-popup>
</template>
