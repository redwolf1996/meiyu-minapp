<route lang="yaml">
style:
  navigationBarTitleText: 预约详情
layout: false
</route>

<script lang="ts" setup>
import type { ListStaff } from '../staff/types'
import type { BookDetail } from './types'

const bookDetail = ref<BookDetail>()
const bookingId = ref(0)
const visibleStaff = ref(false)
const listStaff = ref<ListStaff[]>([])
const curStaff = ref<ListStaff>(null)
const activeIndex = ref(0)

onLoad((options) => {
  bookingId.value = Number(options?.id)
  getStaff()
})

onShow(async () => {
  getPageInfo()
})

async function getPageInfo() {
  const res = await request.get<BookDetail>(`/business/booking/${bookingId.value}`)
  bookDetail.value = res.data
  activeIndex.value = getActiveIndex()
}

async function getStaff() {
  const res = await request.get<ListRes<ListStaff>>('/business/staff', { storeId: storeId.value })
  listStaff.value = res.data.list.map((v) => {
    return {
      ...v,
      active: false,
    }
  })
}

function clickItem(item: ListStaff) {
  listStaff.value.forEach((val: any) => {
    val.active = false
  })
  item.active = !item.active
  if (item.active) {
    curStaff.value = item
  }
}

function confirmStaff() {
  bookDetail.value.artisanName = curStaff.value?.userName
  request.put<any>('/business/booking/artisan', {
    id: bookingId.value,
    artisanId: curStaff.value?.storeStaffId,
  })
  visibleStaff.value = false
}

async function cancelBooking() {
  await request.put<any>('/business/booking/status', { id: bookingId.value, status: 4 })
  uni.showToast({
    title: '已取消预约',
    icon: 'none',
  })
  getPageInfo()
}

async function doComplete() {
  await request.put(`/business/booking/status`, {
    id: bookingId.value,
    status: 3,
  })
  uni.showToast({ title: '已完成该笔订单' })
  getPageInfo()
}

async function doSign() {
  await request.put(`/business/booking/status`, {
    id: bookingId.value,
    status: 2,
  })
  uni.showToast({ title: '签到成功' })
  getPageInfo()
}

function toOrder() {
  uni.navigateTo({ url: `/pagesA/order/detail?id=${bookDetail.value.orderId}` })
}

async function toEditTime() {
  bookStime.value = ''
  bookInfo.value.bookId = bookingId.value
  bookInfo.value.artisanId = bookDetail.value.artisanId
  bookInfo.value.artName = bookDetail.value.artisanName
  bookInfo.value.service = bookDetail.value.bookingService.map((v) => {
    return {
      name: v.serviceName,
      duration: v.duration,
      goodsCount: v.count,
    }
  })

  uni.navigateTo({ url: `/pagesA/book/time` })
}

function toEditArt() {
  visibleStaff.value = true
}

function getActiveIndex() {
  if (bookDetail.value.bookingStatus === 1)
    return 0
  if (bookDetail.value.bookingStatus === 2)
    return 1
  if (bookDetail.value.bookingStatus === 3)
    return 2
  if (bookDetail.value.bookingStatus === 4)
    return 1
  return 0
}
</script>

<template>
  <page-meta :page-style="`overflow:${visibleStaff ? 'hidden' : 'visible'};`" />
  <wd-popup
    v-model="visibleStaff" :z-index="999" :lock-scroll="true" :safe-area-inset-bottom="false" position="right"
    custom-style="height: 100vh;width: 80%;background: #F9F9F9;"
  >
    <view tc f14 ps top-0 bg-white h-40px lh-40px>
      选择手艺人
    </view>
    <view mt10px>
      <view v-for="(item, index) in listStaff" :key="`sd-${index}`" flex flex-ac flex-bt bg-white px40rpx py20rpx style="border-bottom: 1px solid #DFDFDF" @click="clickItem(item)">
        <view>
          <view f14 c-313131>
            {{ item.userName }}
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
    </view>

    <view tc flex flex-cc color-white bg-white bottom-0 ps py-20px @click="confirmStaff()">
      <MyButton width="500rpx">
        确定
      </MyButton>
    </view>
  </wd-popup>
  <view p-32rpx>
    <view bg-white px-34rpx py-40rpx>
      <view flex flex-ac gap-20rpx>
        <wd-img
          :width="18"
          :height="18"
          :src="`${IMG_BASE}/icon-cus.png`"
        />
        <text fs-34>
          客户
        </text>
      </view>
      <view rd-16rpx mt-20rpx bg-F0F0F0 py-18rpx px-32rpx flex flex-ac gap-32rpx>
        <wd-img
          :width="48"
          :height="48"
          :round="true"
          :src="DEFAULT_AVATAR"
        />
        <view flex flex-y flex-bt flex-1 gap-20rpx>
          <view f16>
            {{ bookDetail?.storeCustomerName }}
          </view>
          <view flex flex-ac flex-bt>
            <view flex flex-ac gap-16rpx>
              <text c-929292 fs-28 lh-28rpx>
                {{ bookDetail?.storeCustomerPhone }}
              </text>
              <wd-img
                v-if="bookDetail?.customerCardC"
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-v.png`"
              />
            </view>
            <view f12>
              <text c-929292>
                会员卡
              </text>
              <text c-00BB00>
                {{ bookDetail?.customerCardC }}张
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view bg-white px-34rpx py-40rpx mt-16px>
      <view flex flex-ac gap-20rpx>
        <wd-img
          :width="18"
          :height="18"
          :src="`${IMG_BASE}/icon-book.png`"
        />
        <text fs-34>
          预约信息
        </text>
      </view>
      <view v-if="bookDetail?.storeServiceType === 1" mt-36rpx dib px-8px c-FF5A5F bg-FCE8E9 fs-22 h-20px lh-20px tc>
        预约到店
      </view>
      <view v-if="bookDetail?.storeServiceType === 2" mt-36rpx dib px-8px c-00CCD8 bg-CCF3F6 fs-22 h-20px lh-20px tc>
        预约上门
      </view>
      <view mt-10px f12 c-818181>
        预约时间：<text c-232220>
          {{ bookStime || fdt(bookDetail?.startTime) }}
        </text>
        <text v-if="bookDetail?.bookingStatus === 1" theme-color @click="toEditTime()">
          &nbsp;&nbsp;修改
        </text>
      </view>
      <view mt-10px f12 c-818181>
        预约人：<text c-232220>
          {{ bookDetail?.storeCustomerName ?? '--' }}
        </text>
      </view>
      <view mt-10px f12 c-818181>
        手机号：<text c-232220>
          {{ bookDetail?.storeCustomerPhone ?? '--' }}
        </text>
      </view>
      <view mt-10px f12 c-818181>
        手艺人：<text c-232220>
          {{ bookDetail?.artisanName || '未分配' }}
        </text>
        <text v-if="bookDetail?.bookingStatus === 1" theme-color @click="toEditArt()">
          &nbsp;&nbsp;修改
        </text>
      </view>
      <view v-if="bookDetail?.notes" mt-10px f12 c-818181>
        备注：<text c-232220>
          {{ bookDetail?.notes }}
        </text>
      </view>
      <view v-if="bookDetail?.customerAddress" mt-10px f12 c-818181>
        上门地址：<text c-232220>
          {{ bookDetail?.customerAddress }}
        </text>
      </view>
      <!-- TODO 等做客户端的时候放上核销码 -->
      <!-- <view style="height: 1px;background-color: #E6E6E6" wp-100 mt10px />
      <view f14 tc mt-10px>
        核销码&#12288;1780012312312
      </view> -->
    </view>
    <view bg-white px-34rpx py-40rpx mt-16px>
      <view flex flex-ac gap-20rpx>
        <wd-img
          :width="18"
          :height="18"
          :src="`${IMG_BASE}/icon-book.png`"
        />
        <text fs-34>
          预约服务
        </text>
      </view>
      <view f14 c-1E1E1E mt-40rpx mb-20rpx>
        {{ bookDetail?.storeName }}
      </view>
      <view flex flex-y gap-10px>
        <view v-for="(item, index) in bookDetail?.bookingService" :key="`asd-${index}`" flex flex-ac gap-12px>
          <wd-img
            :width="72"
            :height="72"
            radius="10"
            mode="aspectFill"
            :src="item?.serviceCoverImg"
          />
          <view flex-1 flex flex-y flex-bt h-72px>
            <view>
              <view c-3B3D3D f14>
                {{ item?.serviceName }}
              </view>
              <view c-7C7C7C fs-22 mt-8rpx>
                服务时长：{{ item.duration }}分钟
              </view>
            </view>
            <view flex flex-ac flex-bt>
              <view c-FF1919 f18 lh-18px>
                ¥{{ item.amount }}
              </view>
              <view c-7C7C7C f12 lh-12px>
                x{{ item.count }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view bg-white px-34rpx py-40rpx mt-16px>
      <view flex flex-ac flex-bt>
        <view flex flex-ac gap-20rpx>
          <wd-img
            :width="18"
            :height="18"
            :src="`${IMG_BASE}/icon-book.png`"
          />
          <text fs-34>
            服务记录
          </text>
        </view>
        <view
          class="my-status-tag" :class="{
            'to-service': bookDetail?.bookingStatus === 1,
            'in-service': bookDetail?.bookingStatus === 2,
            'end-service': bookDetail?.bookingStatus === 3,
            'cancel-service': bookDetail?.bookingStatus === 4,
          }"
        >
          {{ bookDetail?.bookingStatusDesc }}
        </view>
      </view>
      <view class="h-20px" />
      <wd-steps :active="activeIndex" vertical dot>
        <wd-step>
          <template #title>
            创建
          </template>
          <template #description>
            <view c-#808089>
              {{ bookDetail?.bookingRecord.createHandleTypeDesc ?? '--' }}创建
            </view>
            <view c-#808089>
              {{ bookDetail?.bookingRecord.createTime ?? '--' }}
            </view>
          </template>
        </wd-step>
        <wd-step v-if="bookDetail?.bookingStatus !== 4">
          <template #title>
            <text>
              签到时间
            </text>
          </template>
          <template #description>
            <template v-if="bookDetail?.bookingStatus === 1">
              <view c-#808089 fs-14px lh-22px>
                客户到店后进行签到以记录服务开始时间，预约状态进入"服务中"
              </view>
              <view mt10px>
                <button class="my-btn complete" style="width: 80px;" @click="doSign()">
                  签到
                </button>
              </view>
            </template>
            <view v-else c-#808089>
              {{ bookDetail?.bookingRecord.signTime ?? '--' }}
            </view>
          </template>
        </wd-step>
        <wd-step v-if="bookDetail?.bookingStatus !== 4">
          <template #title>
            <text>
              完成时间
            </text>
          </template>
          <template #description>
            <template v-if="bookDetail?.bookingStatus === 1 || bookDetail?.bookingStatus === 2">
              <view c-#808089 fs-14px lh-22px>
                服务完成后点击结束，预约状态进入"已完成"
              </view>
              <view mt10px>
                <button class="my-btn complete" style="width: 80px;" @click="doComplete()">
                  完成
                </button>
              </view>
            </template>
            <view v-else c-#808089>
              {{ bookDetail?.bookingRecord.finishTime ?? '--' }}
            </view>
          </template>
        </wd-step>
        <wd-step v-if="bookDetail?.bookingStatus === 4">
          <template #title>
            <text>
              取消时间
            </text>
          </template>
          <template #description>
            <view c-#808089>
              商家取消
            </view>
            <view c-#808089>
              {{ bookDetail?.bookingRecord.cancelTime ?? '--' }}
            </view>
          </template>
        </wd-step>
      </wd-steps>
    </view>

    <view flex flex-cc mt-16px px-60rpx gap10px>
      <button v-if="bookDetail?.bookingStatus === 1" class="my-btn cancel" @click="cancelBooking()">
        取消
      </button>
      <button class="my-btn complete" @click="toOrder()">
        查看订单
      </button>
    </view>
  </view>
  <wu-safe-bottom />
</template>

<style lang='scss' scoped>
:deep(.wd-step__icon.is-dot) {
  border: none !important;
}
:deep(.wd-step.is-finished > .wd-step__header > .wd-step__line) {
  background: #1a66ff !important;
}
</style>
