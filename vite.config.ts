/// <reference types="vite/client" />

import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import { envParse } from 'vite-plugin-env-parse'

// 注意插件的加载顺序，unihelper的相关插件要放在uni前面
export default defineConfig({
  plugins: [
    envParse({ // https://github.com/yue1123/vite-plugin-env-parse
      dtsPath: 'src/custom-env.d.ts',
      build: true, // 小程序dev的默认行为本质是build, 所以打开这个选项以生成env正确的.d.ts文件
    }),
    UniHelperManifest(), // https://github.com/uni-helper/vite-plugin-uni-manifest
    UniHelperPages({ // https://github.com/uni-helper/vite-plugin-uni-pages
      dts: 'src/uni-pages.d.ts',
      subPackages: ['src/pagesA', 'src/pagesB'],
    }),
    UniHelperLayouts(), // https://github.com/uni-helper/vite-plugin-uni-layouts
    UniHelperComponents({ // https://github.com/uni-helper/vite-plugin-uni-components
      dts: 'src/components.d.ts',
      directoryAsNamespace: true,
    }),
    Uni(),
    AutoImport({ // https://github.com/antfu/unplugin-auto-import
      imports: [
        'vue',
        'uni-app',
        {
          'wot-design-uni': [
            'useToast',
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/types', 'src/composables', 'src/stores', 'src/utils', 'src/pagesA/hooks/**', 'src/pagesB/hooks/**', 'src/hooks'],
      vueTemplate: true,
    }),
    UnoCSS(),
  ],
  build: {
    sourcemap: true,
  },
  server: {
    host: '0.0.0.0',
    port: 7788,
  },
})
