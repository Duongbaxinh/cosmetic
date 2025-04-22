import { Branch } from "@/fakes/brand";
import { ProductResponse } from "./response.type";

export type ProductSlice = {
  products: ProductResponse;
  brands: Branch[];
  product_discounts: ProductResponse;
  product_internationals: ProductResponse;
  loading: boolean;
  loadingMore: boolean;
  errors: string | null;
};
