// services/music-api.ts
import axios from 'axios';
import { ApiResponse, Playlist, Track } from '~/types/music';

const API_BASE_URL = 'https://music.163.com/api'; // 替换实际API地址

export const getPlaylistDetail = async (id: number): Promise<ApiResponse<Playlist>> => {
  const response = await axios.get(`${API_BASE_URL}/playlist/detail`, {
    params: { id }
  });
  return response.data as ApiResponse<Playlist>;
};

export const getSongDetail = async (id: number): Promise<ApiResponse<Track>> => {
  const response = await axios.get(`${API_BASE_URL}/song/detail`, {
    params: { ids: id }
  });
  return response.data as ApiResponse<Track>;
};