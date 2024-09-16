<route lang="yaml">
style:
  navigationBarTitleText: 添加次卡
</route>

<script lang="ts" setup>
import piaoyiEditor from '@/uni_modules/piaoyi-editor/components/piaoyi-editor/piaoyi-editor.vue'
import type { CardForm } from './types'

const value = ref<number>(1)
const columns = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])
const showDrawer = ref(false)
const form: any = reactive({
  val: 1,
})
const model = reactive<CardForm>({
  storeId,
  type: 1,
  secondType: 1,
  gift: 0,
  name: '',
  categoryId: 4,
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

const readOnly = ref(false)
const photoUrl = ref('http://test.com')
const api = ref('api')
const txt = ref('')
const name = ref('file')
const values = ref('')

function setContents(e) {
  txt.value = e.html
}

function test() {
  console.log('xxx')
}

function handleClose() {}
</script>

<template>
  <wd-form ref="form" :model="model">
    <view bg-white p-40rpx>
      <view class="form-item-title required">
        <text>选择次卡类型</text>
      </view>
      <view h-28rpx />
      <GridTagSelect v-model="model.secondType" :sources="sources" :columns="3" />
    </view>

    <view h-24rpx />
    <wd-cell-group :border="true">
      <wd-input
        v-model="model.name"
        label="卡名称"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写卡名称' }]"
      />
      <wd-picker
        v-model="model.name"
        :rules="[{ required: true, message: '请选择服务分类' }]"
        label="卡分类"
        align-right :columns="columns"
      />
      <wd-input
        v-model="model.price"
        label="售价"
        type="number"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写售价' }]"
      />
    </wd-cell-group>

    <view h-24rpx />
    <wd-cell-group :border="true">
      <wd-input
        v-model="model.info"
        label="购卡权益"
        disabled
        prop="value1"
        placeholder="请选择商品或服务"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请选择商品或服务' }]"
        @click="test"
      />
      <view flex flex-bt flex-ac f13 h-96rpx px-40rpx>
        <view wp-50>
          产品名称1asdasdasdas
        </view>
        <view wp-20 theme-red>
          ¥499
        </view>
        <view wp-30 flex flex-xr>
          <wd-input-number v-if="form.val === 1" v-model="value" />
          <view v-else>
            不限次
          </view>
        </view>
      </view>

      <view flex flex-bt flex-ac f13 h-96rpx px-40rpx>
        <view wp-50>
          产品名称1
        </view>
        <view wp-20 theme-red>
          ¥499
        </view>
        <view wp-30 flex flex-xr>
          <view v-if="form.val !== 1">
            <wd-input-number v-model="value" />
            <text pl-10px>
              次
            </text>
          </view>
          <view v-else>
            不限次
          </view>
        </view>
      </view>
      <wd-input
        v-if="form.val === 3"
        v-model="value"
        label="可使用次数"
        prop="value1"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请输入可使用次数' }]"
        @click="test"
      />
      <view h-10rpx />
    </wd-cell-group>

    <view h-24rpx />
    <view bg-white p-40rpx>
      <view class="form-item-title required">
        <text>卡有效期</text>
      </view>
      <wd-radio-group v-model="value" checkedColor="#fa4350">
        <wd-radio value="1">
          永久有效
        </wd-radio>
        <wd-radio value="2">
          <view flex flex-ac f14 style="color:rgba(0, 0, 0, 0.85)">
            <text>购买后</text>
            <input
              v-model="model.expires"
              px-10rpx w-46px tc theme-red type="number" placeholder="请输入"
              placeholder-style="color:#b6bdbd;padding-top: 1px;"
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
      <GridTagSelect v-model="model.isShow" :sources="sources2" :columns="2" />
    </view>

    <view h-24rpx />
    <view bg-white px-40rpx py-24rpx @click="showDrawer = true">
      <view mb-20rpx class="form-item-title">
        <text>卡项说明</text>
      </view>
      <rich-text v-if="txt" :nodes="txt" />
      <wd-textarea
        v-else
        readonly
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请输入卡项说明"
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
          卡项说明
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
  </wd-form>
  <view mx-40rpx mt-64rpx color-white>
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
