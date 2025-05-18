<script setup lang="ts">
const tab = ref(0)
const tabs = [{
  label: '销售业绩',
}, {
  label: '服务业绩',
}]
</script>

<template>
  <view class="h58px" />
  <view>
    <view bg-white px16px py10px>
      <view bg-white pl10px style="position: relative; padding-left: 10px;">
        <view style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); height: 66.7%; width: 3px; background-color: #931E5E;" />
        <text fb c-#931E5E>
          门店排行
        </text>
      </view>
      <view class="h20px" />
      <wd-tabs v-model="tab" slidable="always">
        <block v-for="item in tabs" :key="item.label">
          <wd-tab :title="item.label" />
        </block>
      </wd-tabs>
      <view class="h20px" />
      <view>
        <view flex flex-ac flex-bt style="border-bottom: 1px solid #F0F1F4;" py10px>
          <view flex flex-ac gap16px>
            <wd-img
              :width="16"
              :height="16"
              mode="aspectFill"
              :src="`${IMG_BASE}/icon-rank-1.png`"
            />
            <wd-img
              :width="48"
              :height="48"
              mode="aspectFill"
              :src="`${IMG_BASE}/data-icon.png`"
            />
            <text>
              小美
            </text>
          </view>
          <view flex flex-ac gap10px>
            <text>¥2500.00</text>
            <wd-icon name="arrow-right" size="22px" color="#8D9092" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.ct {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
}

.item {
  width: calc(50% - 10px);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #f0f1f4;
  height: 86px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pop-content {
  /* 必填 开始 */
  position: relative;
  z-index: 500;
  border-radius: 4px;
  /* 必填 结束 */
  background: #fff;
  padding: 10px;
  width: 70vw;
  text-align: left;
  border: 1px solid #ebeef1;
}
</style>
