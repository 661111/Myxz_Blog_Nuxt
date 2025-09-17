import type { FeedGroup } from '~/types/feed'
import { getGhAvatar } from './utils/img'

export default [{
    name: '漫游',
    desc: '网上冲浪时发现的精彩内容与常读订阅，与君共享。',
    entries: [{
        author: '风记星辰',
        desc: '热爱你来过的每度温暖',
        feed: 'https://www.thyuu.com/feed',
        link: 'https://thyuu.com/',
        icon: 'https://std.thyuu.com/logo.svg',
        avatar: 'https://std.thyuu.com/logo.svg',
        archs: ['WordPress', '服务器'],
        date: '2024-02-01',
    }],
}] satisfies FeedGroup[]
