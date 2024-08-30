export interface WeekTime {
  week: number
  weekName: string
  start: string
  end: string
  active: boolean
}

export const columns: WeekTime[] = [
  {
    week: 1,
    weekName: '周一',
    start: '09:00',
    end: '21:00',
    active: false,
  },
  {
    week: 2,
    weekName: '周二',
    start: '09:00',
    end: '21:00',
    active: true,
  },
  {
    week: 3,
    weekName: '周三',
    start: '09:00',
    end: '21:00',
    active: true,
  },
  {
    week: 4,
    weekName: '周四',
    start: '09:00',
    end: '21:00',
    active: true,
  },
  {
    week: 5,
    weekName: '周五',
    start: '09:00',
    end: '21:00',
    active: true,
  },
  {
    week: 6,
    weekName: '周六',
    start: '09:00',
    end: '21:00',
    active: true,
  },
  {
    week: 7,
    weekName: '周日',
    start: '09:00',
    end: '21:00',
    active: true,
  },
]
