<route lang="yaml">
layout: common
style:
  navigationBarTitleText: 添加客户
</route>

<script lang="ts" setup>
import type { Customer } from './types'
import { CustomerSources, GenderSources, VipSources } from './data'
import { useArea } from '@/hooks/useArea'

const { area, addressValue, columnChange, handleConfirmAddress } = useArea()
const formRef = ref()
const calendar = ref()
const form = reactive<Customer>({
  storeId: storeId.value,
  name: '',
  phone: '',
  noteName: '',
  source: 1,
  artisanId: '', // TODO:wd-picker model-value 初始化的时候不能为null否则第一次选择会失效
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
  id: null,
})
const from = ref('tab')

onLoad((options) => {
  form.id = +options?.id
  from.value = options?.from ?? 'tab'

  if (form?.id > 0) {
    uni.setNavigationBarTitle({ title: '修改客户' })
    setFormInfo()
  }
})

// 修改时候初始化赋值
async function setFormInfo() {
  const res = await request.get<any>(`/business/store-customer/${form.id}`)
  const data = res.data
  form.id = data.id
  form.name = data.name
  form.noteName = data.noteName
  form.phone = data.phone
  form.source = data.source
  form.artisanId = data.artisanId || ''
  form.adviserId = data.adviserId || ''
  form.level = data.level
  form.gender = data.gender
  form.birthday = data.birthday
  form.wechatCode = data.wechatCode
  form.province = data.province
  form.city = data.city
  form.county = data.county
  form.address = data.address
  form.notes = data.notes
  addressValue.value = [data.province, data.city, data.county]
}

async function save() {
  if (form?.id)
    await request.put<any>('/business/store-customer', form)
  else
    await request.post<any>('/business/store-customer', form)

  let msg = '添加成功'
  if (form?.id)
    msg = '修改成功'
  uni.showToast({ title: msg })
  await sleep(1000)

  if (from.value === 'tab')
    uni.redirectTo({ url: '/pagesA/tabs/tab-business-customer' })
  else
    uni.navigateBack()
}

const debounceSave = debounce(save, 2000)

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
          v-model="form.phone"
          type="number"
          :maxlength="11"
          label="手机号"
          placeholder="请输入"
          suffix-icon="arrow-right"
          :rules="[{ required: true, message: '手机号必填' }]"
        />
        <wd-input
          v-model="form.noteName"
          label="备注名"
          placeholder="请输入"
          suffix-icon="arrow-right"
        />
        <wd-picker
          v-model="form.source"
          label="客户来源" align-right :columns="CustomerSources"
        />
        <wd-picker
          v-model="form.artisanId"
          label="手艺人"
          :columns="artistListStore"
          align-right clearable
        />
        <wd-picker
          v-model="form.adviserId"
          label="营销顾问"
          :columns="salesListStore"
          align-right clearable
        />
      </view>
    </wd-cell-group>

    <view h-24rpx />
    <wd-picker
      v-model="form.level"
      :readonly="+form?.id > 0"
      label="会员等级" align-right :columns="VipSources"
    />

    <view h-24rpx />
    <wd-cell-group :border="true">
      <wd-picker
        v-model="form.gender"
        label="性别" align-right :columns="GenderSources"
      />

      <wd-cell title="生日" :is-link="true" @click="openCalendar()">
        <view>
          <text v-if="!form.birthday" c-#B6BDBD>
            请选择日期
          </text>
          <text v-else>
            {{ form.birthday }}
          </text>
        </view>
      </wd-cell>

      <wd-input
        v-model="form.wechatCode"
        label="微信"
        placeholder="请输入"
        suffix-icon="arrow-right"
      />
      <wd-col-picker v-model="addressValue" auto-complete align-right label="地址" :columns="area" :column-change="columnChange" @confirm="handleConfirmAddress(form)" />
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

    <view mx-40rpx mt-48rpx color-white @click="debounceSave()">
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
