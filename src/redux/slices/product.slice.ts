import { PayloadAction } from "./../../../node_modules/@reduxjs/toolkit/src/createAction";
import { Product, ProductSlice } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProductSlice = {
  products: [],
  loading: false,
  errors: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductStart: (state) => {
      state.loading = true;
      state.errors = null;
    },
    getProductSuccess: (state, action: PayloadAction<Array<Product>>) => {
      state.loading = false;
      state.products = action.payload;
    },
    getProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});

export const { getProductStart, getProductSuccess, getProductsFailure } =
  productSlice.actions;
export default productSlice.reducer;
