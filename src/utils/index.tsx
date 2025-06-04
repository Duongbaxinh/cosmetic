import { Brand, Category, ProductType } from "@/types"

export * from "./handleError"
export * from "./createParam"
export * from "./handleRate"

export const getNameBrand = (arr: Brand[], id: string) => {
    return arr.find(item => item.id === id)?.title
}

export const getTypeCategory = (categories: Category[], categorySlug: string): ProductType[] => {
    return categories.find(cate => cate.slug === categorySlug)?.types || []
}
