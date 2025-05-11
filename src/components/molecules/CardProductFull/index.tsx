'use client'
import GroupStart from '@/components/organisms/GroupStart';
import { CardProductFullProps } from '@/types';
import React from 'react';
import Price from '../../atoms/Price';

const CardProductFull: React.FC<CardProductFullProps> = ({ product_name, product_price, product_thumbnail, className, product_rate }) => {
    return (
        <div className={`w-full  bg-white max-h-[380px] min-h-[330px] border border-gray-200 shadow-sm cursor-pointer rounded-lg p-2 flex flex-col gap-2 ${className}`}>
            <div className="flex flex-col justify-start gap-1 pb-6 border-b border-gray-200">
                <img src={product_thumbnail} alt={product_name} className=" w-[150px] h-[150px] max-h-[150px] object-cover cursor-pointer" />
                <p className="text-[13px] font-medium line-clamp-3 max-h-[60px] min-h-[60px]">{product_name}</p>
                <div className="flex space-x-1">
                    <GroupStart
                        starActive={product_rate}
                    />
                </div>
                <Price className='text-red-400' product_price={product_price} />
            </div>
            <p className="text-xs text-gray-400">Giao thứ 2, 19/02</p>
        </div>
    );
};

export default CardProductFull;
