<route lang="yaml">
layout: common
style:
  navigationBarTitleText: 添加客户
</route>

<script lang="ts" setup>
import type { Customer } from './types'
import { CustomerSources, GenderSources, VipSources } from './data'
import api from '../api'
import { useArea } from '@/hooks/useArea'

const { area, addressValue, columnChange, handleConfirmAddress } = useArea()
const formRef = ref()
const calendar = ref()
const form = reactive<Customer>({
  storeId,
  name: '',
  phone: '',
  noteName: '',
  source: 1,
  artisanId: '',
  adviserId: '',
  level: 1,
  gender: 2,
  birthday: '',
  wechatCode: '',
  province: '',
  city: '',
  county: '',
  address: '',
  notes: '',
})
const staffList = ref<{ label: string, value: number }[]>([])

onLoad(() => {
  setStaffList()
})

async function setStaffList() {
  const res = await api.getStaffList({ storeId })
  staffList.value = res.data.list?.map((v) => {
    return {
      label: v.userName,
      value: v.staffId,
    }
  })
}

function calendarConfirm(e) {
  form.birthday = e.fulldate
}

function openCalendar() {
  calendar.value.open()
}
</script>

<template>
  <wu-calendar ref="calendar" cancelColor="gray" :confirmColor="themeColor" :date="form.birthday || '1995-06-06'" :useToday="false" :insert="false" @confirm="calendarConfirm" />
  <wd-form ref="formRef" :model="form">
    <wd-cell-group :border="true">
      <view>
        <wd-input
          v-model="form.name"
          label="姓名"
          placeholder="请输入"
          suffix-icon="arrow-right"
          :rules="[{ required: true, message: '姓名必填' }]"
        />
        <wd-input
          v-model="form.noteName"
          label="备注名"
          placeholder="请输入"
          suffix-icon="arrow-right"
        />
        <wd-input
          v-model="form.phone"
          label="手机号"
          placeholder="请输入"
          suffix-icon="arrow-right"
          :rules="[{ required: true, message: '手机号必填' }]"
        />
        <wd-picker
          v-model="form.source"
          label="客户来源" align-right :columns="CustomerSources"
        />
        <wd-picker
          v-model="form.artisanId"
          label="手艺人" align-right :columns="staffList"
        />
        <wd-picker
          v-model="form.adviserId"
          label="营销顾问" align-right :columns="staffList"
        />
      </view>
    </wd-cell-group>

    <view h-24rpx />
    <wd-picker
      v-model="form.level"
      label="会员等级" align-right :columns="VipSources"
    />

    <view h-24rpx />
    <wd-cell-group :border="true">
      <wd-picker
        v-model="form.gender"
        label="性别" align-right :columns="GenderSources"
      />

      <view px-20px bg-white>
        <MyCell noBorder borderTop required label="生日" @click="openCalendar()">
          <text v-if="!form.birthday" f14 c-#bfbfbf pr-5px>
            请选择
          </text>
          <text v-else f14>
            {{ form.birthday }}
          </text>
        </MyCell>
      </view>

      <wd-input
        v-model="form.wechatCode"
        label="微信"
        placeholder="请输入"
        suffix-icon="arrow-right"
      />
      <wd-col-picker v-model="addressValue" align-right label="地址" :columns="area" :column-change="columnChange" @confirm="handleConfirmAddress(form)" />
      <wd-input
        v-model="form.address"
        label="详细地址"
        placeholder="请输入"
        suffix-icon="arrow-right"
      />
    </wd-cell-group>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx>
      <wd-textarea
        v-model="form.notes"
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请输入客户备注" :maxlength="200" auto-height clearable show-word-limit
      />
    </view>

    <view mx-40rpx mt-48rpx color-white>
      <wd-button size="large" custom-class="theme-bg" block>
        <view flex flex-cc>
          <text>保存</text>
        </view>
      </wd-button>
    </view>
  </wd-form>

  <view h-50px />
</template>

  <style>
  :root {
  --wot-upload-size: 80rpx;
}
</style>

  <style lang='scss' scoped>
  :deep(.wd-radio-group) {
  line-height: 32 !important;
}
:deep(.wd-upload__evoke) {
  margin-bottom: 0 !important;
}
:deep(.wd-upload__evoke-num) {
  display: none;
}
:deep(.wd-upload__preview) {
  margin: 0 0 0 0 !important;
}
</style>
