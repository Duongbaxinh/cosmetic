import { ShippingAddress, UserProfileType, UserType } from "./auth.type";
import { BrandType } from "./brand.type";
import { Product, TypeProductType } from "./product.type";

export type Category = {
  id: string;
  title: string;
  image: string;
  slug: string;
  types: TypeProductType[];
};

export type OrderUser = {
  user_id: number;
  user_name: string;
  user_address: string;
};

export type OrderStorage = {
  order_quantity: number;
  order_total_price: number;
  order_discount: number;
  order_final_price: number;
  order_shipping: number;
  order_expected_delivery_time: string; // ISO format datetime string
  order_user: {
    user_id: number;
    user_name: string;
    user_address: string;
  };
  order_products: {
    id: number | undefined; // nếu có thể là undefined, nếu không thì chỉ để number
    product_price: number | undefined;
    product_thumbnail: string | undefined;
    product_name: string | undefined;
    product_quantity: number;
    product_total_price: number | undefined;
    product_discount: number;
  }[];
};

export type OrderProduct = {
  id: string;
  product_name: string;
  product_price: number;
  product_brand: string;
  product_type: string;
  product_thumbnail: string;
  product_discount?: number;
  quantity: number;
  created_at?: string;
  updated_at?: string;
};

export type OrderCheckout = {
  order_id: string;
  order_quantity: number;
  order_total_price: number;
  order_discount: number;
  order_code_discount: string;
  order_final_price: number;
  order_shipping: number;
  order_shippingAddress: ShippingAddress;
  order_paid: boolean;
  order_amount_paid: number;
  order_amount_rest: number;
  order_payment_method: "CASH" | "CARD";
  order_discount_shipping: number;
  order_expected_delivery_time: Date;
  order_user: OrderUser;
  order_products: OrderProduct[];
};

export type OrderType = {
  id: string;
  user: UserProfileType;
  status:
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "confirmed";
  total_price: number;
  shipping_address: ShippingAddress;
  order_details: OrderProduct[];
  created_at: string;
  updated_at: string;
};

export type OrderProductDetail = {
  id: string;
  product: Product;
  reviewed?: boolean;
  quantity: number;
  created_at?: string;
  updated_at?: string;
};

export type OrderDetailType = {
  product_id: string;
  order_id: string;
  quantity: number;
};

// REVIEW PRODUCT
export interface ReviewItemType {
  user_name: string;
  rating: number;
  rating_text: string;
  comment: string;
  time_ago: string;
  images: string[];
}

export type ReviewType = {
  overall_rating: number;
  total_reviews: number;
  reviews: ReviewItemType[];
};

// PROMOTION
export interface Promotion {
  id: string;
  vendor: any;
  title: string;
  slug: string;
  thumbnail: string;
  discount_percent: number;
  start_date: string;
  end_date: string;
  products: Product[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PromotionFormType {
  title: string;
  thumbnail?: string;
  discount_percent: number;
  start_date: string;
  end_date: string;
  product_ids: string[];
}
