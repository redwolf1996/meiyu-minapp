<route lang="yaml">
layout: common
style:
  navigationBarTitleText: 预约详情
</route>

<script lang="ts" setup>
import type { BookDetail } from './types'

const bookDetail = ref<BookDetail>()
const bookingId = ref(0)
onLoad(async (options) => {
  bookingId.value = options?.id
  const res = await request.get<BookDetail>(`/business/booking/${bookingId.value}`)
  bookDetail.value = res.data
})

function cancelDetail() {
  uni.navigateBack()
}

function toEdit() {
  uni.navigateTo({ url: `/pagesA/book/add?id=${bookingId.value}` })
}

function toOrder() {
  uni.navigateTo({ url: `/pagesA/order/detail?id=${bookingId.value}` })
}
</script>

<template>
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
          :src="`${IMG_BASE}/cat.png`"
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
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-v1.png`"
              />
            </view>
            <view f12>
              <text c-929292>
                会员卡
              </text>
              <text c-00BB00>
                2张
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
      <view mt-36rpx dib px-8px c-00CCD8 bg-CCF3F6 fs-22 h-20px lh-20px tc>
        预约上门
      </view>
      <!-- <view mt-36rpx dib px-8px c-FF5A5F bg-FCE8E9 fs-22 h-20px lh-20px tc>
        预约到店
      </view> -->
      <view mt-10px f12 c-818181>
        预约时间：<text c-232220>
          2022
        </text>
      </view>
      <!-- <view mt-10px f12 c-818181>
        预约人：<text c-232220>
          2022
        </text>
      </view>
      <view mt-10px f12 c-818181>
        手机号：<text c-232220>
          2022
        </text>
      </view> -->
      <view mt-10px f12 c-818181>
        手艺人：<text c-232220>
          {{ bookDetail?.artisanName ?? '未分配' }}
        </text>
      </view>
      <view mt-10px f12 c-818181>
        备注：<text c-232220>
          {{ bookDetail?.notes }}
        </text>
      </view>
      <view mt-10px f12 c-818181>
        地址：<text c-232220>
          {{ bookDetail?.customerAddress }}
        </text>
      </view>
      <view style="height: 1px;background-color: #E6E6E6" wp-100 mt10px />
      <view f14 tc mt-10px>
        核销码&#12288;1780012312312
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
          预约服务
        </text>
      </view>
      <view f14 c-1E1E1E mt-40rpx mb-20rpx>
        元素美容美甲店
      </view>
      <view flex flex-ac gap-12px>
        <wd-img
          :width="72"
          :height="72"
          radius="10"
          :src="`${IMG_BASE}/cat.png`"
        />
        <view flex-1 flex flex-y flex-bt h-72px>
          <view>
            <view c-3B3D3D f14>
              面部清洁补水
            </view>
            <view c-7C7C7C fs-22 mt-8rpx>
              服务时长：60分钟
            </view>
          </view>
          <view flex flex-ac flex-bt>
            <view c-FF1919 f18 lh-18px>
              ¥198
            </view>
            <view c-7C7C7C f12 lh-12px>
              x1
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
        <view class="my-status-tag to-service">
          待服务
        </view>
      </view>
      <view class="h-20px" />
      <wd-steps :active="1" vertical>
        <wd-step description="注册1个账号" />
        <wd-step description="登录账号并绑定手机" />
        <wd-step description="完善个人信息" />
      </wd-steps>
    </view>

    <view flex flex-cc mt-16px px-60rpx gap10px>
      <button class="my-btn cancel" @click="cancelDetail()">
        取消
      </button>
      <button class="my-btn complete" @click="toEdit()">
        修改
      </button>
      <button class="my-btn complete" @click="toOrder()">
        查看订单
      </button>
    </view>
  </view>
</template>

<style lang='scss' scoped></style>
