<script lang="ts" setup>
const props = withDefaults(defineProps<{
  placeholder?: string
}>(), {
  placeholder: '请输入名称',
})

const emit = defineEmits(['update:modelValue', 'search'])
const txt = ref('')

function onChangeInput(e: HTMLInputElement) {
  emit('update:modelValue', e.value)
}

function onClickSearch() {
  emit('search')
}
</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <view class="search">
    <view class="inner">
      <wd-input
        v-model="txt"
        :placeholder="props.placeholder"
        custom-class="cus-input"
        :no-border="true"
        size="small"
        clearable
        @change="onChangeInput"
      />
      <wd-img
        :width="32"
        :height="32"
        :src="`${IMG_BASE}/icon-search.png`"
        @click="onClickSearch()"
      />
    </view>
  </view>
</template>

<style>
:deep(.cus-input) {
  width: calc(100% - 46px);
  background: #fbfbfb !important;
}
</style>

<style lang='scss' scoped>
.search {
  padding: 12rpx 16rpx;
  background: #fff;

  .inner {
    width: 100%;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background: #fbfbfb;
    border: 1.88px solid #f2f2f2;
  }
}
</style>
