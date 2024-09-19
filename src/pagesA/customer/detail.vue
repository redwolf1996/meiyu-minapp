<route lang="yaml">
style:
  navigationBarTitleText: 客户详情
</route>

<script lang="ts" setup>
import type { CustomerDetail } from './types'

defineOptions({ inheritAttrs: false })
const showCard = ref(false)
const cardValue = ref(1)
const value = ref(0)
const sources: any = [
  { label: '充值', value: 1, isActive: false },
]
const sources3: any = [
  { label: '折扣卡', value: 1, isActive: true },
  { label: '充值卡', value: 2, isActive: false },
  { label: '通卡', value: 3, isActive: true },
  { label: '有限次卡', value: 4, isActive: false },
  { label: '不限次卡', value: 5, isActive: true },
]
const tab = ref<number>(2)
const tabs = [{
  label: '订单记录',
  value: 0,
}, {
  label: '预约记录',
  value: 1,
}, {
  label: '会员档案',
  value: 2,
}]

onLoad((options) => {
  getInfo(+options?.id)
})

async function getInfo(storeCustomerId: number) {
  await request.get<CustomerDetail>(`/business/store-customer/${storeCustomerId}`)
}
console.log(isH5)
</script>

<template>
  <view ps z-100 :class="isH5 ? 'top-44px' : 'top-0'">
    <view flex flex-ac p-40rpx gap-40rpx bg-white>
      <wd-img
        :round="true"
        :width="64"
        :height="64"
        :src="`${IMG_BASE}/cat.png`"
      />
      <view h-136rpx flex-1 flex flex-bt flex-y>
        <view f18>
          李如霞
        </view>
        <view flex flex-bt flex-ac>
          <view f12>
            18777777777
          </view>
          <wd-img
            :round="true"
            :width="16"
            :height="16"
            :src="`${IMG_BASE}/icon-call.png`"
          />
        </view>
        <view flex flex-ac gap-10rpx>
          <wd-img
            :round="true"
            :width="16"
            :height="16"
            :src="`${IMG_BASE}/icon-v.png`"
          />
          <view class="tag">
            永久有效
          </view>
        </view>
      </view>
    </view>
    <view grid grid-cols-3 p-40rpx bg-white f14>
      <view>
        <view c-818181>
          余额
        </view>
        <view mt-16rpx>
          ￥1000.0
        </view>
      </view>
      <view>
        <view c-818181 flex flex-ac>
          会员卡
          <wd-img
            :width="16"
            :height="16"
            :src="`${IMG_BASE}/icon-arrow-right2.png`"
          />
        </view>
        <view mt-16rpx>
          2
        </view>
      </view>
      <view>
        <view c-818181 flex flex-ac>
          可用积分
          <wd-img
            :width="16"
            :height="16"
            :src="`${IMG_BASE}/icon-arrow-right2.png`"
          />
        </view>
        <view mt-16rpx>
          32
        </view>
      </view>
    </view>
    <view class="bs" />
    <wd-tabs v-model="tab">
      <block v-for="item in tabs" :key="item">
        <wd-tab :title="item.label" />
      </block>
    </wd-tabs>
  </view>

  <!-- 内容区 -->
  <view>
    <!-- 订单记录 -->
    <template v-if="tab === 0">
      <view bg-white grid grid-cols-3 tc px-30px py-16px>
        <view>
          <view f14 mb10rpx>
            ¥790
          </view>
          <view f13 c-818181>
            累计消费
          </view>
        </view>
        <view>
          <view f14 mb10rpx>
            6
          </view>
          <view f13 c-818181>
            消费次数
          </view>
        </view>
        <view>
          <view f14 mb10rpx>
            2024-05-13
          </view>
          <view f13 c-818181>
            上次消费
          </view>
        </view>
      </view>
      <view p32rpx>
        <view px-16px py-20px bg-white rd-8px mb-12px>
          <view flex flex-ac flex-bt>
            <text>2024-04-20 17:34:20</text>
            <text class="my-status-tag end-service">
              已完成
            </text>
          </view>
          <view flex flex-ac mt20px gap-8px pb-10px>
            <wd-img
              :width="40"
              :height="40"
              radius="8px"
              :src="`${IMG_BASE}/cat.png`"
            />
            <view flex-1 flex flex-y flex-bt h-42px>
              <view f14 flex flex-bt>
                <view>面部清洁补水</view>
                <view>￥98</view>
              </view>
              <view f12 c-717171>
                基础版 x1
              </view>
            </view>
          </view>
          <view h-1px bg-EBEBF0 />
          <view flex flex-ac flex-bt pt-12px>
            <view>MY2024040910101000045</view>
            <view c-FF4070>
              实付：￥98
            </view>
          </view>
        </view>
        <view px-16px py-20px bg-white rd-8px mb-12px>
          <view flex flex-ac flex-bt>
            <text>2024-04-20 17:34:20</text>
            <text class="my-status-tag end-service">
              已完成
            </text>
          </view>
          <view flex flex-ac mt20px gap-8px pb-10px>
            <wd-img
              :width="40"
              :height="40"
              radius="8px"
              :src="`${IMG_BASE}/cat.png`"
            />
            <view flex-1 flex flex-y flex-bt h-42px>
              <view f14 flex flex-bt>
                <view>面部清洁补水</view>
                <view>￥98</view>
              </view>
              <view f12 c-717171>
                基础版 x1
              </view>
            </view>
          </view>
          <view h-1px bg-EBEBF0 />
          <view flex flex-ac flex-bt pt-12px>
            <view>MY2024040910101000045</view>
            <view c-FF4070>
              实付：￥98
            </view>
          </view>
        </view>
      </view>
    </template>
    <!-- 预约记录 -->
    <template v-if="tab === 1">
      <BookList :showTabs="false" />
    </template>
    <!-- 会员档案 -->
    <template v-if="tab === 2">
      <view p16px>
        <view py20px px16px bg-white>
          <view flex flex-ac flex-bt mb16px>
            <view>基本档案</view>
            <view flex flex-ac>
              <text theme-color f14 lh-14px transform-translate-y--1px>
                编辑
              </text>
              <wd-img
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-arrow-right2.png`"
              />
            </view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>姓名：</view>
            <view>麦子欢</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>备注名：</view>
            <view>麦子欢</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>手机号：</view>
            <view>麦子欢</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>客户来源：</view>
            <view>麦子欢</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>性别：</view>
            <view>麦子欢</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>生日：</view>
            <view>麦子欢</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>微信：</view>
            <view>麦子欢</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>地址：</view>
            <view>麦子欢</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>详细地址：</view>
            <view>麦子欢</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>营销顾问：</view>
            <view>麦子欢</view>
          </view>
          <view c-434343 flex flex-ac flex-bt f14>
            <view>客户备注：</view>
            <view>麦子欢</view>
          </view>
        </view>
      </view>
    </template>
  </view>
  <view h-100px />

  <wd-action-sheet v-model="showCard" title="选择开卡/充值类型" @close="showCard = false">
    <view p-40rpx>
      <view mb20px>
        开卡
      </view>
      <GridTagSelect v-model="cardValue" :sources="sources3" :columns="3" />
      <view class="h20px" />
      <view mb20px>
        充值
      </view>
      <GridTagSelect v-model="value" :sources="sources" :columns="3" />
      <button class="my-btn theme" wp100 mt-30px>
        确定
      </button>
    </view>
  </wd-action-sheet>

  <view pf bottom-0 wp100 style="border-top: 1px solid #eee">
    <!-- <view h32rpx bg-F5F5FA /> -->
    <view p-40rpx grid grid-cols-3 grid-gap-10px bg-white>
      <view class="my-btn theme-out rd0" @click="showCard = true">
        开卡充值
      </view>
      <view class="my-btn theme-out rd0">
        开单
      </view>
      <view class="my-btn theme rd0">
        预约
      </view>
    </view>
  </view>
</template>

<style>
:deep(.wd-action-sheet__popup) {
  z-index: 12000 !important;
  box-shadow:
    -1px -1px 16px rgba(0, 0, 0, 0.2),
    4px 4px 8px rgba(0, 0, 0, 0.2) !important;
}
</style>

<style lang='scss' scoped>
.bs {
  height: 1px;
  box-shadow:
    -1px -1px 16px rgba(0, 0, 0, 0.8),
    4px 4px 8px rgba(0, 0, 0, 0.8);
}
.tag {
  color: #ff5a5f;
  background: #feddde;
  padding: 5rpx 16rpx;
  height: 32rpx;
  line-height: 32rpx;
  text-align: center;
  border-radius: 16rpx;
  font-size: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
