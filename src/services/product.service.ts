import { useEffect, useState } from "react";
import { getData } from "../api";
import { Branch } from "../fakes/brand";
import { Product } from "../types";

interface ParamsType {
  limit?: number;
  page?: number;
  [key: string]: any;
}

export const useGetAllProducts = (
  params: ParamsType = {},
  authenticated = false
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const queryString = new URLSearchParams(params).toString();
        const url = `/products${queryString ? `?${queryString}` : ""}`;
        console.log("URL:", url);

        const response = await getData(url, authenticated);
        if (params.product_international) {
          const responseData = response as Product[];
          const filteredResponse = responseData.filter(
            (product: Product) =>
              product.product_international === params.product_international
          );
          setProducts(filteredResponse as Product[]);
        } else if (params.discount) {
          const responseData = response as Product[];
          const filteredResponse = responseData.filter(
            (product: Product) => product.product_discount === params.discount
          );
          console.log("Filtered Response:", filteredResponse);
          setProducts(filteredResponse as Product[]);
        } else if (params.type) {
          const responseData = response as Product[];
          const filteredResponse = responseData.filter(
            (product: Product) => product.product_type === params.type
          );
          console.log("Filtered Response:", filteredResponse);
          setProducts(filteredResponse as Product[]);
        } else {
          const responseData = response as Product[];
          setProducts(responseData.splice(0, params.limit) as Product[]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params, authenticated]);

  return { products, loading, error };
};

export const useGetProductDetail = (
  product_id: string | number,
  authenticated = false
) => {
  const [product, setProduct] = useState<Product>({} as Product);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `/products/${product_id}`;
        console.log("URL:", url);
        const response = await getData(url, authenticated);
        setProduct(response as Product);
        setLoading(false);
        console.log("Response Data:", response);
        return response as Product[];
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [product_id, authenticated]);

  return { product, loading, error };
};

export const useGetBrand = (params: ParamsType = {}, authenticated = false) => {
  const [brands, setBrands] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const queryString = new URLSearchParams(params).toString();
        const url = `/brands${queryString ? `?${queryString}` : ""}`;
        console.log("URL:", url);

        const response = await getData(url, authenticated);
        console.log("Response Data brand:", response);
        const responseData = response as Branch[];
        setBrands(responseData.splice(0, params.limit) as Branch[]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params, authenticated]);

  return { brands, loading, error };
};
