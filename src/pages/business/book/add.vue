<route lang="yaml">
style:
  navigationBarTitleText: 添加预约
</route>

<script lang="ts" setup>
const form = ref()
const value = ref()
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
const visibleStaff = ref(true)

function toSelectStaff() {
  visibleStaff.value = true
}
</script>

<template>
  <wd-popup
    v-model="visibleStaff" :z-index="999" lock-scroll :safe-area-inset-bottom="true" position="right"
    custom-style="height: 100vh;width: 80%;background: #F9F9F9;"
  >
    <view tc mt20px>
      选择手艺人
    </view>
    <view mt10px>
      <view flex flex-ac flex-bt bg-white px40rpx py20rpx style="border-bottom: 1px solid #DFDFDF">
        <view>
          <view f14 c-#313131>
            轻言轻语
          </view>
          <view f12 c-#777777 mt6px>
            13299999999
          </view>
        </view>
        <wd-img
          :width="26"
          :height="19"
          :src="`${IMG_BASE}/icon-correct.png`"
        />
      </view>
      <view flex flex-ac flex-bt bg-white px40rpx py20rpx style="border-bottom: 1px solid #DFDFDF">
        <view>
          <view f14 c-#313131>
            轻言轻语
          </view>
          <view f12 c-#777777 mt6px>
            13299999999
          </view>
        </view>
        <wd-img
          :width="26"
          :height="19"
          :src="`${IMG_BASE}/icon-correct.png`"
        />
      </view>
    </view>

    <view mx-40rpx mt-48rpx color-white pf bottom-40rpx>
      <wd-button size="large" custom-class="theme-bg" block>
        <view flex flex-cc>
          <text>确定</text>
        </view>
      </wd-button>
    </view>
  </wd-popup>
  <wd-form ref="form" :model="model">
    <wd-cell-group :border="true">
      <wd-input
        v-model="model.value1"
        label="联系电话"
        prop="value1"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写联系电话' }]"
      />
      <wd-input
        v-model="model.value1"
        label="联系人"
        prop="value1"
        placeholder="请输入"
        suffix-icon="arrow-right"
        :rules="[{ required: true, message: '请填写联系人' }]"
      />
      <wd-picker v-model="value" :rules="[{ required: true, message: '请选择服务方式' }]" label="服务方式" align-right :columns="columns" />
      <wd-picker v-model="value" :rules="[{ required: true, message: '请选择服务时间' }]" label="服务时间" align-right :columns="columns" />
      <!-- <wd-picker v-model="value" :rules="[{ required: true, message: '请选择手艺人' }]" label="手艺人" align-right :columns="columns" /> -->
    </wd-cell-group>
    <MyCellGroup>
      <MyCell label="手艺人" required noBorder borderTop @click="toSelectStaff">
        <span f14 c-#B6BDBD pr4px>请选择手艺人</span>
      </MyCell>
    </MyCellGroup>
  </wd-form>
  <view>
    <view flex flex-ac flex-bt f12 px20px py12px>
      <view c-#3D3D3D>
        预约服务
      </view>
      <view c-#1A66FF>
        删除
      </view>
    </view>
    <MyCellGroup>
      <MyCell label="每天可服务时段" required noBorder>
        <span f14 c-#B6BDBD pr4px>请选择</span>
      </MyCell>
      <view f12 c-#848486 mb10px flex flex-ac flex-bt>
        <view>服务时长</view>
        <view>约40分钟</view>
      </view>
      <view f12 c-#848486 flex flex-ac flex-bt>
        <view>价格</view>
        <view>￥100.00</view>
      </view>
      <view h14px />
    </MyCellGroup>
  </view>
  <view>
    <view flex flex-ac flex-bt f12 px20px py12px>
      <view c-#3D3D3D>
        预约服务
      </view>
      <view c-#1A66FF>
        删除
      </view>
    </view>
    <MyCellGroup>
      <MyCell label="每天可服务时段" required noBorder>
        <span f14 c-#B6BDBD pr4px>请选择</span>
      </MyCell>
      <view f12 c-#848486 mb10px flex flex-ac flex-bt>
        <view>服务时长</view>
        <view>约40分钟</view>
      </view>
      <view f12 c-#848486 flex flex-ac flex-bt>
        <view>价格</view>
        <view>￥100.00</view>
      </view>
      <view h14px />
    </MyCellGroup>
    <view style="border-top: 1px solid #EBEEF1" bg-white f14 c-#1A66FF tc h40px lh-40px>
      +&nbsp;添加服务
    </view>
    <view px20px py12px>
      备注
    </view>
    <view bg-white px-40rpx py-24rpx>
      <wd-textarea
        v-model="value"
        placeholderStyle="font-size: 14px;color:#C9CDD4;"
        placeholder="请输入预约备注" :maxlength="200" auto-height clearable show-word-limit
      />
    </view>
  </view>
</template>

<style lang='scss' scoped></style>
