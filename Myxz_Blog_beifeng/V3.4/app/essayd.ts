export interface EssayItem {
  content: string
  date: string
  tags: string
  image?: string
  video?: string[]
  link?: string
  from?: string
  address?: string
}

// 说说数据集合
export const customEssays: EssayItem[] = [
  {
    content: '买到 myxz.top 域名，而且还是个白金域名，太棒了。',
    date: '2025/3/20',
    image: 'https://bcjyn0fc8o7wifyp.public.blob.vercel-storage.com/img/b486dd9b02c8081a42f7161aa135da0-lUIahC6nFeKNkSKlHnHa38kuYGMlnU.png',
    tags: '喜报',
  },
  {
    content: '最近长牙包了，没办法完善一些东西',
    date: '2025-03-03',
    image: '',
    tags: '闲言',
  },
  {
    content: '目前基本上已经完成了仿照轻笑的博客样式',
    date: '2025-02-07',
    image: 'https://blog.myxz.top/img/screen.avif',
    tags: '仿站',
  },
  {
    content: '有新电脑，基本上已经不太想用动态博客，所以最近准备从动态博客迁移到静态博客',
    date: '2025-02-03',
    image: '',
    tags: '梦开始的地方',
  },
]

export interface BannerConfig {
  title: string;
  subTitle: string;
  tips: string;
  top_background: string;
  buttonText: string;
  buttonLink: string;
  limit: number;
}

// 横幅配置数据
export const bannerData: BannerConfig = {
  title: "我的说说",
  subTitle: "分享生活中的点滴",
  tips: "发布于2023年至今",
  top_background: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  buttonText: "查看更多",
  buttonLink: "/essays",
  limit: 30
}

export interface Constants {
  pageTitle: string;
  pageDescription: string;
  lastUpdate: string;
  poweredBy: string;
  siteName: string;
}

// 常量数据
export const essayConstants: Constants = {
  pageTitle: '说说',
  pageDescription: '记录生活点滴，一些想法',
  lastUpdate: '2025-07-06',
  poweredBy: 'AnHeYuEssays',
  siteName: '莫言小栈'
}