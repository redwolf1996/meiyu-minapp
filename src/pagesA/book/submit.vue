<route lang="yaml">
style:
  navigationBarTitleText: 预约服务
</route>

<script lang="ts" setup>
import qs from 'qs'

const toast = useToast()

// 商品原价合计
const totalOriAmount = sumArray(bookInfo.value.service.map((v) => {
  const cost = v.price2 || v.price
  return func_mul(cost, v.goodsCount)
}))

// 商品优惠后合计
const totalToPayAmount = sumArray(bookInfo.value.service.map(v => v.amount))

// 商品优惠金额合计
const discountAmount = func_sub(totalOriAmount, totalToPayAmount)

async function doSubmit() {
  if (!totalToPayAmount) { // 总金额为0直接预约成功，不需要支付
    submitDirect()
  }
  else {
    bookInfo.value.amount = totalToPayAmount
    uni.navigateTo({ url: '/pagesA/billing/pay?createSource=4' }) // 预约单支付（包含了预约信息和支付信息）
  }
}

// 待付款金额为0，不去结账，直接提交成功
async function submitDirect() {
  const res = await request.post<any>('/business/booking', { ...bookInfo.value, payType: null })
  toast.info('预约成功')
  const params = {
    orderId: res.data.orderId,
    mode: PayModeEnum.Booking, // mode  1 开单 2开卡 3充值 4预约
    amount: res.data.payAmount,
    points: res.data.gainIntegral,
  }
  await sleep(1000)
  uni.redirectTo({ url: `/pagesA/billing/pay-success?${qs.stringify(params)}` })
}
</script>

<template>
  <wd-toast />
  <view px15px py12px>
    <view mb16px px12px py16px f12 flex flex-y gap-23rpx bg-white>
      <view bg-FCE8E9 c-FF5A5F h38rpx w128rpx tc flex flex-cc>
        {{ bookInfo.storeServiceType === 1 ? '预约到店' : '上门服务' }}
      </view>
      <view flex flex-ac>
        <text c-818181>
          预约时间：
        </text>
        <text pl10px>
          {{ fdt(bookInfo.startTime) ?? '--' }}
        </text>
      </view>
      <view flex flex-ac>
        <text c-818181>
          预约人：
        </text>
        <text pl10px>
          {{ bookInfo.storeCustomerName ?? '--' }}
        </text>
      </view>
      <view flex flex-ac>
        <text c-818181>
          手机号：
        </text>
        <text pl10px>
          {{ bookInfo.storeCustomerPhone ?? '--' }}
        </text>
      </view>
      <view flex flex-ac>
        <text c-818181>
          手艺人：
        </text>
        <text pl10px>
          {{ bookInfo?.artName || '到店分配' }}
        </text>
      </view>
      <view v-if="bookInfo.storeServiceType === 2" flex flex-ac>
        <text c-818181>
          上门地址：
        </text>
        <text pl10px>
          {{ bookInfo?.customerAddress || '--' }}
        </text>
      </view>
    </view>

    <view mb16px px12px py16px bg-white>
      <view mb10px c-1E1E1E>
        预约服务
      </view>
      <view flex flex-y gap13px>
        <view
          v-for="(item, index) in bookInfo.service" :key="`k-${index}`" flex gap-12px
        >
          <wd-img
            radius="10px"
            :width="72"
            :height="72"
            mode="aspectFill"
            :src="item.coverImg"
          />
          <view flex-1 flex flex-y flex-bt>
            <view f14 c-3B3D3D mb4px flex flex-ac flex-bt>
              <text>{{ item.name || '--' }}</text>
              <text fs-22 c-7C7C7C>
                {{ item.duration || '--' }}分钟
              </text>
            </view>
            <view flex flex-ac flex-bt>
              <view flex flex-ac gap4px>
                <text c-FF1919 f18>
                  ￥{{ item.price2 || item.price }}
                </text>
                <text v-if="item.price2" line-through f12 c-D4D4D4>
                  ￥{{ item.price }}
                </text>
              </view>
              <view f12 c-7C7C7C>
                x{{ item.goodsCount ?? 1 }}
              </view>
            </view>

            <view v-if="item.cardName" flex flex-ac flex-bt>
              <view f12 c-7C7C7C>
                {{ item.cardName || '--' }}
              </view>
              <view f12 c-7C7C7C>
                <text v-if="item.cardType === 1">
                  -{{ item.cardReduceAmount }}次
                </text>
                <text v-else>
                  -￥{{ item.cardReduceAmount }}
                </text>
              </view>
            </view>

            <view flex flex-xr flex-ac>
              <text c-#FA483C>
                ￥{{ item.amount }}
              </text>
              <text f14>
                小计：
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view mb16px px12px py16px bg-white>
      <view flex flex-ac flex-bt>
        <view>商品金额</view>
        <text c-#818181 font-size-14px>
          ￥{{ totalToPayAmount }}
        </text>
      </view>

      <!-- <view v-if="discountAmount" flex flex-ac flex-bt fs-14px mt5px>
        <view c-#FF4E4E>
          优惠金额
        </view>
        <text c-#FF4E4E font-size-14px>
          -￥{{ discountAmount }}
        </text>
      </view> -->

      <view flex flex-ac flex-xr mt10px>
        <text c-#FF5A5F>
          ￥{{ totalToPayAmount }}
        </text>
        <text f14>
          合计：
        </text>
      </view>
    </view>

    <view mb16px px12px py16px bg-white>
      <view>备注</view>
      <view flex flex-ac flex-bt f14 pt5px>
        {{ bookInfo.notes }}
      </view>
    </view>
  </view>

  <view :class="[safeBottom() ? 'py20px' : 'py10px']" bg-white px20px flex flex-bt flex-ac pf wp100 bottom-0px>
    <view f12 c-1A66FF>
      {{ fdt(bookInfo?.startTime) }}&nbsp;{{ bookInfo.storeServiceType === 1 ? '到店' : '上门' }}
    </view>
    <MyButton width="200rpx" @click="doSubmit()">
      提交预约
    </MyButton>
  </view>
</template>

<style lang='scss' scoped></style>
