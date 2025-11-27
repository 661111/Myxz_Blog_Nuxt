import type { item } from '~/types/equipment'
export type manufacturers = {
  cpu_info: 'AMD' | 'INTEL'
  memory_info: 'LPDDR5' | 'LPDDR4' | 'LPDDR3'
  graphics_card_info: 'AMD' | 'NVIDA'
  ssd_info: 'SSD' | 'NVME SSD'
}
export const equipment: item[] = [
  {
    name: "天选4",
    image: "/assets/img/equipment/tianxuan.svg",
    src: "https://www.myxz.top",
    categroy: '硬件',
    desc: "测试测试",
    info: {
      芯片: "AMD Ryzen™ 5 7640HS",
      内存: "16G LPDDR5 4800MHz",
      显卡: "NVIDIA® GeForce RTX™ 4050",
      存储: "512G PCIE4 SSD",
      机器版本: "锐龙版",
      机器颜色: "Mecha"
    },
    tag: ['轻薄本', 'AMD'],
    date: "2023-09-01",
    money: 2344,
  },  {
    name: "iPhone XR",
    image: "https://s11.ax1x.com/2023/06/07/pCiB3vD.jpg",
    src: "https://www.myxz.top",
    categroy: '外设',
    desc: "测试测试",
    info: {
      芯片: "Ryzen™ 5 7640HS",
      内存: "Ryzen™ 5 7640HS",
      显卡: "Ryzen™ 5 7640HS",
      存储: "Ryzen™ 5 7640HS",
    },
    tag: ['轻薄本', 'AMD'],
    date: "2023-09-01",
    money: 2344,
  }
]