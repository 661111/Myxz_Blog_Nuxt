// 豆瓣API基础响应接口
export interface DoubanBaseResponse {
  count: number;
  start: number;
  total: number;
}

// 图书数据结构
export interface DoubanBook {
  id: string;
  title: string;
  subtitle?: string;
  rating?: {
    max: number;
    value: string;
    min: number;
  };
  author: string[];
  pubdate?: string;
  tags?: Array<{
    count: number;
    name: string;
  }>;
  image?: string;
  images?: {
    small: string;
    large: string;
    medium: string;
  };
  publisher?: string;
  isbn10?: string;
  isbn13?: string;
  pages?: string;
  price?: string;
  url?: string;
  alt_title?: string;
  author_intro?: string;
  summary?: string;
}

// 电影数据结构
export interface DoubanMovie {
  id: string;
  title: string;
  original_title?: string;
  rating?: {
    max: number;
    value: string;
    min: number;
  };
  images?: {
    small: string;
    large: string;
    medium: string;
  };
  genres?: string[];
  year?: string;
  casts?: Array<{
    id: string;
    name: string;
    alt: string;
    avatars?: {
      small: string;
      large: string;
      medium: string;
    };
  }>;
  directors?: Array<{
    id: string;
    name: string;
    alt: string;
    avatars?: {
      small: string;
      large: string;
      medium: string;
    };
  }>;
  subtype?: string;
  countries?: string[];
  summary?: string;
  alt?: string;
}

// 音乐数据结构
export interface DoubanMusic {
  id: string;
  title: string;
  rating?: {
    max: number;
    value: string;
    min: number;
  };
  image?: string;
  images?: {
    small: string;
    large: string;
    medium: string;
  };
  attrs?: {
    publisher?: string[];
    singer?: string[];
    discs?: string[];
    media?: string[];
    albumtype?: string[];
    version?: string[];
    pubdate?: string[];
    title?: string[];
    tracks?: string[];
  };
  author?: Array<{
    name: string;
  }>;
  tags?: Array<{
    count: number;
    name: string;
  }>;
  alt?: string;
  summary?: string;
}

// 游戏数据结构（豆瓣游戏API可能不直接提供，使用通用条目结构）
export interface DoubanGame {
  id: string;
  title: string;
  rating?: {
    max: number;
    value: string;
    min: number;
  };
  image?: string;
  images?: {
    small: string;
    large: string;
    medium: string;
  };
  summary?: string;
  alt?: string;
  tags?: Array<{
    count: number;
    name: string;
  }>;
}

// 用户信息结构
export interface DoubanUser {
  id: string;
  uid: string;
  name: string;
  avatar: string;
  alt: string;
  relation?: string;
  created?: string;
  loc?: {
    id: string;
    name: string;
    uid: string;
  };
  desc?: string;
}

// API响应结构
export interface DoubanBookResponse extends DoubanBaseResponse {
  books: DoubanBook[];
}

export interface DoubanMovieResponse extends DoubanBaseResponse {
  subjects: DoubanMovie[];
}

export interface DoubanMusicResponse extends DoubanBaseResponse {
  musics: DoubanMusic[];
}

export interface DoubanGameResponse extends DoubanBaseResponse {
  games: DoubanGame[];
}