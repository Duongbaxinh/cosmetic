import { useEffect, useState } from "react";
import { deleteAll, deleteData, deleteMany, getData, postData } from "../api";
import { CartCheckoutType } from "../types";
import { handleError } from "@/utils";

export const useGetProductCart = (authenticated = false) => {
  const [cart, setCart] = useState<CartCheckoutType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `/cart`;
        const response = await getData(url, authenticated);
        setCart(response as CartCheckoutType);

        setLoading(false);
        return response as CartCheckoutType;
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return { cart, loading, error, setCart };
};

export const deleteCartProduct = async (
  cart_id: string,
  id: string,
  authenticated = true
) => {
  try {
    const url = `/cart/${cart_id}/delete/${id}`;
    const response = await deleteData(url, authenticated);
    return response as CartCheckoutType;
  } catch (error) {
    handleError(error);
  }
};

export const deleteCartManyProduct = async (
  cart_id: string,
  payload: any,
  authenticated = true
) => {
  try {
    const url = `/cart/delete/${cart_id}`;
    const response = await deleteMany(url, payload, authenticated);
    return response as CartCheckoutType;
  } catch (error) {
    handleError(error);
  }
};

export const deleteCartProductAll = async (
  cart_id: string,
  authenticated = true
) => {
  try {
    const url = `/cart/delete/all/${cart_id}`;
    const response = await deleteAll(url, authenticated);
    return response as CartCheckoutType;
  } catch (error) {
    handleError(error);
  }
};
