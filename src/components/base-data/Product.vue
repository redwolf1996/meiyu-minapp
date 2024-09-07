<script lang="ts" setup>
import type { GrigSelectItem } from '@/types'
import type { Color, FormProduct } from './types'
import { CatType } from '@/stores/classify'

const props = withDefaults(defineProps<{
  showSkip?: boolean // 是否展示跳过按钮（引导页需要）
}>(), {
  showSkip: false,
})

const formRef = ref()
const imageValue = ref<any>([])
const form = reactive<FormProduct>({
  storeId,
  name: '',
  categoryId: computed(() => curClassify.value.id),
  imgs: computed(() => {
    return imageValue.value.map((v: any) => v.fileID)
  }),
  price: null,
  price2: null,
  desc: computed(() => richData.value.content),
  isShow: 1,
  unit: '',
  inventory: 0,
})
const catName = computed(() => curClassify.value.name)
const colors = ref<Color[]>([{
  value: '#EC5428',
  isActive: true,
}, {
  value: '#2F4BEC',
  isActive: false,
}, {
  value: '#51B7BB',
  isActive: false,
}, {
  value: '#A6EA99',
  isActive: false,
}, {
  value: '#5BCBCF',
  isActive: false,
}, {
  value: '#409EFF',
  isActive: false,
}, {
  value: '#B73082',
  isActive: false,
}, {
  value: '#E77F61',
  isActive: false,
}, {
  value: '#EF7F31',
  isActive: false,
}, {
  value: '#F5D348',
  isActive: false,
}])

const selects1: GrigSelectItem[] = [
  {
    label: '展示',
    value: 1,
    isActive: true,
  },
  {
    label: '不展示',
    value: 0,
    isActive: false,
  },
]

const selects2: GrigSelectItem[] = [
  {
    label: '到店服务',
    value: 2,
    isActive: true,
  },
  {
    label: '上门服务',
    value: 1,
    isActive: false,
  },
]

const selects3: GrigSelectItem[] = [
  {
    label: '在线支付',
    value: 1,
    isActive: true,
  },
  {
    label: '到店支付',
    value: 2,
    isActive: false,
  },
]

function onClickColor(item: Color) {
  colors.value.forEach((v) => {
    v.isActive = false
  })
  item.isActive = true
  form.serviceColor = item.value
}

function toRichEdit() {
  richData.value.key = 'service'
  richData.value.title = '添加服务说明'
  uni.navigateTo({ url: '/pagesA/rich-edit' })
}

async function save() {
  await request.post<any>('/business/service', form)
  useUserStore().setUserInfo({ orgInfo: {
    serviceCountStatus: 1,
  } })
  uni.navigateBack()
}

function skip() {
  useUserStore().setUserInfo({ orgInfo: {
    serviceCountStatus: 2,
  } })
  uni.navigateBack()
}

function toCats() {
  curClassify.value.type = CatType.Product
  uni.navigateTo({ url: '/pagesA/cats' })
}
</script>

<template>
  <wd-form ref="formRef" :model="form">
    <wd-cell-group :border="true">
      <wd-input
        v-model="form.name"
        label="产品名称"
        prop="value1"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写产品名称' }]"
      />
      <wd-picker v-model="value" :rules="[{ required: true, message: '请选择产品分类' }]" label="产品分类" align-right :columns="columns" />
      <wd-input
        v-model="model.value2"
        label="单位"
        prop="value23232"
        placeholder="请填写"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写单位' }]"
      />
      <wd-picker
        v-model="value"
        :rules="[{ required: true, message: '请选择库存' }]"
        label="库存" align-right :columns="columns"
      />
    </wd-cell-group>

    <view mt-24rpx bg-white p-40rpx>
      <view class="form-item-title required">
        <text>产品图片</text>
      </view>
      <view color-999 f12 mt-10rpx>
        <text>建议尺寸：800*800像素，最多上传5张</text>
      </view>
      <view flex-ac flex mt-20rpx>
        <wd-upload :file-list="fileList" :limit="5" action="https://ftf.jd.com/api/uploadImg" @change="handleChange" />
      </view>
    </view>

    <view h-24rpx />
    <wd-cell-group :border="true">
      <wd-input
        v-model="model.value1"
        label="原价"
        prop="value1"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写原价' }]"
      />
      <wd-input
        v-model="model.value2"
        label="优惠价"
        prop="value23232"
        type="number"
        placeholder="请输入"
        suffix-icon="arrow-right"
      />
    </wd-cell-group>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx @click="showDrawer = true">
      <view mb-20rpx class="form-item-title">
        <text>产品说明</text>
      </view>
      <rich-text v-if="txt" :nodes="txt" />
      <wd-textarea
        v-else
        v-model="value"
        readonly
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请输入产品说明"
        :maxlength="500" auto-height clearable show-word-limit
      />
    </view>

    <wd-popup
      v-model="showDrawer" :z-index="9999" position="bottom"
      :closable="true" custom-style="width: 100%;height:90%"
      @close="handleClose"
    >
      <view style="height: 100%;background-color: #fff;">
        <view p-10px tc fb>
          产品说明
        </view>
        <view class="richtext">
          <piaoyiEditor
            fontsize="13px"
            :values="values"
            :maxlength="3000"
            :readOnly="readOnly"
            :photoUrl="photoUrl"
            :api="api"
            :name="name"
            @changes="setContents"
          />
          <view class="">
            {{ txt }}
          </view>
          <!-- <view flex flex-bt mt-20rpx>
              <wd-button @click="showDrawer = false">
                保存
              </wd-button>
            </view> -->
        </view>
      </view>
    </wd-popup>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx>
      <view class="form-item-title required">
        <text>网店售卖</text>
      </view>
      <view h-28rpx />
      <GridTagSelect v-model="form.val" :sources="sources" />
    </view>
  </wd-form>

  <view mx-40rpx mt-64rpx color-white @click="save()">
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>保存</text>
      </view>
    </wd-button>
  </view>

  <view v-if="props.showSkip" mx-40rpx color-white @click="skip()">
    <wd-button size="large" type="text" block>
      <view flex flex-cc color-333>
        <text>跳过</text>
      </view>
    </wd-button>
  </view>
  <view h-60rpx />
</template>

<style lang='scss' scoped>
</style>
