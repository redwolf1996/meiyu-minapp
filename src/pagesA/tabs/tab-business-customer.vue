<route lang="yaml">
style:
  navigationBarTitleText: 客户
  navigationBarBackgroundColor: "#ffffff"
  navigationStyle: "custom"
</route>

<script lang="ts" setup>
import type { CusList, CusModel, CusReqModel } from './types'
import dayjs from 'dayjs'
import MyTabBar from './MyTabBar.vue'

const filter = ref()
const optionsVip = [
  { label: '全部', value: null },
  { label: '会员', value: 2 },
  { label: '非会员', value: 1 },
]
const birthday = ref<any>(null)
const sources = ref<any>([
  { label: '当天生日', value: 1, isActive: false },
  { label: '当月生日', value: 2, isActive: false },
])
// const sources2: any = [
//   { label: '今天', value: 1, isActive: true },
//   { label: '昨天', value: 2, isActive: false },
//   { label: '本周', value: 3, isActive: true },
//   { label: '本月', value: 4, isActive: false },
//   { label: '上月', value: 5, isActive: true },
// ]
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
  storeId: storeId.value,
  pageNum: 1,
  pageSize: 5,
  keyword: '',
  phone: '',
  birthdayS: '',
  birthdayE: '',
  cDateS: '',
  cDateE: '',
  cardAll: '',
  cardIds: '',
  cardCIds: '',
  level: null,
})
const paging = ref<ZPagingInstance<CusList> | null>(null)
const dataList = ref<CusList[]>([])

async function queryList(page: number, pageSize: number) {
  reqParams.pageNum = page
  reqParams.pageSize = pageSize
  const res = await request.get<CusModel>('/business/store-customer', reqParams)
  paging.value.complete(res.data.list)
}

function toAddCustomer() {
  uni.navigateTo({ url: '/pagesA/customer/add' })
}

function search({ value }) {
  reqParams.keyword = value
  paging.value?.reload()
}
function clear() {
  reqParams.keyword = ''
  paging.value?.reload()
}
function handleChangeVip() { // 会员 非会员筛选
  paging.value?.reload()
}
function toDetail(item: CusList) {
  uni.navigateTo({ url: `/pagesA/customer/detail?id=${item.storeCustomerId}` })
}

function resetSearch() {
  birthday.value = null
}

function confirmBirthday() { // 搜索当天生日和当月生日
  if (birthday.value === null) {
    reqParams.birthdayS = null
    reqParams.birthdayE = null
  }
  if (birthday.value === 1) { // 1当天生日 2当月生日
    reqParams.birthdayS = dayjs().format('YYYY-MM-DD')
    reqParams.birthdayE = dayjs().format('YYYY-MM-DD')
  }
  if (birthday.value === 2) {
    reqParams.birthdayS = dayjs().startOf('month').format('YYYY-MM-DD')
    reqParams.birthdayE = dayjs().endOf('month').format('YYYY-MM-DD')
  }
  filter.value.close()
  paging.value?.reload()
}

onShow(() => {
  paging.value?.reload()
})
</script>

<template>
  <z-paging
    ref="paging"
    v-model="dataList"
    back-to-top-bottom="200rpx"
    lower-threshold="5" auto-show-back-to-top :default-page-size="10"
    @query="queryList"
  >
    <template #top>
      <MyNavBar title="客户列表" :capsule="false" />
      <view py-12rpx px-32rpx>
        <view flex flex-bt flex-ac gap-32rpx>
          <view flex-1 pr>
            <wd-search placeholder-left hide-cancel placeholder="搜索姓名/手机号" @clear="clear" @search="search" />
          </view>
          <view rd-2px w-28px h-28px lh-28px tc bg-F2F3F5 fs-32 fb @click="toAddCustomer()">
            +
          </view>
        </view>

        <wd-drop-menu>
          <wd-drop-menu-item v-model="reqParams.level" :options="optionsVip" @change="handleChangeVip" />
          <wd-drop-menu-item ref="filter" title="筛选">
            <view p-24rpx bg-F9F9F9>
              <view bg-white rd-10px p-24rpx>
                <view f14 mb-16px>
                  生日
                </view>
                <GridTagSelect v-model="birthday" :sources="sources" />
                <!-- <view flex flex-ac gap-32rpx mt-32rpx c-929292>
              <text>范围</text>
              <input placeholder-class="cus-input" w-150rpx px-10px bg-F2F3F5 h-32px lh-32px type="text">
              <text>至</text>
              <input placeholder-class="cus-input" w-150rpx px-10px bg-F2F3F5 h-32px lh-32px type="text">
            </view>
            <view flex flex-ac gap-32rpx mt-32rpx c-929292>
              <text>最近</text>
              <input placeholder-class="cus-input" w-150rpx px-10px bg-F2F3F5 h-32px lh-32px type="text">
              <text>天过生日</text>
            </view> -->
              </view>

              <!-- <view bg-white rd-10px p-24rpx mt-24rpx>
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
          </view> -->

              <!-- <view bg-white rd-10px p-24rpx mt-24rpx>
            <view f14 mb-32rpx>
              持有卡项
            </view>
            <radio-group mb12rpx flex gap-20rpx transform-translate-x--5px>
              <label f12><radio style="transform:scale(0.7)" value="1" color="#1a66ff" :checked="true" />任意卡项</label>
              <label f12><radio style="transform:scale(0.7)" value="2" color="#1a66ff" />指定卡项</label>
              <label f12><radio style="transform:scale(0.7)" value="3" color="#1a66ff" />指定类型卡</label>
            </radio-group>
            <MyCell label="请选择" noBorder @click="show2 = true">
              <text f14 c-3B3D3D>09:00-21:00</text>
            </MyCell>
            <view flex flex-wrap gap-20rpx>
              <view class="tag">
                充值卡
              </view>
              <view class="tag">
                折扣卡
              </view>
            </view>
          </view> -->

              <!-- TODO 查询过于复杂先不做 -->
              <wd-action-sheet v-model="show" title="选择卡类型" @close="show = false">
                <view p-40rpx>
                  <GridTagSelect :sources="sources3" :columns="3" />
                  <button class="theme my-btn" wp100 mt-30px>
                    确定
                  </button>
                </view>
              </wd-action-sheet>

              <!-- TODO 查询过于复杂先不做 -->
              <wd-action-sheet v-model="show2" title="选择卡项" @close="show = false">
                <view p-40rpx>
                  <view class="my-item">
                    <wd-img
                      :width="86"
                      :height="75"
                      mode="aspectFill"
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

              <view flex tc flex-cc mt-24rpx px-112rpx gap-20rpx>
                <button class="my-btn normal" w-220rpx @click="resetSearch()">
                  重置
                </button>
                <button class="my-btn theme" w-220rpx @click="confirmBirthday()">
                  <!-- 查看50个用户 -->
                  确定
                </button>
              </view>
            </view>
          </wd-drop-menu-item>
        </wd-drop-menu>
      </view>
    </template>
    <view py-12rpx px-32rpx>
      <view py-8rpx>
        <view v-for="(item, index) in dataList" :key="`cus-${index}`" :class="[(index % 2 === 0) ? 'bg-white' : 'bg-F0F0F0']" px-40rpx py-26rpx rd-16rpx @click="toDetail(item)">
          <view flex flex-ac gap-32rpx>
            <wd-img
              :round="true"
              :width="48"
              :height="48"
              mode="aspectFill"
              :src="DEFAULT_AVATAR"
            />
            <view>
              <view flex flex-ac gap-4rpx>
                <text f16>
                  {{ item.name }}
                </text>
                <wd-img
                  v-if="item.level === 2"
                  :round="true"
                  :width="18"
                  :height="18"
                  :src="`${IMG_BASE}/icon-v.png`"
                />
              </view>
              <view c-929292 f12 mt-10px>
                {{ item.phone }}
              </view>
            </view>
          </view>
          <view grid grid-cols-2 f12 mt-10px grid-gap-5px>
            <view>
              <text c-929292>
                余额：
              </text>
              <text c-00BB00>
                {{ item.amount ?? '--' }}
              </text>
            </view>
            <view>
              <text c-929292>
                上次消费：
              </text>
              <text c-00BB00>
                {{ item?.lastPayTime?.split(' ')?.[0] || '--' }}
              </text>
            </view>
            <view>
              <text c-929292>
                手艺人：
              </text>
              <text c-00BB00>
                {{ item?.artisanUserName || '未分配' }}
              </text>
            </view>
            <view>
              <text c-929292>
                营销顾问：
              </text>
              <text c-00BB00>
                {{ item?.adviserUserName || '未分配' }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <template #bottom>
      <MyTabBar :tab-index="2" />
    </template>
  </z-paging>
</template>

<style lang='scss' scoped>
:deep(.wd-search) {
  padding: 0 !important;
}
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
