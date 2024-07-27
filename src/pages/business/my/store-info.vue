<route lang="yaml">
layout: common
style:
  navigationBarTitleText: 门店信息
</route>

<script lang="ts" setup>
const sources = ref<any>([
  { isActive: false },
  { isActive: false },
  { isActive: false },
])
function clickItem(item: any, index: any) {
  sources.value.forEach((e: any, i: number) => {
    if (i !== index)
      e.isActive = false
    else
      e.isActive = true
  })
}
</script>

<template>
  <view h15px />
  <view px20px py14px>
    <view
      v-for="(item, index) in sources"
      :key="`k-${index}`" class="item"
      :class="{ active: item.isActive }" @click="clickItem(item, index)"
    >
      <view flex flex-bt>
        <view flex flex-ac gap8px>
          <view f18 class="time">
            一个月
          </view>
          <view class="discount">
            9折
          </view>
        </view>
        <view f18 class="price">
          ￥90
        </view>
      </view>
      <view class="scope" f12 mt8px>
        3个月¥255，¥85/月
      </view>
    </view>
    <view font-size-24px mt5px mb8px>
      福利特权
    </view>
  </view>
  <wd-img
    :height="283"
    mode="heightFix"
    :src="`${IMG_BASE}/fuli.png`"
  />
  <view h100px />
  <view px20px py13px bg-white pf bottom-0 wp100>
    <view flex flex-ac flex-bt>
      <view>
        <view f18 c-#FF6B03>
          一个月&nbsp;￥80
        </view>
        <view>
          <radio style="transform:scale(0.7) translate(-10px, 0)" value="3" color="#1a66ff" />
          <text dib c-#999999 f12 style="transform: translateX(-8px);">
            积分100抵扣￥10.00
          </text>
        </view>
      </view>
      <view class="btn">
        立即购买
      </view>
    </view>
    <view flex mt10px>
      <radio style="transform:scale(0.7) translate(-10px, 0)" value="3" color="#1a66ff" />
      <text dib f12 style="transform: translateX(-8px);">
        <text>开通前确认</text>
        <text c-#1A66FF>
          《会员服务协议》
        </text>
        <text>及</text>
        <text c-#1A66FF>
          《缴费协议》和
        </text>
        <text c-#1A66FF>
          《隐私政策》
        </text>
      </text>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.btn {
  background-color: #1a66ff;
  color: #fff;
  width: 158px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
}
.item {
  padding: 15px 20px;
  color: #4a4a4a;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 2px solid transparent;
  .discount {
    color: #fff;
    background-color: #ff6b03;
    padding: 4px 10px;
    font-size: 12px;
    text-align: center;
    border-radius: 2px;
  }
  .scope {
    color: #999999;
  }
  &.active {
    color: #ff6b03;
    background-color: #fff0e6;
    border: 2px solid #ff6b03;
    .scope {
      color: #ff6b03;
    }
  }
}
</style>
