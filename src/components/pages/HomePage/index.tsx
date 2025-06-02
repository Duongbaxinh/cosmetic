'use client'
import { ProductSkeleton } from '@/components/atoms/ProductSkeleton';
import CountdownTimer from '@/components/organisms/CountdownTimer';
import { MESS_SYSTEM } from '@/config/mess.config';
import { categories } from '@/fakes';
import ContainerLayout from '@/layouts/ContainerLayout';
import { setUser, useGetUserQuery } from '@/redux/slices/auth.slice';
import { useGetBrandsQuery } from '@/redux/slices/brand.slice';
import { useGetAllProductsDiscountQuery, useGetAllProductsInternalQuery, useGetAllProductsQuery } from '@/redux/slices/product.slice';
import { setShippingAddress, useGetAddressQuery } from '@/redux/slices/shippingAddress.slice';

import { Brand, ProductBrand, ProductResponse } from '@/types';
import { createParams, handleError } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SwiperSlide } from 'swiper/react';
import Carousel from '../../atoms/Carousel';
import CardProductFull from '../../molecules/CardProductFull';
import LoadingPage from '../LoadingPage';
import { useAuth } from '@/contexts/auth.context';
import { useNetworkStatus } from '@/contexts/network.context';
import { redirect } from 'next/navigation';
import { CATEGORY_URL, DETAIL_PRODUCT_URL } from '@/routers';



const breakpoints = {
    300: {
        slidesPerView: 2,
    },
    640: {
        slidesPerView: 2,
    },
    768: {
        slidesPerView: 3,
    },
    1024: {
        slidesPerView: 4,
    },
    1280: {
        slidesPerView: 4,
    },
}
const HomePage: React.FC = () => {
    const { accessToken, userProfile, shippingAddress } = useAuth()
    const { valueOf } = useNetworkStatus()

    if (!valueOf) return redirect("/not-found")

    const [filter, setFilter] = useState<Record<string, number>>({ page: 1, limitnumber: 10, });
    const filterParams = useMemo(() => createParams(filter), [filter]);
    const [products, setProducts] = useState<ProductResponse | null>(null)
    const internationalParams = useMemo(() => createParams({ product_international: true }), []);
    const discountParams = useMemo(() => createParams({ product_discount: true }), []);
    const { data, error, isLoading: loading, error: errorProduct } = useGetAllProductsQuery(filter)
    const { data: productsDiscount, error: errDiscount, isLoading: loadingDiscount } = useGetAllProductsDiscountQuery(discountParams)
    const { data: productsInternal, error: errInternal, isLoading: loadingInternal } = useGetAllProductsInternalQuery(internationalParams)
    const { data: brands, isLoading: loadingBrand, error: errorBrand } = useGetBrandsQuery() as { data: ProductBrand[] | undefined, isLoading: boolean, error: any };

    const dispatch = useDispatch()
    const check_load = products ? (products.count - products.results.length) > 0 : false

    const handleLoadMore = async () => {
        try {
            if (!check_load) return
            const newLimit = products ? (products.count - products.results.length) : 0
            const newFilter = { ...filter, page: filter.page + 1, limitnumber: Math.min(filter.limitnumber, newLimit) };
            setFilter(newFilter)
        } catch (error) {
            handleError(error)
        }
    }

    useEffect(() => {
        if (data) {
            setProducts(prev => {
                const prevProducts = prev?.results ?? [];
                return {
                    ...data,
                    products: [...prevProducts, ...data.results],
                };
            });
        }
    }, [data]);


    const product_internal_display = productsInternal?.results ?? []
    const product_discounts_display = productsDiscount?.results ?? []
    const products_display = products?.results ?? []

    return (
        <ContainerLayout isSidebar={false} classHeader="sticky top-0 z-30" >
            <div className="w-full flex-col gap-8 space-y-4 text-black ">
                {/* CATEGORY */}
                <div className="grid grid-cols-6 grid-rows-2 gap-2  w-full rounded-md min-h-[150px] sm:min-h-[306px] ">
                    <div className="col-span-6 md:col-span-4 row-span-2 h-full">
                        <Carousel customSwipeWrap='!p-0 !h-full !max-h-full' slidesPerView={1} clickable enableAutoPlay>
                            {categories.map(({ id, product_thumbnail }) => (
                                <SwiperSlide key={id}>
                                    <Link href={`${CATEGORY_URL}/product_brand/${id}`} className='w-full h-full relative'>
                                        <Image
                                            src={product_thumbnail}
                                            alt="carousel-image"
                                            className="h-full w-full object-cover"
                                            width={702} height={301}
                                        />
                                    </Link>
                                </SwiperSlide>
                            ))}

                        </Carousel>
                    </div>
                    <div className="hidden md:block col-span-2 row-span-1 relative">
                        <Image src={"/images/banner.webp"} className=' object-fill rounded-md w-full h-full' alt="" width={369} height={147} />
                    </div>
                    <div className=" hidden md:block col-span-2 row-span-1 relative">
                        <Image src={"/images/banner.webp"} className=' object-fill rounded-md w-full h-full' alt="" width={369} height={147} />
                    </div>
                </div>


                <div className="w-full  rounded-md mt-[30px]">
                    <h1 className=' text-[18px] sm:text-[20px] md:text-[26px] leading-[36px] font-[700] text-center pb-[30px]'>Top Sản phẩm bán chạy</h1>
                    {loadingDiscount ? (
                        <LoadingPage className='w-full !h-[400px]' />
                    ) : (
                        <div className='space-y-3'>
                            <Carousel
                                breakpoints={breakpoints}
                            >
                                {products_display.map(
                                    (product) => (
                                        <SwiperSlide key={product.id}>
                                            <Link href={`${DETAIL_PRODUCT_URL}/${product.product_slug}`} className='block w-full h-full'>
                                                <CardProductFull
                                                    key={product.id}
                                                    id={product.id}
                                                    product_thumbnail={product.product_thumbnail}
                                                    product_name={product.product_name}
                                                    product_price={product.product_price}
                                                    product_rate={product.product_rate}
                                                    product_brand={product.product_brand}
                                                    product_description={product.product_description}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    )
                                )}
                            </Carousel>
                            <div className="flex justify-center">
                                <Link href={`${CATEGORY_URL}/product_sold/asc`} className=" block py-2 px-4 rounded-full text-sm text-pink-400 cursor-pointer  border-[1px] font-bold w-fit">Xem tất cả</Link>
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-full p-3">
                    {!errorBrand ? (
                        <Carousel customSwipeWrap='!p-3'
                            breakpoints={{
                                300: {
                                    slidesPerView: 3,
                                },
                                640: {
                                    slidesPerView: 3,
                                },
                                768: {
                                    slidesPerView: 4,
                                },
                                1024: {
                                    slidesPerView: 5,
                                },
                                1280: {
                                    slidesPerView: 5,
                                },
                            }}
                        >
                            {!loadingBrand ? (
                                <>
                                    {brands && brands.map(
                                        (brand: Brand) => (
                                            <SwiperSlide key={brand.id}>
                                                <Link href={`${CATEGORY_URL}/product_brand/${brand.id}`} className='block w-full h-full'>
                                                    <Image src={brand.image} alt={brand.title} width={217} height={106} className='rounded-md' />
                                                </Link>
                                            </SwiperSlide>
                                        )
                                    )}</>
                            ) : (
                                <LoadingPage className='w-full h-[200px]' />
                            )}
                        </Carousel>
                    ) : (
                        <div className="">Wrong</div>
                    )}
                </div>
                {/*  */}
                <div className="w-full max-w-[1138px] mx-auto p-2 smd:p-[25px] rounded-2xl bg-yellow-300 space-y-5">
                    <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-end">
                        <Image src={"/images/flash_sale.webp"} alt='flash_sale ' width={267} height={51} />
                        <div >
                            <p className=' font-[700] text-center lg:text-start'>Thời gian còn lại</p>
                            <CountdownTimer targetTime='2025-06-30T23:59:59+07:00' />
                        </div>
                        <Link href={`${CATEGORY_URL}/product_discount/${true}`} className=" hidden  lg:block py-3 px-6 mt-1 lg:mt-0 rounded-md text-sm text-pink-400 cursor-pointer   font-bold w-fit border border-color bg-white">Xem tất cả</Link>
                    </div>
                    {loadingDiscount ? (
                        <LoadingPage className='w-full !h-[275px] sm:!h-[400px]' />
                    ) :
                        (
                            <Carousel
                                spaceBetween={10}
                                breakpoints={breakpoints}
                                customSwipeWrap=' !h-[275px] sm:!h-[400px]'
                            >
                                {product_discounts_display.map((product) => (
                                    <SwiperSlide
                                        key={product.id}
                                        className="flex h-full items-stretch"
                                    >
                                        <Link
                                            href={`${DETAIL_PRODUCT_URL}/${product.product_slug}`}
                                            className="block w-full h-full"
                                        >
                                            <CardProductFull
                                                id={product.id}
                                                product_thumbnail={product.product_thumbnail}
                                                product_name={product.product_name}
                                                product_price={product.product_price}
                                                product_rate={product.product_rate}
                                                product_brand={product.product_brand}
                                                product_description={product.product_description}
                                            />
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Carousel>
                        )}
                    <Link href={`${CATEGORY_URL}/product_discount/${true}`} className=" flex lg:hidden w-full justify-center  mt-1 lg:mt-0 rounded-md text-sm  cursor-pointer   "><p className='text-center  font-bold border border-color py-3 px-6 text-pink-500 rounded-full bg-white '>Xem tất cả</p></Link>
                </div>


                {/* Thương hiệu nổi bật */}
                <div className="w-full p-3">
                    <Carousel
                        customSwipeWrap='!p-3'
                        spaceBetween={10}
                        breakpoints={{
                            300: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 1.5,
                            },
                            1024: {
                                slidesPerView: 2.5,
                            },
                            1280: {
                                slidesPerView: 2.5,
                            },
                        }}
                    >
                        {!loadingBrand ? (
                            brands && brands.map(
                                (brand: Brand) => (
                                    <SwiperSlide key={brand.id}>
                                        <Link href={`${CATEGORY_URL}/product_brand/${brand.id}`} className=' relative block w-full h-full'>
                                            <Image src={brand.image} alt={brand.title} height={201} width={422} className='rounded-md w-full h-full' />
                                        </Link>
                                    </SwiperSlide>
                                )
                            )
                        ) : (
                            <ProductSkeleton length={4} />
                        )}
                    </Carousel>
                </div>

                {/* Nhập khẩu chính hãng */}
                <div className="w-full  rounded-md mt-[30px]">
                    <h1 className=' text-[18px] sm:text-[20px] md:text-[26px] leading-[36px] font-[700] text-center pb-[30px]'>Hàng ngoại giá tốt</h1>
                    {loadingInternal ? (
                        <LoadingPage className='w-full !h-[400px]' />
                    ) : (
                        <div className='space-y-3'>
                            <Carousel
                                breakpoints={breakpoints}
                            >
                                {product_internal_display.map(
                                    (product) => (
                                        <SwiperSlide key={product.id}>
                                            <Link href={`${DETAIL_PRODUCT_URL}/${product.product_slug}`} className='block w-full h-full'>
                                                <CardProductFull
                                                    key={product.id}
                                                    id={product.id}
                                                    product_thumbnail={product.product_thumbnail}
                                                    product_name={product.product_name}
                                                    product_price={product.product_price}
                                                    product_rate={product.product_rate}
                                                    product_brand={product.product_brand}
                                                    product_description={product.product_description}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    )
                                )}
                            </Carousel>
                            <div className="flex justify-center">
                                <Link href={`${CATEGORY_URL}/product_international/${true}`} className=" block py-2 px-4 rounded-full text-sm text-pink-400 cursor-pointer  border-[1px] font-bold w-fit">Xem tất cả</Link>
                            </div>
                        </div>
                    )}
                </div>
                {/* Nhập khẩu chính hãng */}
                <div className="w-full  rounded-md mt-[30px]">
                    <h1 className=' text-[18px] sm:text-[20px] md:text-[26px] leading-[36px] font-[700] text-center pb-[30px]'>Sản Phẩm mới</h1>
                    {loadingDiscount ? (
                        <LoadingPage className='w-full !h-[430px]' />
                    ) : (
                        <div className='space-y-3'>
                            <Carousel
                                breakpoints={breakpoints}
                            >
                                {products_display.map(
                                    (product) => (
                                        <SwiperSlide key={product.id}>
                                            <Link href={`${DETAIL_PRODUCT_URL}/${product.product_slug}`} className='block w-full h-full'>
                                                <CardProductFull
                                                    key={product.id}
                                                    id={product.id}
                                                    product_thumbnail={product.product_thumbnail}
                                                    product_name={product.product_name}
                                                    product_price={product.product_price}
                                                    product_rate={product.product_rate}
                                                    product_brand={product.product_brand}
                                                    product_description={product.product_description}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    )
                                )}
                            </Carousel>
                            <div className="flex justify-center">
                                <Link href={`${CATEGORY_URL}/product_new/asc`} className=" block py-2 px-4 rounded-full text-sm text-pink-400 cursor-pointer  border-[1px] font-bold w-fit">Xem tất cả</Link>
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-full  rounded-md mt-[30px]">
                    <h1 className=' text-[18px] sm:text-[20px] md:text-[26px] leading-[36px] font-[700] text-center pb-[30px]'>Gợi ý hôm nay</h1>
                    {loading ? (
                        <LoadingPage className='w-full !h-[400px]' />
                    ) :
                        (<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-3">
                            {/* Banner */}
                            <div className=" col-span-2  md:col-span-2  flex items-center justify-center">
                                <Carousel customSwipeWrap='!p-0' slidesPerView={1} clickable>
                                    {categories.map(({ id, product_thumbnail }) => (
                                        <SwiperSlide key={id}>
                                            <Link href={`${CATEGORY_URL}/product_brand/${id}`} className='w-full h-full relative'>
                                                <Image
                                                    src={product_thumbnail}
                                                    alt="carousel-image"
                                                    className=" h-[200px] md:h-[410px] w-full  object-cover"
                                                    width={557} height={410}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    ))}

                                </Carousel>
                            </div>
                            {/* Products */}
                            {products_display.map((product) => (
                                <div key={product.id} className=" flex items-center justify-center w-full h-full">
                                    <Link href={`${DETAIL_PRODUCT_URL}/${product.product_slug}`} className='block w-full h-full'>
                                        <CardProductFull
                                            key={product.id}
                                            id={product.id}
                                            product_thumbnail={product.product_thumbnail}
                                            product_name={product.product_name}
                                            product_price={product.product_price}
                                            product_rate={product.product_rate}
                                            product_brand={product.product_brand}
                                            product_description={product.product_description}
                                        />
                                    </Link>
                                </div>
                            ))}
                            {/* Banner */}
                        </div>)}
                </div>


                {
                    check_load && (
                        <div className="w-full flex items-center justify-center ">
                            <button className='cursor-pointer p-2 border-[1px] border-gray-300 text-pink-400 rounded-full' onClick={handleLoadMore} >Xem Thêm</button>
                        </div>
                    )
                }
            </div >


        </ContainerLayout >

    );
};

export default HomePage;
