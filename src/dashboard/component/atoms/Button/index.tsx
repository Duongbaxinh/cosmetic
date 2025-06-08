"use client";
import React from "react";

function Button({
    label,
    className,
    onAction
}: {
    label: string;
    className?: string;
    onAction: () => void;
}) {
    return (
        <div>
            <button
                className={`text-white border text-[13px]  border-orange-400 rounded-sm bg-pink-400 ${className}`}
                onClick={onAction}>
                {label}
            </button>
        </div>
    );
}

export default Button;
