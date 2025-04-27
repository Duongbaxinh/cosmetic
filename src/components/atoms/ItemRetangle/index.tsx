'use client'
import { ItemRectangleProps } from "@/types";
import React from "react";

const ItemRectangle: React.FC<ItemRectangleProps> = ({
    icon,
    title,
    onFunction,
    onmousedown,
    className
}) => {
    return (
        <div
            onMouseEnter={onmousedown}
            onClick={onFunction}
            className={`w-full py-[7px] px-4 flex items-center cursor-pointer transition-colors hover:bg-gray-300 rounded-sm ${className} `}
        >
            <div className="flex items-center gap-1">
                {icon}
                {title && (<span className="text-sm font-medium whitespace-nowrap">{title}</span>)}
            </div>
        </div>
    );
};

export default ItemRectangle;
