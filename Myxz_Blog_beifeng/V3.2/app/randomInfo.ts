export interface friendRandomPost {
    headLeftTitle: string,
    headLeftOclink: string,
    headRightTitle: string,
    headRightLink: string,
}

export const friendRandomPostInfo: friendRandomPost[] = [
    {
        headLeftTitle: "钓鱼",
        headLeftOclink: "javascript:fetchRandomPost();",
        headRightTitle: "全部友链",
        headRightLink: "/link",
    }
]