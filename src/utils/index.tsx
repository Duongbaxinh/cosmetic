import { Brand } from "@/types"

export * from "./handleError"
export * from "./createParam"
export * from "./handleRate"

export const getNameBrand = (arr: Brand[], id: string) => {
    return arr.find(item => item.id === id)?.title
}

