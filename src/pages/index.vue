<script lang="ts" setup>
import api from '@/apis/index'

function doRequest() {
  api.getStudioList({ id: 100, name: 'syx' }).then((res) => {
    console.log(res)
  })
}
function toDashboard() {
  uni.navigateTo({ url: '/pages/dashboard/index' })
}
function setStore() {
  const s = useUserStore()
  s.setUserInfo({
    name: 'syx',
    token: Math.random(),
  })
}
function toPagesA() {
  uni.navigateTo({ url: '/pagesA/index' })
}
function toPagesB() {
  uni.navigateTo({ url: '/pagesB/index' })
}
</script>

<template>
  <view>
    <wd-button @click="toDashboard">
      跳转到工作台
    </wd-button>
    <wd-button @click="doRequest">
      请求数据
    </wd-button>
    <wd-button @click="setStore">
      设置store
    </wd-button>
    <wd-button @click="toPagesA">
      去分包A首页
    </wd-button>
    <wd-button @click="toPagesB">
      去分包B首页
    </wd-button>
  </view>
</template>

<route lang="yaml">
style:
  navigationBarTitleText: "首页"
</route>
