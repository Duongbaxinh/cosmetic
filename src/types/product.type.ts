import { BrandType } from "./brand.type";
import { Category } from "./data.type";

export interface ProductImageType {
  id?: string;
  product_id?: string;
  image_url: string;
  alt_text: string;
  is_primary?: boolean;
}

export type ProductDiscountType = {
  discountDirect: number;
  discountPromotion: number;
  discountTitle: string;
};

export type TypeProductType = {
  id: string;
  title: string;
  slug: string;
  category: Category | null;
};

export type ProductTypeResponse = {
  results: TypeProductType[];
  limitnumber: number;
  page: number;
  page_size: number;
  number_page: number;
  count: number;
};

export type ProductPromotion = {
  id: string;
  title: string;
  discount_percent: number;
};

export type Product = {
  id: string;
  product_vendor: ProductVendor;
  product_name: string;
  product_slug: string;
  product_description?: string;
  product_ingredient: string;
  product_sold: number;
  product_international: boolean;
  product_thumbnail: string;
  product_price: number;
  product_rate: number;
  product_type: TypeProductType | null;
  product_discount: boolean;
  product_discount_percent: number;
  product_made: string;
  product_brand: BrandType;
  product_images: ProductImageType[];
  product_special?: string[];
  product_exp?: string | null;
  product_discount_start: string | null;
  product_discount_end: string | null;
  product_promotion: ProductPromotion;
  product_stock_quantity: number;
  is_active: boolean;
  product_expiration_date: null | string;
  created_at: string;
  updated_at: string;
};

export type ProductFormData = {
  product_name: string;
  product_price: number;
  product_thumbnail: string;
  product_type_id: string;
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
  product_slug?: string;
  product_images: {
    image_url: string;
    is_primary?: boolean;
  }[];
};

export type ProductCartDetail = {
  id: string;
  product_name: string;
  product_price: number;
  product_thumbnail: string;
  product_discount_percent: number;
  product_discount_promotion: {
    id: string;
    title: string;
    discount_percent: number;
  };
  product_type: TypeProductType;
  product_brand: BrandType;
  product_vendor: ProductVendor;
};

type ProductVendor = {
  id: string;
  user: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  phone: string;
  address: string;
  is_active: boolean;
  created_at: string; // ISO 8601 datetime string
  updated_at: string; // ISO 8601 datetime string
};
