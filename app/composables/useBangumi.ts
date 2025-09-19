import type { BilibiliBangumiResponse } from '../types/BilibiliBangumi'

export type CollectionType = keyof typeof TYPE_ID_MAP
export type ContentTypes = keyof typeof ContentType

export const ITEMS_PER_PAGE = 20

const TYPE_ID_MAP = {
	wish: 1,
	collect: 2,
	do: 3,
} as const

const ContentType = {
	bangumi: 1,
	tv: 2,
} as const

export default function useBangumiCollection(
	contentType: Ref<ContentTypes> = ref('bangumi'),
	collectionType: Ref<CollectionType> = ref('wish'),
	page: Ref<number> = ref(1),
) {
	const BilibiliUserId = '3546572553980802'

	const statusId = computed(() => TYPE_ID_MAP[toValue(collectionType)])
	const typeId = computed(() => ContentTypes[toValue(contentType)])
	const offset = computed(() => (page.value - 1) * ITEMS_PER_PAGE)

	const { data } = useFetch<BilibiliBangumiResponse>(
		() => {
			return `https://api.bilibili.com/x/space/bangumi/follow/list?vmid=${BilibiliUserId}&type=${typeId.value}&follow_status=${statusId.value}`
		},
		{
			key: () =>
				`bangumi-${contentType}-${collectionType.value}-page-${page.value}`,
		},
	)

	const totalPages = computed(() =>
		data.value ? Math.ceil(data.value.total / ITEMS_PER_PAGE) : 0,
	)

	return {
		data,
		totalPages,
	}
}