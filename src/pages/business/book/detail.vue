<route lang="yaml">
style:
  navigationBarTitleText: 预约详情
</route>

<script lang="ts" setup></script>

<template>
  <view px-32rpx py-16rpx>
    <view bg-white px-34rpx py-40rpx>
      <view flex flex-ac gap-20rpx>
        <wd-img
          :width="18"
          :height="18"
          :src="`${IMG_BASE}/icon-cus.png`"
        />
        <text fs-34>
          客户
        </text>
      </view>
      <view rd-16rpx mt-20rpx bg-#F0F0F0 py-18rpx px-32rpx flex flex-ac gap-32rpx>
        <wd-img
          :width="48"
          :height="48"
          :round="true"
          :src="`${IMG_BASE}/cat.png`"
        />
        <view flex flex-y flex-bt flex-1 gap-20rpx>
          <view f16>
            王乐乐
          </view>
          <view flex flex-ac flex-bt>
            <view flex flex-ac gap-16rpx>
              <text c-#929292 fs-28 lh-28rpx>
                13888888888
              </text>
              <wd-img
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-v1.png`"
              />
            </view>
            <view f12>
              <text c-#929292>
                会员卡
              </text>
              <text c-#00BB00>
                2张
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view bg-white px-34rpx py-40rpx mt-16px>
      <view flex flex-ac gap-20rpx>
        <wd-img
          :width="18"
          :height="18"
          :src="`${IMG_BASE}/icon-book.png`"
        />
        <text fs-34>
          预约信息
        </text>
      </view>
      <view mt-36rpx dib px-8px c-#00CCD8 bg-#CCF3F6 fs-22 h-20px lh-20px tc>
        预约上门
      </view>
      <!-- <view mt-36rpx dib px-8px c-#FF5A5F bg-#FCE8E9 fs-22 h-20px lh-20px tc>
        预约到店
      </view> -->
      <view mt-10px f12 c-#818181>
        预约时间：<text c-#232220>
          2022
        </text>
      </view>
      <view mt-10px f12 c-#818181>
        预约人：<text c-#232220>
          2022
        </text>
      </view>
      <view mt-10px f12 c-#818181>
        手机号：<text c-#232220>
          2022
        </text>
      </view>
      <view mt-10px f12 c-#818181>
        手艺人：<text c-#232220>
          2022
        </text>
      </view>
      <view mt-10px f12 c-#818181>
        备注：<text c-#232220>
          2022
        </text>
      </view>
      <view mt-10px f12 c-#818181>
        地址：<text c-#232220>
          2022
        </text>
      </view>
      <view style="height: 1px;background-color: #E6E6E6" wp-100 mt10px />
      <view f14 tc mt-10px>
        核销码&#12288;1780012312312
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped></style>
