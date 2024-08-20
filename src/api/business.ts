import request from '@/utils/request'

export default {
  login(p: { code: string }) {
    return request.post<{ token: string, isRegister: 0 | 1 }>('/business/wx-login', p)
  },
}
