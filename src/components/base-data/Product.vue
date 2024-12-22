<script lang="ts" setup>
import type { GrigSelectItem } from '@/types'
import type { FormProduct } from './types'
import { CatType } from '@/stores/classify'

const props = withDefaults(defineProps<{
  showSkip?: boolean // 是否展示跳过按钮（引导页需要）
}>(), {
  showSkip: false,
})

type Mode = 'edit' | 'copy' | null
const mode = ref<Mode>(null) // 修改还是复制
const formRef = ref()
const imageValue = ref<any>([])
const form = reactive<FormProduct>({
  storeId: storeId.value,
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
  id: null,
})
const catName = computed(() => curClassify.value.name)

const selects1 = ref<GrigSelectItem[]>([
  {
    label: '展示',
    value: 1,
    isActive: false,
  },
  {
    label: '不展示',
    value: 0,
    isActive: false,
  },
])

onLoad((options) => {
  form.id = +options?.id
  mode.value = options?.mode
  if (!mode.value) {
    selects1.value[0].isActive = true
  }
  if (form?.id > 0) {
    if (mode.value === 'edit') {
      uni.setNavigationBarTitle({ title: '修改产品' })
    }
    if (mode.value === 'copy') {
      uni.setNavigationBarTitle({ title: '复制产品' })
    }
    setFormInfo()
  }
})

// 修改和复制的时候用
async function setFormInfo() {
  const res = await request.get<any>(`/business/product/${form.id}`)
  const data = res.data

  form.id = data.id
  form.name = data.name
  curClassify.value.id = data.categoryId
  curClassify.value.name = data.categoryName
  form.unit = data.unit
  form.inventory = data.inventory
  imageValue.value = data.imgs.map((v: any, i: any) => {
    return {
      name: i,
      url: v,
      extname: 'img',
    }
  })
  form.price = data.price
  form.price2 = data.price2
  richData.value.content = data.desc
  form.isShow = data.isShow
  selects1.value.map((v) => {
    if (v.value === form.isShow) {
      v.isActive = true
    }
    else {
      v.isActive = false
    }
  })
}

function toRichEdit() {
  richData.value.key = 'product'
  richData.value.title = '添加产品说明'
  uni.navigateTo({ url: '/pagesA/rich-edit' })
}

async function save() {
  if (mode.value === 'edit')
    await request.put<any>('/business/product', form)
  else
    await request.post<any>('/business/product', form)
  useUserStore().setUserInfo({ guidStatus: {
    productCountStatus: 1,
  } })
  let msg = '添加成功'
  if (mode.value === 'edit')
    msg = '修改成功'
  if (mode.value === 'copy')
    msg = '复制成功'
  uni.showToast({ title: msg })
  await sleep(1000)
  uni.navigateBack()
}

function skip() {
  useUserStore().setUserInfo({ guidStatus: {
    productCountStatus: 2,
  } })
  uni.navigateBack()
}

function toCats() {
  curClassify.value.type = CatType.Product
  curClassify.value.multiple = false
  uni.navigateTo({ url: '/pagesA/cats' })
}
</script>

<template>
  <wd-form ref="formRef" :model="form">
    <wd-cell-group :border="true">
      <wd-input
        v-model="form.name"
        label="产品名称"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写产品名称' }]"
      />
      <MyCellGroup>
        <MyCell noBorder borderTop required label="产品分类" @myclick="toCats()">
          <text v-if="!catName" f14 c-bfbfbf pr-5px>
            请选择
          </text>
          <text v-else f14>
            {{ catName }}
          </text>
        </MyCell>
      </MyCellGroup>
      <wd-input
        v-model="form.unit"
        label="单位"
        placeholder="请填写"
        suffix-icon="arrow-right"
      />
      <wd-input
        v-model="form.inventory"
        label="库存"
        placeholder="请填写"
        suffix-icon="arrow-right"
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
        <uni-file-picker
          v-model="imageValue"
          fileMediatype="image"
          mode="grid"
          :limit="5"
        />
      </view>
    </view>

    <view h-24rpx />
    <wd-cell-group :border="true">
      <wd-input
        v-model="form.price"
        type="number"
        label="原价"
        prop="value1"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写原价' }]"
      />
      <wd-input
        v-model="form.price2"
        type="number"
        label="优惠价"
        prop="value23232"
        placeholder="若不填，则客户按原价购买"
        suffix-icon="arrow-right"
      />
    </wd-cell-group>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx @click="toRichEdit">
      <view mb-20rpx class="form-item-title">
        <text>产品说明</text>
      </view>
      <!-- 0是初始状态 11是清空后还包含空标签 <p><br></p>的字符数 -->
      <rich-text v-if="richData.content" :nodes="richData.content" />
      <wd-textarea
        v-else
        readonly
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请输入产品说明"
        auto-height clearable show-word-limit
      />
    </view>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx>
      <view class="form-item-title required">
        <text>网店售卖</text>
      </view>
      <view h-28rpx />
      <GridTagSelect v-model="form.isShow" :sources="selects1" />
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
