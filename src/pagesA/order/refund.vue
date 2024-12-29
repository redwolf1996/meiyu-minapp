<route lang="yaml">
style:
  navigationBarTitleText: 主动退款
</route>

<script lang="ts" setup>
import { useMessage, useQueue } from 'wot-design-uni'
import type { Detail } from './types'
import type { PayRefundType, RefundType } from '../billing/types'

const toast = useToast()
const message = useMessage('wd-message-box-slot')
const { closeOutside } = useQueue()
const showRefundTypes = ref(false)
const refundTypes = ref<any[]>([])
const PayTypesMap = ref<any>({
})
const curItem = ref<{ code: number, name: string }>({} as any)
const id = ref(0)
const detail = ref<Detail>(null)
const form = reactive({
  orderId: computed(() => id.value),
  refundType: computed(() => curItem.value?.code),
  refundAmount: 0,
  notes: '',
})

onLoad(async (option) => {
  // 获取支付方式
  await request.get<PayRefundType>('/pay-type-conf').then((res) => {
    refundTypes.value = res.data.refundType?.map((v) => {
      return {
        name: v.desc,
        code: v.code,
      }
    })
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

function confirmRefund() {
  if (!form.refundType)
    return toast.warning('请选择退款方式')
  message
    .confirm({
      title: '提示',
    })
    .then(async () => {
      const res = await request.post<any>('/business/order/refund', form)
      const refundId = res.data.refundId
      uni.showToast({ title: '退款成功', icon: 'success' })
      await sleep(1000)
      uni.navigateTo({ url: `/pagesA/order/refund-detail?refundId=${refundId}` })
    })
    .catch((error) => {
      console.error(error)
    })
}

function showActions() {
  showRefundTypes.value = true
}

function close() {
  showRefundTypes.value = false
}
function select({ item }) {
  curItem.value = item
}
</script>

<template>
  <wd-toast />
  <view p-32rpx @click="closeOutside">
    <wd-message-box selector="wd-message-box-slot">
      <view tl mb5px>
        1、退款成功后，订单将变成已退款状态
      </view>
      <view tl>
        2、本次退款为记账退款，系统仅做记录，资金不会自动退回，门店请在线下使用其他方式退款给客户
      </view>
    </wd-message-box>

    <wd-action-sheet v-model="showRefundTypes" :actions="refundTypes" @close="close" @select="select" />

    <view py40rpx px32rpx bg-white rd-8rpx flex flex-y gap28rpx>
      <template v-if="detail?.orderItem.length">
        <view v-for="(item, index) in detail?.orderItem" :key="`refund-${index}`" flex gap20rpx pb14px style="border-bottom: 1px solid #eeeeee;">
          <wd-img
            :width="76"
            :height="76"
            :src="item?.goodsCoverImg"
          />
          <view flex-1 h76px flex flex-y flex-bt>
            <view>
              <view f14 mb2px>
                {{ item?.goodsName }}
              </view>
              <view f12 flex flex-ac flex-bt>
                <view c-7973F9>
                  <text v-if="item?.goodsType === 1">
                    服务
                  </text>
                  <text v-if="item?.goodsType === 2">
                    产品
                  </text>
                  <text v-if="item?.goodsType === 3">
                    会员卡
                  </text>
                </view>
                <view>x{{ item?.goodsCount }}</view>
              </view>
            </view>
            <view flex flex-xr f14>
              <text>可退款金额&nbsp;&nbsp;￥{{ detail?.amount }}</text>
            </view>
          </view>
        </view>
      </template>
    </view>
    <view class="h24rpx" />
    <view py40rpx px32rpx bg-white rd-8rpx>
      <view>
        退款金额
      </view>
      <view class="h20px" />
      <MyCell label="订单支付方式" :showArrow="false">
        <text f14>
          {{ PayTypesMap?.[detail?.payType] }}
        </text>
      </MyCell>

      <view
        py-20rpx
        flex
        flex-bt flex-ac class="cell"
      >
        <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
          <text>退款方式</text>
          <wd-popover use-content-slot placement="bottom-start" :offset="-40">
            <template #content>
              <view class="pop-content">
                <view mb5px>
                  1、原路退款：该笔订单的付款将原路退款到买家账户。
                </view>
                <view mb5px>
                  2、现金退款：该笔订单的付款金额将以现金的方式退款给顾客，系统仅做记录，资金不会自动退回，门店请在线下使用其他方式退款给客户。
                </view>
                <view>3、其他退款：该笔订单仅做退款标记，无法回退，门店请使用其他方式退款给顾客。</view>
              </view>
            </template>
            <wd-icon name="help-circle" size="15px" color="#979797" />
          </wd-popover>
        </view>
        <view flex flex-ac gap-6px style="max-width: 60%" @click="showActions">
          <text fs-14px>
            {{ curItem?.name || '' }}
          </text>
          <wd-icon name="arrow-right" size="16px" color="#bfbfbf" />
        </view>
      </view>
      <MyCell label="退款金额" :showArrow="false">
        ￥<wd-input-number v-model="form.refundAmount" :min="0" input-width="70px" />
      </MyCell>
    </view>
    <view class="h24rpx" />
    <view pt40rpx bg-white rd-8rpx>
      <view px20px>
        退款说明
      </view>
      <view bg-white>
        <wd-textarea
          v-model="form.notes"
          :maxlength="200"
          placeholderStyle="font-size: 14px;color:#C9CDD4;"
          placeholder="请输入要备注的内容，200字内"
          clearable show-word-limit
        />
      </view>
    </view>
    <view class="h150px" />
  </view>

  <view class="footer">
    <view>
      <view flex flex-ac>
        <text fs-14px>
          合计退款金额：
        </text>
        <text fs-20px c-#FA483C>
          ￥{{ form?.refundAmount }}
        </text>
      </view>
    </view>
    <!-- <wd-button plain :round="false" block>
      确定退款
    </wd-button> -->

    <view bg-white tc h40px w136px flex flex-cc c-#1A66FF style="border: 1px solid #1A66FF;" @click="confirmRefund()">
      确定退款
    </view>
  </view>
</template>

<style lang='scss' scoped>
:deep(.wd-popover__arrow-up) {
  left: 64.5px !important;
}
.pop-content {
  /* 必填 开始 */
  position: relative;
  z-index: 500;
  border-radius: 4px;
  /* 必填 结束 */
  background: #fff;
  padding: 10px;
  width: 70vw;
  text-align: left;
  border: 1px solid #ebeef1;
}
.cell {
  border-bottom: 1rpx solid #ebeef1;
}
.border-top {
  border-top: 1rpx solid #ebeef1;
}
.no-border {
  border-bottom: 1px solid transparent;
}
:deep(textarea) {
  height: 100px;
}
:deep(.wd-button) {
  border-radius: 0;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  position: fixed;
  padding: 0 20px;
  width: 100%;
  bottom: 0;
  background-color: #fff;
}
.sp {
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #1a66ff;
  border: 1px solid #1a66ff;
  border-radius: 4px;
}
</style>
