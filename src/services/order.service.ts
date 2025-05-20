import { getData, postData, putData } from "@/api";
import { OrderCheckout, OrderDetail, TrackingItem } from "@/types";
import { handleError } from "@/utils";
import { useEffect, useState } from "react";

export const placeOrder = async (payload: any, authenticated: boolean) => {
  try {
    const url = `/order`;
    const response = await postData(url, payload, authenticated);
    return response as { order_id: string };
  } catch (error) {
    handleError(error);
  }
};

export const confirmOrder = async (payload: any, authenticated: boolean) => {
  try {
    const url = `/order`;
    const response = await putData(url, payload, authenticated);
    return response as { order_id: string };
  } catch (error) {
    handleError(error);
  }
};

export const applyDiscount = async (payload: any, authenticated: boolean) => {
  try {
    const url = `/order`;
    const response = await putData(url, payload, authenticated);
    return response as { order_id: string };
  } catch (error) {
    handleError(error);
  }
};

export const useOrderCheckout = (order_id: string, authenticated: boolean) => {
  const [order, setOrder] = useState<OrderCheckout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const url = `/order_checkout/${order_id}`;
        const url_order = `/order_checkout`;
        const url_tracking = `/order_trackings`;
        const response_order = await getData(url_order, authenticated);
        const order_trackings = await getData(url_tracking, authenticated);
        setOrder(response_order as OrderCheckout);
        setLoading(false);
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

export const useGetProductOrder = (
  order_id: string,
  authenticated: boolean
) => {
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const url = `/order_checkout/${order_id}`;
        const url_order = `/order_checkout`;
        const url_tracking = `/order_trackings`;
        const response_order = await getData(url_order, authenticated);
        const order_trackings = await getData(url_tracking, authenticated);
        setOrderDetail({
          order: response_order as OrderCheckout,
          order_tracking: order_trackings as TrackingItem[],
        });
        setLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { orderDetail, loading, error, setOrderDetail };
};

export const useGetOrder = (status: string, authenticated: boolean) => {
  const [orders, setOrders] = useState<OrderCheckout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `/orders`;
        const response = await getData(url, authenticated);
        setOrders(response as OrderCheckout[]);
        setLoading(false);
        return response as OrderCheckout[];
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { orders, loading, error, setOrders };
};
