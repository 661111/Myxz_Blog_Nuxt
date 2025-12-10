interface StatsEntry {
	posts: number
	words: number
}

interface CategoryEntry {
	name: string
	posts: number
	children?: CategoryEntry[]
}

interface TagEntry {
	name: string
	posts: number
	children?: TagEntry[]
}

export default defineEventHandler(async (event) => {
	const stats = {
		total: { posts: 0, words: 0 },
		annual: <Record<number, StatsEntry>>{},
		categories: <CategoryEntry[]>[],
		tags: <TagEntry[]>[],
	}

	const existedPath = new Map()

	const posts = await queryCollection(event, 'content').all()

	const findOrCreateCategory = (
		name: string,
		tree: CategoryEntry[],
	): CategoryEntry => {
		let category = tree.find(entry => entry.name === name)
		if (!category) {
			category = { name, posts: 0 }
			tree.push(category)
		}
		return category
	}

	// 标签查询
	const findOrCreateTag = (
		name: string,
		tree: TagEntry[],
	): TagEntry => {
		let tag = tree.find(entry => entry.name === name)
		if (!tag) {
			tag = { name, posts: 0 }
			tree.push(tag)
		}
		return tag
	}

	for (const post of posts) {
		// 重复路径检测
		if (existedPath.has(post.path))
			console.warn('文章存在重复路径', post.path)
		existedPath.set(post.path, true)

		// 文章/总字数计数
		stats.total.posts++
		stats.total.words += post.readingTime.words

		if (!post.date)
			continue

		// 年文章/年字数计数
		const year = new Date(post.date).getFullYear()
		if (!stats.annual[year]) {
			stats.annual[year] = { posts: 0, words: 0 }
		}

		stats.annual[year].posts++
		stats.annual[year].words += post.readingTime.words

		// 分类文章计数
		const categories = post.categories || []
		let currentLevel = stats.categories

		for (const [index, categoryName] of categories.entries()) {
			if (typeof categoryName !== 'string')
				continue

			const category = findOrCreateCategory(categoryName, currentLevel)
			category.posts++

			if (index < categories.length - 1) {
				if (!category.children)
					category.children = []
				currentLevel = category.children
			}
		}

		// 标签统计
		const tags = post.tags || []
		let currentLevelTag = stats.tags
		for (const [index, tagsName] of tags.entries()) {
			if (typeof tagsName !== 'string')
				continue

			const tag = findOrCreateTag(tagsName, currentLevelTag)
			tag.posts++

			if (index < categories.length - 1) {
				if (!tag.children)
					tag.children = []
				currentLevelTag = tag.children
			}
		}
	}

	return stats
})