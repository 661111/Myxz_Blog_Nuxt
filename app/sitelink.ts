export interface siteInfo {
    title: string
}

export interface siteTabs {
    name: string
    itemnumber: string
    Item: Item[]
}

export interface Item {
    name: string
    image: string
    link: string
    desc: string
    service: service[]
}

export interface service {
    name: string
    image: string
    link: string
}

export const siteLinkWidgetInfo: siteInfo[] = [
    {
        title: '站点信息',
    }
]

export const siteLinkItems: siteTabs[] = [
    {
        name: '镜像站点',
        itemnumber: '3',
        Item: [
            {
                name: 'EdgeOne镜像',
                image: 'https://sourceimage.s3.bitiful.net/myxz.avif',
                link: 'https://blog-v3.edgeone.mirrors.myxz.top',
                desc: "",
                service: [
                    { 
                        name: 'EdgeOne', 
                        image: '/assets/img/link/service/edgeone.jpg', 
                        link: "https://edgeone.ai/"
                    }
                ],
            },{
                name: "Vercel镜像",
                image: "https://sourceimage.s3.bitiful.net/myxz.avif",
                link: "https://blog-v3.vercel.mirrors.myxz.top",
                desc: "",
                service: [
                    {
                        name: "Vercel",
                        image: "/assets/img/link/service/vercel.jpg",
                        link: "https://vercel.com"
                    }
                ]
            },{
                name: "Netlify镜像",
                image: "https://sourceimage.s3.bitiful.net/myxz.avif",
                link: "https://blog-v3.netifly.mirrors.myxz.top",
                desc: "",
                service: [
                    {
                        name: "Netlify",
                        image: "/assets/img/link/service/netlify.jpg",
                        link: "https://Netlify.com"
                    }
                ]
            },
        ]
    },
    {
        name: '服务',
        itemnumber: '1',
        Item: [
            {
                name: '说说',
                image: 'https://sourceimage.s3.bitiful.net/myxz.avif',
                link: 'https://blog-v3.myxz.top',
                desc: "",
                service: [
                    { 
                        name: 'EdgeOne', 
                        image: '/assets/img/link/service/edgeone.jpg', 
                        link: "" 
                    }
                ],
            }
        ]
    },
]