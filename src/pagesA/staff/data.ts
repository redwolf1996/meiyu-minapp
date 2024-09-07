export interface WeekTime {
  week: number
  weekName: string
  startTime: string
  endTime: string
  active: boolean
}

export const columns: WeekTime[] = [
  {
    week: 1,
    weekName: '周一',
    startTime: '09:00',
    endTime: '21:00',
    active: true,
  },
  {
    week: 2,
    weekName: '周二',
    startTime: '09:00',
    endTime: '21:00',
    active: true,
  },
  {
    week: 3,
    weekName: '周三',
    startTime: '09:00',
    endTime: '21:00',
    active: true,
  },
  {
    week: 4,
    weekName: '周四',
    startTime: '09:00',
    endTime: '21:00',
    active: true,
  },
  {
    week: 5,
    weekName: '周五',
    startTime: '09:00',
    endTime: '21:00',
    active: true,
  },
  {
    week: 6,
    weekName: '周六',
    startTime: '09:00',
    endTime: '21:00',
    active: true,
  },
  {
    week: 7,
    weekName: '周日',
    startTime: '09:00',
    endTime: '21:00',
    active: true,
  },
]
