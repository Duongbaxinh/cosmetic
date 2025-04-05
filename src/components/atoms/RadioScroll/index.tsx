'use client'
import { RadioScrollProps } from '@/types';
import React from 'react';

const RadioScroll: React.FC<RadioScrollProps> = ({ percentage = 10, label }) => {
    return (
        <div className="relative w-full h-[15px] max-h-[15px] rounded-sm bg-red-100">
            <div
                className="absolute h-full rounded-sm bg-red-200"
                style={{ width: `${percentage}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-[10px] font-medium">{label}</span>
            </div>
        </div>
    );
};

export default RadioScroll;
