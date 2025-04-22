import { PAYMENT_METHOD } from "@/consts";

export enum ProductEnum {
  "PRODUCT_INTERNAL" = "product_internationals",
  "PRODUCT_DISCOUNT" = "product_discounts",
}

export type Product = {
  product_id: string | number;
  product_name: string;
  product_description: string;
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
  product_discount_start: number;
  product_discount_end: number;
};

// CHECKOUT ORDER

export type OrderUser = {
  user_id: number;
  user_name: string;
  user_address: string;
};

export type OrderProduct = {
  product_id: string;
  product_price: number;
  product_price_cost: number;
  product_thumbnail: string;
  product_name: string;
  product_quantity: number;
  product_total_price: number;
  product_discount: number;
};

export type OrderCheckout = {
  order_id: string;
  order_quantity: number;
  order_total_price: number;
  order_discount: number;
  order_code_discount: string;
  order_final_price: number;
  order_shipping: number;
  order_paid: boolean;
  order_amount_paid: number;
  order_amount_rest: number;
  order_payment_method: "CASH" | "CARD";
  order_discount_shipping: number;
  order_expected_delivery_time: Date;
  order_user: OrderUser;
  order_products: OrderProduct[];
};

export type CartCheckout = {
  cart_id: string;
  cart_quantity: number;
  cart_total_price: number;
  cart_discount: number;
  cart_final_price: number;
  cart_shipping: number;
  cart_discount_shipping: number;
  cart_user: OrderUser;
  cart_products: OrderProduct[];
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
  name: string;
};
