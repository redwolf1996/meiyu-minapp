### 美预小程序前端

#### 特别说明

- pages里面只放个首页、tabbar页面以及公共组件，作为主包第三方文件占据体积过大，故所有的页面放到分包里，pagesA分包是商家端的页面，pageB分包是客户端的页面

- 不要更新uni_modules里面的piaoyiEditor，此组件经过样式修改和unicloud上传配置修改，更新后会导致功能异常
