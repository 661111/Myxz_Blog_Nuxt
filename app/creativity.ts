// 定义外层分类的类型接口
export interface CreativityData {
  class_name: string;       // 分类名称
  subtitle: string;
  creativity_list: CreativityItem[];  // 创意项列表
}

// 定义最内层创意项的类型接口
export interface CreativityItem {
  name: string;       // 技术名称
  color: string;      // 颜色值（十六进制/关键字）
  icon: string;       // 图标 URL 地址
}

// 具体数据（与 YAML 结构完全对应）
export const creativityData: CreativityData[] = [
  {
    class_name: "开启创造力",
    subtitle: '技能',
    creativity_list: [
      {
        name: "Vue",
        color: "#b8f0ae",
        icon: "/image/BannerCover/about/vue.avif"
      },
      {
        name: "Java",
        color: "#fff",
        icon: "/image/BannerCover/about/Java.avif"
      },
      {
        name: "Webpack",
        color: "#2e3a41",
        icon: "/image/BannerCover/about/webpack.avif"
      },
      {
        name: "Photoshop",
        color: "#4082c3",
        icon: "/image/BannerCover/about/PS.avif"
      },
      {
        name: "Swift",
        color: "#eb6840",
        icon: "/image/BannerCover/about/swift.avif"
      },
      {
        name: "Python",
        color: "#fff",
        icon: "/image/BannerCover/about/python.avif"
      },
      {
        name: "Node",
        color: "#333",
        icon: "/image/BannerCover/about/node-logo.avif"
      },
      {
        name: "Git",
        color: "#df5b40",
        icon: "/image/BannerCover/about/git.avif"
      },
      {
        name: "CSS",
        color: "#2c51db",
        icon: "/image/BannerCover/about/css.avif"
      },
      {
        name: "JS",
        color: "#f7cb4f",
        icon: "/image/BannerCover/about/js.avif"
      }
    ],
  },
];