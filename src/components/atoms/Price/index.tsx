'use client'
import { PriceProps } from "@/types";
import React from "react";

const Price: React.FC<PriceProps> = ({ product_price, className }) => {
    return (
        <div className={`flex `}>
            <span className={`text-[13px] font-semibold ${className}`}>
                {Number(product_price).toLocaleString("vi-VN")}
            </span>
            <sub>
                <sup className={`text-xs ${className}`}>đ</sup>
            </sub>
        </div>
    );
};

export default Price;
