<route lang="yaml">
layout: false
style:
  navigationBarTitleText: 添加预约
</route>

<script lang="ts" setup>
import { bookInfo } from '@/stores/book-info'
import type { ListStaff } from '../staff/types'
import type { BookForm, Service } from './types'

const form = ref()
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
  storeId,
  storeCustomerPhone: null,
  storeCustomerName: null,
  storeCustomerId: null,
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

onLoad(() => {
  getStaff()
})

onShow(() => {
  model.service = checkedServs.value.map((v) => {
    return {
      storeServiceId: v.id,
      totalAmount: v.price,
      amount: v.price,
      goodsCount: 1,
      name: v.name,
      duration: v.duration,
      price: v.price,
      price2: v.price2,
      coverImg: v.coverImg,
    }
  })
})

function handleChange(item: Service) {
  item.amount = func_mul(item.price, item.goodsCount)
  item.totalAmount = func_mul(item.price, item.goodsCount)
}

async function getStaff() {
  const res = await request.get<ListRes<ListStaff>>('/business/staff', { storeId })
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
  uni.navigateTo({ url: '/pagesA/book/time' })
}

function delServ(index) {
  model.service.splice(index, 1)
}

async function save() {
  bookInfo.value = {
    ...model,
    artName: artName.value,
  }
  uni.navigateTo({ url: '/pagesA/book/submit' })
}
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
  <wd-form ref="form" :model="model">
    <wd-cell-group :border="true">
      <wd-input
        v-model="model.storeCustomerPhone"
        type="number"
        :maxlength="11"
        label="联系电话"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写联系电话' }]"
      />
      <wd-input
        v-model="model.storeCustomerName"
        label="联系人"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写联系人' }]"
      />
      <wd-picker v-model="model.storeServiceType" :rules="[{ required: true, message: '请选择服务方式' }]" label="服务方式" align-right :columns="columns" />
    </wd-cell-group>
    <MyCellGroup :py="0">
      <MyCell label="手艺人" required noBorder borderTop @myclick="toSelectStaff()">
        <text v-if="!artName" font-size-14px c-B6BDBD pr5px>
          请选择手艺人
        </text>
        <text v-else font-size-14px pr5px>
          {{ artName }}
        </text>
      </MyCell>
    </MyCellGroup>
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
  </wd-form>

  <view v-if="checkedServs.length">
    <view v-for="(item, index) in model.service" :key="`serv-${index}`">
      <view flex flex-ac flex-bt f12 px20px py12px>
        <view c-3D3D3D>
          预约服务{{ index + 1 }}
        </view>
        <view c-1A66FF @click="delServ(index)">
          删除
        </view>
      </view>
      <MyCellGroup>
        <view f14 mb10px flex flex-ac flex-bt>
          <view>{{ item.name }}</view>
          <view>
            <wd-input-number v-model="item.goodsCount" :min="1" @change="handleChange(item)" />
          </view>
        </view>
        <view f12 c-848486 mb10px flex flex-ac flex-bt>
          <view>服务时长</view>
          <view>约{{ item.duration }}分钟</view>
        </view>
        <view f12 c-848486 flex flex-ac flex-bt>
          <view>价格</view>
          <view>￥{{ item.amount }}</view>
        </view>
        <view h14px />
      </MyCellGroup>
    </view>
  </view>

  <view>
    <view style="border-top: 1px solid #EBEEF1" bg-white f14 c-1A66FF tc h40px lh-40px @click="toAddServ()">
      +&nbsp;添加服务
    </view>
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

<style lang='scss' scoped></style>
