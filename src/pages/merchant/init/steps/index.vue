<route lang="yaml">
  layout: default
  style:
    navigationBarTitleText: 欢迎来到美预预约
  </route>

<script lang="ts" setup>
const arr = ref([
  {
    step: '一',
    name: '添加门店信息',
    icon: 'i-ant-design-home-twotone',
    color: 'color-#ff6619',
    path: '/pages/merchant/init/steps/addStore',
  },
  {
    step: '二',
    name: '添加服务',
    icon: 'i-tdesign-call',
    color: 'color-#1a66ff',
    path: '/pages/merchant/init/steps/addService',
  },
  {
    step: '三',
    name: '添加卡项',
    icon: 'i-tdesign-cardmembership',
    color: 'color-#1a66ff',
    path: '/pages/merchant/init/steps/addCard',
  },
  {
    step: '四',
    name: '添加产品',
    icon: 'i-tdesign-chart-3d',
    color: 'color-#1a66ff',
    path: '/pages/merchant/init/steps/addProduct',
  },
  {
    step: '五',
    name: '添加员工',
    icon: 'i-tdesign-user',
    color: 'color-#1a66ff',
    path: '/pages/merchant/init/steps/addStaff',
  },
])
</script>

<template>
  <view px-64rpx py-56rpx color-white theme-bg>
    <view fs-48 fb>
      新手指导
    </view>
    <view fs-28 mt-24rpx>
      操作上手让您不再迷茫
    </view>
  </view>
  <view mb-64rpx mt-40rpx flex tc flex-cc>
    <wd-img
      :width="16"
      :height="16"
      :src="`${IMG_BASE}/decorator@4x.png`"
    />
    <text fs-32 fb>
      &nbsp;&nbsp;完成以下5步，即可接单赚钱了&nbsp; &nbsp;
    </text>
    <wd-img
      :width="16"
      :height="16"
      :src="`${IMG_BASE}/decorator@4x.png`"
    />
  </view>
  <view mx-40rpx>
    <view v-for="(item, index) in arr" :key="index" mb-30rpx>
      <view mb-16rpx color-999>
        第{{ item.step }}步
      </view>
      <view flex bg-white p-40rpx flex-bt>
        <view flex flex-cc>
          <i fs-40 mr-20rpx pr :class="[item.icon, item.color]" />
          <view fb>
            {{ item.name }}
          </view>
        </view>
        <view flex tc flex-cc>
          <view pr-10rpx theme-color>
            去添加
          </view>
          <i i-material-symbols-light-chevron-right fs-40 fn color-999 style="transform: translateY(2rpx);" />
        </view>
      </view>
    </view>
  </view>
  <view h-50rpx />
  </viewmx-40rpx>
</template>
