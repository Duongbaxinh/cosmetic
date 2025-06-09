import { useEffect, useState } from "react";
import { getData } from "../api";
import { Branch } from "../fakes/brand";

interface ParamsType {
  limit?: number;
  page?: number;
  [key: string]: any;
}

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

        const response = await getData(url, authenticated);
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

// export const loadMore = async (
//   params: ParamsType = {},
//   authenticated = false
// ) => {
//   try {
//     const queryString = new URLSearchParams(params).toString();
//     const url = `/products${queryString ? `?${queryString}` : ""}`;
//     const response = await getData(url, authenticated);
//     return response as ProductResponse[];
//   } catch (error) {
//     const mess = handleError(error);
//     return mess;
//   }
// };
