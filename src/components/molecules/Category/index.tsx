'use client'
import { CategoryProps } from '@/types';
import React from 'react';

const Category: React.FC<CategoryProps> = ({ img_url, title }) => {
    return (
        <div className="flex flex-col gap-5 justify-center items-center">
            <div className="border border-gray-200 p-2 w-full h-full rounded-lg">
                <img src={img_url} alt="#" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-normal">{title}</p>
        </div>
    );
};

export default Category;
