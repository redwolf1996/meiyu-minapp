import request from '@/utils/request'

export default {
  getStudioList(p: { id: number, name: string }) {
    return request.get<{ phone: string, address: string }[]>('/api/customer/related-studio', p)
  },
}
