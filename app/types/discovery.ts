

//视频接口
//----------------------------------
// 顶层响应接口
interface VideoApiResponse {
  code: number;
  message: string;
  ttl: number;
  data: DataResponse;
}

// 数据主体接口
interface DataResponse {
  list: ListResponse;
  page: PageResponse;
  episodic_button: EpisodicButton;
  is_risk: boolean;
  gaia_res_type: number;
  gaia_data: any; // 或者更具体的类型
}

// 列表分类接口
interface ListResponse {
  slist: never[]; // 空数组保持原类型
  tlist: { [key: string]: TListEntry };
  vlist: VideoItem[];
}

// 分类条目接口
interface TListEntry {
  tid: number;
  count: number;
  name: string;
}

// 视频条目接口
interface VideoItem {
  comment: number;
  typeid: number;
  play: number;
  pic: string;
  subtitle: string;
  description: string;
  copyright: string;
  title: string;
  review: number;
  author: string;
  mid: string;
  created: number; // 建议转换为Date类型
  length: string;
  video_review: number;
  aid: number;
  bvid: string;
  hide_click: boolean;
  is_pay: number; // 建议转换为boolean
  is_union_video: number;
  is_steins_gate: number;
  is_live_playback: number;
  is_lesson_video: number;
  is_lesson_finished: number;
  lesson_update_info: string;
  jump_url: string;
  meta: null | object;
  is_avoided: number;
  season_id: number;
  attribute: number;
  is_charging_arc: boolean;
  elec_arc_type: number;
  elec_arc_badge: string;
  vt: number;
  enable_vt: number;
  vt_display: string;
  playback_position: number;
  is_self_view: boolean;
  view_self_type: number;
}

// 分页信息接口
interface PageResponse {
  pn: number;
  ps: number;
  count: number;
}

// 剧集按钮接口
interface EpisodicButton {
  text: string;
  uri: string;
}
//--------------------------------------------------