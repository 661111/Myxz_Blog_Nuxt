export interface siteTabs {
    name: string;
    siteItems: siteItem[];
}

export interface siteItem {
    name: string;
    image: string;
    link: string;
    desc: string;
    service: service[];
}

export interface service {
    name: string;
    image: string;
    link: string;
}