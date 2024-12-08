<script lang="ts" setup>
const props = withDefaults(defineProps<{
  showTabs?: boolean // 是否展示tabs
  listData?: any
  bookCount?: any
}>(), {
  showTabs: true,
  listData: [],
  bookCount: {
    all: 0,
    wait: 0,
    underway: 0,
    finish: 0,
  },
})

const tab = ref<number>(0)
const items = ref([{
  label: '待服务',
  count: computed(() => props.bookCount?.wait || 0),
  value: 0,
}, {
  label: '服务中',
  count: computed(() => props.bookCount?.underway || 0),
  value: 1,
}, {
  label: '已完成',
  count: computed(() => props.bookCount?.finish || 0),
  value: 2,
}, {
  label: '全部',
  count: computed(() => props.bookCount?.all || 0),
  value: 3,
}])

const servMap = {
  1: 'to-service',
  2: 'in-service',
  3: 'end-service',
  4: 'cancel-service',
}
</script>

<template>
  <wd-tabs v-if="props.showTabs" v-model="tab" :lineHeight="2" :lineWidth="24" color="#1A66FF">
    <block v-for="item in items" :key="`t${item.value}`">
      <wd-tab :title="`${item.label}(${item.count})`" />
    </block>
  </wd-tabs>
  <view px-50rpx py-32rpx>
    <template v-if="listData?.length">
      <view v-for="(item, index) in listData" :key="`sds-${index}`" px-48rpx py-40rpx bg-white rd-10px mb-32rpx>
        <view flex flex-ac flex-bt>
          <view flex flex-y gap-10px>
            <view c-404143 f14 lh-14px>
              {{ item?.startTime ? fd(item?.startTime) : '--' }}&nbsp;{{ item?.startTimeStr }}
            </view>
            <view f12 flex tc flex-ac gap-10rpx f10>
              <view fb>
                {{ item?.storeCustomerName }}
              </view>
              <view w-12rpx h-12rpx round style="background-color: #91919F;" />
              <view color-white tc px-8rpx py-4rpx lh-24rpx bg-FE502E>
                {{ item?.storeServiceTypeDesc }}
              </view>
            </view>
          </view>
          <view class="my-status-tag" :class="[servMap[item?.bookingStatus]]">
            {{ item?.bookingStatusDesc }}
          </view>
        </view>
        <view h-32rpx />
        <view>
          <template v-if="item?.serviceList?.length">
            <view v-for="(itm, idx) in item.serviceList" :key="`sd22-${index}-${idx}`" flex gap-15px flex-ac mb-20rpx>
              <wd-img
                :width="44"
                :height="44"
                mode="aspectFill"
                :src="itm?.serviceCoverImg"
              />
              <view flex-1 flex flex-y gap-20rpx>
                <view flex flex-bt>
                  <text c-0D0D26 f14 fb>
                    {{ itm?.serviceName }}
                  </text>
                  <text c-3A3A3A f14>
                    x1
                  </text>
                </view>
                <view c-161719 fs-20>
                  {{ itm?.duration ?? '--' }}分钟
                </view>
              </view>
            </view>
          </template>

          <view flex gap-15px flex-ac mb-20rpx>
            <wd-img
              :width="44"
              :height="44"
              mode="aspectFill"
              :src="`${IMG_BASE}/cat.png`"
            />
            <view flex-1 flex flex-y gap-20rpx>
              <view flex flex-bt>
                <text c-0D0D26 f14 fb>
                  面部清洁补水
                </text>
                <text c-3A3A3A f14>
                  x1
                </text>
              </view>
              <view c-161719 fs-20>
                1小时
              </view>
            </view>
          </view>
        </view>
        <view flex flex-bt>
          <view />
          <view flex flex-ac gap-5px font-size-20rpx>
            <wd-img
              :width="20"
              :height="20"
              :src="`${IMG_BASE}/icon-people.png`"
            />
            <view fb>
              {{ item?.artisanName }}
            </view>
            <view w-10rpx h-10rpx round ma style="background-color: #000;" />
            <view> {{ item?.artisanPhone }}</view>
          </view>
        </view>

        <view flex flex-xr mt-34rpx gap-14px>
          <button class="my-btn delete">
            删除
          </button>
          <button class="my-btn cancel">
            取消
          </button>
          <button class="my-btn complete">
            完成
          </button>
        <!-- <button class="my-btn complete">
          签到
        </button> -->
        <!-- <text class="my-status-tag to-service">
          待服务
        </text>
        <text class="my-status-tag in-service">
          服务中
        </text>
        <text class="my-status-tag end-service">
          已完成
        </text>
        <text class="my-status-tag cancel-service">
          已取消
        </text> -->
        </view>
      </view>
    </template>

    <view px-48rpx py-40rpx bg-white rd-10px mb-32rpx>
      <view flex flex-ac flex-bt>
        <view flex flex-y gap-10px>
          <view c-404143 f14 lh-14px>
            2023.11.22 8:00-10:00
          </view>
          <view f12 flex tc flex-ac gap-10rpx f10>
            <view fb>
              张硕
            </view>
            <view w-12rpx h-12rpx round style="background-color: #91919F;" />
            <view color-white tc px-8rpx py-4rpx lh-24rpx bg-FE502E>
              到店服务
            </view>
          </view>
        </view>
        <view class="my-status-tag to-service">
          待服务
        </view>
      </view>
      <view h-32rpx />
      <view>
        <view flex gap-15px flex-ac mb-20rpx>
          <wd-img
            :width="44"
            :height="44"
            mode="aspectFill"
            :src="`${IMG_BASE}/cat.png`"
          />
          <view flex-1 flex flex-y gap-20rpx>
            <view flex flex-bt>
              <text c-0D0D26 f14 fb>
                面部清洁补水
              </text>
              <text c-3A3A3A f14>
                x1
              </text>
            </view>
            <view c-161719 fs-20>
              1小时
            </view>
          </view>
        </view>
        <view flex gap-15px flex-ac mb-20rpx>
          <wd-img
            :width="44"
            :height="44"
            mode="aspectFill"
            :src="`${IMG_BASE}/cat.png`"
          />
          <view flex-1 flex flex-y gap-20rpx>
            <view flex flex-bt>
              <text c-0D0D26 f14 fb>
                面部清洁补水
              </text>
              <text c-3A3A3A f14>
                x1
              </text>
            </view>
            <view c-161719 fs-20>
              1小时
            </view>
          </view>
        </view>
      </view>
      <view flex flex-bt>
        <view />
        <view flex flex-ac gap-5px font-size-20rpx>
          <wd-img
            :width="20"
            :height="20"
            :src="`${IMG_BASE}/icon-people.png`"
          />
          <view fb>
            王乐乐
          </view>
          <view w-10rpx h-10rpx round ma style="background-color: #000;" />
          <view>13952768882</view>
        </view>
      </view>

      <view flex flex-xr mt-34rpx gap-14px>
        <button class="my-btn delete">
          删除
        </button>
        <button class="my-btn cancel">
          取消
        </button>
        <button class="my-btn complete">
          完成
        </button>
        <!-- <button class="my-btn complete">
          签到
        </button> -->
        <!-- <text class="my-status-tag to-service">
          待服务
        </text>
        <text class="my-status-tag in-service">
          服务中
        </text>
        <text class="my-status-tag end-service">
          已完成
        </text>
        <text class="my-status-tag cancel-service">
          已取消
        </text> -->
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>

</style>
