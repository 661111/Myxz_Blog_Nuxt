export interface item {
  name: string
  categroy: '硬件' | '外设'
  categroy_color?: '#3af;' | '#3ba;'
  desc: string
  info?: Record<string, string>
  厂商?: Record<string, string>
  tag?: string[]
  image?: string
  date?: string
  src?: string
  money?: number
}