export interface WeekTime {
  weekCode: number
  startTime: string
  endTime: string
}

export const staffScheduling = ref<WeekTime[]>([])
