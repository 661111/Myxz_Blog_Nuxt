// 通用响应接口
export interface BilibiliResponse<T> {
    code: number;
    message: string;
    ttl: number;
    data: T;
}

// 追番/追剧项接口
export interface FavoriteItem {
    season_id: number;
    media_id: number;
    season_type: number;
    title: string;
    cover: string;
    total_count: number;
    evaluate: string;
    new_ep: {
        id: number;
        index_show: string;
        cover: string;
        title: string;
        long_title: string;
    };
    rating: {
        score: number;
        count: number;
    };
    badge: string;
    badge_info: {
        bg_color: string;
        bg_color_night: string;
        text: string;
    };
    badge_type: number;
    progress: string;
    is_finish: number;
    is_started: number;
    pub_time: string;
    order_type: number;
    areas: Array<{
        id: number;
        name: string;
    }>;
    styles: Array<{
        id: number;
        name: string;
    }>;
    url: string;
    series_follow: number;
    first_ep_info: {
      id: string;
      cover: string;
      title: string;
      long_title: string;
      pub_time: string;
      duration: string;
    }
    publish: {
      pub_time: string;
      pub_time_show: string;
      release_date: string;
      release_date_show: string
    }
}

// 追番列表响应接口
export interface BangumiFollowResponse {
    has_next: number;
    code: number;
    message: string;
    ttl: number;
    list: FavoriteItem[];
}

// 追剧列表响应接口
export interface CinemaFollowResponse {
    has_next: number;
    code: number;
    message: string;
    ttl: number;
    list: FavoriteItem[];
}

// 用户信息接口
export interface UserInfo {
    mid: number;
    name: string;
    face: string;
    level: number;
}

// API错误接口
export interface APIError {
    code: number;
    message: string;
    response?: any;
}