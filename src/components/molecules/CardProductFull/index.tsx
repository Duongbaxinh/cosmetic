'use client'
import GroupStart from '@/components/organisms/GroupStart';
import { CardProductFullProps } from '@/types';
import React from 'react';
import Price from '../../atoms/Price';
import Image from 'next/image';

const CardProductFull: React.FC<CardProductFullProps> = ({ product_name, product_price, product_thumbnail, className, product_rate, product_brand, product_description }) => {
    return (
        <div className={`w-full min-w-[270] max-w-[270]  bg-white max-h-[410px] min-h-[410px] cursor-pointer rounded-lg overflow-hidden flex flex-col gap-2 ${className} hover:shadow-md`}>
            <div className="flex flex-col justify-start gap-1 pb-6  border-gray-200">
                <Image src={product_thumbnail ?? null} alt={product_name} width={270} height={270} className="object-cover cursor-pointer" />
                <p className="text-[14px] font-[600] text-center">{product_brand ?? "ASENA"}</p>
                <p className="text-[12px] leading-6 text-center font-thin line-clamp-3 ">{product_name}</p>
                <Price className='text-red-400 justify-center' product_price={product_price} />
                <div className="flex space-x-1 justify-center">
                    <GroupStart
                        starActive={product_rate}
                    />
                    <p>({product_rate})</p>
                </div>
            </div>

        </div>
    );
};

export default CardProductFull;
