<route lang="yaml">
style:
  navigationBarTitleText: 意见反馈
</route>

<script lang="ts" setup>
const { handleFilePickerUpload2, handleFileDelete, imageValue } = useOss()
const form = reactive<any>({
  version: 1.0,
  categoryId: null,
  clientType: 2, // 1客户 2商家
  content: '',
  contact: '',
  imgs: computed(() => imageValue.value.length ? imageValue.value?.map(v => v.url) : []),
})
const list = ref(
  [
    {
      label: '设置服务/产品/卡项/员工保存失败',
      id: 1,
      active: false,
    },
    {
      label: '权限问题',
      id: 2,
      active: false,
    },
    {
      label: '订单完结、重复支付等',
      id: 3,
      active: false,
    },
    {
      label: '店铺信息、地址问题',
      id: 4,
      active: false,
    },
    {
      label: '续费支付失败等问题',
      id: 5,
      active: false,
    },
    {
      label: '预约问题',
      id: 6,
      active: false,
    },
    {
      label: '其他',
      id: 7,
      active: false,
    },
  ],
)

function clickItem(item) {
  form.categoryId = item.id
  list.value.forEach((val) => {
    val.active = false
  })
  item.active = true
}

async function save() {
  if (!form.categoryId) {
    uni.showToast({ title: '请选择反馈类型', icon: 'none' })
    return
  }
  if (!form.content) {
    uni.showToast({ title: '请填写反馈内容', icon: 'none' })
    return
  }
  await request.post('/business/suggestion', form)
  uni.showToast({ title: '提交成功' })
  await sleep(1000)
  uni.navigateBack()
}
</script>

<template>
  <view px20px py12px c-#969699 fs-14px>
    反馈类型（必填）
  </view>
  <view bg-white px20px>
    <view v-for="item in list" :key="item.id" py14px class="bd-bottom" @click="clickItem(item)">
      <text>{{ item.label }}</text>
      <wd-img
        v-if="item.active"
        :width="26"
        :height="19"
        :src="`${IMG_BASE}/icon-correct.png`"
      />
    </view>
  </view>
  <view px20px py12px c-#969699 fs-14px>
    反馈内容（必填）
  </view>
  <view bg-white>
    <wd-textarea
      v-model="form.content"
      :maxlength="200"
      style="height: 112px;"
      placeholderStyle="font-size: 14px;color:#C9CDD4;"
      placeholder="请填写10个字以上的问题描述，以便我们更好的为您提供帮助"
      clearable show-word-limit
    />
  </view>
  <view px20px py12px c-#969699 fs-14px>
    添加图片(最多4张，选填)
  </view>
  <view bg-white py16px px20px>
    <uni-file-picker
      v-model="imageValue"
      fileMediatype="image"
      mode="grid"
      :limit="4"
      @select="handleFilePickerUpload2"
      @delete="handleFileDelete"
    />
  </view>
  <view h150px />
  <view color-white fixed bottom-30px x-center style="width: calc(100% - 40px);" @click="save">
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>提交</text>
      </view>
    </wd-button>
  </view>
</template>

<style lang='scss' scoped>
.bd-bottom {
  border-bottom: 1px solid #ebeef1;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}
</style>
