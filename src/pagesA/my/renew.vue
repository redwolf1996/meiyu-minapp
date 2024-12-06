<route lang="yaml">
layout: common
style:
  navigationBarTitleText: 会员续费
</route>

<script lang="ts" setup>
const vipList = ref<any>([])
const curItem = ref()
const protocalChecked = ref(false)

function clickItem(item: any, index: any) {
  vipList.value.forEach((e: any, i: number) => {
    if (i !== index) {
      e.isActive = false
    }
    else {
      e.isActive = true
      curItem.value = item
    }
  })
}

onMounted(async () => {
  const res = await request.get<any>('/business/get-vip-list')
  vipList.value = res.data.map((v, i) => {
    return {
      ...v,
      isActive: i === 0,
    }
  })
  curItem.value = vipList.value[0]
})

async function renew() {
  if (!protocalChecked.value) {
    return uni.showToast({
      title: '请先勾选并阅读协议',
      icon: 'none',
    })
  }
  const res = await request.post<any>('/business/renew', {
    vipPackageId: curItem.value.id,
    payType: 3,
    amount: 0.01,
  })
  wx.requestPayment({
    timeStamp: res.data.timestamp,
    nonceStr: res.data.nonceStr,
    package: res.data.packageVal,
    signType: res.data.signType,
    paySign: res.data.paySign,
    success(res) {
      console.log(res)
    },
    fail(res) {
      console.log(res)
    },
  })
}
</script>

<template>
  <view h15px />
  <view px20px py14px>
    <view
      v-for="(item, index) in vipList"
      :key="`k-${index}`" class="item"
      :class="{ active: item.isActive }" @click="clickItem(item, index)"
    >
      <view flex flex-bt>
        <view flex flex-ac gap8px>
          <view f18 class="time">
            {{ item.title ?? '--' }}
          </view>
          <view class="discount">
            {{ item.discount }}折
          </view>
        </view>
        <view f18 class="price">
          ￥{{ item.price }}
        </view>
      </view>
      <view class="scope" f12 mt8px>
        {{ item.subTitle }}
        <!-- {{ item.duration }}个月¥{{ item.price2 }}， -->
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
  <view h150px />
  <view p20px bg-white pf bottom-0 wp100>
    <view flex flex-ac flex-bt>
      <view>
        <view f18 c-FF6B03>
          <!-- 一个月&nbsp;￥80 -->
          ￥{{ curItem?.price ?? '--' }}
        </view>
        <!-- <view>
          <radio style="transform:scale(0.7) translate(-10px, 0)" value="3" color="#1a66ff" />
          <text dib c-999999 f12 style="transform: translateX(-8px);">
            积分100抵扣￥10.00
          </text>
        </view> -->
      </view>
      <view class="btn" @click="renew()">
        立即购买
      </view>
    </view>
    <view flex mt10px>
      <!-- <radio style="transform:scale(0.7) translate(-10px, 0)" value="3" color="#1a66ff" /> -->
      <wd-checkbox v-model="protocalChecked" />
      <text dib f12 pl5px style="transform: translateX(-8px);">
        <text>开通前确认</text>
        <text c-1A66FF>
          《会员服务协议》
        </text>
        <text>及</text>
        <text c-1A66FF>
          《缴费协议》和
        </text>
        <text c-1A66FF>
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
