<route lang="yaml">
style:
  navigationBarTitleText: 添加员工
</route>

<script lang="ts">
import type { GeneralColumn } from '@/types'
import type { FormStaff } from './types'
import type { Staff } from '@/pagesA/staff/types'

export default {
  options: {
    styleIsolation: 'shared', // 在组件中要覆盖wot样式，必须加上此选项
  },
}
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  showSkip?: boolean // 是否展示跳过按钮（引导页需要）
}>(), {
  showSkip: false,
})
const columnsGender: GeneralColumn[] = [{ label: '未知', value: 0 }, { label: '男', value: 1 }, { label: '女', value: 2 }]
const columnsJob: GeneralColumn[] = [{ label: '店长', value: 1 }, { label: '手艺人', value: 2 }, { label: '营销顾问', value: 3 }]
const columnsRole: GeneralColumn[] = [{ label: '店长', value: 1 }, { label: '销售', value: 2 }, { label: '手艺人', value: 3 }]
const formRef = ref()
const { handleFilePickerUpload2, handleFileDelete, imageValue } = useOss()
const form = reactive<FormStaff>({
  storeId: storeId.value,
  storeStaffId: null,
  avatar: computed(() => imageValue.value?.length ? imageValue.value[0]?.url : ''),
  userName: null,
  phone: null,
  gender: 2,
  jobCode: [2, 3],
  roleCode: 1,
  notes: '',
  scheduling: computed(() => staffScheduling.value),
  serviceCategory: computed(() => curClassify.value.id),
})
const catName = computed(() => curClassify.value.name)

onLoad((options) => {
  form.storeStaffId = +options?.id
  if (options?.id) {
    curClassify.value.multiple = true
    uni.setNavigationBarTitle({ title: '修改员工' })
    setFormInfo()
  }
  else {
    staffScheduling.value = []
    resetCurClassify()
  }
})

async function setFormInfo() {
  const res = await request.get<Staff>(`/business/staff/${form.storeStaffId}`)
  const data = res.data
  form.storeStaffId = data.storeStaffId
  form.userName = data.userName
  form.phone = data.phone
  form.gender = +data.gender
  form.jobCode = data.jobCode
  form.roleCode = data.roleCode
  form.notes = data.notes
  staffScheduling.value = data.scheduling?.map((v1) => {
    return {
      weekCode: v1.weekCode,
      startTime: v1.startTime,
      endTime: v1.endTime,
    }
  })
  curClassify.value.id = data.serviceCategory?.map(v => v.serviceCategoryId)
  curClassify.value.name = data.serviceCategory?.map(v => v.serviceCategoryName).join('、')
  curClassify.value.storeId = storeId.value

  imageValue.value = [{
    name: 'ava',
    url: data.avatar,
    extname: 'img',
  }]
}

async function save() {
  if (form.storeStaffId) {
    await request.put<any>('/business/staff', form)
  }
  else {
    await request.post<any>('/business/staff', form)
  }
  setStaffList()
  useUserStore().setUserInfo({
    staffSkip: 1,
  })
  let msg = '添加成功'
  if (form.storeStaffId)
    msg = '修改成功'
  uni.showToast({ title: msg })
  await sleep(1000)
  uni.navigateBack()
}

const debounceSub = debounce(save)

async function skip() {
  useUserStore().setUserInfo({
    staffSkip: 2,
  })
  await request.get('/business/beginner/staffSkip')
  uni.navigateBack()
}

function toCats() {
  curClassify.value.type = CatType.Service
  curClassify.value.multiple = true
  uni.navigateTo({ url: '/pagesA/cats' })
}

function toWorkTimes() {
  uni.navigateTo({ url: '/pagesA/staff/work-time' })
}
</script>

<template>
  <wd-form ref="formRef" :model="form">
    <view mt-40rpx flex bg-white px-40rpx py-24rpx flex-bt flex-ac>
      <view>
        <view fb>
          员工头像
        </view>
        <view color-666 f12 mt-10rpx>
          上传员工的头像
        </view>
      </view>
      <uni-file-picker
        v-model="imageValue"
        fileMediatype="image"
        mode="grid"
        :limit="1"
        @select="handleFilePickerUpload2"
        @delete="handleFileDelete"
      />
    </view>

    <view h-24rpx />
    <wd-cell-group :border="true">
      <wd-input
        v-model="form.userName"
        label="姓名"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <wd-input
        v-model="form.phone"
        type="number"
        :maxlength="11"
        label="手机号"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <wd-picker
        v-model="form.gender"
        :rules="[{ required: true, message: '请选择性别' }]"
        label="性别"
        align-right :columns="columnsGender"
      />
      <wd-select-picker
        v-model="form.jobCode"
        :rules="[{ required: true, message: '请选择职位' }]"
        label="职位"
        align-right :columns="columnsJob"
      />
      <wd-picker
        v-model="form.roleCode"
        :rules="[{ required: true, message: '请选择角色' }]"
        label="角色"
        align-right :columns="columnsRole"
        clearable
      />
    </wd-cell-group>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx>
      <wd-textarea
        v-model="form.notes"
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请输入员工备注" :maxlength="200" auto-height clearable show-word-limit
      />
    </view>

    <view mt-40rpx>
      <view px-40rpx mb-20rpx color-999 f14>
        <text>服务</text>
      </view>
      <wd-cell-group :border="true">
        <MyCellGroup>
          <MyCell noBorder label="工作时间" @myclick="toWorkTimes()">
            <text v-if="!staffScheduling.length" f14 c-bfbfbf pr-5px>
              请选择
            </text>
            <view v-else>
              <view v-for="(itm, idx) in staffScheduling" :key="`time-${idx}`" f14>
                {{ `周${WeekMap[itm.weekCode]}：${itm.startTime}-${itm.endTime}` }}
              </view>
            </view>
          </MyCell>
          <MyCell noBorder borderTop label="服务分类" @myclick="toCats()">
            <text v-if="!catName" f14 c-bfbfbf pr-5px>
              请选择
            </text>
            <text v-else f14>
              {{ catName }}
            </text>
          </MyCell>
        </MyCellGroup>
      </wd-cell-group>
    </view>
  </wd-form>

  <view mx-40rpx mt-64rpx color-white @click="debounceSub()">
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>保存</text>
      </view>
    </wd-button>
  </view>

  <view v-if="props.showSkip" mx-40rpx color-white @click="skip()">
    <wd-button size="large" type="text" block>
      <view flex flex-cc color-333>
        <text>跳过</text>
      </view>
    </wd-button>
  </view>
  <view h-60rpx />
</template>

<style lang='scss' scoped>
:deep(.uni-file-picker__container) {
  flex-direction: row-reverse;
}
</style>
