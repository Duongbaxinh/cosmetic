import { Product } from "./data.type";
export type ProductResponse = {
  products: Product[];
  limit: number;
  page: number;
  total_page: number;
  total: number;
};
export type ResponseType<T> = {
  message: string;
  data: T;
};

export type CategoryFilter = {
  key: string;
  title: string;
};
