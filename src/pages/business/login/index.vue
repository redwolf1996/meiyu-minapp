<route lang="yaml">
style:
  navigationBarTitleText: 登录-商家端
</route>

<script lang="ts" setup>
import api from '@/api/business'

const checked = ref(false)
const code = ref('')
function select(e: UniHelper.CheckboxGroupOnChangeEvent) {
  checked.value = !!e.detail.value.includes('cb')
}

function wxlogin() {
  wx.login({
    async success(res) {
      code.value = res.code
      if (res.code) {
        const { token, isRegister } = (await api.login({ code: res.code })).data
        const userStore = useUserStore()
        userStore.setUserInfo({ token, isRegister })
        if (isRegister) {
          uni.switchTab({ url: '/pages/business/dashboard/index' })
        }
        else {
          uni.navigateTo({ url: '/pages/business/login/role-select' })
        }
      }
      else {
        uni.showToast({
          title: '登录失败',
          icon: 'error',
          mask: true,
        })
      }
    },
  })
}
</script>

<template>
  <view h-screen w-screen tc pr>
    <view pt-100rpx font-size-36rpx font-bold>
      欢迎来到美预预约
    </view>
    <view mt-80rpx>
      <wd-img
        :width="72"
        :height="72"
        :src="`${IMG_BASE}/logo.png`"
      />
    </view>
    <view mt-80rpx>
      走近千家万户，共享轻松生活
    </view>
    <view mx-60rpx mt-112rpx color-white>
      <wd-button :disabled="!checked" size="large" :block="true" @click="wxlogin">
        <view flex flex-cc>
          <text i-tdesign-logo-wechat fs-36 />
          <text>&nbsp;微信一键登录</text>
        </view>
      </wd-button>
      <!-- <text c-#333333 :selectable="true" :user-select="true">
        code：{{ code }}
      </text> -->
    </view>
    <view mt120rpx>
      切换为用户端登录
    </view>
    <view bottom-160rpx w-full color-gray-6 pf>
      <view flex flex-cc>
        <checkbox-group @change="select">
          <checkbox
            value="cb"
            :checked="checked"
          />
        </checkbox-group>
        <text>登录代表同意</text>
        <text theme-color>
          《服务协议》
        </text>
        <text>及</text>
        <text theme-color>
          《隐私协议》
        </text>
      </view>
      <view pt-10rpx>
        登录前请阅读
      </view>
    </view>
  </view>
</template>
