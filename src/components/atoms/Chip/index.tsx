'use client'
import { ChipProps } from "@/types";
import React from "react";

const Chip: React.FC<ChipProps> = ({ leading, title, trailing, className }) => {
    return (
        <div className={`flex items-center gap-1  px-1 py-[1px] rounded-lg bg-gray-200 ${className}`}>
            {leading && leading}
            <span className="text-[10px] font-medium">{title}</span>
            {trailing && trailing}
        </div>
    );
};

export default Chip;
