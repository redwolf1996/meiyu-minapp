<route lang="yaml">
style:
  navigationBarTitleText: 完善登录信息
</route>

<script lang="ts" setup>
const model = reactive<{
  value1: string
  value2: string
  value3: string
}>({
  value1: '',
  value2: '',
  value3: '',
})

const formRef = ref()
function handleSubmit() {
  formRef.value
    .validate()
    .then(({ valid }) => {
      if (valid)
        toast().success('校验通过')
    })
    .catch((error) => {
      toast().error(error)
    })
}
</script>

<template>
  <view h-10px />
  <wd-form ref="formRef" :model="model">
    <wd-cell-group :border="true">
      <wd-input
        v-model="model.value1"
        label="姓名"
        prop="value1"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <wd-input
        v-model="model.value2"
        label="手机号"
        prop="value2"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <wd-input
        v-model="model.value2"
        label="邀请码"
        suffix-icon="arrow-right"
        placeholder="请输入"
      />
    </wd-cell-group>
    <view px-20px pt-80px>
      <view f14 color-#F7CD24>
        姓名填写须知
      </view>
      <view pt-10px f12 color-333>
        <text fb>
          姓名：
        </text>如果您是服务者，请填写客户熟知的姓名，方便客户预约时指定您的服务
      </view>
      <view pt-10px f12 color-333>
        <text fb>
          手机号：
        </text>请填写真实手机号，方便客户联系到你
      </view>
    </view>
    <view p-20px>
      <wd-button
        custom-class="theme-bg"
        :round="false" type="primary" size="large" :block="true"
        @click="handleSubmit"
      >
        保存
      </wd-button>
    </view>
  </wd-form>
</template>
