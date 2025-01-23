<route lang="yaml">
style:
  navigationBarTitleText: 完善登录信息
</route>

<script lang="ts" setup>
import type { UserInfo } from '@/stores/modules/user'

const role = ref<'business' | 'staff'>('business')
const form = reactive<{
  userName: string
  phone: string
  othersInviteCode: string
}>({
  userName: '',
  phone: '',
  othersInviteCode: '',
})

onLoad((payload) => {
  role.value = payload?.role
})

const formRef = ref()
function handleSubmit() {
  formRef.value
    .validate()
    .then(async ({ valid }) => {
      if (valid) {
        const url = role.value === 'business' ? '/business/info' : '/business/staff-info'
        const res = await request.post<{ token: string, isRegister: 0 | 1 }>(url, form)
        const { token, isRegister } = res.data
        useUserStore().setUserInfo({ token, isRegister })
        await setUserBaseInfo()
        uni.reLaunch({ url: '/pagesA/tabs/tab-business-dashboard' })
      }
    })
    .catch((error) => {
      toast().error(error)
    })
}
</script>

<template>
  <view h-10px />
  <wd-form ref="formRef" :model="form">
    <wd-cell-group :border="true">
      <wd-input
        v-model="form.userName"
        label="姓名"
        prop="userName"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <wd-input
        v-model="form.phone"
        label="手机号"
        prop="phone"
        placeholder="请输入"
        suffix-icon="arrow-right"
        type="number"
        :maxlength="11"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <wd-input
        v-model="form.othersInviteCode"
        label="邀请码"
        :maxlength="11"
        suffix-icon="arrow-right"
        placeholder="请输入"
      />
    </wd-cell-group>
    <view px-20px pt-80px>
      <view f14 color-F7CD24>
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
