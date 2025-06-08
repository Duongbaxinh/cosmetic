import {ShippingAddress, UserProfileType} from "./auth.type";
// PRODUCT
export interface ImageProduct {
    id?: string;
    image_url: string;
    alt_text: string;
    is_primary?: boolean;
}

export type ProductResponse = {
    results: IProduct[];
    limitnumber: number;
    page: number;
    page_size: number;
    number_page: number;
    count: number;
};

// Type
export type ProductType = {
    id: string;
    title: string;
    image: string;
    slug: string;
};

export type ProductTypeResponse = {
    results: ProductType[];
    limitnumber: number;
    page: number;
    page_size: number;
    number_page: number;
    count: number;
};

export type Category = {
    id: string;
    title: string;
    image: string;
    slug: string;
};

export type ProductBrand = {
    id: string;
    title: string;
    slug: string;
    image: string;
    specific: boolean;
};

export type ProductPromotion = {
    id: string;
    title: string;
    discount_percent: number;
};

export type IProduct = {
    id: string;
    product_name: string;
    product_slug: string;
    product_description?: string;
    product_ingredient: string;
    product_sold: number;
    product_international: boolean;
    product_thumbnail: string;
    product_price: number;
    product_rate: number;
    product_type: ProductType;
    product_discount: boolean;
    product_made: string;
    product_brand: ProductBrand;
    product_images: ImageProduct[];
    product_special?: string[];
    product_exp?: string;
    product_discount_start: string;
    product_discount_end: string;
    product_promotion: ProductPromotion;
    product_stock_quantity: number;
    is_active: boolean;
    product_expiration_date: null | string;
    created_at: string;
    updated_at: string;
};

// ORDER
export type statusOrderType =
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
export type OrderUser = {
    user_id: number;
    user_name: string;
    user_address: string;
};

export type OrderProduct = {
    id: string;
    product_name: string;
    product_price: number;
    product_thumbnail: string;
    quantity: number;
    created_at?: string;
    updated_at?: string;
};

export type OrderStorage = {
    order_quantity: number;
    order_total_price: number;
    order_discount: number;
    order_final_price: number;
    order_shipping: number;
    order_expected_delivery_time: string;
    order_user: {
        user_id: number;
        user_name: string;
        user_address: string;
    };
    order_products: {
        id: number | undefined;
        product_price: number | undefined;
        product_thumbnail: string | undefined;
        product_name: string | undefined;
        product_quantity: number;
        product_total_price: number | undefined;
        product_discount: number;
    }[];
};

export type OrderType = {
    id: string;
    user: UserProfileType;
    status: statusOrderType;
    total_price: number;
    shipping_address: ShippingAddress;
    order_details: OrderProduct[];
    created_at: string;
    updated_at: string;
};

export type OrderResponse = {
    id: string;
    user: UserProfileType;
    status: statusOrderType;
    shipping_address: ShippingAddress;
    order_details: OrderProduct[];
    total_price: number;
    created_at: string;
    updated_at: string;
};

// CATEGORY
export type CategoryProduct = {
    id: string;
    title: string;
    image: string;
    slug: string;
};
// BRAND
export type BrandType = {
    id: string;
    title: string;
    slug: string;
    image: string;
    specific: boolean;
};

export type BrandTypeResponse = {
    results: BrandType[];
    limitnumber: number;
    page: number;
    page_size: number;
    number_page: number;
    count: number;
};

// PROMOTION
export interface Promotion {
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
    discount_percent: number;
    start_date: string | null;
    end_date: string | null;
    products: IProduct[];
    created_at: string;
    updated_at: string;
}
