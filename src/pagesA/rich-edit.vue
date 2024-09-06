<route lang="yaml">
style:
  navigationBarTitleText: 编辑说明
</route>

<script lang="ts" setup>
import piaoyiEditor from '@/uni_modules/piaoyi-editor/components/piaoyi-editor/piaoyi-editor.vue'

onMounted(() => {
  uni.setNavigationBarTitle({ title: richData.value.title })
})

const name = computed(() => richData.value.key)
const values = computed(() => richData.value.content)
const tmp = reactive({
  content: '',
  len: 0,
})

function setContents(e: { html: string, length: number }) {
  tmp.content = e.html
  tmp.len = e.length
}

function save() {
  richData.value.content = tmp.content
  richData.value.len = tmp.len
  setTimeout(() => {
    uni.navigateBack()
  }, 100)
}
</script>

<template>
  <piaoyiEditor
    fontsize="12px"
    :values="values"
    :maxlength="30000"
    :readOnly="false"
    :name="name"
    @input="setContents"
  />
  <view mx-40rpx mt-24rpx color-white @click="save()">
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>保存</text>
      </view>
    </wd-button>
  </view>
</template>

<style lang='scss' scoped></style>
