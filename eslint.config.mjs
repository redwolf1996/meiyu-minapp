// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    unocss: true,
    ignores: [
      '**/uni_modules',
      '**/uniCloud-aliyun',
    ],
  },
  {
    rules: {
      'style/semi': ['error', 'never'],
      'no-console': ['off'],
      'eqeqeq': ['off'],
    },
  },
)
