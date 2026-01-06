interface DonationMethod {
  name: string;
  image: string;
}

interface Donor {
  name: string;
  avatar: string;
  website: string;
  date: string;
  amount: string;
  description: string;
}

interface DonateConfig {
  donate: {
    alipay: DonationMethod;
    wechat: DonationMethod;
    thank_img: string;
    page_url: string;
    list: Donor[];
  };
}

// 实际数据实例（根据提供的 YAML 数据）
const donateData: DonateConfig = {
  donate: {
    alipay: {
      name: '支付宝收款码',
      image: '/config/img/alipay.png'
    },
    wechat: {
      name: '微信收款码',
      image: '/config/img/wechat.png'
    },
    thank_img: 'https://example.com/images/68e9199157351.webp', // 链接10
    page_url: '/rewards/',
    list: [
      {
        name: '银河香港',
        avatar: 'https://p.liiiu.cn/i/2025/02/26/67bec7d0eb734.webp', // 链接6
        website: '',
        date: '2025-03-15',
        amount: '¥100.00',
        description: '你我皆是生活银河中的闪耀星辰'
      },
      {
        name: '周润发',
        avatar: 'https://p.liiiu.cn/i/2025/03/20/67dbe8c6a6221.webp', // 链接11
        website: 'https://blog.zrf.me', // 链接1
        date: '2025-08-01',
        amount: '¥30.00',
        description: '收录开源，好用的互联网项目~'
      },
      {
        name: 'SXY',
        avatar: 'https://p.liiiu.cn/i/2025/10/11/68e93a9ccee45.webp', // 链接13
        website: '',
        date: '2025-08-29',
        amount: '¥10.00',
        description: '地球与物理专业的大三学生'
      },
      {
        name: 'Ljx',
        avatar: 'https://p.liiiu.cn/i/2025/10/09/68e7d8ed2a70b.webp', // 链接7
        website: 'https://lixiang.zone', // 链接2
        date: '2025-10-09',
        amount: '¥8.88',
        description: '一个无聊无趣的人~'
      },
    ]
  }
};

export type { DonationMethod, Donor, DonateConfig };
export default donateData;