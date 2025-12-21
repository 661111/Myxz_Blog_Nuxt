// types/chinese-lunar.d.ts
declare module 'chinese-lunar' {
  export function solarToLunar(date: Date): any;
  export function format(lunar: any, format: string): string;
}