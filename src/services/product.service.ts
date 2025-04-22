import { useEffect, useState } from "react";
import { getData } from "../api";
import { Branch } from "../fakes/brand";
import { ProductEnum, ProductResponse } from "../types";

import { handleAxiosError } from "@/utils";

interface ParamsType {
  limit?: number;
  page?: number;
  [key: string]: any;
}

// export const useGetAllProducts = (
//   type?: ProductEnum | null,
//   params: ParamsType = {},
//   authenticated = false
// ) => {
//   const dispatch = useDispatch<AppDispatch>();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         dispatch(getProductStart());
//         const queryString = new URLSearchParams(params).toString();
//         const url = `/products${queryString ? `?${queryString}` : ""}`;
//         const response = await getData(url, authenticated);
//         console.log("response product ", response);
//         if (type === ProductEnum.PRODUCT_DISCOUNT) {
//           dispatch(
//             getProductSuccess({
//               type: ProductEnum.PRODUCT_DISCOUNT,
//               products: response as ProductResponse,
//             })
//           );
//         } else if (type === ProductEnum.PRODUCT_INTERNAL) {
//           dispatch(
//             getProductSuccess({
//               type: ProductEnum.PRODUCT_INTERNAL,
//               products: response as ProductResponse,
//             })
//           );
//         } else {
//           dispatch(
//             getProductSuccess({
//               type: "",
//               products: response as ProductResponse,
//             })
//           );
//         }
//       } catch (error) {
//         const mess = handleAxiosError(error);
//         dispatch(getFailure(mess));
//       }
//     };

//     fetchData();
//   }, []);
// };

// export const useGetProductDetail = (
//   product_id: string | number,
//   authenticated = false
// ) => {
//   const [product, setProduct] = useState<ProductResponse>(
//     {} as ProductResponse
//   );
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const url = `/products/${product_id}`;
//         console.log("URL:", url);
//         const response = await getData(url, authenticated);
//         setProduct(response as ProductResponse);
//         setLoading(false);
//         console.log("Response Data:", response);
//         return response as ProductResponse[];
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [product_id, authenticated]);

//   return { product, loading, error };
// };

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
//     const mess = handleAxiosError(error);
//     return mess;
//   }
// };
