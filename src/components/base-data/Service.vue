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
const form = reactive<FormService>({
  storeId,
  name: '',
  categoryId: computed(() => curClassify.value.id),
  duration: null,
  durationUnit: 'minute',
  imgs: computed(() => {
    return imageValue.value.map((v: any) => v.fileID)
  }),
  price: null,
  price2: null,
  desc: computed(() => richData.value.content),
  isShow: 1,
  payType: 1,
  serviceColor: '#EC5428',
  serverToType: [2],
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
  curClassify.value.type = 0 // 服务分类
  uni.navigateTo({ url: '/pagesA/cats' })
}
</script>

<template>
  <wd-form ref="formRef" :model="form">
    <wd-cell-group :border="true">
      <wd-input
        v-model="form.name"
        label="服务名称"
        prop="name"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写服务名称' }]"
      />
      <MyCellGroup>
        <MyCell noBorder required label="服务分类" @click="toCats">
          <text v-if="!catName" f14 c-#bfbfbf pr-5px>
            请选择
          </text>
          <text v-else f14>
            {{ catName }}
          </text>
        </MyCell>
      </MyCellGroup>
      <wd-input
        v-model="form.duration"
        label="服务时长"
        prop="duration"
        placeholder="请输入"
        :use-suffix-slot="true"
        type="number"
        :rules="[{ required: true, message: '填写服务时长' }]"
      >
        <template #suffix>
          <view f12 theme-color>
            分钟
          </view>
        </template>
      </wd-input>
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
        <text>服务说明</text>
      </view>
      <!-- 0是初始状态 11是清空后还包含空标签 <p><br></p>的字符数 -->
      <rich-text v-if="richData.len !== 0 && richData.len !== 11" :nodes="richData.content" />
      <wd-textarea
        v-else
        readonly
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请输入服务说明"
        auto-height clearable show-word-limit
      />
    </view>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx>
      <view class="form-item-title required">
        <text>网店展示</text>
      </view>
      <view f12 color-999>
        <text>设置是否开启网店销售</text>
      </view>
      <view h-28rpx />
      <GridTagSelect v-model="form.isShow" :sources="selects1" />
    </view>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx>
      <view class="form-item-title required">
        <text>服务类型</text>
      </view>
      <view f12 color-999>
        <text>设置预约服务的类型，可多选</text>
      </view>
      <view h-28rpx />
      <GridTagSelect v-model="form.serverToType" mode="multiple" :sources="selects2" />
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
      <GridTagSelect v-model="form.payType" :sources="selects3" />
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
.big-color {
  width: 64px;
  height: 64px;
}
</style>
