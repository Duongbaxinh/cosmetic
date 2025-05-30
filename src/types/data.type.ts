import { ShippingAddress, UserProfileType, UserType } from "./auth.type";

export enum ProductEnum {
  "PRODUCT_INTERNAL" = "product_internationals",
  "PRODUCT_DISCOUNT" = "product_discounts",
}

export type Product = {
  id: string;
  product_name: string;
  product_description: string;
  product_ingredient: string;
  product_sold?: number;
  product_international: boolean;
  product_thumbnail: string;
  product_price: number;
  product_rate: number;
  product_type: string;
  product_discount: boolean;
  product_made: string;
  product_brand: string;
  product_images: string[];
  product_special: string[];
  product_exp: string;
  product_discount_start: number;
  product_discount_end: number;
};

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

// export type OrderProduct = {
//   id: string;
//   product_price: number;
//   product_price_cost: number;
//   product_thumbnail: string;
//   product_name: string;
//   product_quantity: number;
//   product_total_price: number;
//   product_discount: number;
// };

export type OrderProduct = {
  id: string;
  product_name: string;
  product_price: number;
  product_thumbnail: string;
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

export type CartDetail = {
  id: string;
  product: Product;
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
