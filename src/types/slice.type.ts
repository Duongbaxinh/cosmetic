import { Product } from "./data.type";

export type ProductSlice = {
  products: Product[] | [];
  loading: boolean;
  errors: string | null;
};
