<route lang="yaml">
style:
  navigationBarTitleText: 添加次卡
  navigationStyle: custom
</route>

<script lang="ts" setup>
const value = ref()
const columns = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])
const form: any = reactive({
  val: 1,
})
const model = reactive<{
  value1: string
  value2: string
  value3: string
}>({
  value1: '',
  value2: '',
  value3: '',
})
const sources: any = [
  {
    label: '有限次卡',
    value: 1,
    isActive: true,
  },
  {
    label: '不限次卡',
    value: 2,
    isActive: false,
  },
  {
    label: '通卡',
    value: 3,
    isActive: false,
  },
]

function test() {
  console.log('xxx')
}
</script>

<template>
  <StepNav :step="3" />
  <view mt-10px tc fs-40>
    添加次卡
  </view>
  <view mt-8px tc>
    也可跳过稍后在【工作台-产品管理】中添加
  </view>

  <wd-form ref="form" :model="model">
    <view h-24rpx />
    <view bg-white p-40rpx>
      <view class="form-item-title required">
        <text>选择次卡类型</text>
      </view>
      <view h-28rpx />
      <GridTagSelect v-model="form.val" :sources="sources" :columns="3" />
    </view>

    <view h-24rpx />
    <wd-cell-group :border="true">
      <wd-input
        v-model="model.value1"
        label="卡名称"
        prop="value1"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写卡名称' }]"
      />
      <wd-picker
        v-model="value"
        :rules="[{ required: true, message: '请选择服务分类' }]"
        label="卡分类"
        align-right :columns="columns"
      />
      <wd-input
        v-model="model.value2"
        label="售价"
        prop="value23232"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写售价' }]"
      />
    </wd-cell-group>

    <view h-24rpx />
    <wd-cell-group :border="true">
      <wd-input
        v-model="model.value1"
        label="购卡权益"
        disabled
        prop="value1"
        placeholder="请选择商品或服务"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请选择商品或服务' }]"
        @click="test"
      />
      <view flex flex-bt flex-ac f13 style="padding:10px 20px;">
        <view>产品名称1</view>
        <view theme-red>
          ¥499
        </view>
        <view>
          <wd-input-number v-model="value" />
        </view>
      </view>
      <view flex flex-bt flex-ac f13 style="padding:10px 20px;">
        <view>产品名称1</view>
        <view theme-red>
          ¥499
        </view>
        <view>
          <wd-input-number v-model="value" />
        </view>
      </view>
      <view h-10rpx />
    </wd-cell-group>
  </wd-form>
  <view mx-40rpx mt-64rpx color-white>
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>下一步</text>
      </view>
    </wd-button>
  </view>

  <view mx-40rpx color-white>
    <wd-button size="large" type="text" block>
      <view flex flex-cc color-333>
        <text>跳过</text>
      </view>
    </wd-button>
  </view>
  <view h-60rpx />
</template>

<style lang='scss' scoped>
.end-time {
  display: inline-block;
  margin-left: 8px;
  border: 1px solid #faa21e;
  padding: 0 4px;
  font-size: 10px;
  color: #faa21e;
}
</style>
