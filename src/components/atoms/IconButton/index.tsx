"use client"
import { IconButtonProps } from "@/types";
import React from "react";



const IconButton: React.FC<IconButtonProps> = ({ onClick, title, icon, className }) => {
    return (
        <button
            onClick={onClick}
            className={`p-2 bg-white rounded-sm hover:bg-gray-200 flex items-center justify-center ${className} transition `}
        >
            <div className="flex items-center justify-center gap-1">
                {title && <p>{title}</p>}
                {icon}
            </div>
        </button>
    );
};

export default IconButton;
