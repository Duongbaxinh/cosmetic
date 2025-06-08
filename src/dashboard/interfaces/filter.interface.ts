export type Filters = {
    typeProduct: string[];
    categories: string[];
    stock: string;
    expiration: string;
    businessStatus: string;
    name: string;
    code: string;
};

export type FilterProductType = {
    limitnumber: number;
    page: number;
    product_type?: string[];
    product_price?: number[];
    product_discount?: boolean | null;
    product_brand?: string[];
    product_categories?: string[];
    sortBy?: string | null;
    order?: "asc" | "desc";
    textSearch?: string;
    product_sold?: any[];
};
