<route lang="yaml">
style:
  navigationBarTitleText: 添加充值卡
</route>

<script lang="ts" setup>
import type { CardForm } from './types'

const userInfo = useUserStore()?.userInfo
const storeInfo = userInfo?.storeList?.[0]
const expiresType = ref(0) // 0永久有效 1限期有效
const form = ref<CardForm>({
  storeId,
  type: 2,
  secondType: 1,
  gift: 0,
  name: '',
  categoryId: computed(() => curClassify.value.id),
  price: 0,
  info: [],
  expires: 0,
  isShow: 1,
  desc: computed(() => richData.value.content),
  countLimit: 0,
  id: null,
})
const sources2: any = [
  {
    label: '支持',
    value: 1,
    isActive: true,
  },
  {
    label: '不支持',
    value: 0,
    isActive: false,
  },
]
const catName = computed(() => curClassify.value.name)

type Mode = 'edit' | 'copy' | null
const cardId = ref(0) // 修改和复制时候的id
const mode = ref<Mode>(null) // 修改还是复制

onLoad((options) => {
  cardId.value = +options?.id
  mode.value = options?.mode
  if (cardId.value) {
    if (mode.value === 'edit') {
      uni.setNavigationBarTitle({ title: '修改充值卡' })
      form.value.id = cardId.value
    }
    if (mode.value === 'copy') {
      uni.setNavigationBarTitle({ title: '复制充值卡' })
      form.value.id = null
    }
    setFormInfo()
  }
})

onShow(() => {
  if (checkedProds.value.length || checkedServs.value.length) {
    const arr: any = [...checkedProds.value, ...checkedServs.value]
    form.value.info = arr.map((v) => {
      return {
        equity: 10,
        productId: v.prodType === 1 ? v.id : null,
        serviceId: v.prodType === 2 ? v.id : null,
        name: v.name,
        price: v.price,
        price2: v.price2,
      }
    })
  }
})

function resetSources() {
  sources2.value.map((v) => {
    v.isActive = false
  })
}

async function setFormInfo() {
  const res = await request.get<any>(`/business/card/${cardId.value}`)
  const data = res.data
  resetSources()
  form.value.secondType = data.secondType
  form.value.gift = data.gift
  form.value.name = data.name
  form.value.price = data.price
  form.value.expires = data.expires
  expiresType.value = data.expires ? 1 : 0
  form.value.isShow = data.isShow
  if (data.isShow) {
    sources2.value[0].isActive = true
  }
  else {
    sources2.value[1].isActive = true
  }
  form.value.countLimit = data.countLimit
  form.value.info = data.info.map((v) => {
    return {
      equity: v.equity,
      productId: v.productId,
      serviceId: v.serviceId,
      name: v.serviceName || v.productName,
      price: v.price,
      price2: v.price2,
    }
  })
  curClassify.value.id = data.categoryId
  curClassify.value.name = data.categoryName
  richData.value.content = data.desc
}

function toCats() {
  curClassify.value.type = CatType.Card
  curClassify.value.multiple = false
  uni.navigateTo({ url: '/pagesA/cats' })
}

function toProdServs() { // 商品和服务列表页面
  uni.navigateTo({ url: '/pagesA/prod-servs' })
}

function toRichEdit() {
  richData.value.key = 'card'
  richData.value.title = '卡项说明'
  uni.navigateTo({ url: '/pagesA/rich-edit' })
}

async function save() {
  form.value.expires = expiresType.value ? form.value.expires : 0
  if (mode.value === 'edit')
    await request.put<any>('/business/card', form.value)
  else
    await request.post<any>('/business/card', form.value)
  let msg = '添加成功'
  if (mode.value === 'edit')
    msg = '修改成功'
  if (mode.value === 'copy')
    msg = '复制成功'
  uni.showToast({ title: msg })
  await sleep(1000)
  uni.navigateBack()
}

function changeEquity(val) {
  console.log(val)
}
</script>

<template>
  <wd-form :model="form">
    <wd-cell-group :border="true">
      <wd-input
        v-model="form.name"
        label="卡名称"
        placeholder="请输入"
        suffix-icon="arrow-right"
      />
      <MyCellGroup>
        <MyCell noBorder borderTop required label="卡分类" @myclick="toCats()">
          <text v-if="!catName" f14 c-bfbfbf pr-5px>
            请选择
          </text>
          <text v-else f14>
            {{ catName }}
          </text>
        </MyCell>
      </MyCellGroup>
      <wd-input
        v-model="form.price"
        label="售价"
        type="number"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写售价' }]"
      />
      <wd-input
        v-model="form.gift"
        label="赠送金额"
        type="number"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写赠送金额' }]"
      />
    </wd-cell-group>

    <view h-24rpx />
    <wd-cell-group :border="false">
      <wd-cell title="购卡权益" is-link @click="toProdServs()">
        <text c-#B6BDBD>
          选择商品
        </text>
      </wd-cell>

      <template v-if="form.info?.length">
        <view v-for="(item, index) in form.info" :key="`ck-${index}`" flex flex-bt flex-ac f13 h-96rpx px20px>
          <view>
            <text>{{ item.name }}</text>
            <text theme-red pl5px>
              ¥{{ item.price2 }}
            </text>
          </view>
          <!-- 充值卡也可以打折 -->
          <view flex flex-ac gap5px>
            <wd-input-number v-model="item.equity" :step="0.1" :min="1" :max="10" :precision="1" @change="changeEquity" />
            <text>折</text>
          </view>
        </view>
      </template>
    </wd-cell-group>

    <view h-24rpx />
    <view bg-white p-40rpx>
      <view class="form-item-title required">
        <text>卡有效期</text>
      </view>
      <wd-radio-group v-model="expiresType" checkedColor="#fa4350">
        <wd-radio :value="0">
          永久有效
        </wd-radio>
        <wd-radio :value="1">
          <view flex flex-ac f14 style="color:rgba(0, 0, 0, 0.85)">
            <text>购买后</text>
            <input
              v-model="form.expires"
              px-10rpx w-42px tc theme-red type="number" placeholder="请输入"
              placeholder-style="color:#b6bdbd;padding-top: 1px;font-size:14px;"
            >
            <text>天内有效</text>
          </view>
        </wd-radio>
      </wd-radio-group>
    </view>

    <view h-24rpx />
    <view bg-white p-40rpx>
      <view class="form-item-title">
        <text>卡片样式预览</text>
      </view>
      <view tc pr mt-28rpx>
        <image
          style="width: 630rpx;height: 368rpx;"
          mode="aspectFit"
          :src="`${IMG_BASE}/bg_czk.png`"
        />
        <view
          pa color-white
          style="width: 630rpx;height: 368rpx;padding: 25px;
                top: 0;left: 50%;text-align: left;
                transform: translateX(-50%);"
        >
          <view flex flex-bt flex-ac>
            <view f14 style="color: rgba(255, 255, 255, 0.7);">
              {{ storeInfo?.storeName || '--' }}
            </view>
            <view text-20rpx w-88rpx h-40rpx lh-40rpx tc flex flex-cc style="background: transparent;border-radius: 32rpx;border: 1px solid #fff;color: #fff">
              充值卡
            </view>
          </view>
          <view text-48rpx pt-56rpx>
            {{ form.name }}
          </view>
          <view v-if="form.price && form.gift" f14>
            充{{ form.price }}送{{ form.gift }}
          </view>
          <view f12 pt-52rpx>
            {{ expiresType === 0 ? '永久有效' : `购买后${form.expires}天内有效` }}
          </view>
        </view>
      </view>
    </view>

    <view h-24rpx />
    <view bg-white p-40rpx>
      <view class="form-item-title required">
        <text>网店售卖</text>
      </view>
      <view h-28rpx />
      <GridTagSelect v-model="form.isShow" :sources="sources2" :columns="2" />
    </view>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx @click="toRichEdit()">
      <view mb-20rpx class="form-item-title">
        <text>卡项说明</text>
      </view>
      <!-- 0是初始状态 11是清空后还包含空标签 <p><br></p>的字符数 -->
      <rich-text v-if="richData.content" :nodes="richData.content" />
      <wd-textarea
        v-else
        readonly
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请输入卡项说明"
        auto-height clearable show-word-limit
      />
    </view>
  </wd-form>
  <view mx-40rpx mt-64rpx color-white @click="save()">
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>保存</text>
      </view>
    </wd-button>
  </view>
  <view h-60rpx />
</template>

<style lang='scss' scoped>
.ipt {
  width: 100px !important;
}
.end-time {
  display: inline-block;
  margin-left: 8px;
  border: 1px solid #faa21e;
  padding: 0 4px;
  font-size: 10px;
  color: #faa21e;
}
</style>
