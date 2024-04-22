const baseUrl = import.meta.env.VITE_BASE_URL
const userStore = useUserStore()

const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    options.url = baseUrl + options.url
    options.timeout = 10000
    options.header = {
      ...options?.header,
      client: 'minapp',
    }
    const token = userStore.userInfo?.token
    if (token)
      options.header.Authorization = token
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: string
  msg: string
  data: T
}
export function http<T>(options: UniApp.RequestOptions) {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        const code = res.statusCode
        if (code >= 200 && code < 300) { resolve(res.data as Data<T>) }
        else if (code === 401) {
          userStore.clearUserInfo()
          uni.navigateTo({ url: '/pages/login' })
          reject(res)
        }
        else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      fail(err) {
        uni.showToast({ icon: 'none', title: '网络错误' })
        reject(err)
      },
    })
  })
}
