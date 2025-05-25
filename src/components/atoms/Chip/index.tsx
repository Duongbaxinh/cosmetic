'use client'
import { ChipProps } from "@/types";
import React from "react";

const Chip: React.FC<ChipProps> = ({ leading, title, trailing, className }) => {
    return (
        <div className={`flex items-center gap-1  p-2 rounded-lg border border-color ${className}`}>
            {leading && leading}
            <span className="text-[10px] font-medium whitespace-nowrap">{title}</span>
            {trailing && trailing}
        </div>
    );
};

export default Chip;
