<script lang="ts" setup>
const props = defineProps<{
  step: number
}>()
const step = toRef(props, 'step')
</script>

<template>
  <view hp-100 flex gap-8px tc flex-cc abs-cc>
    <view v-for="i in 3" :key="i" :class="[i === step ? 'strip' : 'dot']" />
  </view>
</template>

<style scoped>
.strip {
  width: 28px;
  height: 8px;
  border-radius: 52px;
  background: #1a66ff;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e4e5e7;
}
</style>
