<route lang="yaml">
style:
  navigationBarTitleText: 登录-商家端
</route>

<script lang="ts" setup>
const checked = ref(false)
const code = ref('')
function select(e: UniHelper.CheckboxGroupOnChangeEvent) {
  checked.value = !!e.detail.value.includes('cb')
}

function login(p: { code: string }) {
  return request.post<{ token: string, isRegister: 0 | 1 }>('/business/wx-login', p)
}

function wxlogin() {
  uni.login({
    provider: 'weixin',
    async success(res) {
      code.value = res.code
      if (res.code) {
        const { token, isRegister } = (await login({ code: res.code })).data
        useUserStore().setUserInfo({ token, isRegister })
        if (isRegister) {
          uni.reLaunch({ url: '/pagesA/tabs/tab-business-dashboard' })
        }
        else {
          // 跳转到商家完善信息页面（商家端和客户端已经分开）
          uni.navigateTo({ url: '/pagesA/login/info?role=business' })
          // uni.navigateTo({ url: '/pagesA/login/role-select' })
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

// 1:服务协议 2:隐私政策
function toProtocol(type: 1 | 2) {
  uni.navigateTo({ url: `/pagesA/protocol?type=${type}` })
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
        <text theme-color @click="toProtocol(1)">
          《用户协议》
        </text>
        <text>及</text>
        <text theme-color @click="toProtocol(2)">
          《隐私政策》
        </text>
      </view>
      <view pt-10rpx>
        登录前请阅读
      </view>
    </view>
  </view>
</template>
