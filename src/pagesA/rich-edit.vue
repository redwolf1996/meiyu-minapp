<route lang="yaml">
style:
  navigationBarTitleText: 编辑说明
</route>

<script lang="ts" setup>
import piaoyiEditor from '@/uni_modules/piaoyi-editor/components/piaoyi-editor/piaoyi-editor.vue'

onMounted(() => {
  uni.setNavigationBarTitle({ title: richData.value.title })
})

const photoUrl = ref('http://test.com')
const api = ref('api')
const name = ref('file')
const values = ref('')

function setContents(e) {
  richData.value.content = e.html
}
</script>

<template>
  <piaoyiEditor
    fontsize="13px"
    :values="values"
    :maxlength="30000"
    :readOnly="false"
    :photoUrl="photoUrl"
    :api="api"
    :name="name"
    @changes="setContents"
  />
</template>

<style lang='scss' scoped></style>
