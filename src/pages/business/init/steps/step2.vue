<route lang="yaml">
style:
  navigationBarTitleText: 添加服务
  navigationStyle: custom
</route>

<script lang="ts" setup>
const value = ref()
const value1 = ref()
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

const form = ref()
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

function handleChange(e: any) {
  console.log(e)
}
function doIt() {
  console.log('xxx')
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
  </wd-form>

  <view mt-40rpx flex bg-white px-40rpx py-24rpx flex-bt flex-ac>
    <view>
      <view fb>
        门店logo
      </view>
      <view color-666 f12 mt-10rpx>
        建议上传门店logo
      </view>
    </view>
    <view flex-ac flex>
      <wd-upload :file-list="fileList" :limit="1" action="https://ftf.jd.com/api/uploadImg" @change="handleChange" />
      <!-- <i i-material-symbols-light-chevron-right fn fs-40 color-999 style="transform: translateY(2rpx);" /> -->
    </view>
  </view>

  <view mt-40rpx>
    <view px-40rpx mb-20rpx color-999 f14>
      <text>门店名称</text>
      <text color-red>
        *
      </text>
    </view>
    <view bg-white px-40rpx py-24rpx>
      <wd-input
        v-model="value"
        :no-border="true"
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请填写门店名称" :maxlength="20" clearable show-word-limit
      />
    </view>
  </view>

  <view mt-40rpx>
    <view px-40rpx mb-20rpx color-999 f14>
      <text>联系电话</text>
      <text color-red>
        *
      </text>
    </view>
    <view bg-white px-40rpx py-24rpx>
      <wd-input
        v-model="value1"
        :no-border="true"
        type="number"
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请填写联系电话" :maxlength="11" clearable show-word-limit
      />
    </view>
  </view>

  <view mt-40rpx>
    <view px-40rpx mb-20rpx color-999 f14>
      <text>门店地址</text>
      <text color-red>
        *
      </text>
    </view>
    <view bg-white px-40rpx py-24rpx>
      <wd-textarea
        v-model="value"
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请填写门店地址" :maxlength="50" auto-height clearable show-word-limit
      />
    </view>
  </view>

  <view mt-40rpx>
    <view px-40rpx mb-20rpx color-999 f14>
      <text>门店简介</text>
    </view>
    <view bg-white px-40rpx py-24rpx>
      <wd-textarea
        v-model="value"
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请输入不少于10个字的描述" :maxlength="100" auto-height clearable show-word-limit
      />
    </view>
  </view>

  <view mx-40rpx mt-64rpx color-white>
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>保存</text>
      </view>
    </wd-button>
  </view>

  <view mx-40rpx mt-40rpx color-white>
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>保存并下一步</text>
      </view>
    </wd-button>
  </view>
  <view h-60rpx />
</template>

<style>
:deep(.wd-upload__evoke) {
  margin-bottom: 0 !important;
}
:deep(.wd-upload__preview) {
  margin: 0 0 0 0 !important;
}
</style>
