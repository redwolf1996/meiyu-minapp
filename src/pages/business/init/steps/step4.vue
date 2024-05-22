<route lang="yaml">
style:
  navigationBarTitleText: 添加卡项
  navigationStyle: custom
</route>

<script lang="ts" setup>
import piaoyiEditor from '@/uni_modules/piaoyi-editor/components/piaoyi-editor/piaoyi-editor.vue'

const value = ref()
const fileList = ref<any[]>([
  { url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg' },
])
const formRef = ref(null)
const columns = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])
const showDrawer = ref(false)
const model = reactive<{
  value1: string
  value2: string
  value3: string
}>({
  value1: '',
  value2: '',
  value3: '',
})

const readOnly = ref(false)
const photoUrl = ref('http://test.com')
const api = ref('api')
const txt = ref('')
const name = ref('file')
const values = ref('')

function setContents(e) {
  txt.value = e.html
}

const form: any = reactive({
  val: '123',
  val1: 'sdsd',
})

const sources: any = [
  {
    label: '支持',
    value: 1,
    isActive: false,
  },
  {
    label: '不支持',
    value: 0,
    isActive: false,
  },
]

// function handleSubmit() {
//   form.value
//     .validate()
//     .then(({ valid }) => {
//       if (valid)
//         toast().success('校验通过')
//     })
//     .catch((error) => {
//       toast().error(error)
//     })
// }

function handleChange(e: any) {
  console.log(e)
}
function handleClose() {}
</script>

<template>
  <StepNav :step="4" />
  <view mt-10px tc fs-40>
    您可以尝试添加第一个产品
  </view>
  <view mt-8px tc>
    也可跳过稍后在【工作台-产品管理】中添加
  </view>

  <view h-24rpx />
  <wd-form ref="formRef" :model="model">
    <wd-cell-group :border="true">
      <wd-input
        v-model="model.value1"
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

  <view mx-40rpx mt-64rpx color-white>
    <wd-button size="large" custom-class="theme-bg" block>
      <view flex flex-cc>
        <text>保存</text>
      </view>
    </wd-button>
  </view>

  <view mx-40rpx color-white>
    <wd-button size="large" type="text" block>
      <view flex flex-cc color-333>
        <text>跳过</text>
      </view>
    </wd-button>
  </view>
  <view h-60rpx />
</template>

  <style lang='scss' scoped>
  // .richtext {
//   height: calc(100% - 50px);
// }
:deep(.ql-container) {
  box-sizing: border-box;
  padding: 0 10px 10px 10px;
  width: 100%;
  // min-height: 60vh;
  // height: 60vh;
  min-height: 20vh;
  height: 20vh;
  font-size: 13px;
  line-height: 1.5;
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
