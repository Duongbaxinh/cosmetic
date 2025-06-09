import { handleError } from "@/utils";
import { postData } from "../api";
import { CartCheckoutType } from "../types";

interface ParamsType {
  limit?: number;
  page?: number;
  [key: string]: any;
}

export const handleCheckout = async (payload: any, authenticated = false) => {
  try {
    const url = `/cart`;
    const response = await postData(url, payload, authenticated);
    return response as CartCheckoutType;
  } catch (error) {
    handleError(error);
  }
};
