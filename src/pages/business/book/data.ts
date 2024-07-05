export interface Bookings {
  staff: string
  services: Service[]
}

export interface Service {
  customer: string
  items: Item[]
  start: number // 开始时间点 e.g. 00:00->0 00:15->1 每15分钟一档 共24小时 结束时间点同理
  end: number
  startTime: string // e.g. 00:00
  endTime: string // e.g. 00:15
}

export interface Item {
  name: string
  count: number
}

export const tableData: Bookings[] = [
  {
    staff: '米娜',
    services: [
      {
        customer: '石美华',
        items: [
          { name: '基础护理', count: 1 },
          { name: '精油刮痧', count: 1 },
        ],
        start: 0,
        end: 1,
        startTime: '00:00',
        endTime: '00:15',
      },
    ],
  },
]
