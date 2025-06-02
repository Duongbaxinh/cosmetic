"use client";
import GroupStart from '@/components/organisms/GroupStart';
import { CardProductFullProps } from '@/types';
import React from 'react';
import Price from '../../atoms/Price';
import Image from 'next/image';
import Tag from '@/components/atoms/Tag';

const CardProductFull: React.FC<CardProductFullProps> = ({
    product_name,
    product_price,
    product_discount,
    product_thumbnail,
    className,
    product_rate,
    product_brand,
    product_description,
}) => {
    const priceDiscount = product_discount ? product_price * (product_discount / 100) : 0
    return (
        <div
            className={` p-2 sm:p-0 w-full h-full bg-white cursor-pointer rounded-lg overflow-hidden flex flex-col gap-2  hover:shadow-lg transition-shadow duration-200 ${className}`}
        >
            <div className="flex flex-col justify-start gap-2 pb-6">
                <Image
                    src={product_thumbnail ?? '/default-image.jpg'}
                    alt={product_name}
                    width={270}
                    height={270}
                    className="object-scale-down sm:object-cover cursor-pointer w-full h-[100px] sm:h-[270px] rounded-t-lg"
                />
                <p className="text-[14px] font-[600] text-center text-gray-900">
                    {product_brand?.title ?? "ASENA"}
                </p>
                <p className="text-[12px] leading-6 text-center font-light line-clamp-2 text-gray-700">
                    {product_name}
                </p>
                <div className="flex items-center justify-center gap-4">
                    {priceDiscount > 0 && (
                        <Price
                            className="text-pink-600 justify-center font-medium !text-[14px]"
                            product_price={priceDiscount}
                        />
                    )}
                    <Price
                        className={`!text-[14px] justify-center  ${priceDiscount ? "line-through text-gray-400 font-thin " : 'text-pink-300 font-bold'}`}
                        product_price={product_price}
                    />
                    {priceDiscount > 0 && (
                        <Tag value={product_discount?.toString() ?? ''} />
                    )}
                </div>
                <div className="flex space-x-1  justify-center items-center w-full h-[30px]">
                    <GroupStart
                        starActive={Math.round(product_rate)}
                        className="text-yellow-400 w-[100px] max-h-[20px]" // Gold for star ratings
                    />
                    <p className="text-[12px] text-gray-500">({product_rate})</p>
                </div>
            </div>
        </div>
    );
};

export default CardProductFull;