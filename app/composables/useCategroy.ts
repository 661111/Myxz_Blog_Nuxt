import type ArticleProps from '~/types/article'

export default function useCategory(
    type: Ref<ArticleProps["categories"]> = ref(['小说'])
) {
    const categoryShow = type
    
    return {
        categoryShow
    }
}