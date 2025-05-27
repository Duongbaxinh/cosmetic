'use client'
import { ItemRectangleProps } from "@/types";
import React from "react";

const ItemRectangle: React.FC<ItemRectangleProps> = ({
    icon,
    title,
    onFunction,
    onmousedown,
    className,
    babe,
    quantity
}) => {
    return (
        <div
            onMouseEnter={onmousedown}
            onClick={onFunction}
            className={`w-full py-[7px] px-4 flex items-center cursor-pointer transition-colors hover:bg-gray-300 rounded-sm ${className} `}
        >
            <div className="flex items-center gap-1">
                {icon && <div className="relative">{icon}
                    {babe && quantity && quantity > 0 && <div className="w-[15px] h-[15px] absolute -top-2 -right-2 rounded-full bg-pink-500 text-[10px] text-white text-center">{quantity}</div>}
                </div>}
                {title && (<span className="text-sm font-medium whitespace-nowrap">{title}</span>)}
            </div>
        </div>
    );
};

export default ItemRectangle;
