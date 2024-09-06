import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [],
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
    },
  },

  tabBar: {
    color: '#999999',
    selectedColor: '#1A66FF',
    borderStyle: 'black',
    height: '52px',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/tab-business-dashboard',
        iconPath: 'static/tabs/dashboard.png',
        selectedIconPath: 'static/tabs/dashboard-active.png',
        text: '工作台',
      },
      {
        pagePath: 'pages/tab-business-book',
        iconPath: 'static/tabs/order.png',
        selectedIconPath: 'static/tabs/order-active.png',
        text: '预约',
      },
      {
        pagePath: 'pages/tab-business-customer',
        iconPath: 'static/tabs/customer.png',
        selectedIconPath: 'static/tabs/customer-active.png',
        text: '客户',
      },
      {
        pagePath: 'pages/tab-business-my',
        iconPath: 'static/tabs/my.png',
        selectedIconPath: 'static/tabs/my-active.png',
        text: '我的',
      },
    ],
  },
  preloadRule: {
    'pages/index': {
      network: 'all',
      packages: ['pagesA', 'pagesB'],
    },
    'pages/tab-business-dashboard': {
      network: 'all',
      packages: ['pagesA', 'pagesB'],
    },
    'pages/tab-business-book': {
      network: 'all',
      packages: ['pagesA', 'pagesB'],
    },
    'pages/tab-business-customer': {
      network: 'all',
      packages: ['pagesA', 'pagesB'],
    },
    'pages/tab-business-my': {
      network: 'all',
      packages: ['pagesA', 'pagesB'],
    },
  },
})
