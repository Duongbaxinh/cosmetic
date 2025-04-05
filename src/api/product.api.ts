import { handleAxiosError } from "../utils";
import instance from "../config/axios.config";

// GET ALL PRODUCTS
export const getAllProducts = async (authenticated?: any) => {
  try {
    const response = await instance().get("/products");
    console.log("Response Data:", response);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Failed to fetch products");
  }
};

export const getDetailProduct = async (authenticated: any) => {
  try {
    const response = await instance(authenticated).get("/products");
    console.log("Response Data:", response);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw new Error("Failed to fetch products");
  }
};
