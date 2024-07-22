<route lang="yaml">
style:
  navigationBarTitleText: 客户
  navigationBarBackgroundColor: "#ffffff"
</route>

<script lang="ts" setup>
const filter = ref()
const value1 = ref(0)
const option1 = [
  { label: '全部', value: 0 },
  { label: '会员', value: 1 },
  { label: '非会员', value: 2 },
]
const sources: any = [
  { label: '当天生日', value: 1, isActive: true },
  { label: '当月生日', value: 2, isActive: false },
]
const sources2: any = [
  { label: '今天', value: 1, isActive: true },
  { label: '昨天', value: 2, isActive: false },
  { label: '本周', value: 3, isActive: true },
  { label: '本月', value: 4, isActive: false },
  { label: '上月', value: 5, isActive: true },
]

function handleChange1() {}
</script>

<template>
  <view py-12rpx px-32rpx>
    <view flex flex-bt flex-ac gap-32rpx>
      <view flex-1 pr>
        <input placeholder="搜索姓名/手机号" placeholder-class="cus-input" px-40px bg-#F2F3F5 h-36px lh-36px rd-4px type="text">
        <uni-icons style="transform: translateY(-50%);top: 50%;" pa left-24rpx type="search" color="#86909C" size="24" />
        <uni-icons style="transform: translateY(-50%);top: 50%;" pa right-24rpx type="clear" color="#86909C" size="24" />
      </view>
      <view rd-2px w-28px h-28px lh-28px tc bg-#F2F3F5 fs-32 fb>
        +
      </view>
    </view>
    <wd-drop-menu>
      <wd-drop-menu-item v-model="value1" :options="option1" @change="handleChange1" />
      <wd-drop-menu-item ref="filter" title="筛选">
        <view p-24rpx bg-#F9F9F9>
          <view bg-white rd-10px p-24rpx>
            <view f14 mb-16px>
              生日
            </view>
            <GridTagSelect v-model="value1" :sources="sources" />
            <view flex flex-ac gap-32rpx mt-32rpx c-#929292>
              <text>范围</text>
              <input placeholder-class="cus-input" w-150rpx px-10px bg-#F2F3F5 h-32px lh-32px type="text">
              <text>至</text>
              <input placeholder-class="cus-input" w-150rpx px-10px bg-#F2F3F5 h-32px lh-32px type="text">
            </view>
            <view flex flex-ac gap-32rpx mt-32rpx c-#929292>
              <text>最近</text>
              <input placeholder-class="cus-input" w-150rpx px-10px bg-#F2F3F5 h-32px lh-32px type="text">
              <text>天过生日</text>
            </view>
          </view>

          <view bg-white rd-10px p-24rpx mt-24rpx>
            <view f14 mb-16px>
              成为客户时间
            </view>
            <GridTagSelect v-model="value1" :sources="sources2" :columns="3" />
            <view flex flex-ac gap-32rpx mt-32rpx c-#929292>
              <text>范围</text>
              <input placeholder-class="cus-input" w-150rpx px-10px bg-#F2F3F5 h-32px lh-32px type="text">
              <text>至</text>
              <input placeholder-class="cus-input" w-150rpx px-10px bg-#F2F3F5 h-32px lh-32px type="text">
            </view>
          </view>

          <view bg-white rd-10px p-24rpx mt-24rpx>
            <view f14 mb-32rpx>
              持有卡项
            </view>
            <radio-group mb12rpx flex gap-20rpx transform-translate-x--5px>
              <label f12><radio style="transform:scale(0.7)" value="1" color="#1a66ff" :checked="true" />任意卡项</label>
              <label f12><radio style="transform:scale(0.7)" value="2" color="#1a66ff" />指定卡项</label>
              <label f12><radio style="transform:scale(0.7)" value="3" color="#1a66ff" />指定类型卡</label>
            </radio-group>
            <MyCell label="请选择" noBorder>
              <span f14 c-#3B3D3D>09:00-21:00</span>
            </MyCell>
            <view flex flex-wrap gap-20rpx>
              <view class="tag">
                充值卡
              </view>
              <view class="tag">
                折扣卡
              </view>
            </view>
          </view>

          <view flex tc flex-cc mt-24rpx px-112rpx gap-40px>
            <button class="my-btn normal" w-220rpx>
              重置
            </button>
            <button class="my-btn theme" w-350rpx>
              查看50个用户
            </button>
          </view>
        </view>
      </wd-drop-menu-item>
    </wd-drop-menu>
  </view>
</template>

<style lang='scss' scoped>
label {
  padding: 0 !important;
}
:deep(.wd-popup.wd-popup--top.wd-top-enter-to.wd-top-enter-active) {
  max-height: 95% !important;
}
:deep(.cus-input) {
  color: #c9cdd4;
  font-size: 14px;
}
.tag {
  color: #1a66ff;
  background-color: #eff2ff;
  padding: 5rpx 16rpx;
  height: 32rpx;
  line-height: 32rpx;
  text-align: center;
  border-radius: 16rpx;
  font-size: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92rpx;
}
</style>

<style>
page {
  background-color: #fff;
}
</style>
