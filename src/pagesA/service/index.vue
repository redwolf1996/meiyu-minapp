<route lang="yaml">
style:
  navigationBarTitleText: 服务管理
</route>

<script lang="ts" setup>
const searchText = ref('')
const showAddList = ref(false)

watch(() => searchText.value, (newVal) => {
  console.log(newVal)
})

function toAdd() {
  uni.navigateTo({ url: '/pagesA/service/add' })
}
</script>

<template>
  <view>
    <TopSearch v-model="searchText" placeholder="请输入服务名称" />
    <view h-16px />
    <view mx-14px p-16px bg-white rd-8px>
      <view class="title">
        <view flex flex-ac>
          <view class="bd-left" />
          <div pl-10px>
            服务列表
          </div>
          <span f18 f14>
            （共<span style="color:#1A66FF">10</span>项）
          </span>
        </view>
        <view class="plus" @click="toAdd()">
          <wd-img
            :width="14"
            :height="14"
            :src="`${IMG_BASE}/icon-plus.png`"
          />
        </view>
      </view>
      <div mt-12px flex flex-bt flex-ac gap-40rpx pb-10px style="border-bottom: 1px solid #EFEFEF;" @click="showAddList = false">
        <wd-img
          :width="100"
          :height="100"
          mode="center"
          :radius="12"
          :src="`${IMG_BASE}/cat.png`"
        />
        <div flex flex-y flex-bt flex-1 h-108px>
          <div flex flex-bt>
            <div flex flex-ac gap-5px>
              <wd-img
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-stock.png`"
              />
              <span f12>80</span>
            </div>
            <wd-img
              :width="20"
              :height="20"
              :src="`${IMG_BASE}/icon-more.png`"
            />
          </div>
          <div fb f16>
            幻彩悦光爽肤水
          </div>
          <div f12 color-9A9FA5>
            网店展示
          </div>
          <div>
            <span fb f12 px-12rpx py-7rpx bg-B5E4CA rd-12rpx>￥128</span>
          </div>
        </div>
      </div>
      <div mt-12px flex flex-bt flex-ac gap-40rpx pb-10px style="border-bottom: 1px solid #EFEFEF;">
        <wd-img
          :width="100"
          :height="100"
          mode="center"
          :radius="12"
          :src="`${IMG_BASE}/cat.png`"
        />
        <div flex flex-y flex-bt flex-1 h-108px>
          <div flex flex-bt>
            <div flex flex-ac gap-5px>
              <wd-img
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-time.png`"
              />
              <span f12>80分钟</span>
            </div>
            <wd-img
              :width="20"
              :height="20"
              :src="`${IMG_BASE}/icon-more.png`"
            />
          </div>
          <div fb f16>
            幻彩悦光爽肤水
          </div>
          <div f12 color-9A9FA5>
            网店展示
          </div>
          <div>
            <span fb f12 px-12rpx py-7rpx bg-B5E4CA rd-12rpx>￥128</span>
          </div>
        </div>
      </div>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .bd-left {
    width: 3.5px;
    height: 20px;
    border-radius: 4px;
    background: #a7c4fd;
  }
}
.plus {
  width: 36px;
  height: 36px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #fcfcfc;
  border-radius: 8px;
  box-shadow:
    -1px -1px 16px rgba(0, 0, 0, 0.08),
    4px 4px 8px rgba(0, 0, 0, 0.08);
}
</style>
