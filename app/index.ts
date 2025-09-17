export interface indexData {
    id: string;
    name: string;
    class: string;
    item: indexItem[];
}
export interface indexItem {
    name: string;
    link: string;
    desc: string;
    icon: string;
}