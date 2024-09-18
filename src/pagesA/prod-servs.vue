<route lang="yaml">
style:
  navigationBarTitleText: 选择服务和产品
</route>

<script lang="ts" setup>
const tab = ref<number>(0)
const items = [{
  label: '所有服务',
  value: 0,
}, {
  label: '所有产品',
  value: 1,
}]
const servs = ref([])
const prods = ref([])

const checked = ref(false)
function select(e: UniHelper.CheckboxGroupOnChangeEvent) {
  checked.value = !!e.detail.value.includes('cb')
}

function toAdd() {}
</script>

<template>
  <wd-tabs v-model="tab" custom-class="this-tab" :lineHeight="2" :lineWidth="24" color="#1A66FF" swipeable>
    <block v-for="item in items" :key="`t${item.value}`">
      <wd-tab :title="item.label" />
    </block>
  </wd-tabs>
  <view v-if="(tab === 0 && servs.length === 0) || (tab === 1 && prods.length === 0)" class="empty">
    <view tc mt56rpx f12 c-#979797>
      暂无数据
    </view>
    <view>
      <view mx-200rpx mt-64rpx color-white @click="toAdd()">
        <wd-button size="large" custom-class="theme-bg" block>
          <view flex flex-cc>
            <text>添加{{ tab ? '产品' : '服务' }}</text>
          </view>
        </wd-button>
      </view>
    </view>
  </view>

  <view class="footer">
    <view>
      <view>已选择 7 项</view>
      <view class="h5px" />
      <view flex flex-cc>
        <checkbox-group @change="select">
          <checkbox
            value="cb"
            :checked="checked"
          />
        </checkbox-group>
        <text f14>
          所有服务和产品
        </text>
      </view>
    </view>
    <view w120px>
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
  height: 100vh;
}
</style>

<style lang='scss' scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  position: fixed;
  width: 100%;
  bottom: 0;
}
.this-tab {
  padding: 0 100rpx;
}
</style>
