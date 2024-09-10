<route lang="yaml">
style:
  navigationBarTitleText: 客户
  navigationBarBackgroundColor: "#ffffff"
</route>

<script lang="ts" setup>
import type { CusList, CusModel, CusReqModel } from './types'

const filter = ref()
const value1 = ref(0)
const option1 = [
  { label: '全部', value: 0 },
  { label: '会员', value: 1 },
  { label: '非会员', value: 2 },
]
const sources: any = [
  { label: '当天生日', value: 1, isActive: true },
  { label: '当月生日', value: 2, isActive: false },
]
const sources2: any = [
  { label: '今天', value: 1, isActive: true },
  { label: '昨天', value: 2, isActive: false },
  { label: '本周', value: 3, isActive: true },
  { label: '本月', value: 4, isActive: false },
  { label: '上月', value: 5, isActive: true },
]
const sources3: any = [
  { label: '折扣卡', value: 1, isActive: true },
  { label: '充值卡', value: 2, isActive: false },
  { label: '通卡', value: 3, isActive: true },
  { label: '有限次卡', value: 4, isActive: false },
  { label: '不限次卡', value: 5, isActive: true },
]
const show = ref(false)
const show2 = ref(false)
const reqParams = reactive<CusReqModel>({
  storeId,
  pageSize: 1,
  pageNum: 5,
  keyword: '',
  phone: '',
  birthdayS: '',
  birthdayE: '',
  cDateS: '',
  cDateE: '',
  cardAll: 1,
  cardIds: '',
  cardCIds: '',
})
const list = ref<CusList[]>([])

onShow(() => {
  getList()
})

async function getList() {
  const res = await request.get<CusModel>('/business/store-customer', reqParams)
  list.value = res.data.list
}

function toAddCustomer() {
  uni.navigateTo({ url: '/pagesA/customer/add' })
}
function handleChange1() {}
</script>

<template>
  <view py-12rpx px-32rpx>
    <view flex flex-bt flex-ac gap-32rpx>
      <view flex-1 pr>
        <input placeholder="搜索姓名/手机号" placeholder-class="cus-input" px-40px bg-F2F3F5 h-36px lh-36px rd-4px type="text">
        <uni-icons style="transform: translateY(-50%);top: 50%;" pa left-24rpx type="search" color="#86909C" size="24" />
        <uni-icons style="transform: translateY(-50%);top: 50%;" pa right-24rpx type="clear" color="#86909C" size="24" />
      </view>
      <view rd-2px w-28px h-28px lh-28px tc bg-F2F3F5 fs-32 fb @click="toAddCustomer()">
        +
      </view>
    </view>
    <wd-drop-menu>
      <wd-drop-menu-item v-model="value1" :options="option1" @change="handleChange1" />
      <wd-drop-menu-item ref="filter" title="筛选">
        <view p-24rpx bg-F9F9F9>
          <view bg-white rd-10px p-24rpx>
            <view f14 mb-16px>
              生日
            </view>
            <GridTagSelect v-model="value1" :sources="sources" />
            <view flex flex-ac gap-32rpx mt-32rpx c-929292>
              <text>范围</text>
              <input placeholder-class="cus-input" w-150rpx px-10px bg-F2F3F5 h-32px lh-32px type="text">
              <text>至</text>
              <input placeholder-class="cus-input" w-150rpx px-10px bg-F2F3F5 h-32px lh-32px type="text">
            </view>
            <view flex flex-ac gap-32rpx mt-32rpx c-929292>
              <text>最近</text>
              <input placeholder-class="cus-input" w-150rpx px-10px bg-F2F3F5 h-32px lh-32px type="text">
              <text>天过生日</text>
            </view>
          </view>

          <view bg-white rd-10px p-24rpx mt-24rpx>
            <view f14 mb-16px>
              成为客户时间
            </view>
            <GridTagSelect v-model="value1" :sources="sources2" :columns="3" />
            <view flex flex-ac gap-32rpx mt-32rpx c-929292>
              <text>范围</text>
              <input placeholder-class="cus-input" w-150rpx px-10px bg-F2F3F5 h-32px lh-32px type="text">
              <text>至</text>
              <input placeholder-class="cus-input" w-150rpx px-10px bg-F2F3F5 h-32px lh-32px type="text">
            </view>
          </view>

          <view bg-white rd-10px p-24rpx mt-24rpx>
            <view f14 mb-32rpx>
              持有卡项
            </view>
            <radio-group mb12rpx flex gap-20rpx transform-translate-x--5px>
              <label f12><radio style="transform:scale(0.7)" value="1" color="#1a66ff" :checked="true" />任意卡项</label>
              <label f12><radio style="transform:scale(0.7)" value="2" color="#1a66ff" />指定卡项</label>
              <label f12><radio style="transform:scale(0.7)" value="3" color="#1a66ff" />指定类型卡</label>
            </radio-group>
            <MyCell label="请选择" noBorder @click="show2 = true">
              <span f14 c-3B3D3D>09:00-21:00</span>
            </MyCell>
            <view flex flex-wrap gap-20rpx>
              <view class="tag">
                充值卡
              </view>
              <view class="tag">
                折扣卡
              </view>
            </view>
          </view>

          <wd-action-sheet v-model="show" title="选择卡类型" @close="show = false">
            <view p-40rpx>
              <GridTagSelect v-model="value1" :sources="sources3" :columns="3" />
              <button class="my-btn theme" wp100 mt-30px>
                确定
              </button>
            </view>
          </wd-action-sheet>

          <wd-action-sheet v-model="show2" title="选择卡项" @close="show = false">
            <view p-40rpx>
              <view class="my-item">
                <wd-img
                  :width="86"
                  :height="75"
                  :src="`${IMG_BASE}/img-cika.png`"
                />
                <view flex flex-y flex-bt gap-12rpx flex-1>
                  <view flex flex-ac>
                    <wd-img
                      :width="16"
                      :height="16"
                      :src="`${IMG_BASE}/icon-star2.png`"
                    />
                    <text f12 pl-10rpx>
                      30次
                    </text>
                  </view>
                  <view flex flex-ac flex-bt>
                    <text f16 fb>
                      7980面部精雕30次
                    </text>
                    <radio style="transform:scale(0.7)" value="3" color="#1a66ff" />
                  </view>
                  <view f12 c-9A9FA5>
                    永久有效
                  </view>
                </view>
              </view>
              <view class="my-item">
                <wd-img
                  :width="86"
                  :height="75"
                  :src="`${IMG_BASE}/img-cika.png`"
                />
                <view flex flex-y flex-bt gap-12rpx flex-1>
                  <view flex flex-ac>
                    <wd-img
                      :width="16"
                      :height="16"
                      :src="`${IMG_BASE}/icon-star2.png`"
                    />
                    <text f12 pl-10rpx>
                      30次
                    </text>
                  </view>
                  <view flex flex-ac flex-bt>
                    <text f16 fb>
                      7980面部精雕30次
                    </text>
                    <radio style="transform:scale(0.7)" value="3" color="#1a66ff" />
                  </view>
                  <view f12 c-9A9FA5>
                    永久有效
                  </view>
                </view>
              </view>
              <button class="my-btn theme" wp100 mt-30px>
                确定
              </button>
            </view>
          </wd-action-sheet>

          <view flex tc flex-cc mt-24rpx px-112rpx gap-40px>
            <button class="my-btn normal" w-220rpx>
              重置
            </button>
            <button class="my-btn theme" w-350rpx>
              查看50个用户
            </button>
          </view>
        </view>
      </wd-drop-menu-item>
    </wd-drop-menu>
    <view py-8rpx>
      <view px-40rpx py-26rpx bg-white rd-16rpx>
        <view flex flex-ac gap-32rpx>
          <wd-img
            :round="true"
            :width="48"
            :height="48"
            :src="`${IMG_BASE}/cat.png`"
          />
          <view>
            <view flex flex-ac gap-4rpx>
              <text f16>
                Jane Cooper
              </text>
              <wd-img
                :round="true"
                :width="18"
                :height="18"
                :src="`${IMG_BASE}/icon-v1.png`"
              />
            </view>
            <view c-929292 f12 mt-10px>
              138****6578
            </view>
          </view>
        </view>
        <view grid grid-cols-2 f12 mt-10px>
          <view>
            <text c-929292>
              余额：
            </text>
            <text c-00BB00>
              1200.00
            </text>
          </view>
          <view>
            <text c-929292>
              上次消费：
            </text>
            <text c-00BB00>
              2024.1.12
            </text>
          </view>
          <view>
            <text c-929292>
              手艺人：
            </text>
            <text c-00BB00>
              王诗晴
            </text>
          </view>
          <view>
            <text c-929292>
              营销顾问：
            </text>
            <text c-00BB00>
              张倩
            </text>
          </view>
        </view>
      </view>
      <view px-40rpx py-26rpx bg-F0F0F0 rd-16rpx>
        <view flex flex-ac gap-32rpx>
          <wd-img
            :round="true"
            :width="48"
            :height="48"
            :src="`${IMG_BASE}/cat.png`"
          />
          <view>
            <view flex flex-ac gap-4rpx>
              <text f16>
                Jane Cooper
              </text>
              <wd-img
                :round="true"
                :width="18"
                :height="18"
                :src="`${IMG_BASE}/icon-v1.png`"
              />
            </view>
            <view c-929292 f12 mt-10px>
              138****6578
            </view>
          </view>
        </view>
        <view grid grid-cols-2 f12 mt-10px>
          <view>
            <text c-929292>
              余额：
            </text>
            <text c-00BB00>
              1200.00
            </text>
          </view>
          <view>
            <text c-929292>
              上次消费：
            </text>
            <text c-00BB00>
              2024.1.12
            </text>
          </view>
          <view>
            <text c-929292>
              手艺人：
            </text>
            <text c-00BB00>
              王诗晴
            </text>
          </view>
          <view>
            <text c-929292>
              营销顾问：
            </text>
            <text c-00BB00>
              张倩
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
  <MyTabBar :tab-index="2" />
</template>

<style lang='scss' scoped>
.my-item {
  border-bottom: 1px solid #efefef;
  display: flex;
  gap: 40rpx;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24rpx;
  margin-bottom: 24rpx;
}
label {
  padding: 0 !important;
}
:deep(.wd-popup.wd-popup--top.wd-top-enter-to.wd-top-enter-active) {
  max-height: 95% !important;
}
:deep(.cus-input) {
  color: #c9cdd4;
  font-size: 14px;
}
.tag {
  color: #1a66ff;
  background-color: #eff2ff;
  padding: 5rpx 16rpx;
  height: 32rpx;
  line-height: 32rpx;
  text-align: center;
  border-radius: 16rpx;
  font-size: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92rpx;
}
</style>

  <style>
  page {
  background-color: #fff;
}
</style>
