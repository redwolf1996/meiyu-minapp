<route lang="yaml">
  style:
    navigationBarTitleText: 完善信息
  </route>

<script lang="ts" setup>
const model = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: '',
})

const form = ref()
toast().error('校验通过')
function handleSubmit() {
  form.value
    .validate()
    .then(({ valid }) => {
      if (valid)
        toast().success('校验通过')
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>

<template>
  <wd-form ref="form" :model="model">
    <wd-cell-group border>
      <wd-input
        v-model="model.value1"
        label="用户名"
        label-width="100px"
        prop="value1"
        clearable
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <wd-input
        v-model="model.value2"
        label="密码"
        label-width="100px"
        prop="value2"
        show-password
        clearable
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </wd-cell-group>
    <view class="footer" p-24rpx>
      <wd-button type="primary" size="large" block @click="handleSubmit">
        提交
      </wd-button>
    </view>
  </wd-form>
</template>
