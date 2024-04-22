import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  'name': 'yau',
  'appid': '__UNI__401176F',
  'description': '',
  'versionName': '1.0.0',
  'versionCode': '100',
  'transformPx': false,
  'mp-weixin': {
    appid: 'wxb1fee5508672b138',
    setting: { urlCheck: false },
    usingComponents: true,
  },
  'uniStatistics': {
    enable: false,
  },
  'vueVersion': '3',
})
