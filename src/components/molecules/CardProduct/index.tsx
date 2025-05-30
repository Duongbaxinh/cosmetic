'use client'
import React from 'react';
import Price from '../../atoms/Price';
import RadioScroll from '../../atoms/RadioScroll';
import Image from 'next/image';

interface CardProductProps {
    product_thumbnail: string;
    product_price: number;
    product_purchase: number;
}

const CardProduct: React.FC<CardProductProps> = ({ product_thumbnail, product_price, product_purchase }) => {
    return (
        <div className="flex flex-col max-w-full max-h-full py-3 gap-[5px] justify-center items-center border border-gray-300 p-2 rounded-md overflow-hidden">
            <div className="w-full h-full min-h-[140px] overflow-hidden">
                <Image src={product_thumbnail} alt="Product Thumbnail" width={140} height={140} className="w-full h-full object-cover" />
            </div>
            <Price product_price={product_price} />
            <RadioScroll label="Vừa mở bán" />
        </div>
    );
};

export default CardProduct;
