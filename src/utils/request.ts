import qs from 'qs'
import { http } from './http'

const request = {
  get<T>(url: string, params?: any) {
    return http<T>({
      method: 'GET',
      url: params ? `${url}?${qs.stringify(params)}` : url,
    })
  },
  post<T>(url: string, params: any) {
    return http<T>({
      method: 'POST',
      url,
      data: params,
    })
  },
  put<T>(url: string, params: any) {
    return http<T>({
      method: 'PUT',
      url,
      data: params,
    })
  },
  delete<T>(url: string, params?: any) {
    return http<T>({
      method: 'DELETE',
      url: params ? `${url}?${qs.stringify(params)}` : url,
    })
  },
}

export default request
