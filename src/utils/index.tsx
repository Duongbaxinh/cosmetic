import { BrandType, Category, TypeProductType } from "@/types"

export * from "./handleError"
export * from "./createParam"
export * from "./handleRate"

export const getNameBrand = (arr: BrandType[], id: string) => {
    return arr.find(item => item.id === id)?.title
}

export const getTypeCategory = (categories: Category[], categorySlug: string): TypeProductType[] => {
    return categories.find(cate => cate.slug === categorySlug)?.types || []
}

