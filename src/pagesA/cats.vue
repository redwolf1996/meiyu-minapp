<route lang="yaml">
style:
  navigationBarTitleText: 选择分类
</route>

<script lang="ts" setup>
import type { CatItem } from '@/types'

const type = ref(0)
const names = ['服务', '产品', '卡项']
const urls = [
  '/business/service/category',
  '/business/product/category',
  '/business/card/category',
]
const typeName = computed(() => names[type.value])
const typeUrl = computed(() => urls[type.value])
const list = ref<CatItem[]>([])
const inputDialogRef = ref()
const form = reactive({
  id: null,
  name: '',
})

function dialogInputConfirm() {
  console.log(form.name)
  inputDialogRef.value.close()
}

function openAdd() {
  form.name = ''
  inputDialogRef.value.open()
}

async function getList() {
  const res = await request.get<CatItem[]>(`${typeUrl.value}?storeId=1`)
  if (res.data.length) {
    list.value = res.data.map((v) => {
      return {
        ...v,
        checked: false,
      }
    })
  }
}

onLoad((payload) => {
  type.value = payload?.type ?? 0
})

onMounted(() => {
  getList()
  uni.setNavigationBarTitle({ title: `选择${typeName.value}分类` })
})
</script>

<template>
  <view px-20px h-90vh overflow-y-auto pr ma>
    <view flex flex-ac h-56px style="border-bottom: 1px solid #eee;" @click="openAdd()">
      <wd-icon name="add-circle" size="22px" color="#1A66FF" />
      <text c-#1A66FF pl-10px>
        {{ `添加${typeName}分类` }}
      </text>
    </view>

    <wd-status-tip v-if="!list.length" image="content" :tip="`暂无分类，请先添加${typeName}分类`" />
    <template v-else>
      <view flex flex-ac flex-bt h56px style="border-bottom: 1px solid #eee;">
        <view flex flex-ac gap-5px>
          <radio style="transform:scale(1)" value="1" color="#1a66ff" :checked="true" />
          <text>产品分类名称1</text>
        </view>
        <view flex flex-ac gap-12px>
          <wd-icon name="edit-1" color="#1A66FF" size="22px" />
          <wd-icon name="delete-thin" color="#EC5428" size="22px" />
        </view>
      </view>
      <view class="h50px" />
      <view color-white fixed bottom-50px style="width: calc(100% - 40px);">
        <wd-button size="large" custom-class="theme-bg" block>
          <view flex flex-cc>
            <text>确定</text>
          </view>
        </wd-button>
      </view>
    </template>

    <uni-popup ref="inputDialogRef" type="dialog">
      <uni-popup-dialog
        v-model="form.name"
        mode="input" :title="`${typeName}分类`"
        :placeholder="`请输入${typeName}分类名称`" @confirm="dialogInputConfirm"
      />
    </uni-popup>
  </view>
</template>

<style>
page {
  background-color: #fff;
  height: 100vh;
  overflow-y: auto;
}
</style>

<style lang='scss' scoped></style>
