import { handleAxiosError } from "@/utils";
import { postData } from "../api";
import { CartCheckout } from "../types";

interface ParamsType {
  limit?: number;
  page?: number;
  [key: string]: any;
}

export const handleCheckout = async (payload: any, authenticated = false) => {
  try {
    const url = `/cart`;
    const response = await postData(url, payload, authenticated);
    return response as CartCheckout;
  } catch (error) {
    handleAxiosError(error);
  }
};
