<route lang="yaml">
style:
  navigationBarTitleText: 选择分类
</route>

<script lang="ts" setup>
const cats = ['服务', '产品', '卡项']
const type = ref(0) // 0服务 1产品 2卡项
onLoad((payload) => {
  type.value = payload?.type ?? 0
})

onMounted(() => {
  uni.setNavigationBarTitle({ title: `选择${cats[type.value]}分类` })
})
</script>

<template>
  <view px-20px h-90vh overflow-y-auto pr ma>
    <view flex flex-ac h-56px style="border-bottom: 1px solid #eee;">
      <wd-icon name="add-circle" size="22px" color="#1A66FF" />
      <text c-#1A66FF pl-10px>
        {{ `添加${cats[type]}分类` }}
      </text>
    </view>

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
    <wd-status-tip image="content" :tip="`暂无分类，请先添加${cats[type]}分类`" />
    <view class="h50px" />
    <view color-white fixed bottom-50px style="width: calc(100% - 40px);">
      <wd-button size="large" custom-class="theme-bg" block>
        <view flex flex-cc>
          <text>确定</text>
        </view>
      </wd-button>
    </view>
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
