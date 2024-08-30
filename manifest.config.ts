import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  'name': 'yau',
  'appid': '__UNI__401176F',
  'description': '',
  'versionName': '1.0.0',
  'versionCode': '100',
  'transformPx': false,
  'mp-weixin': {
    appid: 'wx208ed5b60f57b9bc',
    setting: { urlCheck: false },
    usingComponents: true,
    lazyCodeLoading: 'requiredComponents',
  },
  'uniStatistics': {
    enable: false,
  },
  'vueVersion': '3',
})
