<script lang="ts" setup>
import type { GrigSelectItem } from '@/types'
import type { Color, FormService } from './types'

const props = withDefaults(defineProps<{
  showSkip?: boolean // 是否展示跳过按钮（引导页需要）
}>(), {
  showSkip: false,
})

const formRef = ref()
const imageValue = ref<any>([])
const columns = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])
const model = reactive<{
  value1: string
  value2: string
  value3: string
}>({
  value1: '',
  value2: '',
  value3: '',
})
const form = reactive<FormService>({
  storeId: 0,
  name: '服务3',
  categoryId: 5,
  duration: 60,
  durationUnit: 'minute',
  imgs: [
    'http://dummyimage.com/400x400',
  ],
  price: 23,
  price2: 4,
  desc: 'eiusmod enim',
  isShow: 1,
  payType: 1,
  serviceColor: '#EC5428',
  isToStore: 1,
  isToDoor: 1,
})
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

const wd = ref(0)

const sources: GrigSelectItem[] = [
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
]

const sources3: GrigSelectItem[] = [
  {
    label: '上门服务',
    value: 1,
    isActive: false,
  },
  {
    label: '到店服务',
    value: 0,
    isActive: false,
  },
]

const sources2: GrigSelectItem[] = [
  {
    label: '付全款',
    value: 1,
    isActive: false,
  },
  {
    label: '到店付',
    value: 0,
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
  richData.value.title = '添加服务说明'
  uni.navigateTo({ url: '/pagesA/rich-edit' })
}
</script>

<template>
  <wd-form ref="formRef" :model="model">
    <wd-cell-group :border="true">
      <wd-input
        v-model="model.value1"
        label="服务名称"
        prop="value1"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写服务名称' }]"
      />
      <wd-picker v-model="form.categoryId" :rules="[{ required: true, message: '请选择服务分类' }]" label="服务分类" align-right :columns="columns" />
      <wd-input
        v-model="model.value2"
        label="服务时长"
        prop="value23232"
        placeholder="请选择"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请选择服务时长' }]"
      />
    </wd-cell-group>

    <view mt-24rpx bg-white p-40rpx>
      <view class="form-item-title required">
        <text>服务图片</text>
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
        <!-- <wd-upload :file-list="fileList" :limit="5" action="https://ftf.jd.com/api/uploadImg" @change="handleChange" /> -->
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
        placeholder="若不填，则客户按原价购买"
        suffix-icon="arrow-right"
      />
    </wd-cell-group>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx @click="toRichEdit">
      <view mb-20rpx class="form-item-title">
        <text>服务说明</text>
      </view>
      <wd-textarea
        readonly
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请输入服务说明"
        :maxlength="500" auto-height clearable show-word-limit
      />
    </view>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx>
      <view class="form-item-title required">
        <text>网店展示</text>
      </view>
      <view h-28rpx />
      <GridTagSelect v-model="wd" :sources="sources" />
    </view>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx>
      <view class="form-item-title required">
        <text>服务类型</text>
      </view>
      <view h-28rpx />
      <GridTagSelect v-model="wd" :sources="sources3" />
    </view>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx>
      <view class="form-item-title required">
        <text>预约支付</text>
      </view>
      <view f12 color-999>
        <text>设置客户线上预约时是否需要支付</text>
      </view>
      <view h-28rpx />
      <GridTagSelect v-model="wd" :sources="sources2" />
    </view>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx>
      <view class="form-item-title required">
        <text>选择颜色</text>
      </view>
      <view f12 color-999>
        <text>日历中显示预约时使用，便于区分预约的服务</text>
      </view>
      <view h-28rpx />
      <div class="big-color" :style="{ background: form.serviceColor }" />
      <view mt24px flex flex-bt gap-10px>
        <view
          v-for="item in colors"
          :key="item.value"
          :style="{ background: item.value, boxShadow: item.isActive ? `0 2px 12px 0 ${item.value}` : 'none' }"
          w-25px
          h-25px rd-3px @click="onClickColor(item)"
        />
      </view>
    </view>
  </wd-form>

  <view mx-40rpx mt-64rpx color-white>
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>保存</text>
      </view>
    </wd-button>
  </view>

  <view v-if="props.showSkip" mx-40rpx color-white>
    <wd-button size="large" type="text" block>
      <view flex flex-cc color-333>
        <text>跳过</text>
      </view>
    </wd-button>
  </view>
  <view h-60rpx />
</template>

<style lang='scss' scoped>
.big-color {
  width: 64px;
  height: 64px;
}
.grid-tag-select {
  display: grid;
  grid-gap: 20rpx;
  grid-template-columns: repeat(2, 1fr);
  > view {
    height: 20px;
    border: 1px solid blue;
  }
}
:deep(.wd-upload__evoke) {
  margin-bottom: 0 !important;
}
:deep(.wd-upload__preview) {
  margin: 0 0 0 0 !important;
}
</style>
