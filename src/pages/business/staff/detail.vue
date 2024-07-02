<route lang="yaml">
style:
  navigationBarTitleText: 员工详情
</route>

<script lang="ts" setup>
</script>

<template>
  <view f14 flex flex-xr gap-40rpx px-50rpx pb-50rpx pt-20rpx>
    <text c-#1A66FF>
      修改
    </text>
    <text c-#1A66FF>
      邀请登录
    </text>
    <text c-#F96229>
      删除
    </text>
  </view>
  <view tc>
    <view>
      <wd-img
        :width="104"
        :height="104"
        mode="center"
        :round="true"
        :src="`${IMG_BASE}/cat.png`"
      />
    </view>
    <view mt-20rpx fb fs-40>
      麦子欢
    </view>
    <view mt-20rpx flex flex-cc gap-20rpx>
      <text c-#95969D f12>
        店铺拥有者
      </text>
      <wd-img
        :width="11"
        :height="11"
        :src="`${IMG_BASE}/icon-owner.png`"
      />
    </view>
    <view f12 mt-10rpx>
      转移权限
    </view>
    <view mt-40rpx flex flex-ac flex-cc gap-140rpx tc>
      <view>
        <view f16 fb>
          2700
        </view>
        <view h-20rpx />
        <view f12 fb c-#95969D>
          业绩(元)
        </view>
      </view>
      <view>
        <view f16 fb>
          19
        </view>
        <view h-20rpx />
        <view f12 fb c-#95969D>
          客户预约
        </view>
      </view>
      <view>
        <view f16 fb>
          14
        </view>
        <view h-20rpx />
        <view f12 fb c-#95969D>
          客户
        </view>
      </view>
    </view>
  </view>
  <view p-60rpx>
    <view f16 fb mb-30rpx>
      基本信息
    </view>
    <view bg-white rd-20rpx px-50rpx py-60rpx flex gap-60rpx>
      <wd-img
        :width="40"
        :height="40"
        :src="`${IMG_BASE}/icon-staff.png`"
      />
      <view class="base-wrapper">
        <view class="base">
          <text class="label">
            姓名
          </text>
          <text class="val">
            麦子欢
          </text>
        </view>
        <view class="base">
          <text class="label">
            性别
          </text>
          <text class="val">
            女
          </text>
        </view>
        <view class="base">
          <text class="label">
            联系电话
          </text>
          <text class="val">
            13800000000
          </text>
        </view>
        <view class="base">
          <text class="label">
            职位
          </text>
          <text class="val">
            营销顾问
          </text>
        </view>
        <view class="base">
          <text class="label">
            角色
          </text>
          <text class="val">
            顾问
          </text>
        </view>
        <view class="base">
          <text class="label">
            账号
          </text>
          <text class="val">
            xxxxxxxx
          </text>
        </view>
        <view class="base">
          <text class="label">
            备注
          </text>
          <text class="val">
            麦子欢
          </text>
        </view>
        <view class="base">
          <text class="label">
            创建时间
          </text>
          <text class="val">
            2024-04-12 10:45
          </text>
        </view>
      </view>
    </view>
    <view h-80rpx />
    <view f16 fb mb-30rpx>
      服务信息
    </view>
    <view bg-white rd-20rpx px-50rpx py-60rpx flex gap-60rpx>
      <wd-img
        :width="40"
        :height="40"
        :src="`${IMG_BASE}/icon-serve.png`"
      />
      <view class="base-wrapper">
        <view class="base base2">
          <text class="label">
            工作时间
          </text>
          <text class="val">
            周一至周日  09:00-21:00
          </text>
        </view>
        <view class="base base2">
          <text class="label">
            服务分类
          </text>
          <text class="val">
            基础护理，针灸，刮痧
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.base-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28rpx;
}
.base {
  display: flex;
  align-items: center;
  gap: 12rpx;
  .label {
    color: #0d0d26;
    font-size: 28rpx;
  }
  .val {
    color: #91919f;
    font-size: 26rpx;
  }
  &.base2 {
    display: block;
    .label,
    .val {
      display: block;
    }
    .label {
      margin-bottom: 12rpx;
    }
  }
}
</style>
