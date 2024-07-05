export interface Bookings {
  staff: string
  services: Service[]
}

export interface Service {
  customer: string
  items: Item[]
  start: number // 开始时间点 e.g. 00:00->0 00:15->1 每15分钟一档 共24小时 结束时间点同理
  end: number
}

export interface Item {
  name: string
  count: number
}

export const tableData: any = ref([
  {
    staff: '米娜',
    services: [],
  },
])
