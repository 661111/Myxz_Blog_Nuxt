// Bilibili Bangumi API 响应类型
export interface BilibiliBangumiResponse {
    data: BilibiliBangumiCollectionItem[]
}

// 中间数值
export interface BilibiliBangumiCollectionItem{
	list: BilibiliBangumiCollectionItem[]
}

// 作品主体信息
export interface BilibiliBangumiCollectionItem {
    title: string
	cover: string
	season_id: number
	new_ep: new_ep[]
	reting: reting[]
}

export interface new_ep {
	pub_time: string
}

export interface reting {
	score: string
}