export type TCheckoutPage = {
  order_id: string;
};

export type FilterProductType = {
  limit: number;
  page: number;
  category: string;
  brand: string[];
  rate: number;
  price: number[];
  sortBy: "" | "asc" | "desc";
  sortPrice: "" | "asc" | "desc";
  order: "asc" | "desc";
};
