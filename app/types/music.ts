// types/music.d.ts
export interface Artist {
  id: number;
  name: string;
  picUrl?: string;
}

export interface Album {
  id: number;
  name: string;
  picUrl: string;
  publishTime: number;
}

export interface Track {
  id: number;
  name: string;
  artists: Artist[];
  album: Album;
  duration: number;
  fee: number;
  alias: string[];
  mark: number;
  rtype: number;
  mvid: number;
  transNames?: string[];
}

export interface Playlist {
  id: number;
  name: string;
  coverImgUrl: string;
  description: string;
  trackCount: number;
  tracks: Track[];
  createTime: number;
  status: number;
}

export interface ApiResponse<T> {
  code: number;
  result: T;
  message?: string;
}