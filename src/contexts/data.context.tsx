"use client"
import { useGetBrandsQuery } from "@/redux/slices/brand.slice";
import { useGetAllCategoryQuery } from "@/redux/slices/category.slice";
import { useGetAllProductsQuery } from "@/redux/slices/product.slice";
import { useGetAllPromotionQuery } from "@/redux/slices/promotion.slice";
import { useGetAllTypeQuery } from "@/redux/slices/typeproduct.slice";
import { DataContextType } from "@/types";
import React, { createContext, ReactNode, useContext } from "react";

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { data: products, isLoading: loadingProduct, error: errorProduct } = useGetAllProductsQuery()
    const { data: categories, isLoading, error } = useGetAllCategoryQuery()
    const { data: productTypes, isLoading: isLoadingTypes, error: errorTypes } = useGetAllTypeQuery()
    const { data: brands, isLoading: loadingBrand, error: errorBrand } = useGetBrandsQuery()
    const { data: promotions, isLoading: loadingPromotion, error: errorPromotion } = useGetAllPromotionQuery()

    return (
        <DataContext.Provider
            value={{
                brands: brands || [],
                categories: categories || [],
                promotions: promotions || []
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
