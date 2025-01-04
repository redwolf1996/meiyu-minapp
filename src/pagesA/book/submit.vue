<route lang="yaml">
style:
  navigationBarTitleText: 预约服务
</route>

<script lang="ts" setup>
const totalAmount = sumArray(bookInfo.value.service.map(v => func_mul(v.price, v.goodsCount)))
const totalAmount2 = sumArray(bookInfo.value.service.map(v => func_mul(v.price2, v.goodsCount)))
async function doSubmit() {
  // const params = {
  //   ...bookInfo.value,
  //   amount: totalAmount2,
  // }
  bookInfo.value.amount = totalAmount2
  uni.navigateTo({ url: '/pagesA/billing/pay?createSource=4' })
  // await request.post('/business/booking', params)
  // uni.redirectTo({ url: '/pagesA/tabs/tab-business-dashboard' })
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
          {{ bookInfo.startTime ?? '--' }}
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
          v-for="(item, index) in bookInfo.service" :key="`k-${index}`" flex flex-ac gap-12px
        >
          <wd-img
            radius="10px"
            :width="72"
            :height="72"
            :src="item.coverImg"
          />
          <view flex-1 flex flex-y flex-bt h72px>
            <view>
              <view f14 c-3B3D3D mb4px>
                {{ item.name }}
              </view>
              <view fs-22 c-7C7C7C>
                服务时长：{{ item.duration }}分钟
              </view>
            </view>
            <view flex flex-ac flex-bt>
              <view flex flex-ac gap4px>
                <text c-FF1919 f18>
                  ￥{{ item.price2 }}
                </text>
                <text line-through f12 c-D4D4D4>
                  ￥{{ item.price }}
                </text>
              </view>
              <view f12 c-7C7C7C>
                x{{ item.goodsCount ?? 1 }}
              </view>
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
      <view flex flex-ac flex-bt>
        <view />
        <view flex flex-ac gap6px>
          <text>合计：</text>
          <text c-FF5A5F>
            ￥{{ totalAmount2 }}
          </text>
        </view>
      </view>
      <view flex flex-xr mt10px>
        <text bg-FCE8E9 rd-2px c-FF5A5F h38rpx w98rpx tc flex flex-cc fs-22>
          {{ bookInfo.storeServiceType === 1 ? '到店付' : '上门付' }}
        </text>
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
