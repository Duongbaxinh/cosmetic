import { Role, ShippingAddress, UserProfileType } from "./auth.type";
import { OrderProduct } from "./data.type";
import { PaymentResponse } from "./payment.type";
import { Product } from "./product.type";
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

// export type OrderResponse = {
//   orders: OrderCheckout[];
// };
export type OrderResponse = {
  id: string;
  user: UserProfileType;
  status:
    | "pending"
    | "confirmed"
    | "prepared"
    | "shipping"
    | "delivered"
    | "cancelled"
    | "returned";
  total_price: number;
  shipping_address: ShippingAddress;
  order_details: OrderProduct[];
  payment: PaymentResponse;
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
