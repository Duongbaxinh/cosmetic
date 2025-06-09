import { UserType } from "./auth.type";
import { ProductCartDetail } from "./product.type";

export type CartDetail = {
  id: string;
  product: ProductCartDetail;
  quantity: number;
  created_at: string;
  updated_at: string;
};

export type CartCheckoutType = {
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
