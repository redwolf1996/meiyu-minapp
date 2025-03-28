<route lang="yaml">
style:
  navigationBarTitleText: 提现申请
</route>

<script lang="ts" setup>
import { func_mul, func_sub } from '@/utils/math'

const totalAmount = ref<number>(0) // 可提现金额
const cashAmount = ref<number>(null) // 提现金额
const name = ref<string>('') // 姓名
const errorMsg = ref<string>('') // 错误提示
const inputError = ref<boolean>(false) // 输入错误状态

onLoad((options) => {
  totalAmount.value = Number(options?.platformAmount)
})

// 监听提现金额变化
watch(cashAmount, (newVal) => {
  // 重置错误状态
  errorMsg.value = ''
  inputError.value = false

  // 验证是否为数字
  if (Number.isNaN(Number(newVal))) {
    errorMsg.value = '请输入有效的数字'
    inputError.value = true
    return
  }

  // 验证是否超过可提现金额
  if (Number(newVal) > totalAmount.value) {
    errorMsg.value = '提现金额不能超过可提现金额'
    inputError.value = true
  }
})

const fee = computed(() => {
  if (!cashAmount.value)
    return 0
  if (cashAmount.value < 0.1)
    return 0.1
  // 计算0.1%的服务费，并四舍五入到分
  return func_mul(cashAmount.value, 0.001)
})

const actualAmount = computed(() => {
  if (!cashAmount.value)
    return 0
  return func_sub(cashAmount.value, fee.value)
})

async function handleSubmit() {
  // 提交前再次验证
  if (Number.isNaN(Number(cashAmount.value))) {
    uni.showToast({
      title: '请输入有效的数字',
      icon: 'none',
    })
    return
  }

  if (Number(cashAmount.value) > totalAmount.value) {
    uni.showToast({
      title: '提现金额不能超过可提现金额',
      icon: 'none',
    })
    return
  }

  const res = await request.post('/business/store-withdraw', {
    storeId: storeId.value,
    amount: cashAmount.value,
    type: 2, // 1: 提现到银行卡 2: 提现到微信零钱
  })
  const params: any = res.data // 提现所需的参数

  if (wx.canIUse('requestMerchantTransfer')) {
    wx.requestMerchantTransfer({
      mchId: params.mchId,
      appId: 'wx8abaf00ee8c3202e',
      package: params.packageInfo,
      success: (res) => {
      // res.err_msg将在页面展示成功后返回应用时返回ok，并不代表付款成功
        console.log('success:', res)
        uni.navigateTo({
          url: `/pagesA/dashboard/cash-results?cashAmount=${cashAmount.value}`,
        })
      },
      fail: (res) => {
        console.log('fail:', res)
      },
    })
  }
  else {
    wx.showModal({
      content: '你的微信版本过低，请更新至最新版本。',
      showCancel: false,
    })
  }
}
</script>

<template>
  <view p-32rpx>
    <view wp-100 h-170px color-fff pr>
      <wd-img
        width="100%"
        :height="170"
        mode="aspectFill"
        :radius="12"
        :src="`${IMG_BASE}/cardbg@2x.png`"
      />

      <view wp100 h-170px pa left-0 top-0>
        <view fs-36 pt-20px pl-20px>
          可提现金额<text fs-28>
            （元）
          </text>
        </view>
        <view fs-64 fb tc abs-cc>
          ¥{{ totalAmount }}
        </view>
      </view>
    </view>

    <view p-40rpx bg-white color-888 fs-28 flex flex-ac gap-4px mt-32rpx>
      <wd-icon name="warning" size="16px" />
      <view>
        <view lh-42rpx>
          商家单日提现最高限额为2000元，最低为0.1元;&nbsp;商家一天只能提现1笔
        </view>
      </view>
    </view>

    <view p-40rpx bg-white color-#000 fs-28 flex flex-ac gap-4px mt-32rpx>
      <view>
        <view fs-18px>
          提现金额
        </view>
        <view c-#888888 f12 mt-8px>
          实际到账 = 提现金额 - 银行手续费(0.1%)
        </view>
        <view fb fs-20px px-16px py-12px flex flex-ac gap20px>
          <text>
            ￥
          </text>
          <wd-input v-model="cashAmount" fs-20px size="large" placeholder="请输入提现金额" no-border custom-input-class="input-class" :error="inputError" />
        </view>
        <view v-if="errorMsg" c-#FF0000 f12 mt-8px>
          {{ errorMsg }}
        </view>
        <view c-#3D3D3D f12>
          手续费扣除<span c-#E93620>{{ fee }}</span>元, 实际到账<span c-#E93620>{{ actualAmount }}</span>元
        </view>
      </view>
    </view>

    <view p-40rpx bg-white color-#000 fs-28 flex flex-ac gap-4px mt-32rpx>
      <view>
        <view flex flex-ac fs-18px gap-8px>
          <wd-img
            :width="24"
            :height="24"
            mode="aspectFill"
            :radius="12"
            :src="`${IMG_BASE}/icon-wechat.png`"
          />
          <span>
            提现至微信零钱
          </span>
        </view>
        <view c-#888888 f14 mt-8px>
          <text>
            请确认提现账户真实姓名&nbsp;&nbsp;
          </text>
          <text c-#FF0000>
            (校验错误会提现失败)
          </text>
        </view>
        <view fs-16px fb px-16px py-12px flex flex-ac>
          <text>
            姓名 <text c-#FF0000>
              *
            </text>
          </text>
          <wd-input v-model="name" size="large" placeholder="请输入姓名" no-border custom-input-class="input-class2" />
        </view>
      </view>
    </view>

    <view mt-64rpx color-white>
      <wd-button size="large" custom-class="theme-bg" block @click="handleSubmit">
        <view flex flex-cc>
          <text>确认提交</text>
        </view>
      </wd-button>
    </view>
    <view class="h50px" />
  </view>
</template>

<style lang='scss' scoped>
.input-class {
  font-size: 20px;
}
.input-class2 {
  font-size: 16px;
}
</style>
