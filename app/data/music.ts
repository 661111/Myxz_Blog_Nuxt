// 定义单个音乐项的接口
export interface MusicItem {
  /** 音乐名称 */
  title: string;
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
  // {
  //   title: 'L E V E I S(Cyberpunk)(Remix)',
  //   artist: 'vodKe',
  //   url: '/sxiaohe_source/music/songs/levels.mp3',
  //   lrc: '/sxiaohe_source/music/lrc/L%20E%20V%20E%20I%20S(Cyberpunk)(Remix).lrc',
  //   cover: '/sxiaohe_source/music/cover/L%20E%20V%20E%20l%20S%20(Cyberpunk).avif'
  // },
  // {
  //   title: '逆天',
  //   artist: '呦猫UNEKO',
  //   url: '/sxiaohe_source/music/songs/呦猫UNEKO%20-%20逆天.mp3',
  //   lrc: '/sxiaohe_source/music/lrc/呦猫UNEKO%20-%20逆天.lrc',
  //   cover: '/sxiaohe_source/music/cover/逆天.avif'
  // },
  {
    title: 'BARRETE!(SLOWED + REVERB)',
    artist: 'CHASHKAKEFIRA&D4C',
    url: '/sxiaohe_source/music/songs/BARRETE.mp3',
    lrc: '/sxiaohe_source/music/lrc/BARRETE!(SLOWED%20+%20REVERB)-CHASHKAKEFIRA&D4C.lrc',
    cover: '/sxiaohe_source/music/cover/BARRETE!(SLOWED%20+%20REVERB)%20.avif'
  },
  {
    title: '无人扶我青云志',
    artist: 'ZMAGE-Y',
    url: '/sxiaohe_source/music/songs/ZMAGE-Y.mp3',
    lrc: '/sxiaohe_source/music/lrc/无人扶我青云志%20(ZMAGE-Y%20remix)%20(Remix)-ZMAGE-Y.lrc',
    cover: '/sxiaohe_source/music/cover/无人扶我青云志%20(ZMAGE-Y%20remix).avif'
  }
];