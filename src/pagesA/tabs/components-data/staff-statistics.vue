<script setup lang="ts">
import { useQueue } from 'wot-design-uni'

const props = defineProps<{
  searchParams: {
    sDate: string
    eDate: string
  }
}>()
const { closeOutside } = useQueue()

watch(props.searchParams, () => {
  console.log(props.searchParams)
})
</script>

<template>
  <view class="h58px" />
  <view @click="closeOutside">
    <view bg-white px16px py10px>
      <view bg-white pl10px style="position: relative; padding-left: 10px;">
        <view style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); height: 66.7%; width: 3px; background-color: #931E5E;" />
        <text fb c-#931E5E>
          客户统计
        </text>
      </view>
      <view h20px />
      <view class="ct">
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>5000</text>
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
                成交客户数
              </text>
              <wd-popover use-content-slot placement="bottom-start" :offset="-40">
                <template #content>
                  <view class="pop-content">
                    成交客户数：订单完成时间在统计时间内，付款的客户数；散客订单按订单数统计，同一客户去重按1统计
                  </view>
                </template>
                <wd-icon name="help-circle" size="15px" color="#979797" />
              </wd-popover>
            </view>
          </view>
        </view>
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>5000</text>
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
                开卡充值客户数
              </text>
              <wd-popover use-content-slot placement="left">
                <template #content>
                  <view class="pop-content">
                    开卡充值客户数：订单完成时间在统计时间内，开卡（次卡、折扣卡）或充值（充值卡、充值）的会员数；统一客户当天去重，隔天累加
                  </view>
                </template>
                <wd-icon name="help-circle" size="15px" color="#979797" />
              </wd-popover>
            </view>
          </view>
        </view>
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>5000</text>
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
                服务客次
              </text>
              <wd-popover use-content-slot placement="bottom-start" :offset="-40">
                <template #content>
                  <view class="pop-content">
                    服务客次：按统计时间内的订单数统计，统计范围仅包含服务的订单。
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
          服务统计
        </text>
      </view>
      <view h20px />
      <view class="ct">
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>5000</text>
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
                实际收款金额
              </text>
              <wd-popover use-content-slot placement="bottom-start" :offset="-40">
                <template #content>
                  <view class="pop-content">
                    实际收款金额：订单完成时间在统计时间内收入金额总和减去退款金额总和
                  </view>
                </template>
                <wd-icon name="help-circle" size="15px" color="#979797" />
              </wd-popover>
            </view>
          </view>
        </view>
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>5000</text>
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
                客户消耗金额
              </text>
              <wd-popover use-content-slot placement="left">
                <template #content>
                  <view class="pop-content">
                    客户消耗金额：订单完成时间在统计时间内客户消耗类收款金额总和（减去退费）。消耗类包含：客户余额/权益次数消耗，不包括余额购买次卡/定制卡的消耗，其中权益次数消耗取折算后的单次金额计算客户消耗金额。
                  </view>
                </template>
                <wd-icon name="help-circle" size="15px" color="#979797" />
              </wd-popover>
            </view>
          </view>
        </view>
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>5000</text>
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
                数量
              </text>
              <wd-popover use-content-slot placement="bottom-start" :offset="-40">
                <template #content>
                  <view class="pop-content">
                    数量：订单完成时间在统计时间内，员工做服务的数量，仅统计绑定手艺人的订单和服务。
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
          销售统计
        </text>
      </view>
      <view h20px />
      <view class="ct">
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>5000</text>
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
                实际收款金额
              </text>
              <wd-popover use-content-slot placement="bottom-start" :offset="-40">
                <template #content>
                  <view class="pop-content">
                    实际收款金额：订单完成时间在统计时间内收入金额总和减去退款金额总和
                  </view>
                </template>
                <wd-icon name="help-circle" size="15px" color="#979797" />
              </wd-popover>
            </view>
          </view>
        </view>
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>5000</text>
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
                客户消耗金额
              </text>
              <wd-popover use-content-slot placement="left">
                <template #content>
                  <view class="pop-content">
                    客户消耗金额：订单完成时间在统计时间内客户消耗类收款金额总和（减去退费）。消耗类包含：客户余额/权益次数消耗，不包括余额购买次卡/定制卡的消耗，其中权益次数消耗取折算后的单次金额计算客户消耗金额。
                  </view>
                </template>
                <wd-icon name="help-circle" size="15px" color="#979797" />
              </wd-popover>
            </view>
          </view>
        </view>
        <view class="item">
          <view flex flex-ac flex-bt>
            <text>5000</text>
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
                数量
              </text>
              <wd-popover use-content-slot placement="top-start" :offset="-40">
                <template #content>
                  <view class="pop-content">
                    数量：订单完成时间在统计时间内，员工销售产品和服务的数量，仅统计绑定了销售的的订单和商品。
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
</style>
