<route lang="yaml">
style:
  navigationBarTitleText: 欢迎来到美预预约
</route>

<script lang="ts" setup>
type Status = 0 | 1 | 2 // 0 未添加 1 已添加 2 稍后添加
interface Step {
  step: string
  name: string
  icon: string
  color: string
  status: Status
  count: number
  path: string
}
const arr = ref<Step[]>([
  {
    step: '一',
    name: '添加门店信息',
    icon: 'i-ant-design-home-twotone',
    color: 'color-#ff6619',
    status: 0,
    count: 0,
    path: '/pages/merchant/init/steps/step1',
  },
  {
    step: '二',
    name: '添加服务',
    icon: 'i-tdesign-call',
    color: 'color-#1a66ff',
    status: 1,
    count: 1,
    path: '/pages/merchant/init/steps/step2',
  },
  {
    step: '三',
    name: '添加卡项',
    icon: 'i-tdesign-cardmembership',
    color: 'color-#1a66ff',
    status: 2,
    count: 0,
    path: '/pages/merchant/init/steps/step3',
  },
  {
    step: '四',
    name: '添加产品',
    icon: 'i-tdesign-chart-3d',
    color: 'color-#1a66ff',
    status: 1,
    count: 0,
    path: '/pages/merchant/init/steps/step4',
  },
  {
    step: '五',
    name: '添加员工',
    icon: 'i-tdesign-user',
    color: 'color-#1a66ff',
    status: 1,
    count: 0,
    path: '/pages/merchant/init/steps/step5',
  },
])
</script>

<template>
  <wd-img
    width="100%"
    mode="widthFix"
    :src="`${IMG_BASE}/banner@2x.png`"
  />
  <view mb-64rpx mt-40rpx flex tc flex-cc>
    <wd-img
      :width="16"
      :height="16"
      :src="`${IMG_BASE}/decorator@4x.png`"
    />
    <text fb fs-32>
      &nbsp;&nbsp;完成以下5步，即可接单赚钱了&nbsp; &nbsp;
    </text>
    <wd-img
      :width="16"
      :height="16"
      :src="`${IMG_BASE}/decorator@4x.png`"
    />
  </view>
  <view mx-40rpx fs-28>
    <view v-for="(item, index) in arr" :key="index" mb-30rpx>
      <view mb-16rpx color-999>
        第{{ item.step }}步
      </view>
      <view flex bg-white p-40rpx flex-bt>
        <view flex flex-cc>
          <i mr-20rpx pr fs-40 :class="[item.icon, item.color]" />
          <view fb>
            {{ item.name }}
          </view>
        </view>
        <view flex tc flex-cc>
          <view v-if="item.status === 0" pr-10rpx theme-color>
            去添加
          </view>
          <view v-if="item.status === 1" flex pr-10rpx color-#2ecc71 flex-cc>
            <text pr-50rpx fb color-333>
              {{ item.count || '' }}
            </text> <i i-tdesign-check-circle-filled fs-50 />
          </view>
          <view v-if="item.status === 2" pr-10rpx color-#FA483C>
            稍后添加
          </view>
          <i i-material-symbols-light-chevron-right fn fs-40 color-999 style="transform: translateY(2rpx);" />
        </view>
      </view>
    </view>
  </view>
  <view h-50rpx />
</template>
