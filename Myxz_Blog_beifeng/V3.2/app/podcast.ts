export interface podcastItem {
    tabname: string;
    tabItem: podcastTabItem[];
}
export interface podcastTabItem {
    podcastTitle: string;
    podcastBadge: podcastBadge[];
    podcastDesc: string;
    podcastTmage: string;
    podcastLink: string;
}
export interface podcastBadge {
    BadgeName: string;
    BadgeImage: string;
    BadgeLink: string;
}

export const customPodCast: podcastItem[] =[{
    tabname: "代码",
    tabItem: [{
        podcastTmage: "",
        podcastTitle: "Syntax",
        podcastBadge: [{
            BadgeName: "Wes Bos",
            BadgeImage: "https://wsrv.nl/?url=github.com%2Fwesbos.png%3Fsize%3D92",
            BadgeLink: "https://github.com/wesbos",
        }, {
            BadgeImage: "Scott Tolinski",
            BadgeName: "https://wsrv.nl/?url=github.com%2Fstolinski.png%3Fsize%3D92",
            BadgeLink: "https://github.com/stolinski"
        }],
        podcastDesc: "Syntax 是一个关于 Web 开发的播客。涵盖 JavaScript 服务器 + 客户端， 最新的框架、HTML、CSS、数据库、部署环境等等！",
        podcastLink: "https://feeds.megaphone.fm/FSI1483080183",
    }]
}]