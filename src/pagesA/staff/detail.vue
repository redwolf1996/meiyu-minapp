<route lang="yaml">
style:
  navigationBarTitleText: 员工详情
</route>

<script lang="ts" setup>
import type { Staff } from './types'

const id = ref(0)
const detailInfo = ref<Staff>(null)
const weeks = {
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  7: '周日',
}
const deleteDialogRef = ref()

onLoad((options) => {
  id.value = +options?.id
})

onShow(async () => {
  const res = await request.get<Staff>(`/business/staff/${id.value}`)
  detailInfo.value = res.data
})

async function dialogConfirm() { // 删除
  deleteDialogRef.value.close()
  await request.delete<any>(`/business/staff/${id.value}`)
  uni.showToast({ title: '删除成功' })
  await sleep(500)
  uni.navigateBack()
}

function toDelete() {
  deleteDialogRef.value.open()
}
</script>

<template>
  <view f14 flex flex-xr gap-40rpx px-50rpx pb-50rpx pt-20rpx>
    <text c-1A66FF>
      修改
    </text>
    <!-- <text c-1A66FF>
      邀请登录
    </text> -->
    <text c-F96229 @click="toDelete()">
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
        :src="detailInfo?.avatar"
      />
    </view>
    <view mt-20rpx fb fs-40>
      {{ detailInfo?.userName }}
    </view>
    <view mt-20rpx flex flex-cc gap-10rpx>
      <text c-95969D f12>
        {{ detailInfo?.jobDesc }}
      </text>
      <wd-img
        :width="11"
        :height="11"
        :src="`${IMG_BASE}/icon-owner.png`"
      />
    </view>
    <!-- <view f12 mt-10rpx>
      转移权限
    </view> -->
    <view mt-40rpx flex flex-ac flex-cc gap-140rpx tc>
      <view>
        <view f16 fb>
          {{ detailInfo?.performance ?? '--' }}
        </view>
        <view h-20rpx />
        <view f12 fb c-95969D>
          业绩(元)
        </view>
      </view>
      <view>
        <view f16 fb>
          {{ detailInfo?.bookingCount }}
        </view>
        <view h-20rpx />
        <view f12 fb c-95969D>
          客户预约
        </view>
      </view>
      <view>
        <view f16 fb>
          {{ detailInfo?.customerCount }}
        </view>
        <view h-20rpx />
        <view f12 fb c-95969D>
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
            {{ detailInfo?.userName }}
          </text>
        </view>
        <view class="base">
          <text class="label">
            性别
          </text>
          <text class="val">
            {{ detailInfo?.gender }}
          </text>
        </view>
        <view class="base">
          <text class="label">
            联系电话
          </text>
          <text class="val">
            {{ detailInfo?.phone }}
          </text>
        </view>
        <view class="base">
          <text class="label">
            职位
          </text>
          <text class="val">
            {{ detailInfo?.jobDesc }}
          </text>
        </view>
        <view class="base">
          <text class="label">
            角色
          </text>
          <text class="val">
            {{ detailInfo?.roleDesc }}
          </text>
        </view>
        <!-- <view class="base">
          <text class="label">
            账号
          </text>
          <text class="val">
            xxxxxxxx
          </text>
        </view> -->
        <view class="base">
          <text class="label">
            备注
          </text>
          <text class="val">
            {{ detailInfo?.notes }}
          </text>
        </view>
        <view class="base">
          <text class="label">
            创建时间
          </text>
          <text class="val">
            {{ detailInfo?.createTime }}
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
          <view class="val">
            <view v-for="(item, index) in detailInfo?.scheduling" :key="`sad-${index}`">
              {{ weeks[item.weekCode] }}&nbsp;&nbsp;{{ item.startTime }}-{{ item.endTime }}
            </view>
          </view>
        </view>
        <view class="base base2">
          <text class="label">
            服务分类
          </text>
          <text class="val">
            {{ detailInfo?.serviceCategory?.map((v) => v.serviceCategoryName)?.join('，') }}
          </text>
        </view>
      </view>
    </view>
  </view>

  <uni-popup ref="deleteDialogRef" type="dialog">
    <uni-popup-dialog
      type="warn"
      cancelText="取消" confirmText="确定"
      title="提示" content="删除后不可恢复，确定删除吗？"
      @confirm="dialogConfirm"
    />
  </uni-popup>
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
