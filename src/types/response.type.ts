import { Role, ShippingAddress, UserProfileType } from "./auth.type";
import { OrderProduct, Product, Review } from "./data.type";
export type ProductResponse = {
  results: Product[];
  limitnumber: number;
  page: number;
  page_size: number;
  number_page: number;
  count: number;
};

export interface RegisterResponse {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: Role;
  is_active: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export type ReviewResponse = {
  reviews: Review;
};

// export type OrderResponse = {
//   orders: OrderCheckout[];
// };
export type OrderResponse = {
  id: string;
  user: UserProfileType;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shipping_address: ShippingAddress;
  order_details: OrderProduct[];
  total_price: number;
  created_at: string;
  updated_at: string;
};

export type ResponseType<T> = {
  message: string;
  data: T;
};

export type CategoryFilter = {
  key: string;
  title: string;
};
