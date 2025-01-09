<route lang="yaml">
style:
  navigationBarTitleText: 会员购卡列表
</route>

<script lang="ts" setup>
import type { CusList as List } from './types'

const cardImg = {
  1: 'list-cika',
  2: 'list-chongzhi',
  3: 'list-zhekou',
}
const reqParams = reactive({
  storeId: storeId.value,
  pageNum: 1,
  pageSize: 10,
  keyword: '',
})
const paging = ref<ZPagingInstance<List> | null>(null)
const dataList = ref<List[]>([])
const total = ref(0)

async function queryList(page: number, pageSize: number) {
  reqParams.pageNum = page
  reqParams.pageSize = pageSize
  const res = await request.get<ListRes<List>>('/business/store-customer-card', reqParams)
  total.value = res.data.total
  paging.value.complete(res.data.list)
}

function toDetail(id: number) {
  uni.navigateTo({
    url: `/pagesA/card/cus-detail?id=${id}`,
  })
}

function search() {
  paging.value?.reload()
}

onLoad((option) => {
  if (option?.phone) {
    reqParams.keyword = option.phone
  }
})

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
    <template #top>
      <TopSearch v-model="reqParams.keyword" placeholder="请输入客户姓名或手机号" @search="search()" />
      <view class="h16px" />
      <view mx-14px p-16px pb6px bg-white rd-t-8px>
        <view class="title">
          <view flex flex-ac>
            <view class="bd-left" />
            <view pl-10px>
              会员卡项记录
            </view>
            <text f14>
              （共<text style="color:#1A66FF">
                {{ total }}
              </text>项）
            </text>
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
        @click="toDetail(item.id)"
      >
        <wd-img
          :width="96"
          :height="72"
          mode="aspectFill"
          :radius="12"
          :src="`${IMG_BASE}/detail/${cardImg[item.cardType]}.png`"
        />
        <view flex flex-y flex-bt flex-1 h-86px>
          <view flex flex-bt>
            <view flex flex-ac gap-5px>
              <wd-img
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-usr.png`"
              />
              <text fs-12px>
                {{ item?.customerName }}({{ item?.customerPhone }})
              </text>
            </view>
          </view>
          <view fb fs-16px lh-16px>
            {{ item?.cardName }}
          </view>
          <view fs-12px lh-12px color-9A9FA5>
            {{ item?.expiresTimeDesc }}
          </view>
          <view flex flex-ac flex-bt fs-12px lh-12px>
            <view>
              <!-- 次卡显示总次数和使用次数 -->
              <text v-if="item.cardType === 1" px-12rpx py-7rpx c-#1A66FF pr left--6px>
                {{ item?.useCount }}/{{ item?.countLimit }}
              </text>
              <!--  -->
              <text v-else px-12rpx py-7rpx c-#1A66FF pr left--6px>
                ¥{{ item?.amount }}/¥{{ item?.totalAmount }}
              </text>
            </view>

            <view>
              <text v-if="item.isValid" f12 px-16rpx py-8rpx c-#32C272 bg-#D6F3E3 flex flex-cc rd-30px>
                使用中
              </text>
              <text v-else c-#A6A6B0 bg-#F5F5FA f12 px-16rpx py-8rpx flex flex-cc rd-30px>
                已失效
              </text>
            </view>
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
