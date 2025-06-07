import { ShippingAddress, UserProfileType, UserType } from "./auth.type";

export enum ProductEnum {
  "PRODUCT_INTERNAL" = "product_internationals",
  "PRODUCT_DISCOUNT" = "product_discounts",
}
export interface ImageProduct {
  id: string;
  image_url: string;
  alt_text: string;
  is_primary: boolean;
}

export type Category = {
  id: string;
  title: string;
  image: string;
  slug: string;
  types: ProductType[];
};

export type ProductDiscount = {
  discountDirect: number;
  discountPromotion: number;
  discountTitle: string;
};

export type ProductType = {
  id: string;
  title: string;
  slug: string;
  category: Category;
};

export type ProductTypeResponse = {
  results: ProductType[];
  limitnumber: number;
  page: number;
  page_size: number;
  number_page: number;
  count: number;
};

export type ProductBrand = {
  id: string;
  title: string;
  slug: string;
  image: string;
  specific: boolean;
};
export type ProductBrandTypeResponse = {
  results: ProductBrand[];
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
  product_discount_percent: number;
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
//

// CHECKOUT ORDER

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

export type OrderDetailType = {
  product_id: string;
  order_id: string;
  quantity: number;
};
export type OrderItemDisplayType = {
  id: string;
  product_name: string;
  product_price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
};

export type PaymentType = {
  order_id: string;
  trans_id: string;
  payment_method: "momo" | "zalopay";
};

export type PaymentResponse = {
  id: string;
  order: string;
  payment_method: "momo" | "zalo";
  status: "pending" | "paid" | "failed";
  trans_id: string;
  created_at: string; // ISO 8601 datetime string
  updated_at: string; // ISO 8601 datetime string
};

export type MomoPaymentResponse = {
  partnerCode: string;
  orderId: string;
  requestId: string;
  amount: number;
  responseTime: number;
  message: string;
  resultCode: number;
  payUrl: string;
  deeplink: string;
  qrCodeUrl: string;
};

// Cart
export type ProductCartDetail = {
  id: string;
  product_name: string;
  product_price: number;
  product_thumbnail: string;
  product_discount_percent: number;
  product_type: ProductType;
  product_brand: ProductBrand;
};
export type CartDetail = {
  id: string;
  product: ProductCartDetail;
  quantity: number;
  created_at: string;
  updated_at: string;
};

export type CartCheckout = {
  id: string;
  user: UserType;
  cart_details: CartDetail[];
  created_at: string;
  updated_at: string;
};
export type TrackingItem = {
  time: string;
  status?: string;
  detail: string;
  image?: string;
  type: "success" | "in_progress" | "delivering ";
};

export type OrderDetail = {
  order: OrderCheckout;
  order_tracking: TrackingItem[];
};

export type Brand = {
  id: string;
  image: string;
  title: string;
};

// REVIEW PRODUCT
export interface ReviewItem {
  user_name: string;
  rating: number;
  rating_text: string;
  comment: string;
  time_ago: string;
  images: string[];
}

export type JoyBoyCareResponse = {
  message: string;
  time_ago: string;
};
export type Review = {
  overall_rating: number;
  total_reviews: number;
  reviews: ReviewItem[];
  joyBoy_care_response: JoyBoyCareResponse;
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
  products: Product[];
  created_at: string;
  updated_at: string;
}
