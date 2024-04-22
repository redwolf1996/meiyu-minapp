import { defineConfig, loadEnv } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import AutoImport from 'unplugin-auto-import/vite'
import { envParse, parseLoadedEnv } from 'vite-plugin-env-parse'
import UnoCSS from 'unocss/vite'

// 注意插件的加载顺序，unihelper的相关插件要放在uni前面
export default defineConfig(({ mode }) => {
  console.log(parseLoadedEnv(loadEnv(mode, './')))
  return {
    plugins: [
      envParse({ // https://github.com/yue1123/vite-plugin-env-parse
        dtsPath: 'src/custom-env.d.ts',
        build: true, // 小程序dev的默认行为本质是build, 所以打开这个选项以生成env正确的.d.ts文件
      }),
      UniHelperManifest(), // https://github.com/uni-helper/vite-plugin-uni-manifest
      UniHelperPages({ // https://github.com/uni-helper/vite-plugin-uni-pages
        dts: 'src/uni-pages.d.ts',
        routeBlockLang: 'yaml',
        subPackages: ['src/pagesA', 'src/pagesB'],
      }),
      UniHelperLayouts(), // https://github.com/uni-helper/vite-plugin-uni-layouts
      UniHelperComponents({ // https://github.com/uni-helper/vite-plugin-uni-components
        dts: 'src/components.d.ts',
        directoryAsNamespace: true,
      }),
      Uni(),
      AutoImport({ // https://github.com/antfu/unplugin-auto-import
        imports: ['vue', '@vueuse/core', 'uni-app'],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/composables', 'src/stores', 'src/utils'],
        vueTemplate: true,
      }),
      UnoCSS(),
    ],
    build: {
      sourcemap: true,
    },
  }
})
