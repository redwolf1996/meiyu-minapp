<route lang="yaml">
style:
  navigationBarTitleText: 添加次卡
</route>

<script lang="ts" setup>
import type { CardForm } from './types'

const value = ref<number>(1)
const form = reactive<CardForm>({
  storeId,
  type: 1,
  secondType: 1,
  gift: 0,
  name: '',
  categoryId: computed(() => curClassify.value.id),
  price: 200,
  info: [
  ],
  expires: null,
  isShow: 1,
  desc: '卡',
})
const sources: any = [
  {
    label: '有限次卡',
    value: 1,
    isActive: true,
  },
  {
    label: '不限次卡',
    value: 2,
    isActive: false,
  },
  {
    label: '通卡',
    value: 3,
    isActive: false,
  },
]

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
// const prodServs = ref([])

function toCats() {
  curClassify.value.type = CatType.Card
  curClassify.value.multiple = false
  uni.navigateTo({ url: '/pagesA/cats' })
}

function toProdServs() { // 商品和服务列表页面
  uni.navigateTo({ url: '/pagesA/prod-servs' })
}

function toRichEdit() {
  richData.value.key = 'product'
  richData.value.title = '添加产品说明'
  uni.navigateTo({ url: '/pagesA/rich-edit' })
}

function save() {
}
</script>

<template>
  <wd-form ref="form" :model="form">
    <view bg-white p-40rpx>
      <view class="form-item-title required">
        <text>选择次卡类型</text>
      </view>
      <view h-28rpx />
      <GridTagSelect v-model="form.secondType" :sources="sources" :columns="3" />
    </view>

    <view h-24rpx />
    <wd-cell-group :border="true">
      <wd-input
        v-model="form.name"
        label="卡名称"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写卡名称' }]"
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
    <wd-cell-group :border="true">
      <MyCellGroup>
        <MyCell noBorder borderTop required label="购卡权益" @myclick="toProdServs()">
          <text v-if="!catName" f14 c-bfbfbf pr-5px>
            请选择商品或服务
          </text>
          <text v-else f14>
            {{ catName }}
          </text>
        </MyCell>
      </MyCellGroup>
      <view flex flex-bt flex-ac f13 h-96rpx px-40rpx>
        <view>
          <text>产品名称1asdasdasdas</text>
          <text theme-red>
            ¥499
          </text>
        </view>
        <view flex flex-cc>
          <wd-input v-model="value" type="number" w-55px pr13px center no-border />
          <text>次</text>
        </view>
      </view>

      <view flex flex-bt flex-ac f13 h-96rpx px-40rpx>
        <view>
          <text>产品名称1asdasdasdas</text>
          <text theme-red>
            ¥499
          </text>
        </view>
        <view flex flex-cc>
          <view>
            不限次
          </view>
        </view>
      </view>
    </wd-cell-group>

    <view bg-white p-40rpx>
      <view class="form-item-title required">
        <text>卡有效期</text>
      </view>
      <wd-radio-group v-model="form.expires" checkedColor="#fa4350">
        <wd-radio :value="1">
          永久有效
        </wd-radio>
        <wd-radio :value="2">
          <view flex flex-ac f14 style="color:rgba(0, 0, 0, 0.85)">
            <text>购买后</text>
            <input
              v-model="form.gift"
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
          :src="`${IMG_BASE}/bg_ck.png`"
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
            <view text-20rpx w-88rpx h-40rpx lh-40rpx tc style="background: #FF5F00;border-radius: 32rpx;">
              次卡
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
// .wd-form {
//   :deep(.wd-input__inner {
//     text-align: left !important;
//   }
// }
.end-time {
  display: inline-block;
  margin-left: 8px;
  border: 1px solid #faa21e;
  padding: 0 4px;
  font-size: 10px;
  color: #faa21e;
}
</style>
