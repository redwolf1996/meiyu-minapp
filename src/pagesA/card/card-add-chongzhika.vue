<route lang="yaml">
style:
  navigationBarTitleText: 添加充值卡
</route>

<script lang="ts" setup>
import type { CardForm } from './types'

const userInfo = useUserStore()?.userInfo
const storeInfo = userInfo?.storeList?.[0]
const expiresType = ref(0) // 0不限次 1限次
const form = ref<CardForm>({
  storeId,
  type: 1,
  secondType: 1,
  gift: 0,
  name: '',
  categoryId: computed(() => curClassify.value.id),
  price: 0,
  info: computed(() => {
    const arr: any = [...checkedProds.value, ...checkedServs.value]
    return arr.map((v) => {
      return {
        equity: 0,
        productId: v.prodType === 1 ? v.id : null,
        serviceId: v.prodType === 2 ? v.id : null,
        name: v.name,
        price: v.price,
        price2: v.price2,
      }
    })
  }),
  expires: 0,
  isShow: 1,
  desc: computed(() => richData.value.content),
  countLimit: 0,
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
  richData.value.title = '添加卡项说明'
  uni.navigateTo({ url: '/pagesA/rich-edit' })
}

async function save() {
  form.value.expires = expiresType.value ? form.value.expires : 0
  await request.post<any>('/business/card', form.value)
  await uni.showToast({ title: '创建成功' })
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
          <!-- 有限次卡 -->
          <wd-input-number v-show="form.secondType === 1" v-model="item.equity" @change="changeEquity" />
          <!-- 不限次卡、通卡 -->
          <text v-show="form.secondType === 2 || form.secondType === 3">
            不限次
          </text>
        </view>
      </template>

      <!-- 通卡 -->
      <wd-input
        v-if="form.secondType === 3"
        v-model="form.countLimit"
        label="已选服务共用次数"
        type="number"
        placeholder="请输入"
        suffix-icon="arrow-right"
      />
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

    <view tc pr mt-28rpx>
      <image
        style="width: 630rpx;height: 368rpx;"
        mode="aspectFit"
        :src="`${IMG_BASE}/bg_zkk.png`"
      />
      <view
        pa color-white
        style="width: 630rpx;height: 368rpx;padding: 25px;
                top: 0;left: 50%;text-align: left;
                transform: translateX(-50%);"
      >
        <view flex flex-bt flex-ac>
          <view f14 style="color: rgba(255, 255, 255, 0.7);">
            硕园美甲美睫
          </view>
          <view text-20rpx py-8rpx px-20rpx tc style="background: #FF5F00;border-radius: 32rpx;">
            折扣卡
          </view>
        </view>
        <view text-48rpx pt-56rpx>
          7980面部精雕30次
        </view>
        <view f14>
          30次
        </view>
        <view f12 flex flex-bt pt-52rpx>
          <view>购买后180天内有效</view>
          <view>09/25&#12288;</view>
        </view>
      </view>
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
            <view text-20rpx w-88rpx h-40rpx lh-40rpx tc style="background: #FF5F00;border-radius: 32rpx;">
              折扣卡
            </view>
          </view>
          <view text-48rpx pt-56rpx>
            {{ form.name }}
          </view>
          <view f14>
            充1000送200
          </view>
          <view v-if="form.expires !== null" f12 pt-52rpx>
            {{ form.expires === 0 ? '永久有效' : `购买后${form.expires}天内有效` }}
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
      <rich-text v-if="richData.len !== 0 && richData.len !== 11" :nodes="richData.content" />
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
