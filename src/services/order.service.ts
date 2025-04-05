import { getData, postData, putData } from "@/api";
import { OrderCheckout } from "@/types";
import { handleAxiosError } from "@/utils";
import { useEffect, useState } from "react";

export const placeOrder = async (payload: any, authenticated: boolean) => {
  try {
    const url = `/order`;
    const response = await postData(url, payload, authenticated);
    return response as { order_id: string };
  } catch (error) {
    handleAxiosError(error);
  }
};

export const confirmOrder = async (payload: any, authenticated: boolean) => {
  try {
    const url = `/order`;
    const response = await putData(url, payload, authenticated);
    return response as { order_id: string };
  } catch (error) {
    handleAxiosError(error);
  }
};

export const applyDiscount = async (payload: any, authenticated: boolean) => {
  try {
    const url = `/order`;
    const response = await putData(url, payload, authenticated);
    return response as { order_id: string };
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useGetProductOrder = (
  order_id: string,
  authenticated: boolean
) => {
  const [order, setOrder] = useState<OrderCheckout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const url = `/order_checkout/${order_id}`;
        const url = `/order_checkout`;
        const response = await getData(url, authenticated);
        setOrder(response as OrderCheckout);
        setLoading(false);
        console.log("Response Data Order :::", response);
        return response as OrderCheckout;
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { order, loading, error, setOrder };
};
