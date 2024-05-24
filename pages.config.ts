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
        pagePath: 'pages/business/dashboard/index',
        iconPath: 'static/tabs/dashboard.png',
        selectedIconPath: 'static/tabs/dashboard-active.png',
        text: '工作台',
      },
      {
        pagePath: 'pages/business/booking/index',
        iconPath: 'static/tabs/order.png',
        selectedIconPath: 'static/tabs/order-active.png',
        text: '预约',
      },
      {
        pagePath: 'pages/business/customer/index',
        iconPath: 'static/tabs/customer.png',
        selectedIconPath: 'static/tabs/customer-active.png',
        text: '客户',
      },
      {
        pagePath: 'pages/business/my/index',
        iconPath: 'static/tabs/my.png',
        selectedIconPath: 'static/tabs/my-active.png',
        text: '我的',
      },
    ],
  },

  // tabBar: {
  //   color: '#999999',
  //   selectedColor: '#018d71',
  //   backgroundColor: '#F8F8F8',
  //   borderStyle: 'black',
  //   height: '50px',
  //   fontSize: '10px',
  //   iconWidth: '24px',
  //   spacing: '3px',
  //   list: [
  //     {
  //       iconPath: 'static/tabbar/home.png',
  //       selectedIconPath: 'static/tabbar/homeHL.png',
  //       pagePath: 'pages/index',
  //       text: '首页',
  //     },
  //     {
  //       iconPath: 'static/tabbar/example.png',
  //       selectedIconPath: 'static/tabbar/exampleHL.png',
  //       pagePath: 'pages/demo',
  //       text: '示例',
  //     },
  //   ],
  // },
})
