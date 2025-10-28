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

export const musicList: MusicItem[] = [
  {
    name: 'L E V E I S(Cyberpunk)(Remix)',
    artist: 'vodKe',
    url: 'https://blog.myxz.top/sxiaohe_source/music/songs/levels.mp3',
    lrc: 'https://blog.myxz.top/sxiaohe_source/music/lrc/L%20E%20V%20E%20I%20S(Cyberpunk)(Remix).lrc',
    cover: 'https://blog.myxz.top/sxiaohe_source/music/cover/L%20E%20V%20E%20l%20S%20(Cyberpunk).avif'
  },
  {
    name: '逆天',
    artist: '呦猫UNEKO',
    url: 'https://blog.myxz.top/sxiaohe_source/music/songs/呦猫UNEKO%20-%20逆天.mp3',
    lrc: 'https://blog.myxz.top/sxiaohe_source/music/lrc/呦猫UNEKO%20-%20逆天.lrc',
    cover: 'https://blog.myxz.top/sxiaohe_source/music/cover/逆天.avif'
  },
  {
    name: 'BARRETE!(SLOWED + REVERB)',
    artist: 'CHASHKAKEFIRA&D4C',
    url: 'https://blog.myxz.top/sxiaohe_source/music/songs/BARRETE!(SLOWED%20+%20REVERB)-CHASHKAKEFIRA&D4C.mp3',
    lrc: 'https://blog.myxz.top/sxiaohe_source/music/lrc/BARRETE!(SLOWED%20+%20REVERB)-CHASHKAKEFIRA&D4C.lrc',
    cover: 'https://blog.myxz.top/sxiaohe_source/music/cover/BARRETE!(SLOWED%20+%20REVERB)%20.avif'
  },
  {
    name: '无人扶我青云志',
    artist: 'ZMAGE-Y',
    url: 'https://blog.myxz.top/sxiaohe_source/music/songs/ZMAGE-Y%20-%20无人扶我青云志%20(ZMAGE-Y%20remix).mp3',
    lrc: 'https://blog.myxz.top/sxiaohe_source/music/lrc/无人扶我青云志%20(ZMAGE-Y%20remix)%20(Remix)-ZMAGE-Y.lrc',
    cover: 'https://blog.myxz.top/sxiaohe_source/music/cover/无人扶我青云志%20(ZMAGE-Y%20remix).avif'
  }
];