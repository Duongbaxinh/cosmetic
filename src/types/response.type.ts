import { OrderCheckout, Product, Review } from "./data.type";
export type ProductResponse = {
  products: Product[];
  limit: number;
  page: number;
  total_page: number;
  total: number;
};

export type ReviewResponse = {
  reviews: Review;
};

export type OrderResponse = {
  orders: OrderCheckout[];
};

export type ResponseType<T> = {
  message: string;
  data: T;
};

export type CategoryFilter = {
  key: string;
  title: string;
};
