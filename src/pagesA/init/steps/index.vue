<route lang="yaml">
style:
  navigationBarTitleText: 欢迎来到美预预约
</route>

<script lang="ts" setup>
type Status = ComputedRef<0 | 1 | 2 | undefined>// 0 未添加 1 已添加 2 稍后添加
const orgInfo = useUserStore().userInfo.orgInfo
interface Step {
  step: string
  name: string
  desc: string
  icon: string
  color: string
  status: Status
  path: string
}
const arr = ref<Step[]>([
  {
    step: '一',
    name: '添加服务',
    desc: '创建你的第一个服务，方便客户预约',
    icon: 'i-material-symbols-edit-square',
    color: 'color-1a66ff',
    status: computed(() => orgInfo?.serviceCountStatus),
    path: '/pagesA/init/steps/step2',
  },
  // {
  //   step: '二',
  //   name: '添加卡项',
  //   desc: '创建你的第一个会员卡：折扣卡、充值卡或者次卡',
  //   icon: 'i-material-symbols-edit-square',
  //   color: 'color-1a66ff',
  //   status: computed(() => orgInfo?.cardCountStatus),
  //   path: '/pagesA/init/steps/step3',
  // },
  {
    step: '二',
    name: '添加产品',
    desc: '创建你的第一个产品，方便客户购买开单',
    icon: 'i-material-symbols-edit-square',
    color: 'color-1a66ff',
    status: computed(() => orgInfo?.productCountStatus),
    path: '/pagesA/init/steps/step4',
  },
  {
    step: '三',
    name: '添加员工',
    desc: '创建你的第一个手艺人，方便客户预约时指定手艺人',
    icon: 'i-material-symbols-edit-square',
    color: 'color-1a66ff',
    status: computed(() => orgInfo?.staffCountStatus),
    path: '/pagesA/init/steps/step5',
  },
])

onShow(() => {
  const userInfo = useUserStore()?.userInfo
  const org = userInfo.orgInfo
  if (org.staffCountStatus && org.productCountStatus && org.serviceCountStatus) { // 如果新手完成了
    uni.navigateTo({ url: '/pagesA/init/steps/done' })
  }
})

function toAdd(path: string, status: number) {
  if (status !== 0)
    return false
  uni.navigateTo({ url: path })
}
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
    <text fs-32>
      &nbsp;&nbsp;完成以下3步，即可接单赚钱了&nbsp; &nbsp;
    </text>
    <wd-img
      :width="16"
      :height="16"
      :src="`${IMG_BASE}/decorator@4x.png`"
    />
  </view>
  <view mx-40rpx fs-28>
    <view v-for="(item, index) in arr" :key="index" mb-30rpx @click="toAdd(item.path, item.status)">
      <view mb-16rpx color-999>
        第{{ item.step }}步
      </view>
      <view bg-white p-40rpx>
        <view flex flex-bt>
          <view flex flex-cc>
            <i mr-20rpx pr fs-40 :class="[item.icon, item.color]" />
            <view>
              {{ item.name }}
            </view>
          </view>
          <view flex tc flex-cc>
            <view v-if="item.status === 0" pr-10rpx theme-color>
              去添加
            </view>
            <view v-if="item.status === 1" flex pr-10rpx color-2ecc71 flex-cc>
              <i i-tdesign-check-circle-filled fs-50 />
            </view>
            <view v-if="item.status === 2" pr-10rpx color-FA483C>
              稍后添加
            </view>
            <i i-material-symbols-light-chevron-right fn fs-40 color-999 style="transform: translateY(2rpx);" />
          </view>
        </view>
        <view f12 color-999 pt-5px>
          {{ item.desc }}
        </view>
      </view>
    </view>
  </view>
  <view h-50rpx />
</template>
