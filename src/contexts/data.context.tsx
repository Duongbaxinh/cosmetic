"use client"
import { initFilter } from "@/dashboard/consts";
import { useGetAllBrandQuery, useGetBrandsQuery } from "@/redux/slices/brand.slice";
import { useGetAllCategoryQuery } from "@/redux/slices/category.slice";
import { useGetAllProductsQuery, useGetProductFilterQuery } from "@/redux/slices/product.slice";
import { useGetAllPromotionQuery } from "@/redux/slices/promotion.slice";
import { useGetTypeQuery } from "@/redux/slices/typeproduct.slice";
import { DataContextType, FilterProductType, initParam, ParamFilter } from "@/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

const DataContext = createContext<DataContextType | undefined>(undefined);


export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [params, setParams] = useState<ParamFilter>(initParam)
    const [filters, setFilters] = useState<FilterProductType>(initFilter);
    const { data: productTypes, isLoading: isLoadingTypes, error: errorTypes } = useGetTypeQuery(params.type)
    const { data: brands, isLoading: loadingBrand, error: errorBrand } = useGetBrandsQuery(params.brand)
    const { data: allBrand } = useGetAllBrandQuery()
    const { data: products, refetch } = useGetProductFilterQuery(filters)
    const { data: categories, isLoading, error } = useGetAllCategoryQuery()

    const { data: promotions, isLoading: loadingPromotion, error: errorPromotion } = useGetAllPromotionQuery()

    return (
        <DataContext.Provider
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
                setFilters
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
