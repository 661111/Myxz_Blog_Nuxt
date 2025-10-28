// 定义单个音乐项的接口
export interface MusicItem {
  /** 音乐名称 */
  name: string;
  /** 歌手/创作者 */
  artist: string;
  /** 音频文件 URL */
  url: string;
  /** 歌词文件 URL */
  lrc: string;
  /** 封面图 URL */
  cover: string;
}