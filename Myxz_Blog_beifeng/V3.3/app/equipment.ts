
export interface item {
  class_name: string,
  class_desc: string,
  infoname: string,
  List: entry[],
}

export interface entry {
  name: string,
  custom: string,
  opinion: string,
  details_flink: string,
  image: string,
}

export const equipment: item[] = [
  {
    class_name: "日常生产力",
    class_desc: "平常生活、工作增添效率的产品",
    infoname: "详情",
    List: [
      {
        name: "iPhone XR",
        custom: "主力 | 128G",
        opinion: "吸引我的第一点就是珊瑚橙，其次就是当初的性价比，算是跨越性机型吧；特别喜欢裸机的手感，尺寸厚薄等方面也刚刚好，习惯性选手。",
        details_flink: "https://www.apple.com.cn/",
        image: "https://s11.ax1x.com/2023/06/07/pCiB3vD.jpg"
      }
    ]
  }
]