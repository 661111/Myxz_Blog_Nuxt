// import type { BangumiFollowResponse, CinemaFollowResponse } from '~/types/bililbilil'

// export type ContentType = 'anime' | 'game' | 'real' | 'book' | 'music'
// export type CollectionType = keyof typeof TYPE_ID_MAP

// export const ITEMS_PER_PAGE = 20

// const TYPE_ID_MAP = {
// 	wish: 1,
// 	collect: 2,
// 	do: 3,
// } as const

// export default function useBangumiCollection(
// 	contentType: ContentType = 'anime',
// 	collectionType: Ref<CollectionType> = ref('wish'),
// 	page: Ref<number> = ref(1),
// ) {
// 	const username = 'kemiao'

// 	const subjectType = computed(() => contentType === 'anime' ? 2 : contentType === 'game' ? 4 : contentType === 'book' ? 1 : contentType === 'real' ? 6 : 6)
// 	const typeId = computed(() => TYPE_ID_MAP[toValue(collectionType)])
// 	const offset = computed(() => (page.value - 1) * ITEMS_PER_PAGE)

// 	const { data, status, error } = useFetch<BangumiFollowResponse | CinemaFollowResponse>(
// 		() => {
// 			return `https://api.bgm.tv/v0/users/${username}/collections?subject_type=${subjectType.value}&type=${typeId.value}&limit=${ITEMS_PER_PAGE}&offset=${offset.value}`
// 		},
// 		{
// 			key: () =>
// 				`bangumi-${contentType}-${collectionType.value}-page-${page.value}`,
// 		},
// 	)

// 	const totalPages = computed(() =>
// 		data.value ? Math.ceil(data.value.total / ITEMS_PER_PAGE) : 0,
// 	)

// 	return {
// 		data,
// 		status,
// 		error,
// 		totalPages,
// 	}
// }