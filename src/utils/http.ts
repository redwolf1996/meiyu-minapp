const baseUrl = import.meta.env.VITE_BASE_URL
const envVersion = import.meta.env.VITE_ENV_VERSION
const userStore = useUserStore()

// const accountInfo = uni.getAccountInfoSync()
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    const urls = [
      'https://file-univtskclp-mp-273ffd5c-a76e-4c77-8584-ad265ebe1b0b.oss-cn-zhangjiakou.aliyuncs.com',
      'https://api.next.bspapp.com/client',
    ]
    if (!urls.includes(options.url)) {
      options.url = baseUrl + options.url
    }
    options.timeout = 30000
    options.header = {
      ...options?.header,
      'client': 'minapp',
      'envVersion': envVersion,
      'B-Store-Id': storeId.value,
    }
    const token = userStore.userInfo?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: number
  msg: string
  data: T
}
export function http<T>(options: UniApp.RequestOptions) {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        const statusCode = res.statusCode
        if (statusCode >= 200 && statusCode < 300) {
          const data = res.data as Data<T>
          if (data.code === 20001) {
            userStore.clearUserInfo()
            uni.redirectTo({ url: '/pagesA/login/index' })
            return reject(res)
          }
          else if (data.code !== 200) {
            uni.showToast({
              icon: 'none',
              title: data.code === 500 ? '服务端错误' : (res.data as Data<T>).msg,
              duration: 2000,
            })
            return reject(res)
          }
          resolve(data)
        }
        else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
            duration: 2000,
          })
          return reject(res)
        }
      },
      fail(err) {
        uni.showToast({ icon: 'none', title: '网络错误', duration: 2000 })
        reject(err)
      },
    })
  })
}
