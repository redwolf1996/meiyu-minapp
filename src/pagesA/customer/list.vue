<route lang="yaml">
layout: common
style:
  navigationBarTitleText: 选择或添加客户
</route>

<script lang="ts" setup>
import type { CusList } from '../tabs/types'
import { cloneDeep } from 'lodash-es'

const reqParams = reactive({
  storeId: storeId.value,
  pageNum: 1,
  pageSize: 10000,
})
const list = ref<CusList[]>([])
const tmpList = ref<CusList[]>([])
const tmpCurCustomer = ref<CusList>(null)

function clickItem(item: CusList) {
  list.value.forEach((val: any) => {
    val.active = false
  })
  item.active = !item.active
  if (item.active) {
    tmpCurCustomer.value = item
  }
}

function save() {
  curCustomer.value = tmpCurCustomer.value
  uni.navigateBack()
}

onShow(async () => {
  const res = await request.get<ListRes<CusList>>('/business/store-customer', reqParams)
  list.value = res.data.list.map((v) => {
    return {
      ...v,
      active: false,
    }
  })
  tmpList.value = cloneDeep(list.value)
})

function cancelSearch() {
  uni.navigateBack()
}

function changeSearch({ value }) {
  if (value === null || value === '' || value === undefined) {
    list.value = tmpList.value
  }
  else {
    list.value = tmpList.value.filter((v) => {
      return !!(v.phone.includes(value) || v.name.includes(value))
    })
  }
}

function toAddCus() {
  uni.navigateTo({ url: '/pagesA/customer/add?from=list' })
}
</script>

<template>
  <view>
    <wd-search custom-class="search-fixed" placeholder="请输入客户姓名或手机号" cancel-txt="取消" @cancel="cancelSearch()" @change="changeSearch" />
    <view tc lh-40px font-size-14px theme-color bg-white @click="toAddCus()">
      +&nbsp;&nbsp;添加客户
    </view>
    <view v-for="(item, index) in list" :key="`sd-${index}`" flex flex-ac flex-bt bg-white px40rpx py20rpx style="border-bottom: 1px solid #DFDFDF" @click="clickItem(item)">
      <view>
        <view f14 c-313131 flex flex-ac gap5px>
          <text>{{ item.name }}</text>
          <wd-img
            v-if="item?.level === 2"
            style="transform: translateY(2px);"
            :width="16"
            :height="16"
            :src="`${IMG_BASE}/icon-v.png`"
          />
        </view>
        <view f12 c-777777 mt6px>
          {{ item.phone }}
        </view>
      </view>
      <wd-img
        v-if="item.active"
        :width="26"
        :height="19"
        :src="`${IMG_BASE}/icon-correct.png`"
      />
    </view>
    <view h50px />
    <view class="h50px" />
    <view color-white fixed bottom-50px x-center style="width: calc(100% - 40px);" @click="save">
      <wd-button size="large" custom-class="theme-bg" block>
        <view flex flex-cc>
          <text>确定</text>
        </view>
      </wd-button>
    </view>
  </view>
</template>

<style lang='scss' scoped>

</style>
