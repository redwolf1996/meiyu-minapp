<route lang="yaml">
style:
  navigationBarTitleText: 员工列表
</route>

<script lang="ts" setup>
import type { ListStaff } from './types'

const reqParams = reactive({
  storeId: storeId.value,
})
const dataList = ref<ListStaff[]>([])
const total = ref(0)

onShow(() => {
  getList()
})

function toAdd() {
  uni.navigateTo({ url: '/pagesA/staff/add' })
}

function toStaffDetail(id: number) {
  uni.navigateTo({ url: `/pagesA/staff/detail?id=${id}` })
}

async function getList() {
  const res = await request.get<ListRes<ListStaff>>('/business/staff', reqParams)
  dataList.value = res.data.list
  total.value = res.data.total
}
</script>

<template>
  <view bg-white flex flex-ac flex-bt py-10px px-36rpx>
    <view c-969699 f14>
      已添加&#12288;{{ total }}
    </view>
    <view class="plus" @click="toAdd()">
      <wd-img
        :width="14"
        :height="14"
        :src="`${IMG_BASE}/icon-plus.png`"
      />
    </view>
  </view>
  <view px-20rpx py-10rpx>
    <view
      v-for="(item, index) in dataList" :key="`ss-${index}`"
      py-30rpx pl-30rpx pr-40rpx flex flex-ac flex-bt mb20px class="border-gray"
      @click="toStaffDetail(item.storeStaffId)"
    >
      <view flex flex-ac flex-bt gap-40rpx>
        <wd-img
          :width="75"
          :height="75"
          mode="aspectFill"
          :radius="12"
          :src="item?.avatar || DEFAULT_AVATAR"
        />
        <view flex flex-y flex-bt py-14rpx h-75px>
          <view f12>
            {{ item?.userName || '--' }}
          </view>
          <view f12>
            {{ item?.phone || '--' }}
          </view>
          <view f10 flex flex-ac gap-10rpx>
            <wd-icon name="star-filled" size="10px" color="#FFC960" />
            <text>{{ item?.jobDesc || '--' }}</text>
            <view w-6rpx h-6rpx round style="background-color: #91919F;" />
            <text c-91919F>
              {{ item?.roleDesc || '--' }}
            </text>
          </view>
        </view>
      </view>
      <wd-icon name="arrow-right" size="22px" color="#1A66FF" />
    </view>
  </view>
</template>

<style>
page {
  background-color: #fff;
}
</style>

<style lang='scss' scoped>
.border-gray {
  border: 1px solid rgba(2, 53, 55, 0.12);
  border-radius: 10px;
}
.plus {
  width: 36px;
  height: 36px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #fcfcfc;
  border-radius: 8px;
  box-shadow:
    -1px -1px 16px rgba(0, 0, 0, 0.08),
    4px 4px 8px rgba(0, 0, 0, 0.08);
}
</style>
