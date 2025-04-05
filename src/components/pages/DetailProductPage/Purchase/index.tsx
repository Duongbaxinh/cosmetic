"use client"
import IconButton from '@/components/atoms/IconButton';
import Price from '@/components/atoms/Price';
import React, { useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';

type PurchaseProps = {
    product_price: number;
    product_quantity: number;
    cost_tentative: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onChangeQuantity: (value: number) => void;
    onPurchase: () => void;
    onAddToCart: () => void;
};

function Purchase({
    product_price,
    product_quantity,
    cost_tentative,
    onIncrease,
    onDecrease,
    onChangeQuantity,
    onPurchase,
    onAddToCart
}: PurchaseProps) {

    return (
        <div className=" lg:sticky top-0 right-0 lg:max-w-[360px] w-full max-w-full lg:max-h-[360px] p-4  rounded-lg shadow bg-white  order-1 lg:order-2 ">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <img
                        src="/logo.png"
                        alt="LinhCosmetics"
                        className="w-8 h-8 object-cover"
                    />
                    <div>
                        <h2 className="font-semibold">JoyBoyCosmetics</h2>
                        <div className="flex items-center text-sm text-gray-600">
                            <span className="text-yellow-500 mr-1">★ 4.8</span>
                            <span>(139 đánh giá)</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Quantity */}
            <div className="mb-4">
                <p className="font-medium mb-2">Số Lượng</p>
                <div className="flex items-center gap-2">

                    <IconButton icon={<BiMinus />} onClick={() => onDecrease()} className='w-[30px] h-[30px] shadow-sm' />
                    <input value={product_quantity} type='number' onChange={(e) => { onChangeQuantity(Number(e.target.value)) }} className=" bg-white w-[30px] h-[30px] shadow-sm rounded-sm text-black text-center " />
                    <IconButton icon={<BiPlus />} onClick={() => onIncrease()} className='w-[30px] h-[30px] shadow-sm' />

                </div>
            </div>

            {/* Price */}
            <div className="mb-4">
                <p className="font-medium">Tạm tính</p>
                <p className="text-2xl font-bold text-red-600">
                    <Price className='text-[24px]' product_price={cost_tentative} />
                </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
                <button onClick={onPurchase} className="bg-red-500 text-white py-2 rounded hover:bg-red-600">
                    Mua ngay
                </button>
                <button onClick={onAddToCart} className="border py-2 rounded hover:bg-gray-100">
                    Thêm vào giỏ
                </button>

            </div>
        </div>
    );
}

export default Purchase;
