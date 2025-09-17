// 播客数据表结构
export interface tab {
    name: string,
    item: item[],
}
export interface item {
    Title: string;
    Badge: Badge[];
    Desc: string;
    Tmage: string;
    Link: string;
}
export interface Badge {
    Name: string;
    Image: string;
    Link: string;
}