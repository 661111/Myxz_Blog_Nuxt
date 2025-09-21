// types/collections.d.ts
export interface Subject {
  id: number;
  type: number;
  name: string;
  name_cn: string;
  summary: string;
  images: {
    common: string;
    large: string;
    grid: string;
    small: string;
  };
}

export interface CollectionStatus {
  status: number; // 0:想看,1:看过,2:在看,3:搁置,4:抛弃
  rating: number;
  comment: string;
  private: boolean;
  updated_at: string;
}

export interface CollectionItem {
  id: number;
  subject: Subject;
  status: CollectionStatus;
}

export interface CollectionsResponse {
  data: CollectionItem[];
  total: number;
  limit: number;
  offset: number;
}