// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: {
      html: true,
      css: true,
    },
    unocss: true,
    ignores: [
      '**/uni_modules',
      '**/uniCloud-aliyun',
    ],
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
      'vue/attribute-hyphenation': ['off'],
      'vue/valid-attribute-name': ['off'],
      'unocss/order-attributify': ['off'],
    },
  },
  {
    rules: {
      'style/semi': ['error', 'never'],
      'no-console': ['off'],
      'eqeqeq': ['off'],
    },
  },
)
