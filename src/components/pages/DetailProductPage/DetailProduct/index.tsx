'use client'
import Carousel from '@/components/atoms/Carousel';
import Chip from '@/components/atoms/Chip';
import Price from '@/components/atoms/Price';
import CardProductFull from '@/components/molecules/CardProductFull';
import GroupStart from '@/components/organisms/GroupStart';
import { Product } from '@/types';
import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';

interface DetailProductProps {
    product: Product;
    similar_product?: Product[];
}

const DetailProduct: React.FC<DetailProductProps> = ({ product, similar_product }) => {

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
                            <GroupStart numberOfStart={product.product_rate} h="10px" w="10px" />
                            <p className='text-[14px] text-gray-400 font-[500]'>({product.product_rate})</p>
                        </div>
                        <p className="text-[14px] leading-[24px] text-gray-400">{`Đã bán (${product.product_sold})`}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Price className='text-[24px] text-red-400' product_price={product.product_price} />
                        <Chip title={'-3%'} />
                        <p className='line-through text-[14px] text-gray-400'>{Number(product.product_price).toLocaleString("vi-VN")}<sup>đ</sup></p>
                    </div>
                </div>
            </div>

            {/* Shipping Info */}
            <div className="p-4 space-y-2  bg-white rounded-md ">
                <h2 className="text-[16px] font-bold leading-[24px]">Thông tin vận chuyển</h2>
                <div className="flex justify-between items-center gap-2.5 text-[14px] leading-[21px] font-light">
                    <p>Giao đến: {"Giao đến Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội"}</p>
                    <button className="text-blue-300 cursor-pointer">Đổi</button>
                </div>
            </div >

            <div className="p-4 space-y-2  bg-white rounded-md ">
                <h2 className="text-[16px] font-bold leading-[24px]">Mô tả chi tiết</h2>
                <div
                    className="text-[14px] leading-[21px]"
                    dangerouslySetInnerHTML={{ __html: product.product_description }}
                />
            </div >
            {similar_product && similar_product.length > 0 && (
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
                            Array.from({ length: Math.ceil(similar_product.length / 6) }).map((_, index) => (
                                <SwiperSlide key={index}>
                                    <div className=" w-full grid grid-cols-3 space-x-2 space-y-2 grid-rows-2 ">
                                        {
                                            similar_product.slice(index * 6, index * 6 + 6).map((product) => (
                                                <Link href={`/detail/${product.product_id}`} key={product.product_id}>
                                                    <CardProductFull
                                                        key={product.product_id}
                                                        product_id={product.product_id}
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
            )}
        </div >
    );
};

export default DetailProduct;
