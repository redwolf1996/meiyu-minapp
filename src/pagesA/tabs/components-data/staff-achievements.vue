<script setup lang="ts">
import type { Ranking } from './types'

const props = defineProps<{
  searchParams: {
    sDate: string
    eDate: string
  }
}>()

const tab = ref(0)
const tabs = [{
  label: '销售业绩',
}, {
  label: '服务业绩',
}]
function toDetail(orgStaffId: number) {
  uni.navigateTo({
    url: `/pagesA/tabs/components-data/staff-achievements-detail?orgStaffId=${orgStaffId}&sDate=${props.searchParams.sDate}&eDate=${props.searchParams.eDate}`,
  })
}

const staffList = ref<Ranking['saleRanking']>([
])

const info = ref<Ranking>({
  saleRanking: [],
  serviceRanking: [],
})
onMounted(() => {
  getManageData()
})

watch(props.searchParams, () => {
  getManageData()
})

async function getManageData() {
  const res = await request.get<Ranking>('/business/stat-staff-ranking', {
    storeId: storeId.value,
    ...props.searchParams,
  })
  info.value = res.data
  staffList.value = info.value.saleRanking
}

watch(props.searchParams, () => {
  getManageData()
})

function changeTab(index: number) {
  staffList.value = index === 0 ? info.value.saleRanking : info.value.serviceRanking
}
</script>

<template>
  <view class="h58px" />
  <view>
    <view bg-white px16px py10px>
      <view bg-white pl10px style="position: relative; padding-left: 10px;">
        <view style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); height: 66.7%; width: 3px; background-color: #931E5E;" />
        <text fb c-#931E5E>
          门店排行
        </text>
      </view>
      <view class="h20px" />
      <wd-tabs v-model="tab" slidable="always" @change="changeTab">
        <block v-for="item in tabs" :key="item.label">
          <wd-tab :title="item.label" />
        </block>
      </wd-tabs>
      <view class="h20px" />
      <view>
        <view
          v-for="(item, index) in staffList" :key="item.orgStaffId" flex flex-ac flex-bt style="border-bottom: 1px solid #F0F1F4;"
          py10px
          @click="toDetail(item.orgStaffId)"
        >
          <view flex flex-ac gap16px>
            <text v-if="index > 2" fb dib w16px h16px tc lh-16px>
              {{ index + 1 }}
            </text>
            <wd-img
              v-else
              :width="16"
              :height="16"
              mode="aspectFill"
              :src="`${IMG_BASE}/icon-rank-${index + 1}.png`"
            />
            <wd-img
              :width="48"
              :height="48"
              mode="aspectFill"
              :src="`${IMG_BASE}/data-icon.png`"
            />
            <text>
              {{ item.orgStaffName || '--' }}
            </text>
          </view>
          <view flex flex-ac gap10px>
            <text>¥{{ item.income }}</text>
            <wd-icon name="arrow-right" size="22px" color="#8D9092" />
          </view>
        </view>
        <view v-if="staffList.length === 0" class="empty-data">
          <wd-status-tip image="content" tip="暂无内容" />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.ct {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
}

.item {
  width: calc(50% - 10px);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #f0f1f4;
  height: 86px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pop-content {
  /* 必填 开始 */
  position: relative;
  z-index: 500;
  border-radius: 4px;
  /* 必填 结束 */
  background: #fff;
  padding: 10px;
  width: 70vw;
  text-align: left;
  border: 1px solid #ebeef1;
}
</style>
