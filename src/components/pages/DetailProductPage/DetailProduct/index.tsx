'use client'
import Carousel from '@/components/atoms/Carousel';
import Price from '@/components/atoms/Price';
import { ProductSkeleton, Skeleton } from '@/components/atoms/ProductSkeleton';
import CardProductSimilar from '@/components/molecules/CardProductSimilar';
import GroupStart from '@/components/organisms/GroupStart';
import { MESS_DELIVERY } from '@/config/mess.config';
import { useAuth } from '@/contexts/auth.context';
import { Product, ShippingAddress } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { SwiperSlide } from 'swiper/react';

interface DetailProductProps {
    product: Product;
    similarProduct?: Product[];
    shippingAddress?: ShippingAddress[],
    similarProductLoading?: boolean
}

const DetailProduct: React.FC<DetailProductProps> = ({ product, similarProduct, similarProductLoading, shippingAddress }) => {
    const { user } = useAuth()
    const [showMore, setShowMore] = useState({
        productDescription: false,
        productInfo: false,
    });
    console.log("chekkk11", shippingAddress)

    if (shippingAddress && shippingAddress?.length > 0) {
        console.log("chekkk", shippingAddress[0])
    }
    return (
        <div className="flex flex-col gap-2.5 w-full max-w-full lg:max-w-[424px]  rounded-md  order-2 lg:order-1 ">
            {/* Product Info */}
            <div className="p-4  bg-white rounded-md ">
                <div className="flex flex-col gap-2.5">
                    <div className="flex">
                        <div className="flex space-x-2.5">
                            <p className="text-[12px]">{`Thương hiệu: ${product.product_brand}`}</p>
                        </div>
                    </div>
                    <p className=" text-[20px] leading-[30px]">{product.product_name}</p>
                    <p className="text-[14px] text-gray-400">{`Made in ${product.product_made}`}</p>
                    <div className="flex justify-start items-center gap-2 pr-24">
                        <div className="flex items-center gap-2.5">
                            <p className="text-[14px] font-[500] leading-[21px]">{product.product_rate.toFixed(1)}</p>
                            <GroupStart starActive={product.product_rate} h="10px" w="10px" />
                            <p className='text-[14px] text-gray-400 font-[500]'>({product.product_rate})</p>
                        </div>
                        <p className="text-[14px] leading-[24px] text-gray-400">{`Đã bán (${product.product_sold})`}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Price className='text-[24px] text-red-400' product_price={product.product_price} />
                        {/* {(product.product_discount) && (<Chip title={product.dis} />)} */}
                        {/* <p className='line-through text-[14px] text-gray-400'>{Number(product.product_price).toLocaleString("vi-VN")}<sup>đ</sup></p> */}
                    </div>
                </div>
            </div>

            {/* Shipping Info */}
            <div className="p-4 space-y-2  bg-white rounded-md ">
                <h2 className="text-[16px] font-bold leading-[24px]">Thông tin vận chuyển</h2>
                <div className="flex justify-between items-center gap-2.5 text-[14px] leading-[21px] font-light">
                    <p>Giao đến: {shippingAddress && shippingAddress.length > 0 ? (shippingAddress[0].address) : MESS_DELIVERY.ADDRESS_MESS}</p>
                    {user?.address && (<button className="text-blue-300 cursor-pointer">Đổi</button>)}
                </div>
            </div >
            <div className="relative p-4 space-y-2  bg-white rounded-md ">
                <div className={` ${showMore.productInfo && 'hidden'} absolute rounded-md pb-6 top-0 left-0 w-full h-full flex items-end justify-center bg-gradient-to-b from-transparent from-30% via-white via-80% to-white to-100% `}>
                    <button className='text-[13px] leading-[39px] text-blue-300 w-full cursor-pointer' onClick={() => setShowMore({ ...showMore, productInfo: true })}> Xem thêm </button>
                </div>
                <h2 className="text-[16px] font-bold leading-[24px]">Thông tin chi tiết</h2>
                <div className={`text-[14px] text-gray-400 leading-[21px] ${showMore.productInfo ? "" : "line-clamp-[15]"}`}>
                    <div className="grid grid-cols-2 py-2"><p>Thương hiệu</p> <p>{product.product_brand}</p></div>
                    <div className="grid grid-cols-2 py-2"><p>Xuất xứ</p> <p>{product.product_made}</p></div>
                    <div className="grid grid-cols-2 py-2"><p>Thành phần</p> <p>{product.product_ingredient}</p></div>
                    <div className="grid grid-cols-2 py-2"> <p>Hạn sử dụng</p> <p>{product.product_exp}</p></div>

                </div>
                <button className='text-[13px] leading-[39px] text-blue-300 w-full cursor-pointer' onClick={() => setShowMore({ ...showMore, productInfo: false })}>Thu gọn </button>
            </div >

            {
                similarProduct && similarProduct.length > 0 && (
                    <div className=" w-full p-4 space-y-2  bg-white rounded-md ">
                        <h2 className="text-[16px] font-bold leading-[24px]">Sản phẩm tương tự</h2>
                        <Carousel
                            spaceBetween={10}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 1,
                                },
                                1024: {
                                    slidesPerView: 1,
                                },
                                1280: {
                                    slidesPerView: 1,
                                },
                            }}
                        >
                            {
                                Array.from({ length: Math.ceil(similarProduct.length / 6) }).map((_, index) => (
                                    <SwiperSlide key={index}>
                                        <div className=" w-full grid grid-cols-3 space-x-2 space-y-2 grid-rows-2 ">
                                            {
                                                similarProduct && similarProduct.length > 0 && similarProduct.slice(index * 6, index * 6 + 6).map((product) => (
                                                    <Link key={index} href={`/detail/${product.id}`} >
                                                        <CardProductSimilar
                                                            product_rate={product.product_rate}
                                                            key={product.id}
                                                            id={product.id}
                                                            product_thumbnail={product.product_thumbnail}
                                                            product_name={product.product_name}
                                                            product_price={product.product_price}
                                                        />
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    </SwiperSlide>
                                ))
                            }

                        </Carousel>

                    </div >
                )
            }

            {/* Product Description */}
            {
                product.product_description && (
                    <div className="relative p-4 space-y-2 bg-white  ">
                        <div className={` ${showMore.productDescription && 'hidden'} absolute rounded-md pb-6 top-0 left-0 w-full h-full flex items-end justify-center bg-gradient-to-b from-transparent from-30% via-white via-80% to-white to-100% `}>
                            <button className='text-[13px] leading-[39px] text-blue-300 w-full cursor-pointer' onClick={() => setShowMore({ ...showMore, productDescription: true })}> Xem thêm </button>
                        </div>
                        <h2 className="text-[16px] font-bold leading-[24px]">Mô tả chi tiết</h2>
                        <div
                            className={`text-[14px] leading-[21px] ${showMore.productDescription ? "" : "line-clamp-[15]"}`}
                            dangerouslySetInnerHTML={{ __html: product.product_description }}
                        />
                        <button className='text-[13px] leading-[39px] text-blue-300 w-full cursor-pointer' onClick={() => setShowMore({ ...showMore, productDescription: false })}>Thu gọn </button>
                    </div >
                )
            }

        </div >
    );
};

export default DetailProduct;
