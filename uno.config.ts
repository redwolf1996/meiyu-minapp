import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { presetUni } from '@uni-helper/unocss-preset-uni'

export default defineConfig({
  presets: [
    presetUni(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  rules: [
    ['wp100', { width: '100%' }],
    ['hp100', { height: '100%' }],
    ['wp50', { width: '50%' }],
    ['hp50', { height: '50%' }],
    ['bd', { border: '1px solid blue' }],
    ['tc', { 'text-align': 'center' }],
    ['ma', { margin: '0 auto' }],
    ['oa', { overflow: 'auto' }],
    ['oh', { overflow: 'hidden' }],
    ['oa-y', { 'overflow-y': 'auto' }],
    ['oh-y', { 'overflow-y': 'hidden' }],
    ['oa-x', { 'overflow-x': 'auto' }],
    ['oh-x', { 'overflow-x': 'hidden' }],
    ['pr', { position: 'relative' }],
    ['pa', { position: 'absolute' }],
    ['pf', { position: 'fixed' }],
    ['ps', { position: 'sticky' }],
    ['dib', { display: 'inline-block' }],
    ['fb', { 'font-weight': 'bold' }],
    ['fn', { 'font-weight': 'normal' }],
    ['f12', { 'font-size': '24rpx' }],
    ['f14', { 'font-size': '28px' }],
    ['f16', { 'font-size': '32rpx' }],
    ['f18', { 'font-size': '36rpx' }],
    ['br4', { 'border-radius': '4px' }],
    ['br8', { 'border-radius': '8px' }],
    ['color-main', { color: '#333' }],
    ['color-sub', { color: '#666' }],
    ['hide', { color: 'transparent', background: 'transparent' }],
    ['flex-y', { 'flex-direction': 'column' }],
    ['flex-bt', { 'justify-content': 'space-between' }],
    ['flex-ac', { 'align-items': 'center' }],
    ['flex-cc', { 'justify-content': 'center', 'align-items': 'center' }],
    ['abs-cc', { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }],
    ['ellipsis', { 'overflow': 'hidden', 'white-space': 'nowrap', 'text-overflow': 'ellipsis', 'word-break': 'break-all' }],
  ],
})
