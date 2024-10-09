<route lang="yaml">
style:
  navigationBarTitleText: 门店信息
</route>

<script lang="ts" setup>
const { colPickerData, findChildrenByCode } = useColPickerData()
const storeInfo = computed(() => {
  return useUserStore().userInfo?.storeList?.[0]
})
const imageValue = ref<any>([{
  url: storeInfo.value?.logo || '',
}])
const pccValue = ref<string[]>([storeInfo.value.province || '', storeInfo.value.city || '', storeInfo.value.county || ''])
const form: any = reactive({
  id: storeInfo.value.storeId,
  storeName: storeInfo.value?.storeName || '',
  logo: computed(() => imageValue.value[0].url),
  phone: storeInfo.value.phone,
  address: storeInfo.value.address,
  desc: storeInfo.value.desc,
  province: storeInfo.value.province,
  city: storeInfo.value.city,
  county: storeInfo.value.county,
})
const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text,
    }
  }),
])

function columnChange({ selectedItem, resolve, finish }) {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text,
        }
      }),
    )
  }
  else {
    finish()
  }
}

function handleConfirm({ value }) {
  form.province = value[0]
  form.city = value[1]
  form.county = value[2]
}

async function save() {
  await request.put<any>('/business/store', form)
  uni.showToast({
    title: '修改成功',
    icon: 'none',
  })
  const res = await request.get<any>('/business/info')
  useUserStore().setUserInfo(res.data)
  uni.navigateBack()
}
</script>

<template>
  <view mt-40rpx flex bg-white px-40rpx py-24rpx flex-bt flex-ac>
    <view>
      <view fb>
        门店logo
      </view>
      <view color-666 f12 mt-10rpx>
        建议上传门店logo
      </view>
    </view>
    <uni-file-picker
      v-model="imageValue"
      fileMediatype="image"
      mode="grid"
      :limit="1"
    />
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
        v-model="form.storeName"
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
        v-model="form.phone"
        :no-border="true"
        type="number"
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请填写联系电话" :maxlength="11" clearable show-word-limit
      />
    </view>
  </view>

  <view mt-40rpx>
    <view px-40rpx mb-20rpx color-999 f14>
      <text>所在地区</text>
      <text color-red>
        *
      </text>
    </view>
    <wd-col-picker v-model="pccValue" label="" :columns="area" :column-change="columnChange" @confirm="handleConfirm" />
  </view>

  <view mt-40rpx>
    <view px-40rpx mb-20rpx color-999 f14>
      <text>详细地址</text>
      <text color-red>
        *
      </text>
    </view>
    <view bg-white px-40rpx py-24rpx>
      <wd-textarea
        v-model="form.address"
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
        v-model="form.desc"
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请输入不少于10个字的描述" :maxlength="100" auto-height clearable show-word-limit
      />
    </view>
  </view>

  <view mx-40rpx mt-64rpx color-white>
    <wd-button size="large" custom-class="theme-bg" block @click="save()">
      <view flex flex-cc>
        <text>保存</text>
      </view>
    </wd-button>
  </view>

  <view h-60rpx />
</template>

<style>
:deep(.uni-file-picker__container) {
  flex-direction: row-reverse;
}
:deep(.wd-upload__evoke) {
  margin-bottom: 0 !important;
}
:deep(.wd-upload__preview) {
  margin: 0 0 0 0 !important;
}
</style>
