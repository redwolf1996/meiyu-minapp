<route lang="yaml">
style:
  navigationBarTitleText: 会员购卡详情
</route>

<script lang="ts" setup>
import type { CardEquity, CusCardDetail, CusRecord, CusRecordList } from './types'
import dayjs from 'dayjs'

const id = ref(0)
const tab = ref(0)
const tabs = [{
  label: '购卡详情',
}, {
  label: '使用记录',
}]
const reqParams = reactive({
  customerCardId: computed(() => id.value),
  pageNum: 1,
  pageSize: 10,
})
const paging = ref<ZPagingInstance<CusRecordList> | null>(null)
const dataList = ref<CusRecordList[]>([])
const total = ref(0)
const countUse = ref()
const countSurplus = ref()
const detail = ref<CusCardDetail>(null)
const countLimit = computed(() => detail.value?.countLimit || 0)
const cardName = ref('')
const timeArr = ref<any[]>([Date.now(), dayjs().add(1, 'year').valueOf()])
const showSTime = computed(() => dayjs(timeArr.value[0]).format('YYYY-MM-DD'))
const showETime = computed(() => {
  return timeArr.value[1] ? dayjs(timeArr.value[1]).format('YYYY-MM-DD') : null
})
const cardExpire = ref({
  id: computed(() => id.value),
  startTime: computed(() => `${showSTime.value} 00:00:00`),
  expiresTime: computed(() => `${showETime.value} 23:59:59`),
})
const cardEquity = ref<CardEquity[]>([])
const visEditName = ref(false)
const visEditExpire = ref(false)
const visEditEquity = ref(false)
const disabledIds = ref<number[]>([])

async function queryList(page: number, pageSize: number) {
  reqParams.pageNum = page
  reqParams.pageSize = pageSize
  const res = await request.get<CusRecord>('/business/store-customer-card/record', reqParams)
  total.value = res.data.total
  dataList.value = res.data.list
  countUse.value = res.data.use
  countSurplus.value = res.data.surplus

  paging.value.complete(res.data.list)
}

onLoad(async (option) => {
  id.value = option.id!
  initPage()
})

async function initPage() {
  getDetail()
  getRecords()
  await getOriCardEquity()
}

watch(() => [checkedServs.value, checkedProds.value], () => {
  cardEquity.value = [
    ...cusOriCardEquity.value,
    ...checkedServs.value?.filter((v0) => {
      return !disabledIds?.value.includes(v0.id)
    })?.map((v) => {
      return {
        equity: v.equity || null,
        goodsId: v.id,
        goodsName: v.name,
        goodsType: v.prodType,
        goodsPrice: v.price2,
        editable: true,
      }
    }),
    ...checkedProds.value?.filter((v0) => {
      return !disabledIds.value.includes(v0.id)
    })?.map((v) => {
      return {
        equity: v.equity || null,
        goodsId: v.id,
        goodsName: v.name,
        goodsType: v.prodType,
        goodsPrice: v.price2,
        editable: true,
      }
    }),
  ]
})

async function getOriCardEquity() {
  const res = await request.get<CardEquity[]>(`/business/store-customer-card/info/${id.value}`)
  cusOriCardEquity.value = res.data.map((item) => {
    return {
      ...item,
      editable: false,
    }
  })
  disabledIds.value = cusOriCardEquity.value.map(v => v.goodsId)
  cardEquity.value = cusOriCardEquity.value
}

function getDetail() {
  request.get<CusCardDetail>(`/business/store-customer-card/${id.value}`).then((res) => {
    detail.value = res.data
    cardName.value = res.data.cardName || ''
    const s = dayjs(res.data.startTime).valueOf()
    const e = res.data.expiresTime ? dayjs(res.data.expiresTime).valueOf() : null
    timeArr.value = [s, e]
  })
}

function getRecords() {
  paging.value?.reload()
}

function toEditName() {
  visEditName.value = true
}
function toEditExpire() {
  visEditExpire.value = true
}
async function toEditEquity() {
  visEditEquity.value = true
}
async function confirmName() {
  await request.put('/business/store-customer-card/card-name', {
    id: id.value,
    cardName: cardName.value,
  })
  initPage()
  uni.showToast({ title: '修改成功' })
  visEditName.value = false
}
async function confirmExpire() {
  await request.put('/business/store-customer-card/expires-time', cardExpire.value)
  initPage()
  uni.showToast({ title: '修改成功' })
  visEditExpire.value = false
}
async function confirmEquity() {
  await request.put('/business/store-customer-card/info', { id: id.value, info: cardEquity.value, countLimit: countLimit.value })
  initPage()
  resetGoods()
  uni.showToast({ title: '修改成功' })
  visEditEquity.value = false
}

function toSee() {
  uni.navigateTo({
    url: `/pagesA/order/detail?id=${detail.value.orderId}`,
  })
}

function toProdServs() { // 商品和服务列表页面
  uni.navigateTo({ url: '/pagesA/prod-servs?from=equity' })
}

function delEquity(item: CardEquity) {
  const goodsId = item.goodsId
  const goodsType = item.goodsType
  if (checkedServs.value.length && goodsType === 1) {
    checkedServs.value = checkedServs.value.filter(item => item.id !== goodsId)
  }
  if (checkedProds.value.length && goodsType === 2) {
    checkedProds.value = checkedProds.value.filter(item => item.id !== goodsId)
  }
}

function toBilling() {
  resetGoods()
  uni.navigateTo({ url: `/pagesA/billing/index?customerId=${detail.value.storeCustomerId}` })
}
</script>

<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    lower-threshold="100" auto-show-back-to-top :default-page-size="10"
    :hide-empty-view="tab === 0"
    :loading-more-enabled="tab !== 0"
    @query="queryList"
  >
    <template #top>
      <wd-tabs v-model="tab">
        <block v-for="item in tabs" :key="item.label">
          <wd-tab :title="item.label" />
        </block>
      </wd-tabs>

      <view v-if="tab !== 0" bg-white fs-15px h56px flex flex-ac flex-rd m15px c-#3A3A3A style="box-shadow: 0px 4px 10px 0px rgba(90, 90, 90, 0.1);">
        <view>
          <text v-if="detail?.cardType !== 2">
            使用次数
          </text>
          <text v-else>
            使用金额
          </text>
          <text c-#1A66FF>
            {{ detail?.cardType === 2 ? '￥' : '' }}{{ countUse }}
          </text>
        </view>
        <view>
          <text v-if="detail?.cardType === 1">
            剩余次数
          </text>
          <text v-if="detail?.cardType === 2">
            剩余金额
          </text>
          <text v-if="detail?.cardType === 3">
            余额
          </text>
          <text c-#1A66FF>
            {{ detail?.cardType !== 1 ? '￥' : '' }}{{ countSurplus }}
          </text>
        </view>
      </view>
    </template>

    <template #bottom>
      <view class="h50px" />
    </template>

    <view v-if="tab === 0" p-32rpx>
      <view bg-white px-34rpx py-40rpx>
        <view flex flex-ac gap-20rpx>
          <wd-img
            :width="18"
            :height="18"
            :src="`${IMG_BASE}/icon-cus.png`"
          />
          <text fs-34>
            客户
          </text>
        </view>
        <view rd-16rpx mt-20rpx bg-F0F0F0 py-18rpx px-32rpx flex flex-ac gap-32rpx>
          <wd-img
            :width="48"
            :height="48"
            :round="true"
            :src="DEFAULT_AVATAR"
          />
          <view flex flex-y flex-bt flex-1 gap-20rpx>
            <view f16>
              {{ detail?.storeCustomerName }}
            </view>
            <view flex flex-ac flex-bt>
              <view flex flex-ac gap-16rpx>
                <text c-929292 fs-28 lh-28rpx>
                  {{ detail?.storeCustomerPhone }}
                </text>
                <wd-img
                  :width="16"
                  :height="16"
                  :src="`${IMG_BASE}/icon-v.png`"
                />
              </view>
              <view f12>
                <text c-929292>
                  会员卡
                </text>
                <text c-00BB00>
                  {{ detail?.storeCustomerCardC }}张
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view bg-white px-34rpx py-40rpx mt-16px>
        <view flex flex-ac flex-bt>
          <view flex flex-ac gap-20rpx>
            <wd-img
              :width="18"
              :height="18"
              :src="`${IMG_BASE}/icon-book.png`"
            />
            <text fs-34>
              卡详情
            </text>
          </view>
          <view f14 c-1a66ff @click="toBilling">
            去使用
          </view>
        </view>
        <view c-#3A3A3A fb mt18px>
          {{ detail?.cardName }}
        </view>

        <view c-#434343 fs-14px flex flex-y gap14px mt10px>
          <view flex flex-bt>
            <view>卡类型：</view>
            <view>{{ detail?.cardTypeDesc }}</view>
          </view>
          <view flex flex-bt>
            <view>有效期：</view>
            <view>{{ detail?.expiresTimeDesc }}</view>
          </view>
          <view flex flex-bt>
            <view>实付：</view>
            <view>￥{{ detail?.payAmount }}</view>
          </view>
          <view
            v-if="detail?.cardType === 1
              && (detail?.cardSecondType === 2 || detail?.cardSecondType === 3)"
            flex flex-bt
          >
            <view>总次数：</view>
            <view>{{ detail?.countLimit || '不限' }}次</view>
          </view>
          <view>
            <view>
              购卡权益：
            </view>
            <view mt5px f12 c-#00BB00>
              {{ detail?.equityDesc }}
            </view>
          </view>
        </view>
      </view>
      <view bg-white px-34rpx py-40rpx mt-16px fs-12px>
        <view flex flex-ac flex-bt>
          <view c-#818181>
            订单编号：&nbsp;&nbsp;<text>{{ detail?.orderNo || detail?.refundTime }}</text>
          </view>
          <view class="toSee" @click="toSee">
            查看
          </view>
        </view>
        <view c-#818181 mt10px>
          购买时间：&nbsp;&nbsp;<text>{{ fdt(detail?.createTime) }}</text>
        </view>
      <!-- <view c-#818181>取消时间：<text>xxxxxxxx</text> </view> -->
      </view>

      <view class="menu" mt40px>
        <view class="item" @click="toEditName()">
          修改名称
        </view>
        <view class="item" :class="[dataList.length ? 'mid' : '']" @click="toEditExpire()">
          修改有效期
        </view>
        <!-- 已使用则无法修改权益 v-if="!dataList.length" -->
        <view v-if="!dataList.length" class="item" @click="toEditEquity()">
          修改权益
        </view>
      </view>
    </view>
    <view v-else px16px bg-white>
      <view v-for="(item, index) in dataList" :key="index" class="item2" py10px>
        <view flex flex-ac flex-bt fs-16px mb5px>
          <text c-#343331>
            {{ item?.goodsName }}&nbsp;{{ item?.goodsCount ? `x${item?.goodsCount}` : '' }}
          </text>
          <text c-#F53F3F>
            {{ item?.recordDesc }}
          </text>
        </view>
        <view fs-12px c-#9B9B9B>
          {{ item?.createTime }}
        </view>
        <view fs-12px c-#9B9B9B>
          {{ item?.orderNo }}
        </view>
      </view>
    </view>
  </z-paging>

  <wd-popup
    v-model="visEditName"
    custom-style="border-radius:32rpx;height:270px"
    closable position="bottom"
  >
    <view tc mt30px fb>
      修改名称
    </view>
    <view h-30px />

    <view mx-40rpx>
      <input v-model="cardName" style="background-color: #F6F6FB;padding:10px 20px;" type="text" placeholder="请输入卡名称">
    </view>

    <view mx-40rpx mt-44px color-white @click="confirmName">
      <wd-button size="large" block plain>
        <view flex flex-cc>
          <text>确定</text>
        </view>
      </wd-button>
    </view>
  </wd-popup>

  <wd-popup
    v-model="visEditExpire"
    custom-style="border-radius:32rpx;height:270px"
    closable position="bottom"
  >
    <view tc mt30px fb>
      修改有效期
    </view>
    <view h-30px />
    <view mx-40rpx>
      <wd-datetime-picker v-model="timeArr" type="date" use-default-slot>
        <view flex flex-ac flex-bt>
          <input v-model="showSTime" style="background-color: #F6F6FB;padding:10px 20px;flex:1;" type="text" placeholder="开始时间">
          <view w44px tc c-#929292 fs-12px>
            至
          </view>
          <input v-model="showETime" style="background-color: #F6F6FB;padding:10px 20px;flex:1;" type="text" placeholder="结束时间">
        </view>
      </wd-datetime-picker>
    </view>
    <view mx-40rpx mt-44px color-white @click="confirmExpire">
      <wd-button size="large" block plain>
        <view flex flex-cc>
          <text>确定</text>
        </view>
      </wd-button>
    </view>
  </wd-popup>

  <wd-popup
    v-model="visEditEquity"
    custom-style="border-radius:32rpx;min-height:370px"
    closable position="bottom"
  >
    <view tc mt30px fb>
      修改权益
    </view>
    <view h-30px />
    <wd-form :model="cardEquity">
      <wd-cell-group :border="false">
        <wd-cell title="购卡权益" required is-link @click="toProdServs()">
          <text c-#B6BDBD>
            选择商品
          </text>
        </wd-cell>
        <template v-if="cardEquity?.length">
          <view v-for="(item, index) in cardEquity" :key="`ck-${index}`" flex flex-bt flex-ac f13 h-96rpx px20px>
            <view>
              <text>{{ item.goodsName }}</text>
              <text theme-red pl5px>
                ¥{{ item.goodsPrice }}
              </text>
            </view>

            <view v-if="detail" flex flex-ac gap5px>
              <template v-if="detail?.cardType === 1">
                <template v-if="detail?.cardSecondType === 1">
                  <wd-input-number key="n1" v-model="item.equity" :step="1" :min="1" />
                  <text>次&nbsp;</text>
                  <wd-icon v-if="item.editable" name="minus-circle" size="16px" color="red" @click="delEquity(item)" />
                </template>
                <template v-else>
                  <text>不限次&nbsp;</text>
                  <wd-icon v-if="item.editable" name="minus-circle" size="16px" color="red" @click="delEquity(item)" />
                </template>
              </template>
              <template v-else>
                <wd-input-number key="n2" v-model="item.equity" :step="0.1" :min="1" :max="10" :precision="1" />
                <text>折&nbsp;</text>
                <wd-icon v-if="item.editable" name="minus-circle" size="16px" color="red" @click="delEquity(item)" />
              </template>
            </view>
          </view>
        </template>
        <wd-input
          v-model="countLimit"
          type="number"
          label-width="60%"
          label="已选服务共用次数"
          placeholder="请输入"
          suffix-icon="arrow-right"
          :rules="[{ required: true, message: '请填写已选服务共用次数' }]"
        />
        <!-- <wd-cell v-if="detail?.cardSecondType === 3" title="已选服务共用次数" required is-link @click="toProdServs()">
          <text c-#B6BDBD>
            选择商品
          </text>
        </wd-cell> -->
      </wd-cell-group>
    </wd-form>

    <view mx-40rpx mt-30px mb-30px color-white @click="confirmEquity">
      <wd-button size="large" block plain>
        <view flex flex-cc>
          <text>确定</text>
        </view>
      </wd-button>
    </view>
  </wd-popup>
</template>

<style lang='scss' scoped>
.item2:not(:last-child) {
  border-bottom: 1px solid #ebebf0;
}
.pop {
  height: 150px;
  border-radius: 32rpx;
}
.menu {
  display: flex;
  justify-content: center;
  color: #1a66ff;
  font-size: 12px;
  align-items: center;
  .item {
    text-align: center;
    padding: 0 20px;
  }
  .mid {
    border-left: 1px solid #e9eaec;
    border-right: 1px solid #e9eaec;
  }
}
.toSee {
  color: #6a6a69;
  font-size: 24rpx;
  line-height: 40rpx;
  height: 40rpx;
  text-align: center;
  border: 1px solid #818181;
  border-radius: 20px;
  padding: 4px 10px;
  display: flex;
  align-items: center;
}
</style>
