<route lang="yaml">
style:
  navigationBarTitleText: 添加服务
  navigationStyle: custom
</route>

<script lang="ts" setup>
const value = ref()
const fileList = ref<any[]>([
  { url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg' },
])
const columns = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])
const model = reactive<{
  value1: string
  value2: string
  value3: string
}>({
  value1: '',
  value2: '',
  value3: '',
})

const formData: any = reactive({
  val: '123',
  val1: 'sdsd',
})
const wd = ref(0)

const sources: any = [
  {
    label: '展示',
    value: 1,
    isActive: false,
  },
  {
    label: '不展示',
    value: 0,
    isActive: false,
  },
]

const sources2: any = [
  {
    label: '付全款',
    value: 1,
    isActive: false,
  },
  {
    label: '到店付',
    value: 0,
    isActive: false,
  },
]

watchEffect(() => {
  // console.log(form.val)
})

// function handleSubmit() {
//   form.value
//     .validate()
//     .then(({ valid }) => {
//       if (valid)
//         toast().success('校验通过')
//     })
//     .catch((error) => {
//       toast().error(error)
//     })
// }

function handleChange() {
}
</script>

<template>
  <StepNav :step="2" />
  <view mt-10px tc fs-40>
    您可以尝试添加第一个服务
  </view>
  <view mt-8px tc>
    也可跳过稍后在【工作台-服务管理】中添加
  </view>

  <view h-24rpx />
  <wd-form ref="form" :model="model">
    <wd-cell-group :border="true">
      <wd-input
        v-model="model.value1"
        label="服务名称"
        prop="value1"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写服务名称' }]"
      />
      <wd-picker v-model="value" :rules="[{ required: true, message: '请选择服务分类' }]" label="服务分类" align-right :columns="columns" />
      <wd-input
        v-model="model.value2"
        label="服务时长"
        prop="value23232"
        placeholder="请选择"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请选择服务时长' }]"
      />
    </wd-cell-group>

    <view mt-24rpx bg-white p-40rpx>
      <view class="form-item-title required">
        <text>服务图片</text>
      </view>
      <view color-999 f12 mt-10rpx>
        <text>建议尺寸：800*800像素，最多上传5张</text>
      </view>
      <view flex-ac flex mt-20rpx>
        <wd-upload :file-list="fileList" :limit="5" action="https://ftf.jd.com/api/uploadImg" @change="handleChange" />
      </view>
    </view>

    <view h-24rpx />
    <wd-cell-group :border="true">
      <wd-input
        v-model="model.value1"
        label="原价"
        prop="value1"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写原价' }]"
      />
      <wd-input
        v-model="model.value2"
        label="促销价"
        prop="value23232"
        placeholder="若不填写，客户则按原价购买"
        suffix-icon="arrow-right"
      />
    </wd-cell-group>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx>
      <view mb-20rpx class="form-item-title">
        <text>服务说明</text>
      </view>
      <wd-textarea
        v-model="value"
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请输入服务说明" :maxlength="500" auto-height clearable show-word-limit
      />
    </view>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx>
      <view class="form-item-title required">
        <text>网店展示{{ wd }}</text>
      </view>
      <view h-28rpx />
      <GridTagSelect v-model="wd" :sources="sources" />
    </view>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx>
      <view class="form-item-title required">
        <text>预约支付</text>
      </view>
      <view f12 color-999>
        <text>设置客户线上预约时是否需要支付</text>
      </view>
      <view h-28rpx />
      <GridTagSelect v-model="wd" :sources="sources2" />
    </view>
  </wd-form>

  <view mx-40rpx mt-64rpx color-white>
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>保存</text>
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
.grid-tag-select {
  display: grid;
  grid-gap: 20rpx;
  grid-template-columns: repeat(2, 1fr);
  > view {
    height: 20px;
    border: 1px solid blue;
  }
}
:deep(.wd-upload__evoke) {
  margin-bottom: 0 !important;
}
:deep(.wd-upload__preview) {
  margin: 0 0 0 0 !important;
}
</style>
