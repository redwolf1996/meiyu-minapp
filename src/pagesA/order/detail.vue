<route lang="yaml">
style:
  navigationBarTitleText: 订单详情
</route>

<script lang="ts" setup></script>

<template>
  <view px-30rpx py20rpx>
    <view p32rpx bg-white mb12px rd-4px>
      <view flex flex-ac flex-bt>
        <view f14>
          <text>收款</text>
          <text f18>
            ￥18
          </text>
        </view>
        <view class="my-status-tag end-service">
          已完成(退款成功)
        </view>
      </view>
      <view class="h20px" />
      <view>
        <MyCell label="退款金额">
          <span f14>￥18</span>
        </MyCell>
        <view class="h12px" />
      </view>
      <view f12 c-434343>
        <view flex flex-ac flex-bt mb12px>
          <view>订单编号</view>
          <view>MY2024042215384700000001</view>
        </view>
        <view flex flex-ac flex-bt mb12px>
          <view>创建时间</view>
          <view>2024-04-22 15:38:47</view>
        </view>
        <view flex flex-ac flex-bt>
          <view>销售员</view>
          <view>小妹</view>
        </view>
        <view flex flex-ac flex-bt mt12px>
          <view>取消时间</view>
          <view>2024-04-22 15:38:47</view>
        </view>
        <view flex flex-ac flex-bt mt12px>
          <view c-FF5B05>
            剩余支付时间: 12:23:12（用户端线上支付时再考虑）
          </view>
        </view>
      </view>
    </view>
    <view>
      <view bg-white px-32rpx py-40rpx mb12px rd-4px>
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
        <view rd-16rpx mt-20rpx bg-F0F0F0 py-18rpx px-32rpx flex flex-ac gap-32rpx>
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
                <text c-929292 fs-28 lh-28rpx>
                  13888888888
                </text>
                <wd-img
                  :width="16"
                  :height="16"
                  :src="`${IMG_BASE}/icon-v1.png`"
                />
              </view>
              <view f12>
                <text c-929292>
                  会员卡
                </text>
                <text c-00BB00>
                  2张
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
        <view mb20px style="border-bottom: 1px solid #eee;">
          <view fb mb12px flex flex-bt>
            <view>
              <text c-1A66FF>
                01
              </text>
              <text>水乳套装</text>
            </view>
            <view>x1</view>
          </view>
          <view flex flex-bt mb12px f14>
            <view>价格</view>
            <view>￥18.00</view>
          </view>
          <view flex flex-bt mb12px f14>
            <view>手艺人</view>
            <view>许乐乐</view>
          </view>
          <view flex flex-bt mb12px f14>
            <view>使用卡项</view>
            <view>7980折扣卡5折</view>
          </view>
          <view flex flex-bt mb12px f14>
            <view>手艺人</view>
            <view>小计&#12288;￥9.00</view>
          </view>
        </view>
        <view mb20px style="border-bottom: 1px solid #eee;">
          <view fb mb12px flex flex-bt>
            <view>
              <text c-1A66FF>
                01
              </text>
              <text>水乳套装</text>
            </view>
            <view>x1</view>
          </view>
          <view flex flex-bt mb12px f14>
            <view>价格</view>
            <view>￥18.00</view>
          </view>
          <view flex flex-bt mb12px f14>
            <view>手艺人</view>
            <view>许乐乐</view>
          </view>
          <view flex flex-bt mb12px f14>
            <view>使用卡项</view>
            <view>7980折扣卡5折</view>
          </view>
          <view flex flex-bt mb12px f14>
            <view>手艺人</view>
            <view>小计&#12288;￥9.00</view>
          </view>
        </view>
        <view f14 flex flex-ac flex-bt>
          <view>合计</view>
          <view>￥18.00</view>
        </view>
      </view>

      <view f14 bg-white px-32rpx py-40rpx mb12px rd-4px>
        <view flex gap16px mb12px>
          <view>付款方式</view>
          <view flex flex-y gap-2px>
            <view>微信支付&nbsp;&nbsp;￥10.00</view>
            <view>现金&nbsp;&nbsp;￥10.00</view>
          </view>
        </view>
        <view flex gap16px flex-ac>
          <view>支付时间</view>
          <view>2021-03-12 12:34:56</view>
        </view>
      </view>
    </view>
  </view>
  <view class="h20px" />
  <view flex flex-cc>
    <MyButton :borderWidth="2" radius="8rpx" fontSize="32rpx" width="208rpx" bgColor="transparent" color="#1A66FF" borderColor="#1A66FF">
      主动退款
    </MyButton>
  </view>
  <view class="h20px" />
</template>

<style lang='scss' scoped></style>
