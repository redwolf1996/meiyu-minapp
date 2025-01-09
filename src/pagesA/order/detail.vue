<route lang="yaml">
style:
  navigationBarTitleText: 订单详情
</route>

<script lang="ts" setup>
import type { PayRefundType } from '../billing/types'
import type { Detail } from './types'
import qs from 'qs'

const id = ref(0)
const detail = ref<Detail>(null)
const PayTypesMap = ref<any>({
})

onLoad(async (option) => {
  request.get<PayRefundType>('/pay-type-conf').then((res) => {
    res.data.payType.forEach((v) => {
      PayTypesMap.value[v.code] = v.desc
    })
  })

  id.value = +option.id
  getDetail()
})

async function getDetail() {
  const res = await request.get<Detail>(`/business/order/${id.value}`)
  detail.value = res.data
}

function toPay() {
  const params = qs.stringify({
    orderId: id.value,
    createSource: detail.value?.createSource,
    repayAmount: detail.value?.amount,
    storeCustomerId: detail.value?.storeCustomerId,
  })
  uni.navigateTo({
    url: `/pagesA/billing/pay?${params}`,
  })
}
async function toCancel() {
  await request.post('/business/order/cancel', { orderId: id.value })
  uni.showToast({ title: '取消成功' })
  await sleep(1000)
  uni.navigateBack()
}
async function toRefund() {
  uni.navigateTo({
    url: `/pagesA/order/refund?id=${id.value}`,
  })
}
</script>

<template>
  <view px-30rpx py20rpx>
    <view p32rpx bg-white mb12px rd-4px>
      <view flex flex-ac flex-bt>
        <view f14>
          <text>收款</text>
          <text f18>
            ￥{{ detail?.amount }}
          </text>
        </view>
        <view class="my-status-tag end-service">
          <!-- 已完成(退款成功) -->
          {{ PayStatusMap?.[detail?.payStatus] }}
        </view>
      </view>
      <view class="h20px" />
      <view v-if="detail?.payStatus === 4">
        <MyCell label="退款金额">
          <text f14>
            ￥{{ detail?.refundAmount }}
          </text>
        </MyCell>
        <view class="h12px" />
      </view>
      <view f12 c-434343>
        <view flex flex-ac flex-bt mb12px>
          <view>订单编号</view>
          <view>{{ detail?.orderNo }}</view>
        </view>
        <view flex flex-ac flex-bt mb12px>
          <view>创建时间</view>
          <view>{{ fdt(detail?.createTime) }}</view>
        </view>
        <view flex flex-ac flex-bt>
          <view>销售员</view>
          <view>{{ detail?.adviserName ?? '--' }}</view>
        </view>
        <view v-if="detail?.payStatus === 3" flex flex-ac flex-bt mt12px>
          <view>取消时间</view>
          <view>{{ fdt(detail?.refundTime) }}</view>
        </view>
        <!-- TODO 剩余支付时间 -->
        <!-- <view flex flex-ac flex-bt mt12px v-if="detail?.payStatus === 1">
          <view c-FF5B05>
            剩余支付时间: 12:23:12（用户端线上支付时再考虑）
          </view>
        </view> -->
      </view>
    </view>
    <view>
      <view bg-white px-32rpx py-40rpx mb12px rd-4px>
        <view flex flex-ac gap-20rpx>
          <wd-img
            :width="18"
            :height="18"
            mode="aspectFill"
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
            :src="DEFAULT_AVATAR"
          />
          <view flex flex-y flex-bt flex-1 gap-20rpx>
            <view f16>
              {{ detail?.customerName }}
            </view>
            <view flex flex-ac flex-bt>
              <view flex flex-ac gap-16rpx>
                <text c-929292 fs-28 lh-28rpx>
                  {{ detail?.customerPhone || '--' }}
                </text>
                <wd-img
                  v-if="detail?.customerCardCount"
                  :width="16"
                  :height="16"
                  :src="`${IMG_BASE}/icon-v.png`"
                />
              </view>
              <view f12>
                <text c-929292>
                  会员卡
                </text>
                <text c-00BB00>
                  {{ detail?.customerCardCount }}张
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view bg-white px-32rpx py-40rpx mb12px rd-4px>
        <view flex flex-ac gap-20rpx mb20px>
          <wd-img
            :width="18"
            :height="18"
            :src="`${IMG_BASE}/icon-book.png`"
          />
          <text fs-34>
            商品
          </text>
        </view>
        <view v-for="(item, index) in detail?.orderItem" :key="`sp-${index}`" mb20px style="border-bottom: 1px solid #eee;">
          <view fb mb12px flex flex-bt>
            <view>
              <text c-1A66FF>
                {{ index > 9 ? index + 1 : `0${index + 1}` }}
              </text>
              <text>&nbsp;&nbsp;{{ item?.goodsName }}</text>
            </view>
            <view>x{{ item?.goodsCount }}</view>
          </view>
          <view flex flex-bt mb12px f14>
            <view>价格</view>
            <view>￥{{ item?.goodsPrice }}</view>
          </view>
          <view v-if="item?.goodsType === 1 || item?.goodsType === 4" flex flex-bt mb12px f14>
            <view>手艺人</view>
            <view>{{ item?.artisanName || '未分配' }}</view>
          </view>
          <view v-if="item?.cardName" flex flex-bt mb12px f14>
            <view>使用卡项</view>
            <view>{{ item?.cardName || '--' }}</view>
          </view>
          <view flex flex-bt mb12px f14>
            <view />
            <view>小计&#12288;￥{{ item?.amount }}</view>
          </view>
        </view>
        <view f14 flex flex-ac flex-bt>
          <view>合计</view>
          <view>￥{{ detail?.amount }}</view>
        </view>
      </view>

      <view v-if="detail?.payStatus === 2" f14 bg-white px-32rpx py-40rpx mb12px rd-4px>
        <view flex gap16px flex-ac mb12px>
          <view>付款方式</view>
          <view>{{ detail?.payTypeDesc || '--' }}</view>&nbsp;&nbsp;￥{{ detail?.amount }}
        </view>
        <view flex gap16px flex-ac>
          <view>支付时间</view>
          <view>{{ fdt(detail?.payTime) }}</view>
        </view>
      </view>
    </view>
  </view>
  <view class="h20px" />
  <view v-if="detail?.payStatus === 1 || detail?.payStatus === 2" flex flex-cc gap12px>
    <template v-if="detail?.payStatus === 1">
      <MyButton
        :borderWidth="2" radius="8rpx" fontSize="32rpx"
        width="208rpx" bgColor="transparent"
        color="#1A66FF" borderColor="#1A66FF"
        @click="toCancel()"
      >
        取消
      </MyButton>
      <MyButton
        :borderWidth="2" radius="8rpx" fontSize="32rpx"
        width="208rpx" bgColor="transparent"
        color="#1A66FF" borderColor="#1A66FF"
        @click="toPay()"
      >
        去支付
      </MyButton>
    </template>
    <template v-if="detail?.payStatus === 2">
      <MyButton
        :borderWidth="2" radius="8rpx" fontSize="32rpx"
        width="208rpx" bgColor="transparent"
        color="#1A66FF" borderColor="#1A66FF"
        @click="toRefund()"
      >
        主动退款
      </MyButton>
    </template>
  </view>
  <view class="h50px" />
</template>

<style lang='scss' scoped></style>
