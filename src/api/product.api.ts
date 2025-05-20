import { handleError } from "../utils";
import instance from "../config/axios.config";

// GET ALL PRODUCTS
export const getAllProducts = async (authenticated?: any) => {
  try {
    const response = await instance().get("/products");
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error("Failed to fetch products");
  }
};

export const getDetailProduct = async (authenticated: any) => {
  try {
    const response = await instance(authenticated).get("/products");
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error("Failed to fetch products");
  }
};
