import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  'name': 'yau',
  'appid': '__UNI__401176F',
  'description': '',
  'versionName': '3.0.5',
  'versionCode': '200',
  'transformPx': false,
  'h5': {
    router: {
      base: '/myh5/',
    },
  },
  'mp-weixin': {
    appid: 'wx208ed5b60f57b9bc',
    setting: { urlCheck: false },
    usingComponents: true,
    optimization: {
      subPackages: true,
    },
    permission: {
      'scope.camera': {
        desc: '需要使用您的摄像头进行扫码',
      },
    },
  },
  'uniStatistics': {
    enable: false,
  },
  'vueVersion': '3',
})
