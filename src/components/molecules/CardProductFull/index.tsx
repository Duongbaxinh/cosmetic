"use client";
import GroupStart from '@/components/organisms/GroupStart';
import { CardProductFullProps } from '@/types';
import React from 'react';
import Price from '../../atoms/Price';
import Image from 'next/image';
import Tag from '@/components/atoms/Tag';
import { useCart } from '@/contexts/cart.context';
import { MESS_SYSTEM } from '@/config/mess.config';
import { toast } from 'react-toastify';

const CardProductFull: React.FC<CardProductFullProps> = ({
    product_name,
    id,
    product_price,
    product_discount,
    product_thumbnail,
    product_thumbnail_2,
    className,
    product_rate,
    product_brand,
    product_description,
}) => {
    const { cart, addToCart } = useCart()
    const handleAddToCart = async (e: any) => {
        try {
            e.stopPropagation();
            e.preventDefault();
            if (!cart || !cart.id || !id) return toast.error(MESS_SYSTEM.UNKNOWN_ERROR)
            const response = await addToCart(cart?.id, id, 1)
            toast.success("Đã thêm vào giỏ hàng thành công")
        } catch (error) {
            toast.error(MESS_SYSTEM.UNKNOWN_ERROR)
        }
    }
    const totalDiscount = product_discount ? (product_discount.discountDirect + product_discount.discountPromotion) : 0
    const priceDiscount = product_discount ? product_price * (totalDiscount / 100) : 0
    return (
        <div
            className={`p-2 group/card sm:p-0 w-full h-full bg-white cursor-pointer rounded-lg overflow-hidden flex flex-col gap-2 hover:shadow-lg transition-shadow duration-200 ${className}`}
        >
            <div className="relative flex flex-col justify-start gap-2 pb-6">

                {totalDiscount > 0 && (
                    <div className="absolute top-2 left-2 text-white min-w-[50px] min-h-[50px] z-10 flex items-center justify-center bg-black rounded-full">
                        {priceDiscount > 0 && `${totalDiscount}%`}
                    </div>
                )}


                <div className="w-full sm:h-[270px] h-[270px] overflow-hidden relative  rounded-t-lg ">
                    <button
                        onClick={handleAddToCart}
                        className=" transparentToGradient whitespace-nowrap px-4 py-4 font-[700] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 group-hover/card:block hidden text-white rounded-full cursor-pointer text-sm  shadow-md">
                        Thêm vào giỏ hàng</button>
                    <div className="absolute top-0 left-0 w-[200%] h-full flex transition-transform duration-500 ease-in-out group-hover/card:-translate-x-1/2">
                        {/* Image 1 */}
                        <Image
                            src={
                                product_thumbnail && product_thumbnail.startsWith("http")
                                    ? product_thumbnail
                                    : "/default-image.jpg"
                            }
                            alt={product_name}
                            width={270}
                            height={270}
                            className="w-1/2 h-full object-cover"
                        />
                        {/* Image 2 */}
                        <Image
                            src={
                                product_thumbnail_2 && product_thumbnail_2.startsWith("http")
                                    ? product_thumbnail_2
                                    : "/default-image.jpg"
                            }
                            alt={product_name}
                            width={270}
                            height={270}
                            className="w-1/2 h-full object-cover"
                        />
                    </div>

                </div>

                {/* Brand + Name */}
                <p className="text-[14px] font-[600] text-center text-gray-900">
                    {product_brand?.title ?? "ASENA"}
                </p>
                <p className="text-[12px] leading-6 text-center font-light line-clamp-2 text-gray-700">
                    {product_name}
                </p>

                {/* Price */}
                <div className="flex items-center justify-center gap-4">
                    {priceDiscount > 0 && (
                        <Price
                            className="text-pink-600 justify-center font-medium !text-[14px]"
                            product_price={product_price - priceDiscount}
                        />
                    )}
                    <Price
                        className={`!text-[14px] justify-center ${priceDiscount
                            ? "line-through text-gray-400 font-thin"
                            : "text-pink-300 font-bold"
                            }`}
                        product_price={product_price}
                    />
                </div>

                {/* Rating */}
                <div className="flex space-x-1 justify-center items-center w-full h-[30px]">
                    <GroupStart
                        starActive={Math.round(product_rate)}
                        className="text-yellow-400 w-[100px] max-h-[20px]"
                    />
                    <p className="text-[12px] text-gray-500">({product_rate})</p>
                </div>
            </div>
        </div >

    );
};

export default CardProductFull;