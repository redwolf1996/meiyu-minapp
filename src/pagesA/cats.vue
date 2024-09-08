<route lang="yaml">
style:
  navigationBarTitleText: 选择分类
</route>

<script lang="ts" setup>
import type { CatItem } from '@/types'

const type = computed(() => curClassify.value.type)
const names = ['服务', '产品', '卡项']
const urls = [
  '/business/service/category',
  '/business/product/category',
  '/business/card/category',
]
const typeName = computed(() => names[type.value])
const typeUrl = computed(() => urls[type.value])
const list = ref<CatItem[]>([])
const isAdd = ref(true)
const inputDialogRef = ref()
const deleteDialogRef = ref()
const dialogKey = ref(0)
const showDialog = ref(false)
const curItem = ref<CatItem>(null)
const form = reactive({
  id: null,
  name: null,
  storeId,
})

async function dialogInputConfirm() {
  if (isAdd.value) {
    await request.post<any>(typeUrl.value, form)
  }
  else {
    await request.put<any>(typeUrl.value, form)
  }
  getList()
  inputDialogRef.value.close()
}

async function dialogConfirm() {
  await request.delete<any>(`${typeUrl.value}/${curItem.value.id}`)
  getList()
  deleteDialogRef.value.close()
}

function openDel(item: CatItem) {
  curItem.value = item
  deleteDialogRef.value.open()
}

async function openEdit(item: CatItem) {
  isAdd.value = false
  form.id = item.id
  form.name = item.name
  dialogKey.value++
  showDialog.value = true
  await nextTick()
  inputDialogRef.value.open()
}

async function openAdd() {
  isAdd.value = true
  form.name = null
  dialogKey.value++
  showDialog.value = true
  await nextTick()
  inputDialogRef.value.open()
}

async function getList() {
  const res = await request.get<CatItem[]>(`${typeUrl.value}?storeId=${storeId}`)
  if (res.data.length) {
    list.value = res.data.map((v) => {
      return {
        ...v,
        checked: curClassify.value.id === v.id,
      }
    })
  }
}

onMounted(() => {
  getList()
  uni.setNavigationBarTitle({ title: `选择${typeName.value}分类` })
})

function toggleCheck(item: CatItem) {
  if (!curClassify.value.multiple) {
    list.value.forEach((v) => {
      v.checked = false
    })
    item.checked = true
  }
  else {
    item.checked = !item.checked
  }

  curClassify.value.id = !curClassify.value.multiple
    ? item.id
    : list.value?.filter(v0 => v0.checked).map(v => v.id)
  curClassify.value.name = !curClassify.value.multiple
    ? item.name
    : list.value?.filter(v0 => v0.checked).map(v => v.name).join('、')
  curClassify.value.storeId = storeId
}

function selCat() {
  uni.navigateBack()
}
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
      <view v-for="(item, index) in list" :key="`k-${index}`" flex flex-ac flex-bt h56px style="border-bottom: 1px solid #eee;">
        <view flex flex-ac gap-5px @click="toggleCheck(item)">
          <radio style="transform:scale(1)" value="1" color="#1a66ff" :checked="item.checked" />
          <text>{{ item.name }}</text>
        </view>
        <view flex flex-ac gap-12px>
          <wd-icon name="edit-1" color="#1A66FF" size="22px" @click="openEdit(item)" />
          <wd-icon name="delete-thin" color="#EC5428" size="22px" @click="openDel(item)" />
        </view>
      </view>
      <view class="h50px" />
      <view color-white fixed bottom-50px style="width: calc(100% - 40px);" @click="selCat">
        <wd-button size="large" custom-class="theme-bg" block>
          <view flex flex-cc>
            <text>确定</text>
          </view>
        </wd-button>
      </view>
    </template>

    <uni-popup ref="inputDialogRef" type="dialog">
      <uni-popup-dialog
        v-if="showDialog"
        :key="dialogKey"
        v-model="form.name"
        mode="input" :title="`${isAdd ? '添加' : '修改'}${typeName}分类`"
        :placeholder="`请输入${typeName}分类名称`"
        @close="showDialog = false"
        @confirm="dialogInputConfirm"
      />
    </uni-popup>

    <uni-popup ref="deleteDialogRef" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消" confirmText="确定"
        title="提示" content="删除后不可恢复，确定删除吗？"
        @confirm="dialogConfirm"
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
