'use client'
import GroupStart from '@/components/organisms/GroupStart';
import { CardProductFullProps } from '@/types';
import React from 'react';
import Price from '../../atoms/Price';
import Image from 'next/image';

const CardProductSimilar: React.FC<CardProductFullProps> = ({ product_name, product_price, product_thumbnail, className, product_rate }) => {
    return (
        <div className={`w-full h-full bg-white  border border-gray-200 shadow-sm cursor-pointer rounded-lg p-2 flex flex-col gap-2 ${className}`}>
            <div className="flex flex-col justify-start gap-1 ">
                <Image src={product_thumbnail} alt={product_name} width={91} height={91} className=" w-full h-full object-cover cursor-pointer" />
                <p className="text-[13px] font-medium line-clamp-2 max-h-[40px] min-h-[40px]">{product_name}</p>
                <div className="flex space-x-1">
                    <GroupStart
                        starActive={product_rate}
                    />
                </div>
                <Price className='text-red-400' product_price={product_price} />
            </div>

        </div>
    );
};

export default CardProductSimilar;
