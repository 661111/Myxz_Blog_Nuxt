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
        icon: "/banners/vue.webp"
      },
      {
        name: "Java",
        color: "#fff",
        icon: "/banners/Java.webp"
      },
      {
        name: "Docker",
        color: "#57b6e6",
        icon: "/banners/docker.webp"
      },
      {
        name: "Webpack",
        color: "#2e3a41",
        icon: "/banners/webpack.webp"
      },
      {
        name: "Photoshop",
        color: "#4082c3",
        icon: "/banners/PS.webp"
      },
      {
        name: "Swift",
        color: "#eb6840",
        icon: "/banners/swift.webp"
      },
      {
        name: "Python",
        color: "#fff",
        icon: "/banners/python.webp"
      },
      {
        name: "Node",
        color: "#333",
        icon: "/banners/node-logo.svg"
      },
      {
        name: "Git",
        color: "#df5b40",
        icon: "/banners/git.webp"
      },
      {
        name: "Css",
        color: "#2c51db",
        icon: "/banners/css.webp"
      },
      {
        name: "Js",
        color: "#f7cb4f",
        icon: "/banners/js.webp"
      }
    ],
  },
];