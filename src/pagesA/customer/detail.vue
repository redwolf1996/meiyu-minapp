<route lang="yaml">
style:
  navigationBarTitleText: 客户详情
  # disableScroll: true
</route>

<script lang="ts" setup>
import type { CustomerDetail } from './types'
import type { List as ListOrder } from '@/pagesA/order/types'
import type { BookListAll, BookListAll as ListBook } from '@/pagesA/tabs/types'
import dayjs from 'dayjs'
import { areaList } from '@vant/area-data'

defineOptions({ inheritAttrs: false })
const showCard = ref(false)
const tab = ref<number>(2)
const tabs = [{
  label: '订单记录',
  value: 0,
}, {
  label: '预约记录',
  value: 1,
}, {
  label: '会员档案',
  value: 2,
}]
const servMap = {
  1: 'to-service',
  2: 'in-service',
  3: 'end-service',
  4: 'cancel-service',
}
const detail = ref<CustomerDetail>(null)
const id = ref<number | null>(null)
const deleteDialogRef = ref()
const refDel = ref()
const refCancel = ref()
const scrollTop = ref(0)
const topH = ref(0)
const curItem = ref<BookListAll>({} as BookListAll)

const instance = getCurrentInstance()
const query = uni.createSelectorQuery().in(instance.proxy)

const reqParams1 = reactive({
  storeId: storeId.value,
  pageNum: 1,
  pageSize: 10,
  storeCustomerId: computed(() => id.value),
})
const reqParams2 = reactive({
  storeId: storeId.value,
  pageNum: 1,
  pageSize: 10,
  storeCustomerId: computed(() => id.value),
})
const paging1 = ref<ZPagingInstance<ListOrder> | null>(null)
const dataList1 = ref<ListOrder[]>([])

const paging2 = ref<ZPagingInstance<ListBook> | null>(null)
const dataList2 = ref<ListBook[]>([])

async function queryList1(page: number, pageSize: number) {
  reqParams1.pageNum = page
  reqParams1.pageSize = pageSize
  const res = await request.get<ListRes<ListOrder>>('/business/order', reqParams1)
  paging1.value.complete(res.data.list)
}

async function queryList2(page: number, pageSize: number) {
  reqParams1.pageNum = page
  reqParams1.pageSize = pageSize
  const res = await request.get<ListRes<ListBook>>('/business/booking', reqParams2)
  paging2.value.complete(res.data.list)
}

function toOrderDetail(id) {
  uni.navigateTo({
    url: `/pagesA/order/detail?id=${id}`,
  })
}

function toBookDetail(item: ListBook) {
  uni.navigateTo({
    url: `/pagesA/book/detail?id=${item.bookingId}`,
  })
}

function toDelBook(item: BookListAll) {
  curItem.value = item
  refDel.value.open()
}
async function doDel() {
  await request.delete(`/business/booking/${curItem.value.bookingId}`)
  refDel.value.close()
  paging2.value?.reload()
}

function toCancel(item: BookListAll) {
  curItem.value = item
  refCancel.value.open()
}
async function doCancel() {
  await request.put(`/business/booking/status`, {
    id: curItem.value.bookingId,
    status: 4,
  })
  refCancel.value.close()
  paging2.value?.reload()
}
async function doComplete(item: BookListAll) {
  await request.put(`/business/booking/status`, {
    id: item.bookingId,
    status: 3,
  })
  uni.showToast({ title: '已完成该笔订单' })
  paging2.value?.reload()
}
async function doSign(item: BookListAll) {
  await request.put(`/business/booking/status`, {
    id: item.bookingId,
    status: 2,
  })
  uni.showToast({ title: '签到成功' })
  paging2.value?.reload()
}

async function getInfo(storeCustomerId: number) {
  const res = await request.get<CustomerDetail>(`/business/store-customer/${storeCustomerId}`)
  detail.value = res.data
}

function call() {
  uni.makePhoneCall({ phoneNumber: detail.value?.phone })
}

function getGender(gender: any) {
  if (gender === 1)
    return '男'
  if (gender === 2)
    return '女'
  return '未知'
}

async function dialogConfirm() { // 删除
  deleteDialogRef.value.close()
  await request.delete<any>(`/business/store-customer/${id.value}`)
  uni.showToast({ title: '删除成功' })
  await sleep(500)
  uni.navigateBack()
}

function toEdit() {
  uni.navigateTo({ url: `/pagesA/customer/add?id=${id.value}` })
}

function toDel() {
  deleteDialogRef.value.open()
}

function toCusCardList(phone) {
  uni.navigateTo({ url: `/pagesA/card/cus-list?phone=${phone}` })
}

function toPoints() {
  const params = {
    id: detail.value?.id,
    name: detail.value?.name,
    points: detail.value?.integration,
    avatar: detail.value?.avatar,
  }
  cusPointsParams.value = params
  uni.navigateTo({ url: `/pagesA/customer/points` })
}

function clickTab({ index }) {
  // 通过1px的差距实现顺利渲染 切换tab的时候滚动到顶部
  scrollTop.value = scrollTop.value ? 0 : 1
  console.log(index)
}

// 去开卡/充值
function toCardRecharge(type: 1 | 2 | 3 | 4 | 5 | 6) {
  curCardRechargeType.value = type
  curSelectedCard.value = null
  curCustomer.value = null
  uni.navigateTo({ url: `/pagesA/card/make?customerId=${id.value}` })
}

// 去开单(商品、服务结算)
function toBilling() {
  uni.navigateTo({ url: `/pagesA/billing/index?customerId=${id.value}` })
}

// 去预约
function toBooking() {
  uni.navigateTo({ url: `/pagesA/book/add?customerId=${id.value}` })
}

onLoad((options) => {
  id.value = +options?.id
})

onShow(() => {
  getInfo(id.value)
})

onMounted(async () => {
  await nextTick()
  query
    .select('#top')
    .boundingClientRect((data: any) => {
      topH.value = data.height
    })
    .exec()
})
</script>

<template>
  <view id="top" ps z-100 :class="isH5 ? 'top-44px' : 'top-0'" style="border-bottom: 1px solid #eee;">
    <view flex flex-ac p-40rpx gap-40rpx bg-white>
      <wd-img
        :round="true"
        :width="64"
        :height="64"
        mode="aspectFill"
        :src="detail?.avatar || DEFAULT_AVATAR"
      />
      <view h-136rpx flex-1 flex flex-bt flex-y py8px>
        <view flex flex-ac flex-bt>
          <view flex flex-ac>
            <text f18 pr10px>
              {{ detail?.name }}
            </text>
            <wd-img
              v-if="detail?.level === 2"
              :round="true"
              :width="20"
              :height="20"
              :src="`${IMG_BASE}/icon-v.png`"
            />
          </view>
          <view>
            <text theme-color f14 lh-14px transform-translate-y--1px pr10px @click="toEdit()">
              编辑
            </text>
            <text theme-red f14 lh-14px transform-translate-y--1px @click="toDel()">
              删除
            </text>
          </view>
        </view>
        <view flex flex-ac>
          <view f12 pr15px>
            {{ detail?.phone }}
          </view>
          <wd-img
            :round="true"
            :width="16"
            :height="16"
            :src="`${IMG_BASE}/icon-call.png`"
            @click="call()"
          />
        </view>
      </view>
    </view>
    <view flex flex-ac flex-bt bg-white f14 p20px>
      <view w-78px>
        <view c-818181>
          余额
        </view>
        <view mt-16rpx>
          ￥{{ detail?.amount }}
        </view>
      </view>
      <view w-78px @click="toCusCardList(detail.phone)">
        <view c-818181 flex flex-ac>
          会员卡
          <wd-img
            :width="16"
            :height="16"
            :src="`${IMG_BASE}/icon-arrow-right2.png`"
          />
        </view>
        <view mt-16rpx>
          {{ detail?.cardC ?? 0 }}
        </view>
      </view>
      <view w-78px @click="toPoints()">
        <view c-818181 flex flex-ac>
          可用积分
          <wd-img
            :width="16"
            :height="16"
            :src="`${IMG_BASE}/icon-arrow-right2.png`"
          />
        </view>
        <view mt-16rpx>
          {{ detail?.integration ?? 0 }}
        </view>
      </view>
    </view>
    <!-- <view class="bs" /> -->
    <wd-tabs v-model="tab" @change="clickTab">
      <block v-for="(item, index) in tabs" :key="`tb-${index}`">
        <wd-tab :title="item.label" />
      </block>
    </wd-tabs>
  </view>

  <!-- 内容区 -->
  <scroll-view id="content" :scroll-top="scrollTop" scroll-with-animation scroll-y :style="{ height: `calc(100vh - ${topH + 82}px)` }">
    <!-- 订单记录 -->
    <template v-if="tab === 0">
      <z-paging
        ref="paging1"
        v-model="dataList1"
        :fixed="false"
        lower-threshold="100" auto-show-back-to-top :default-page-size="10"
        @query="queryList1"
      >
        <template #top>
          <view bg-white grid grid-cols-3 tc px-30px py-16px>
            <view>
              <view f14 mb10rpx>
                ¥{{ detail?.historyExpend ?? 0 }}
              </view>
              <view f13 c-818181>
                累计消费
              </view>
            </view>
            <view>
              <view f14 mb10rpx>
                {{ detail?.expendC ?? 0 }}
              </view>
              <view f13 c-818181>
                消费次数
              </view>
            </view>
            <view>
              <view f14 mb10rpx>
                {{ detail?.lastPayTime ? dayjs(detail?.lastPayTime).format('YYYY-MM-DD') : '--' }}
              </view>
              <view f13 c-818181>
                上次消费
              </view>
            </view>
          </view>
        </template>

        <template #bottom>
          <view class="h20px" />
        </template>

        <view p-32rpx flex flex-y gap16px>
          <view v-for="(item, index) in dataList1" :key="item.id" px16px py20px bg-white rd-8px @click="toOrderDetail(item.id)">
            <view flex flex-ac flex-bt>
              <view f14>
                {{ item.createTime }}
              </view>
              <view v-if="item.payStatus === 1" class="my-status-tag to-service">
                待支付
              </view>
              <view v-if="item.payStatus === 2" class="my-status-tag end-service">
                已完成
              </view>
              <view v-if="item.payStatus === 4" class="my-status-tag end-service">
                已完成(退款成功)
              </view>
              <view v-if="item.payStatus === 3" class="my-status-tag cancel-service">
                已取消
              </view>
            </view>
            <view mt20px flex flex-y gap-12px>
              <view v-for="(item2, index2) in item.orderItem" :key="`k-${index}-${index2}`" flex flex-ac flex-bt gap-8px>
                <wd-img
                  :width="40"
                  :height="40"
                  :radius="8"
                  mode="aspectFill"
                  :src="item2.goodsCoverImg"
                />
                <view h40px flex flex-y flex-bt flex-1>
                  <view c-28282B f14 flex-bt flex flex-ac>
                    <view>{{ item2.goodsName }}</view>
                    <view>￥{{ item2.goodsPrice }}</view>
                  </view>
                  <view c-717171 f12>
                    x{{ item2.goodsCount }}
                  </view>
                </view>
              </view>
            </view>
            <view h1px mt10px bg-EBEBF0 />
            <view mt12px flex flex-bt flex-ac>
              <view f12>
                {{ item.orderNo }}
              </view>
              <view c-FF4070 f16>
                合计收款：¥{{ item.amount }}
              </view>
            </view>
          </view>
        </view>
      </z-paging>
    </template>

    <!-- 预约记录 -->
    <template v-if="tab === 1">
      <z-paging
        ref="paging2"
        v-model="dataList2"
        :fixed="false"
        lower-threshold="100" auto-show-back-to-top :default-page-size="10"
        @query="queryList2"
      >
        <template #bottom>
          <view class="h20px" />
        </template>

        <view px-50rpx py-32rpx>
          <view v-for="(item, index) in dataList2" :key="`sxs-${index}`" px-48rpx py-40rpx bg-white rd-10px mb-32rpx>
            <view @click="toBookDetail(item)">
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
            </view>

            <view flex flex-xr mt-34rpx gap-14px>
              <button v-if="item?.bookingStatus === 4" class="my-btn delete" @click="toDelBook(item)">
                删除
              </button>
              <button v-if="item?.bookingStatus === 1" class="my-btn cancel" @click="toCancel(item)">
                取消
              </button>
              <button v-if="item?.bookingStatus === 2" class="my-btn complete" @click="doComplete(item)">
                完成
              </button>
              <button v-if="item?.bookingStatus === 1" class="my-btn complete" @click="doSign(item)">
                签到
              </button>
            </view>
          </view>
        </view>
      </z-paging>
    </template>

    <!-- 会员档案 -->
    <template v-if="tab === 2">
      <view p16px>
        <view py20px px16px bg-white>
          <view flex flex-ac flex-bt mb16px>
            <view>基本档案</view>
            <!-- <view flex flex-ac>
              <text theme-color f14 lh-14px transform-translate-y--1px @click="toEdit()">
                编辑
              </text>
              <wd-img
                :width="16"
                :height="16"
                :src="`${IMG_BASE}/icon-arrow-right2.png`"
              />
            </view> -->
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>姓名：</view>
            <view>{{ detail?.name }}</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>备注名：</view>
            <view>{{ detail?.noteName }}</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>手机号：</view>
            <view>{{ detail?.phone }}</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>客户来源：</view>
            <view>{{ detail?.source }}</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>性别：</view>
            <view>{{ getGender(detail?.gender) }}</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>生日：</view>
            <view>{{ detail?.birthday }}</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>微信：</view>
            <view>{{ detail?.wechatCode }}</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>地址：</view>
            <view>{{ areaList.province_list[detail?.province] }}{{ areaList.city_list[detail?.city] }}{{ areaList.county_list[detail?.county] }}</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>详细地址：</view>
            <view>{{ detail?.address }}</view>
          </view>
          <view c-434343 flex flex-ac flex-bt mb16px f14>
            <view>营销顾问：</view>
            <view>{{ detail?.adviserName }}</view>
          </view>
          <view c-434343 flex flex-ac flex-bt f14>
            <view>客户备注：</view>
            <view>{{ detail?.notes }}</view>
          </view>
        </view>
      </view>
    </template>
  </scroll-view>

  <wd-popup v-model="showCard" position="bottom" closable :safe-area-inset-bottom="true" custom-style="border-radius:32rpx;">
    <view style="height: 360px">
      <view fb tc c-#232220 mt42px>
        选择开卡/充值类型
      </view>
      <view class="h20px" />
      <view px20px py12px>
        <view mb30px>
          <view fs-16px>
            开卡
          </view>
          <view fs-14px flex flex-wrap gap20px mt20px>
            <view class="card-item" @click="toCardRecharge(1)">
              折扣卡
            </view>
            <view class="card-item" @click="toCardRecharge(2)">
              充值卡
            </view>
            <view class="card-item" @click="toCardRecharge(3)">
              通卡
            </view>
            <view class="card-item" @click="toCardRecharge(4)">
              有限次卡
            </view>
            <view class="card-item" @click="toCardRecharge(5)">
              不限次卡
            </view>
          </view>
        </view>
        <view>
          <view fs-16px>
            充值
          </view>
          <view fs-14px flex flex-wrap gap20px mt20px>
            <view class="card-item" @click="toCardRecharge(6)">
              充值
            </view>
          </view>
        </view>
      </view>
    </view>
  </wd-popup>

  <view pf bottom-0 wp100 h82px style="border-top: 1px solid #eee">
    <!-- <view h32rpx bg-F5F5FA /> -->
    <view p25px grid grid-cols-3 grid-gap-10px bg-white>
      <view class="my-btn theme-out rd0" @click="showCard = true">
        开卡充值
      </view>
      <view class="my-btn theme-out rd0" @click="toBilling">
        开单
      </view>
      <view class="my-btn theme rd0" @click="toBooking">
        预约
      </view>
    </view>
  </view>

  <!-- 删除客户 -->
  <uni-popup ref="deleteDialogRef" type="dialog">
    <uni-popup-dialog
      type="warn"
      cancelText="取消" confirmText="确定"
      title="提示" content="删除后不可恢复，确定删除吗？"
      @confirm="dialogConfirm"
    />
  </uni-popup>

  <!-- 删除预约 -->
  <uni-popup ref="refDel" type="dialog">
    <uni-popup-dialog
      type="warn"
      cancelText="取消" confirmText="确定"
      title="提示" content="删除后不可恢复，确定删除吗？"
      @confirm="doDel"
    />
  </uni-popup>

  <!-- 取消预约 -->
  <uni-popup ref="refCancel" type="dialog">
    <uni-popup-dialog
      type="warn"
      cancelText="取消" confirmText="确定"
      title="提示" content="取消后不可恢复，确定取消本次预约吗？"
      @confirm="doCancel"
    />
  </uni-popup>
</template>

<style>
:deep(.wd-action-sheet__popup) {
  z-index: 12000 !important;
  box-shadow:
    -1px -1px 16px rgba(0, 0, 0, 0.2),
    4px 4px 8px rgba(0, 0, 0, 0.2) !important;
}
</style>

<style lang='scss' scoped>
.card-item {
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #303030;
  background-color: #f6f6fb;
  padding: 6px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bs {
  height: 1px;
  box-shadow:
    -1px -1px 16px rgba(0, 0, 0, 0.8),
    4px 4px 8px rgba(0, 0, 0, 0.8);
}
.tag {
  color: #ff5a5f;
  background: #feddde;
  padding: 5rpx 16rpx;
  height: 32rpx;
  line-height: 32rpx;
  text-align: center;
  border-radius: 16rpx;
  font-size: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
