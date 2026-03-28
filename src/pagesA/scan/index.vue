<route lang="yaml">
style:
  navigationBarTitleText: 扫码核销
  navigationStyle: custom
</route>

<script lang="ts" setup>
import { getMenuButtonInfo } from '@/utils/index'

const toast = useToast()
const verifyCode = ref('') // 核销码
const menuButtonWidth = ref(0)
const menuButtonHeight = ref(0)
const menuButtonTop = ref(0)
const isScanning = ref(false) // 防抖标记

onLoad(() => {
  const menuButtonInfo = getMenuButtonInfo()
  menuButtonWidth.value = menuButtonInfo?.barWidth
  menuButtonHeight.value = menuButtonInfo?.barHeight
  menuButtonTop.value = menuButtonInfo?.barTop
})

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 扫码成功回调
function onScanSuccess(e: any) {
  // 防抖：正在处理中则忽略
  if (isScanning.value)
    return

  console.log('扫码事件触发：', e)
  const result = e.detail?.result || e.detail?.scanResult
  if (result) {
    isScanning.value = true
    console.log('扫描结果：', result)
    handleScanResult(result)
    // 3秒后重置防抖标记
    setTimeout(() => {
      isScanning.value = false
    }, 3000)
  }
  else {
    console.log('未获取到扫描结果，detail:', e.detail)
  }
}

// 扫码错误回调
function onScanError(e: any) {
  console.log('扫码错误：', e)
  toast.error(`扫码出错: ${e.detail?.errMsg || '未知错误'}`)
}

// 处理扫描结果
function handleScanResult(result: string) {
  // 测试阶段：使用弹窗显示扫描结果
  uni.showModal({
    title: '扫码成功',
    content: `扫描结果: ${result}`,
    showCancel: false,
    confirmText: '确定',
    success: () => {
      console.log('用户点击确定')
    },
  })
}

// 手动输入核销码
function onVerify() {
  if (!verifyCode.value.trim()) {
    toast.warning('请输入核销码')
    return
  }
  handleScanResult(verifyCode.value.trim())
}

// 开启手电筒
function toggleFlash() {
  // 微信小程序 camera 组件暂不支持直接控制闪光灯
  // 可以通过提示用户使用系统手电筒
  toast.info('请使用系统手电筒')
}
</script>

<template>
  <view class="scan-container">
    <wd-toast />
    <!-- 自定义导航栏 -->
    <view class="custom-navbar" :style="{ paddingTop: `${menuButtonTop}px`, height: `${menuButtonHeight}px` }">
      <view class="navbar-content" :style="{ width: `calc(100% - ${menuButtonWidth}px)` }">
        <view class="back-btn" @click="goBack">
          <wd-icon name="fill-arrow-left" size="24px" color="#fff" />
        </view>
        <view class="navbar-title-wrapper">
          <text class="navbar-title">
            扫码核销
          </text>
        </view>
      </view>
    </view>

    <!-- 扫码区域 -->
    <view class="scan-wrapper">
      <camera
        mode="scanCode"
        device-position="back"
        flash="off"
        class="camera"
        resolution="high"
        @scancode="onScanSuccess"
        @error="onScanError"
      />

      <!-- 扫描框遮罩层 -->
      <view class="scan-overlay">
        <!-- 顶部遮罩 -->
        <view class="mask-top" />

        <!-- 中间区域 -->
        <view class="mask-center">
          <!-- 左侧遮罩 -->
          <view class="mask-left" />

          <!-- 扫描框 -->
          <view class="scan-frame">
            <!-- 四角边框 -->
            <view class="corner corner-tl" />
            <view class="corner corner-tr" />
            <view class="corner corner-bl" />
            <view class="corner corner-br" />

            <!-- 扫描线 -->
            <view class="scan-line" />

            <!-- 扫描动画 -->
            <view class="scan-animation" />
          </view>

          <!-- 右侧遮罩 -->
          <view class="mask-right" />
        </view>

        <!-- 底部遮罩 -->
        <view class="mask-bottom" />
      </view>

      <!-- 提示文字 -->
      <view class="scan-tip">
        <text>将二维码放入框内，自动识别</text>
      </view>

      <!-- 手电筒按钮 -->
      <view class="flash-btn" @click="toggleFlash">
        <wd-icon name="flashlight" size="24px" color="#fff" />
        <text>手电筒</text>
      </view>
    </view>

    <!-- 底部输入区域 -->
    <view class="bottom-section">
      <view class="input-area">
        <view class="input-wrapper">
          <wd-input
            v-model="verifyCode"
            placeholder="填写核销码"
            :border="false"
            clearable
            custom-class="verify-input"
          />
        </view>
        <wd-button type="primary" custom-class="verify-btn" @click="onVerify">
          核销
        </wd-button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.scan-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
}

// 自定义导航栏
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  background: transparent;

  .navbar-content {
    display: flex;
    align-items: center;
    padding: 0 16rpx;
    position: relative;
  }

  .back-btn {
    width: 64rpx;
    height: 64rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .navbar-title-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .navbar-title {
    color: #fff;
    font-size: 34rpx;
    font-weight: 500;
    line-height: 1;
  }
}

// 扫码区域
.scan-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 160rpx;
  margin-bottom: 40rpx;
  margin-left: 40rpx;
  margin-right: 40rpx;

  .camera {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 24rpx;
    overflow: hidden;
  }
}

// 遮罩层
.scan-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  border-radius: 24rpx;
  overflow: hidden;

  .mask-top,
  .mask-bottom {
    flex: 1;
    background: rgba(0, 0, 0, 0.5);
  }

  .mask-center {
    display: flex;
    height: 500rpx;

    .mask-left,
    .mask-right {
      flex: 1;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}

// 扫描框
.scan-frame {
  width: 500rpx;
  height: 500rpx;
  position: relative;
  background: transparent;

  // 四角
  .corner {
    position: absolute;
    width: 60rpx;
    height: 60rpx;
    border: 6rpx solid #fff;

    &.corner-tl {
      top: 0;
      left: 0;
      border-right: none;
      border-bottom: none;
      border-radius: 16rpx 0 0 0;
    }

    &.corner-tr {
      top: 0;
      right: 0;
      border-left: none;
      border-bottom: none;
      border-radius: 0 16rpx 0 0;
    }

    &.corner-bl {
      bottom: 0;
      left: 0;
      border-right: none;
      border-top: none;
      border-radius: 0 0 0 16rpx;
    }

    &.corner-br {
      bottom: 0;
      right: 0;
      border-left: none;
      border-top: none;
      border-radius: 0 0 16rpx 0;
    }
  }

  // 扫描线
  .scan-line {
    position: absolute;
    top: 50%;
    left: 20rpx;
    right: 20rpx;
    height: 4rpx;
    background: #fff;
    transform: translateY(-50%);
    border-radius: 2rpx;
  }

  // 扫描动画
  .scan-animation {
    position: absolute;
    top: 10rpx;
    left: 20rpx;
    right: 20rpx;
    height: 4rpx;
    background: linear-gradient(90deg, transparent, #00ff00, transparent);
    border-radius: 2rpx;
    animation: scan 2s linear infinite;
  }
}

@keyframes scan {
  0% {
    top: 10rpx;
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 480rpx;
    opacity: 0.3;
  }
}

// 提示文字
.scan-tip {
  position: absolute;
  bottom: 120rpx;
  left: 0;
  right: 0;
  text-align: center;

  text {
    color: #fff;
    font-size: 28rpx;
    text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
  }
}

// 手电筒按钮
.flash-btn {
  position: absolute;
  bottom: 200rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;

  text {
    color: #fff;
    font-size: 24rpx;
  }
}

// 底部区域
.bottom-section {
  padding: 40rpx;
  padding-bottom: calc(40rpx + env(safe-area-inset-bottom));

  .input-area {
    display: flex;
    align-items: center;
    gap: 20rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 20rpx;

    .input-wrapper {
      flex: 1;
    }

    :deep(.verify-input) {
      background: #f5f5f5;
      border-radius: 8rpx;
      padding-left: 15px;
      .wd-input__inner {
        height: 80rpx;
      }
    }

    :deep(.verify-btn) {
      width: 140rpx;
      height: 80rpx;
      border-radius: 8rpx;
      font-size: 28rpx;
    }
  }
}
</style>
