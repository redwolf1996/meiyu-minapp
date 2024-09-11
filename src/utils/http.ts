const baseUrl = import.meta.env.VITE_BASE_URL
const userStore = useUserStore()

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
      client: 'minapp',
    }
    // const token = userStore.userInfo?.token
    // if (token) {
    // TODO 临时给h5使用 后面删掉
    const tk = 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbklkIjoiMWNlY2U2ODctMWVhYi00NGU2LWFiMjYtZTY1MWRiOWM1NGE0Iiwib3BlbmlkIjoib295Z0o3WHI3aGtFN2dCQ003VGYzaS1RM0hTbyIsImJ1c2luZXNzSWQiOjEsInVzZXJUeXBlIjoiYnVzaW5lc3MifQ.CFxbpXNSFKef_LQrBj1xV9qUHd4iX32ow0_nGn15RhxVqg12qNcrLp_Ewwm3O8km7vcfIRlKn1Ixn_7cVq98Kw'
    options.header.Authorization = tk
    // }
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
            uni.navigateTo({ url: '/pagesA/login/index' })
            return reject(res)
          }
          else if (data.code !== 200) {
            uni.showToast({
              icon: 'none',
              title: (res.data as Data<T>).msg,
              duration: 2000,
            })
            reject(res)
          }
          resolve(data)
        }
        else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
            duration: 2000,
          })
          reject(res)
        }
      },
      fail(err) {
        uni.showToast({ icon: 'none', title: '网络错误', duration: 2000 })
        reject(err)
      },
    })
  })
}
