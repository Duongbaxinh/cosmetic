"use client";
import { initFilter } from "@/dashboard/consts";
import {
  useGetAllBrandQuery,
  useGetBrandsQuery,
} from "@/redux/slices/brand.slice";
import { useGetAllCategoryQuery } from "@/redux/slices/category.slice";
import {
  useGetAllProductsQuery,
  useGetProductFilterQuery,
} from "@/redux/slices/product.slice";
import { useGetAllPromotionQuery } from "@/redux/slices/promotion.slice";
import { useGetTypeQuery } from "@/redux/slices/typeproduct.slice";
import {
  DataContextType,
  FilterProductType,
  initParam,
  ParamFilter,
} from "@/types";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useAuth } from "./auth.context";

const DataManageContext = createContext<DataContextType | undefined>(undefined);

export const DataManageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [params, setParams] = useState<ParamFilter>(initParam);
  const [filters, setFilters] = useState<FilterProductType>(initFilter);
  const { userProfile } = useAuth()

  const { data: productTypes, isLoading: isLoadingTypes, error: errorTypes, } = useGetTypeQuery({ ...params.type, vendor: ["shopvtk"] });
  const { data: brands, isLoading: loadingBrand, error: errorBrand, } = useGetBrandsQuery({ ...params.brand, vendor: "shopvtk" });

  const { data: allBrand } = useGetAllBrandQuery();
  const { data: products, refetch } = useGetProductFilterQuery(
    { ...filters, vendor: userProfile?.shop?.slug },
    { skip: !userProfile?.shop?.slug }
  );
  const { data: categories, isLoading, error } = useGetAllCategoryQuery();

  const {
    data: promotions,
    isLoading: loadingPromotion,
    error: errorPromotion,
  } = useGetAllPromotionQuery();

  return (
    <DataManageContext.Provider
      value={{
        brands: brands,
        allBrand,
        categories: categories || [],
        productTypes: productTypes,
        promotions: promotions || [],
        products: products,
        params,
        setParams,
        refetch,
        filters,
        setFilters,
      }}
    >
      {children}
    </DataManageContext.Provider>
  );
};

export const useDataManage = () => {
  const context = useContext(DataManageContext);
  if (!context) {
    throw new Error("useDataManage must be used within a DataManageProvider");
  }
  return context;
};
