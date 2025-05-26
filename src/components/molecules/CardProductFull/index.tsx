"use client";
import GroupStart from '@/components/organisms/GroupStart';
import { CardProductFullProps } from '@/types';
import React from 'react';
import Price from '../../atoms/Price';
import Image from 'next/image';

const CardProductFull: React.FC<CardProductFullProps> = ({
    product_name,
    product_price,
    product_thumbnail,
    className,
    product_rate,
    product_brand,
    product_description,
}) => {
    return (
        <div
            className={`w-full h-full bg-white cursor-pointer rounded-lg overflow-hidden flex flex-col gap-2 border border-gray-200 hover:shadow-lg transition-shadow duration-200 ${className}`}
        >
            <div className="flex flex-col justify-start gap-2 pb-6">
                <Image
                    src={product_thumbnail ?? '/default-image.jpg'}
                    alt={product_name}
                    width={270}
                    height={270}
                    className="object-cover cursor-pointer w-full h-[270px] rounded-t-lg"
                />
                <p className="text-[14px] font-[600] text-center text-gray-900">
                    {product_brand ?? "ASENA"}
                </p>
                <p className="text-[12px] leading-6 text-center font-light line-clamp-2 text-gray-700">
                    {product_name}
                </p>
                <Price
                    className="text-pink-600 justify-center font-medium"
                    product_price={product_price}
                />
                <div className="flex space-x-1 justify-center items-center">
                    <GroupStart
                        starActive={product_rate}
                        className="text-yellow-400" // Gold for star ratings
                    />
                    <p className="text-[12px] text-gray-500">({product_rate})</p>
                </div>
            </div>
        </div>
    );
};

export default CardProductFull;