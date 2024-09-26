declare namespace MY {
  export type AreaForm = Partial<Record<'province' | 'city' | 'county', string>>
}

declare interface ListRes<T> {
  list: T[]
  total: number
}

declare interface SelItem {
  label: string
  value: number
}
