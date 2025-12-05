<route lang="yaml">
style:
  navigationBarTitleText: 选择卡项
</route>

<script lang="ts" setup>
import type { List, ReqModel } from './types'
import { sumBy } from 'lodash-es'

const reqParams = reactive<ReqModel>({
  storeId: storeId.value,
  pageNum: 1,
  pageSize: 1000,
  name: '',
})
const paging = ref<ZPagingInstance<List> | null>(null)
const dataList = ref<List[]>([])
const total = ref(0)

async function queryList(page: number, pageSize: number) {
  reqParams.pageNum = page
  reqParams.pageSize = pageSize
  const res = await request.get<ListRes<List>>('/business/card', reqParams)
  total.value = res.data.total
  paging.value.complete(res.data.list.map((v) => {
    return {
      ...v,
      avaTimes: sumBy(v.info, v1 => v1.equity),
    }
  }))
}

function search() {
  paging.value?.reload()
}

onShow(() => {
  search()
})
</script>

<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    lower-threshold="100" auto-show-back-to-top :default-page-size="10"
    @query="queryList"
  >
    <template #bottom>
      <view class="h40px" />
    </template>

    <view mx-14px p-16px bg-white rd-b-8px>
      <view
        v-for="(item, index) in dataList" :key="`card-${index}`"
        mt-12px flex flex-bt flex-ac gap-40rpx
        pb-10px style="border-bottom: 1px solid #EFEFEF;"
      >
        <wd-img
          :width="100"
          :height="100"
          mode="aspectFill"
          :radius="12"
          :src="`${IMG_BASE}/detail/${cardImgMap[item.type]}.png`"
        />
        <view flex flex-y flex-bt flex-1 h-108px>
          <view flex flex-bt>
            <view flex flex-ac gap-5px>
              <wd-img
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-star.png`"
              />
              <template v-if="item.type === 1">
                <text v-if="item.secondType === 1" f12>
                  {{ item.countLimit }}次
                </text>
                <text v-if="item.secondType === 2" f12>
                  不限次
                </text>
                <text v-if="item.secondType === 3" f12>
                  {{ item.countLimit }}次
                </text>
              </template>
              <template v-if="item.type === 2">
                <text f12>
                  赠送{{ item.gift }}
                </text>
              </template>
              <template v-if="item.type === 3">
                <text f12>
                  {{ item?.discountDesc }}
                </text>
              </template>
            </view>
          </view>
          <view fb f16>
            {{ item.name }}
          </view>
          <view f12 color-9A9FA5>
            <text v-if="item.expires === 0">
              永久有效
            </text>
            <text v-if="item.expires">
              购买后{{ item.expires }}天内有效
            </text>
          </view>
          <view>
            <text fb f12 px-12rpx py-7rpx bg-B5E4CA rd-12rpx>
              ￥{{ item.price }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </z-paging>
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
    2px 1px 4px rgba(0, 0, 0, 0.08);
}
</style>
