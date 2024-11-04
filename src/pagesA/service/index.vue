<route lang="yaml">
style:
  navigationBarTitleText: 服务管理
</route>

<script lang="ts" setup>
import type { List, ReqModel } from './types'

const visAction = ref(false)
const actionList = ref<any>([
  { name: '修改' },
  { name: '删除' },
  { name: '复制' },
])
const reqParams = reactive<ReqModel>({
  storeId,
  pageNum: 1,
  pageSize: 10,
  name: '',
})
const paging = ref<ZPagingInstance<List> | null>(null)
const dataList = ref<List[]>([])
const curItem = ref<List>(null)
const total = ref(0)
const deleteDialogRef = ref()

async function queryList(page: number, pageSize: number) {
  reqParams.pageNum = page
  reqParams.pageSize = pageSize
  const res = await request.get<ListRes<List>>('/business/service', reqParams)
  total.value = res.data.total
  paging.value.complete(res.data.list)
}

function search() {
  paging.value?.reload()
}

onShow(() => {
  search()
})

function toAdd() {
  resetCurClassify()
  uni.navigateTo({ url: '/pagesA/service/add' })
}

async function dialogConfirm() { // 删除
  await request.delete<any>(`/business/service/${curItem.value.id}`)
  search()
  deleteDialogRef.value.close()
}

function selAction(e) { // 修改、删除、复制
  if (e.index === 0) { // 修改
    uni.navigateTo({ url: `/pagesA/service/add?id=${curItem.value.id}&mode=edit` })
  }

  if (e.index === 1) { // 删除
    deleteDialogRef.value.open()
  }

  if (e.index === 2) { // 复制
    uni.navigateTo({ url: `/pagesA/service/add?id=${curItem.value.id}&mode=copy` })
  }
}

function showItemMenu(item: List) {
  curItem.value = item
  visAction.value = true
}
</script>

<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    lower-threshold="100" auto-show-back-to-top :default-page-size="10"
    @query="queryList"
  >
    <template #top>
      <TopSearch v-model="reqParams.name" placeholder="请输入服务名称" @search="search()" />
      <view class="h16px" />
      <view mx-14px p-16px pb6px bg-white rd-t-8px>
        <view class="title">
          <view flex flex-ac>
            <view class="bd-left" />
            <view pl-10px>
              服务列表
            </view>
            <span f14>
              （共<span style="color:#1A66FF">{{ total }}</span>项）
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
      </view>
    </template>

    <template #bottom>
      <view class="h50px" />
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
          mode="widthFix"
          :radius="12"
          :src="item.coverImg"
        />
        <view flex flex-y flex-bt flex-1 h-108px>
          <view flex flex-bt>
            <view flex flex-ac gap-5px>
              <wd-img
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-time.png`"
              />
              <span f12>{{ item.duration }}分钟</span>
            </view>
            <wd-img
              :width="20"
              :height="20"
              :src="`${IMG_BASE}/icon-more.png`"
              @click="showItemMenu(item)"
            />
          </view>
          <view fb f16>
            {{ item.name }}
          </view>
          <view f12 color-9A9FA5>
            <text>
              {{ item.payType === 1 ? '在线付' : '到店付' }}
            </text>
            <text v-if="item.isToStore" pl5px>
              支持到店
            </text>
            <text v-if="item.isToDoor" pl5px>
              支持上门
            </text>
            <text v-if="!item.isShow" pl5px>
              网店不可销售
            </text>
          </view>
          <view>
            <span fb f12 px-12rpx py-7rpx bg-B5E4CA rd-12rpx>￥{{ item.price }}</span>
          </view>
        </view>
      </view>
    </view>

    <wd-action-sheet v-model="visAction" :actions="actionList" @select="selAction" />
    <uni-popup ref="deleteDialogRef" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消" confirmText="确定"
        title="提示" content="删除后不可恢复，确定删除吗？"
        @confirm="dialogConfirm"
      />
    </uni-popup>
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
    4px 4px 8px rgba(0, 0, 0, 0.08);
}
</style>
