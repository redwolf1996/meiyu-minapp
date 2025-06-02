<route lang="yaml">
style:
  navigationBarTitleText: 业绩
</route>

<script setup lang="ts">
import { useQueue } from 'wot-design-uni'
import type { StaffAchievementsDetail } from './types'

const { closeOutside } = useQueue()

const orgStaffId = ref<string>()
const sDate = ref<string>()
const eDate = ref<string>()
const info = ref<StaffAchievementsDetail>({
  orgStaffId: 0,
  saleCard: 0,
  saleProduct: 0,
  saleRecharge: 0,
  saleService: 0,
  serviceArtisan: 0,
  serviceGift: 0,
  serviceTimesCard: 0,
  serviceValueCard: 0,
  salesAmount: 0,
  serviceAmount: 0,
  orgStaffName: '',
  orgStaffRole: '',
  orgStaffPhone: '',
})
onLoad((options) => {
  sDate.value = options?.sDate
  eDate.value = options?.eDate
  orgStaffId.value = options?.orgStaffId
  getInfo()
})

async function getInfo() {
  const res = await request.get<StaffAchievementsDetail>('/business/stat-staff-ranking-info', {
    storeId: storeId.value,
    orgStaffId: orgStaffId.value,
    sDate: sDate.value,
    eDate: eDate.value,
  })
  info.value = res.data
}
</script>

<template>
  <view wp100 bg-#3D5BF6 px16px py20px c-white>
    <view flex flex-ac gap20px>
      <wd-img
        :width="48"
        :height="48"
        mode="aspectFill"
        :src="`${IMG_BASE}/data-icon.png`"
      />
      <view h48px flex flex-y flex-ac flex-bt>
        <view flex flex-ac gap10px c-white>
          <view style="color: #fff;">
            {{ info.orgStaffName }}
          </view>
          <view class="role">
            {{ info.orgStaffRole }}
          </view>
        </view>
        <view style="font-size: 12px;color: rgba(255, 255, 255, 0.6);">
          {{ info.orgStaffPhone }}
        </view>
      </view>
    </view>
    <view h20px />
    <view flex flex-cc gap50px style="color: #fff !important;">
      <view>
        <view f14 c-white>
          销售业绩(元)
        </view>
        <view class="h5px" />
        <view fs-24px c-white>
          {{ info.salesAmount }}
        </view>
      </view>
      <view>
        <view f14 c-white>
          服务业绩(元)
        </view>
        <view class="h5px" />
        <view fs-24px c-white>
          {{ info.serviceAmount }}
        </view>
      </view>
    </view>
  </view>
  <view @click="closeOutside">
    <view bg-white px16px py10px>
      <view bg-white pl10px style="position: relative; padding-left: 10px;">
        <view style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); height: 66.7%; width: 3px; background-color: #931E5E;" />
        <text fb c-#931E5E>
          销售收入
        </text>
      </view>
      <view h20px />
      <view class="ct">
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>{{ info.saleService }}</text>
            <wd-img
              :width="24"
              :height="24"
              mode="aspectFill"
              :src="`${IMG_BASE}/data-icon.png`"
            />
          </view>
          <view>
            <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
              <text c-#97999B>
                服务收入(元)
              </text>
              <wd-popover use-content-slot placement="bottom-start" :offset="-40">
                <template #content>
                  <view class="pop-content">
                    服务收入：订单完成时间在统计时间内，订单中服务的收入总和减去服务退费总和。
                  </view>
                </template>
                <wd-icon name="help-circle" size="15px" color="#979797" />
              </wd-popover>
            </view>
          </view>
        </view>
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>{{ info.saleProduct }}</text>
            <wd-img
              :width="24"
              :height="24"
              mode="aspectFill"
              :src="`${IMG_BASE}/data-icon.png`"
            />
          </view>
          <view>
            <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
              <text c-#97999B>
                产品收入(元)
              </text>
              <wd-popover use-content-slot placement="left">
                <template #content>
                  <view class="pop-content">
                    产品收入：订单完成时间在统计时间内，订单中产品的收入总和减去产品退费总和。
                  </view>
                </template>
                <wd-icon name="help-circle" size="15px" color="#979797" />
              </wd-popover>
            </view>
          </view>
        </view>
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>{{ info.saleCard }}</text>
            <wd-img
              :width="24"
              :height="24"
              mode="aspectFill"
              :src="`${IMG_BASE}/data-icon.png`"
            />
          </view>
          <view>
            <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
              <text c-#97999B>
                售卡收入(元)
              </text>
              <wd-popover use-content-slot placement="bottom-start" :offset="-40">
                <template #content>
                  <view class="pop-content">
                    售卡收入：订单完成时间在统计时间内，订单中卡项的收入总和减去卡项退费总和。
                  </view>
                </template>
                <wd-icon name="help-circle" size="15px" color="#979797" />
              </wd-popover>
            </view>
          </view>
        </view>
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>{{ info.saleRecharge }}</text>
            <wd-img
              :width="24"
              :height="24"
              mode="aspectFill"
              :src="`${IMG_BASE}/data-icon.png`"
            />
          </view>
          <view>
            <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
              <text c-#97999B>
                充值(元)
              </text>
              <wd-popover use-content-slot placement="bottom-end">
                <template #content>
                  <view class="pop-content">
                    充值：订单完成时间在统计时间内，订单中储值卡充值总和减去储值卡充值后退费总和。
                  </view>
                </template>
                <wd-icon name="help-circle" size="15px" color="#979797" />
              </wd-popover>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="h10px" />
    <view bg-white px16px py10px>
      <view bg-white pl10px fb style="position: relative; padding-left: 10px;">
        <view style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); height: 66.7%; width: 3px; background-color: #931E5E;" />
        <text c-#931E5E>
          服务收入
        </text>
      </view>
      <view h20px />
      <view class="ct">
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>{{ info.serviceArtisan }}</text>
            <wd-img
              :width="24"
              :height="24"
              mode="aspectFill"
              :src="`${IMG_BASE}/data-icon.png`"
            />
          </view>
          <view>
            <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
              <text c-#97999B>
                服务劳动收入(元)
              </text>
              <wd-popover use-content-slot placement="bottom-start" :offset="-40">
                <template #content>
                  <view class="pop-content">
                    服务劳动收入：有手艺人的服务中已完成服务收入总和减去退费金额总和（不含使用卡项支付）。
                  </view>
                </template>
                <wd-icon name="help-circle" size="15px" color="#979797" />
              </wd-popover>
            </view>
          </view>
        </view>
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>{{ info.serviceTimesCard }}</text>
            <wd-img
              :width="24"
              :height="24"
              mode="aspectFill"
              :src="`${IMG_BASE}/data-icon.png`"
            />
          </view>
          <view>
            <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
              <text c-#97999B>
                次卡抵扣(元)
              </text>
              <wd-popover use-content-slot placement="left">
                <template #content>
                  <view class="pop-content">
                    次卡抵扣：服务劳动收入中使用次卡抵扣金额收入总和减去退费金额总和
                  </view>
                </template>
                <wd-icon name="help-circle" size="15px" color="#979797" />
              </wd-popover>
            </view>
          </view>
        </view>
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>{{ info.serviceValueCard }}</text>
            <wd-img
              :width="24"
              :height="24"
              mode="aspectFill"
              :src="`${IMG_BASE}/data-icon.png`"
            />
          </view>
          <view>
            <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
              <text c-#97999B>
                充值卡耗(元)
              </text>
              <wd-popover use-content-slot placement="top-start" :offset="-40">
                <template #content>
                  <view class="pop-content">
                    充值卡耗：服务劳动收入中使用储值卡支付的收入金额总和减去退费金额总和
                  </view>
                </template>
                <wd-icon name="help-circle" size="15px" color="#979797" />
              </wd-popover>
            </view>
          </view>
        </view>
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>{{ info.serviceGift }}</text>
            <wd-img
              :width="24"
              :height="24"
              mode="aspectFill"
              :src="`${IMG_BASE}/data-icon.png`"
            />
          </view>
          <view>
            <view c-3B3D3D fw-500 font-size-14px flex flex-ac gap4px>
              <text c-#97999B>
                赠送抵扣(元)
              </text>
              <wd-popover use-content-slot placement="top-end">
                <template #content>
                  <view class="pop-content">
                    赠送抵扣：服务劳动收入中使用次卡中赠送抵扣的金额总和。
                  </view>
                </template>
                <wd-icon name="help-circle" size="15px" color="#979797" />
              </wd-popover>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="h50px" />
  </view>
</template>

<style lang="scss" scoped>
.ct {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
}

.item {
  width: calc(50% - 10px);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #f0f1f4;
  height: 86px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.role {
  font-size: 12px;
  color: rgba(255, 255, 255);
  border: 1px solid #fff;
  padding: 2px 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
