<route lang="yaml">
layout: false
style:
  navigationBarTitleText: 添加预约
</route>

<script lang="ts" setup>
import { bookInfo } from '@/stores/book-info'
import type { ListStaff } from '../staff/types'
import type { BookForm, Service } from './types'
import type { CustomerDetail } from '../customer/types'

const curIndex = ref(0) // 预约服务列表当前选择项的索引
const columns = ref<SelItem[]>([
  {
    label: '到店',
    value: 1,
  },
  {
    label: '上门',
    value: 2,
  },
])
const model = reactive<BookForm>({
  storeId: storeId.value,
  storeCustomerPhone: computed(() => curCustomer.value?.phone),
  storeCustomerName: computed(() => curCustomer.value?.name),
  storeCustomerId: computed(() => curCustomer.value?.storeCustomerId),
  storeServiceType: 1,
  startTime: computed(() => `${bookStime.value}:00`),
  artisanId: null,
  payType: null,
  customerCardId: null,
  notes: null,
  service: [],
})
const artName = ref('')
const listStaff = ref<ListStaff[]>([])
const visibleStaff = ref(false)
const fromCustomer = ref(false)
const cusName = computed(() => `${curCustomer.value?.name} ${curCustomer.value?.phone}` || '')

function toSelCus() {
  if (fromCustomer.value)
    return false
  uni.navigateTo({ url: '/pagesA/customer/list' })
}

onLoad(async (option) => {
  if (option?.customerId) {
    model.storeCustomerId = option.customerId
    fromCustomer.value = true
    const res = await request.get<CustomerDetail>(`/business/store-customer/${option.customerId}`)
    model.storeCustomerName = res.data.name
    model.storeCustomerPhone = res.data.phone
  }
  getStaff()
})

async function getStaff() {
  // jobCode 职务,1店长，2手艺人，3销售
  const res = await request.get<ListRes<ListStaff>>('/business/staff', { storeId: storeId.value, jobCode: 2 })
  listStaff.value = res.data.list.map((v) => {
    return {
      ...v,
      active: false,
    }
  })
}

function toSelectStaff() {
  visibleStaff.value = true
}

function clickItem(item: ListStaff) {
  listStaff.value.forEach((val: any) => {
    val.active = false
  })
  item.active = !item.active
  if (item.active) {
    model.artisanId = item.storeStaffId
    artName.value = item.userName
  }
}

function toAddServ() {
  uni.navigateTo({ url: '/pagesA/book/servs' })
}

function toSelServTime() {
  if (!checkedServs.value.length) {
    return uni.showToast({
      title: '请先选择服务',
      icon: 'none',
    })
  }
  bookInfo.value = {
    ...model,
    artName: artName.value,
  }
  uni.navigateTo({ url: '/pagesA/book/time' })
}

async function save() {
  if (!bookStime.value) {
    return uni.showToast({
      title: '请选择服务时间',
      icon: 'none',
    })
  }
  bookInfo.value = {
    ...model,
    artName: artName.value,
  }
  uni.navigateTo({ url: '/pagesA/book/submit' })
}

function toSelCard(item, index: number) {
  if (!model.storeCustomerId)
    return toast.warning('请先选择客户')
  const storeCustomerId = model.storeCustomerId
  const goodsId = item.storeServiceId
  const goodsType = 1
  curIndex.value = index
  uni.navigateTo({ url: `/pagesA/billing/select-card-billing?storeCustomerId=${storeCustomerId}&goodsId=${goodsId}&goodsType=${goodsType}` })
}

function handleChange(item: Partial<Service>) {
  checkedServs.value.forEach((v) => {
    if (v.id === item.storeServiceId) {
      v.goodsCount = item.goodsCount
    }
  })
}

function delServ(index) {
  model.service.splice(index, 1)
  checkedServs.value.splice(index, 1)
}

watch(() => checkedServs.value, () => {
  model.service = checkedServs.value.map((v) => {
    return {
      storeServiceId: v.id,
      goodsCount: v.goodsCount || 1,
      name: v.name,
      duration: v.duration,
      price: v.price,
      price2: v.price2,
      coverImg: v.coverImg,
      totalAmount: null, // 商品原价总价
      amount: null, // 商品优惠后总价
      cardShowName: null,
    }
  })
  model.service.forEach((item: any) => {
    item.totalAmount = computed(() => {
      return func_mul(item.price, item.goodsCount)
    })
    item.amount = computed(() => {
      return func_mul(func_sub(item.price2, item.cardReduceAmount), item.goodsCount)
    })
  })
})

watch(() => curSelectedCardToCash.value, () => {
  model.service.forEach((item: Partial<Service>, index: number) => {
    if (curIndex.value === index) {
      item.customerCardId = curSelectedCardToCash.value?.customerCardId
      item.cardId = curSelectedCardToCash.value?.cardId

      if (curSelectedCardToCash.value?.cardType === 1) { // 1->次卡，2->充值卡，3->折扣卡
        item.cardReduceAmount = 1
      }
      else {
        item.cardReduceAmount = func_mul(item.price, func_sub(1, func_div(curSelectedCardToCash.value?.equity, 10)))
      }

      item.totalAmount = computed(() => {
        return func_mul(item.price, item.goodsCount)
      })
      item.amount = computed(() => {
        if (curSelectedCardToCash.value?.cardType === 1) {
          return 0
        }
        return func_mul(func_sub(item.price, item.cardReduceAmount), item.goodsCount)
      })

      item.cardName = curSelectedCardToCash.value?.cardName
      item.cardType = curSelectedCardToCash.value?.cardType

      if (curSelectedCardToCash.value?.cardType === 1) {
        item.cardShowName = `${curSelectedCardToCash.value?.cardName} -${item.cardReduceAmount}次`
      }
      else {
        item.cardShowName = `${curSelectedCardToCash.value?.cardName} -￥${item.cardReduceAmount}`
      }
    }
  })
})
</script>

<template>
  <page-meta :page-style="`overflow:${visibleStaff ? 'hidden' : 'visible'};`" />
  <wd-popup
    v-model="visibleStaff" :z-index="999" :lock-scroll="true" :safe-area-inset-bottom="false" position="right"
    custom-style="height: 100vh;width: 80%;background: #F9F9F9;"
  >
    <view tc f14 ps top-0 bg-white h-40px lh-40px>
      选择手艺人
    </view>
    <view mt10px>
      <view v-for="(item, index) in listStaff" :key="`sd-${index}`" flex flex-ac flex-bt bg-white px40rpx py20rpx style="border-bottom: 1px solid #DFDFDF" @click="clickItem(item)">
        <view>
          <view f14 c-313131>
            {{ item.userName }}
          </view>
          <view f12 c-777777 mt6px>
            {{ item.phone }}
          </view>
        </view>
        <wd-img
          v-if="item.active"
          :width="26"
          :height="19"
          :src="`${IMG_BASE}/icon-correct.png`"
        />
      </view>
      <view h50px />
    </view>

    <view tc flex flex-cc color-white bg-white bottom-0 ps py-20px @click="visibleStaff = false">
      <MyButton width="500rpx">
        确定
      </MyButton>
    </view>
  </wd-popup>
  <wd-form :model="model">
    <wd-cell-group :border="true">
      <wd-cell title="客户" required :is-link="!fromCustomer" @click="toSelCus()">
        <view>
          <text v-if="!curCustomer?.storeCustomerId" c-#B6BDBD>
            请选择或添加
          </text>
          <text v-else>
            {{ cusName }}
          </text>
        </view>
        <template #icon>
          <wd-icon name="user" size="16px" />
        </template>
      </wd-cell>
      <wd-picker
        v-model="model.storeServiceType"
        :rules="[{ required: true, message: '请选择服务方式' }]"
        label="服务方式" align-right :columns="columns"
      />
      <wd-cell title="手艺人" :is-link="true" @click="toSelectStaff()">
        <view>
          <text v-if="!artName" c-#B6BDBD>
            请选择手艺人
          </text>
          <text v-else>
            {{ artName }}
          </text>
        </view>
      </wd-cell>
    </wd-cell-group>
  </wd-form>
  <view class="h10px" />

  <view v-if="checkedServs.length">
    <view v-for="(item, index) in model.service" :key="`serv-${index}`" mb10px>
      <view flex flex-ac flex-bt f12 px20px py12px>
        <view c-3D3D3D>
          预约服务{{ index + 1 }}
        </view>
        <view c-1A66FF @click="delServ(index)">
          删除
        </view>
      </view>
      <MyCellGroup>
        <view f14 flex flex-ac flex-bt>
          <view theme-color fs-14px fb>
            {{ item.name }}
          </view>
          <view>
            <wd-input-number v-model="item.goodsCount" :min="1" @change="handleChange(item)" />
          </view>
        </view>

        <view
          pt-20rpx
          flex flex-bt flex-ac
        >
          <view c-848486 fs-12px>
            <text>价格</text>
          </view>
          <view fs-12px flex flex-ac gap-6px style="max-width: 60%">
            <text c-#FF1919>
              ￥{{ item.price2 }}&nbsp;
            </text>
            <text line-through c-848486>
              ￥{{ item.price }}
            </text>
          </view>
        </view>
        <view
          pt-20rpx
          flex flex-bt flex-ac
        >
          <view c-848486 fs-12px>
            <text>服务时长</text>
          </view>
          <view fs-12px flex flex-ac gap-6px style="max-width: 60%">
            <view c-848486>
              约{{ item.duration }}分钟
            </view>
          </view>
        </view>
        <view
          pt-20rpx
          flex flex-bt flex-ac
          @click="toSelCard(item, index)"
        >
          <view c-848486 fs-12px>
            <text>使用卡项</text>
          </view>
          <view flex flex-ac gap-6px style="max-width: 60%">
            <view c-848486 flex flex-ac fs-12px>
              <text v-if="!item.cardShowName" c-#B6BDBD fs-12px>
                请选择
              </text>
              <view v-else fs-12px>
                {{ item.cardShowName }}
              </view>
              <wd-icon name="arrow-right" size="14px" color="#bfbfbf" />
            </view>
          </view>
        </view>
      </MyCellGroup>
    </view>
  </view>

  <view>
    <view bg-white f14 c-1A66FF tc h40px lh-40px @click="toAddServ()">
      +&nbsp;添加服务
    </view>

    <MyCellGroup :py="0">
      <MyCell label="服务时间" required noBorder borderTop @myclick="toSelServTime()">
        <text v-if="!bookStime" font-size-14px c-B6BDBD pr4px>
          请选择服务时间
        </text>
        <text v-else font-size-14px pr5px>
          {{ bookStime }}
        </text>
      </MyCell>
    </MyCellGroup>

    <view px20px py12px font-size-14px>
      备注
    </view>
    <view bg-white px-40rpx py-24rpx>
      <wd-textarea
        v-model="model.notes"
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请输入预约备注" :maxlength="200" auto-height clearable show-word-limit
      />
    </view>

    <view mx-40rpx mt-64rpx color-white>
      <wd-button size="large" custom-class="theme-bg" block @click="save()">
        <view flex flex-cc>
          <text>保存</text>
        </view>
      </wd-button>
    </view>
  </view>
  <wu-safe-bottom />
</template>

<style>
.my-cell {
  line-height: 10px !important;
}
</style>

<style lang='scss' scoped>
.my-cell {
  line-height: 10px !important;
}
</style>
