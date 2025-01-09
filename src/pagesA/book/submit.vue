<route lang="yaml">
style:
  navigationBarTitleText: 预约服务
</route>

<script lang="ts" setup>
const totalAmount = sumArray(bookInfo.value.service.map(v => func_mul(v.price2, v.goodsCount)))
// const totalAmount = sumArray(bookInfo.value.service.map(v => v.totalAmount))
const totalAmount2 = sumArray(bookInfo.value.service.map(v => v.amount))
async function doSubmit() {
  bookInfo.value.amount = totalAmount2
  // 预约支付
  uni.navigateTo({ url: '/pagesA/billing/pay?createSource=4' })
}
</script>

<template>
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
          ￥{{ totalAmount }}
        </text>
      </view>

      <view flex flex-ac flex-xr mt20px>
        <text c-#FF5A5F>
          ￥{{ totalAmount2 }}
        </text>
        <text f14>
          合计：
        </text>
      </view>
    </view>

    <view mb16px px12px py16px bg-white>
      <view>备注</view>
      <view flex flex-ac flex-bt>
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
