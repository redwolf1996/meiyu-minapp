<route lang="yaml">
style:
  navigationBarTitleText: 选择服务和产品
</route>

<script lang="ts" setup>
import type { AllItems, CatsItemsTree, ProductList, ServiceList } from './types'
import { flatten } from 'lodash-es'

const tab = ref<number>(0)
const active1 = ref<number>(0)
const active2 = ref<number>(0)
const scrollTop = ref<number>(0)
const categoriesServ = ref<CatsItemsTree<ServiceList>[]>([])
const categoriesProd = ref<CatsItemsTree<ProductList>[]>([])
const tmpCheckedServs = ref<ServiceList[]>([])
const tmpCheckedProds = ref<ProductList[]>([])
const checkedCount = computed(() => {
  return tmpCheckedServs.value.length + tmpCheckedProds.value.length
})

onShow(async () => {
  const res = await request.get<AllItems>('/business/goods_all', { storeId: storeId.value })
  const serviceCats = res.data.serviceCategory!
  const services = res.data.serviceList
  const productCats = res.data.productCategory!
  const products = res.data.productList

  const disabledIds = cusOriCardEquity.value.map(v => v.goodsId)
  const checkedIds = [
    ...checkedServs.value?.map(v1 => v1.id),
    ...checkedProds.value?.map(v1 => v1.id),
    ...disabledIds,
  ]

  categoriesServ.value = serviceCats.map((v) => {
    return {
      id: v.id,
      label: v.name,
      items: services.filter(v1 => v.id === v1.categoryId).map((v2) => {
        return {
          ...v2,
          checked: checkedIds.includes(v2.id),
          disabled: disabledIds.includes(v2.id),
        }
      }),
    }
  })
  // categoriesServ.value.unshift({
  //   id: 0,
  //   label: '全部',
  //   items: services.map((v2) => {
  //     return {
  //       ...v2,
  //       checked: checkedIds.includes(v2.id),
  //       disabled: disabledIds.includes(v2.id),
  //     }
  //   }),
  // })
  categoriesProd.value = productCats.map((v) => {
    return {
      id: v.id,
      label: v.name,
      items: products.filter(v1 => v.id === v1.categoryId).map((v2) => {
        return {
          ...v2,
          checked: checkedIds.includes(v2.id),
          disabled: disabledIds.includes(v2.id),
        }
      }),
    }
  })
  // categoriesProd.value.unshift({
  //   id: 0,
  //   label: '全部',
  //   items: products.map((v2) => {
  //     return {
  //       ...v2,
  //       checked: checkedIds.includes(v2.id),
  //       disabled: disabledIds.includes(v2.id),
  //     }
  //   }),
  // })

  changeCheck()
})

function handleChange1({ value }) {
  active1.value = value
  scrollTop.value = -1
  nextTick(() => {
    scrollTop.value = 0
  })
}

function handleChange2({ value }) {
  active2.value = value
  scrollTop.value = -1
  nextTick(() => {
    scrollTop.value = 0
  })
}

function changeCheck() {
  let servs = []
  let prods = []
  servs = categoriesServ.value.filter((v) => {
    return v.items.length > 0 && v.id !== 0
  }).map(v1 => toRaw(v1.items))
  prods = categoriesProd.value.filter((v) => {
    return v.items.length > 0 && v.id !== 0
  }).map(v1 => toRaw(v1.items))
  servs = flatten(toRaw(servs))
  prods = flatten(toRaw(prods))

  tmpCheckedServs.value = servs.filter(v => v.checked)
  tmpCheckedProds.value = prods.filter(v => v.checked)
}

function confirm() {
  checkedServs.value = tmpCheckedServs.value.map((v) => {
    return {
      ...v,
      prodType: 2,
    }
  })
  checkedProds.value = tmpCheckedProds.value.map((v) => {
    return {
      ...v,
      prodType: 1,
    }
  })
  uni.navigateBack()
}
</script>

<template>
  <wd-tabs v-model="tab" :lineHeight="2" :lineWidth="24" color="#1A66FF">
    <wd-tab title="服务">
      <view class="wrapper">
        <wd-sidebar v-model="active1" @change="handleChange1">
          <wd-sidebar-item
            v-for="(item, index) in categoriesServ"
            :key="index"
            :value="index"
            :label="item.label"
          />
        </wd-sidebar>
        <view class="content" :style="`transform: translateY(-${active1 * 100}%)`">
          <scroll-view
            v-for="(item, index) in categoriesServ"
            :key="`cat-${index}`"
            class="category"
            scroll-y
            scroll-with-animation
            :show-scrollbar="true"
            :scroll-top="scrollTop"
            :throttle="false"
          >
            <view p12px>
              <view v-for="(itm, idx) in item.items" :key="`itm-${idx}`" flex flex-ac flex-bt pb14px mb14px style="border-bottom: 1px solid #EBEEF1">
                <view flex gap12px>
                  <wd-img
                    :width="72"
                    :height="72"
                    mode="center"
                    :src="`${IMG_BASE}/cat.png`"
                  />
                  <view>
                    <view f14>
                      {{ itm.name }}
                    </view>
                    <view f12 c-#FF1919 mt6px>
                      ￥{{ itm.price2 }}
                    </view>
                    <view f10 c-#D4D4D4 mt6px>
                      <text line-through>
                        ￥{{ itm.price }}
                      </text>
                    </view>
                  </view>
                </view>
                <view flex flex-cc>
                  <wd-checkbox v-model="itm.checked" :disabled="itm.disabled" size="large" @change="changeCheck()" />
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </wd-tab>
    <wd-tab title="产品">
      <view class="wrapper">
        <wd-sidebar v-model="active2" @change="handleChange2">
          <wd-sidebar-item
            v-for="(item, index) in categoriesProd"
            :key="index"
            :value="index"
            :label="item.label"
          />
        </wd-sidebar>
        <view class="content" :style="`transform: translateY(-${active2 * 100}%)`">
          <scroll-view
            v-for="(item, index) in categoriesProd"
            :key="`cat-${index}`"
            class="category"
            scroll-y
            scroll-with-animation
            :show-scrollbar="true"
            :scroll-top="scrollTop"
            :throttle="false"
          >
            <view p12px>
              <view v-for="(itm, idx) in item.items" :key="`itm-${idx}`" flex flex-ac flex-bt pb14px mb14px style="border-bottom: 1px solid #EBEEF1">
                <view flex gap12px>
                  <wd-img
                    :width="72"
                    :height="72"
                    mode="center"
                    :src="`${IMG_BASE}/cat.png`"
                  />
                  <view>
                    <view f14>
                      {{ itm.name }}
                    </view>
                    <view f12 c-#FF1919 mt6px>
                      ￥{{ itm.price2 }}
                    </view>
                    <view f10 c-#D4D4D4 mt6px>
                      <text line-through>
                        ￥{{ itm.price }}
                      </text>
                    </view>
                  </view>
                </view>
                <view flex flex-cc>
                  <wd-checkbox v-model="itm.checked" :disabled="itm.disabled" size="large" @change="changeCheck()" />
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </wd-tab>
  </wd-tabs>

  <view class="footer">
    <view>
      <view>已选择 {{ checkedCount }} 项</view>
    </view>
    <view w120px>
      <wd-button size="large" custom-class="theme-bg" block @click="confirm()">
        <view flex flex-cc>
          <text>确定</text>
        </view>
      </wd-button>
    </view>
  </view>
</template>

<style>
page {
  height: 100vh;
  background: #fff;
  overflow-y: hidden;
}
</style>

<style lang='scss' scoped>
.wrapper {
  display: flex;
  height: calc(100vh - 90px);
  overflow: hidden;
}
.content {
  flex: 1;
  background: #fff;
  transition: transform 0.3s ease;
  height: 100%;
}
.category {
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  position: fixed;
  padding: 0 20px;
  width: 100%;
  bottom: 0;
  background-color: #fff;
}
.this-tab {
  padding: 0 100rpx;
}
</style>
