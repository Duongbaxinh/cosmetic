import {statusOrderType} from "./data.type";

export type ProductFormData = {
    product_name: string;
    product_price: number;
    product_thumbnail: string;
    product_type_id: string;
    product_brand_id: string;
    product_made: string;
    product_discount: boolean;
    product_discount_percent: number;
    product_discount_start: string | null;
    product_discount_end: string | null;
    product_promotion_id: string;
    product_international: boolean;
    product_description: string;
    product_ingredient: string;
    product_stock_quantity: number;
    product_expiration_date: string;
};

export type ProductFormDataUpdate = {
    product: ProductFormData;
    product_slug: string;
};

export type OrderFormData = {
    id: string;
    user: {id: string; name: string; email: string};
    phone: string;
    status: statusOrderType;
    shipping_address: {
        id: string;
        address_line1: string;
        address_line2?: string;
        city: string;
        country: string;
        postal_code: string;
    };
    order_details: {
        id: string;
        product_name: string;
        product_price: number;
        product_brand: string;
        product_type: string;
        product_thumbnail: string;
        quantity: number;
    }[];
    total_price: number;
    created_at: string;
    updated_at: string;
};
