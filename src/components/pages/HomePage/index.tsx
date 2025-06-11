'use client'
import { ProductSkeleton } from '@/components/atoms/ProductSkeleton';
import CountdownTimer from '@/components/organisms/CountdownTimer';
import ContainerLayout from '@/layouts/ContainerLayout';
import { useGetAllBrandQuery } from '@/redux/slices/brand.slice';
import { useGetAllProductsDiscountQuery, useGetAllProductsInternalQuery, useGetAllProductsQuery } from '@/redux/slices/product.slice';

import { BANNERS } from '@/components/config/categories.config';
import { breakpointBrandGroup, breakpoints, breakpointsBrandPerView, breakpointsPerview } from '@/consts';
import { useNetworkStatus } from '@/contexts/network.context';
import { useGetAllPromotionQuery } from '@/redux/slices/promotion.slice';
import { CATEGORY_URL, DETAIL_PRODUCT_URL, INTERNATIONAL_PRODUCT_URL, NEW_PRODUCT_URL, PROMOTION_URL, TOP_PRODUCT_URL } from '@/routers';
import { BrandType, ProductResponse, Promotion } from '@/types';
import { calculateDiscount, createParams, handleError } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SwiperSlide } from 'swiper/react';
import Carousel from '../../atoms/Carousel';
import CardProductFull from '../../molecules/CardProductFull';
import LoadingPage from '../LoadingPage';


const HomePage: React.FC = () => {
    const { valueOf } = useNetworkStatus()
    if (!valueOf) return redirect("/not-found")

    const [filter, setFilter] = useState<Record<string, number>>({ page: 1, limitnumber: 10, });
    const [products, setProducts] = useState<ProductResponse | null>(null)
    const internationalParams = useMemo(() => createParams({ product_international: true }), []);
    const discountParams = useMemo(() => createParams({ product_discount: true }), []);
    const { data, isLoading: loading } = useGetAllProductsQuery(filter)
    const { data: productsDiscount, isLoading: loadingDiscount } = useGetAllProductsDiscountQuery(discountParams)
    const { data: productsInternal, isLoading: loadingInternal } = useGetAllProductsInternalQuery(internationalParams)
    const { data: brands, isLoading: loadingBrand, error: errorBrand } = useGetAllBrandQuery() as { data: BrandType[] | undefined, isLoading: boolean, error: any };
    const { data: promotions, isLoading: isLoadingPromotion } = useGetAllPromotionQuery()

    const check_load = products ? (products.count - products.results.length) > 0 : false

    const handleLoadMore = async () => {
        try {
            if (!check_load) return
            setFilter((prev) => ({ ...prev, limitnumber: prev.limitnumber + 10 }))
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
    const products_display = products?.results ?? []
    const flashSale: Promotion | null = promotions ? promotions[promotions?.length - 1] : null
    return (
        <ContainerLayout isSidebar={false} classHeader="sticky top-0 z-30" >
            <div className="w-full flex-col gap-8 space-y-4 text-black ">
                {/* CATEGORY */}
                <div className="grid grid-cols-6 grid-rows-2 gap-2  w-full rounded-md min-h-[150px] sm:min-h-[306px] ">
                    <div className="col-span-6 md:col-span-4 row-span-2 h-full">
                        <Carousel customSwipeWrap='!p-0 !h-full !max-h-full' slidesPerView={1} loop clickable enableAutoPlay>
                            {promotions && promotions.map(({ id, slug, thumbnail }) => (
                                <SwiperSlide key={id}>
                                    <Link href={`${CATEGORY_URL}/product_promotion/${slug}`} className='w-full h-full relative'>
                                        <Image
                                            src={thumbnail}
                                            alt="carousel-image"
                                            className="h-full w-full object-cover"
                                            width={702} height={301}
                                        />
                                    </Link>
                                </SwiperSlide>
                            ))}

                        </Carousel>
                    </div>
                    {BANNERS.map((banner) => (
                        <Link href={`${PROMOTION_URL}/${banner.slug}`} className="hidden md:block col-span-2 row-span-1 relative">
                            <Image src={banner.image} className=' object-fill rounded-md w-full h-full' alt="" width={369} height={147} />
                        </Link>
                    ))}

                </div>


                <div className="w-full  rounded-md mt-[30px]">
                    <h1 className=' text-[18px] sm:text-[20px] md:text-[26px] leading-[36px] font-[700] text-center pb-[30px]'>Top Sản phẩm bán chạy</h1>
                    {loadingDiscount ? (
                        <LoadingPage className='w-full !h-[400px]' />
                    ) : (
                        <div className='space-y-3'>
                            <Carousel
                                breakpoints={breakpoints}
                                slidesPerGroupBreakpoints={breakpointsPerview}
                            >
                                {products_display.map(
                                    (product) => (
                                        <SwiperSlide key={product.id}>
                                            <Link href={`${DETAIL_PRODUCT_URL}/${product.product_slug}`} className='block w-full h-full'>
                                                <CardProductFull
                                                    id={product.id}
                                                    product_discount={calculateDiscount(product)}
                                                    product_thumbnail={product.product_thumbnail}
                                                    product_thumbnail_2={product.product_images ? product.product_images[1]?.image_url : ""}
                                                    product_name={product.product_name}
                                                    product_price={product.product_price}
                                                    product_rate={product.product_rate}
                                                    product_brand={product.product_vendor.name}
                                                    product_description={product.product_description}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    )
                                )}
                            </Carousel>
                            <div className="flex justify-center">
                                <Link href={`${TOP_PRODUCT_URL}`} className=" block py-2 px-4 rounded-full text-sm text-pink-400 cursor-pointer  border-[1px] font-bold w-fit">Xem tất cả</Link>
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-full p-3">
                    {!errorBrand ? (
                        <Carousel customSwipeWrap='!p-3'
                            breakpoints={breakpointsBrandPerView}
                            slidesPerGroupBreakpoints={breakpointBrandGroup}
                        >
                            {!loadingBrand ? (
                                <>
                                    {brands && brands.map(
                                        (brand) => {

                                            return (
                                                <SwiperSlide key={brand.id}>
                                                    <Link href={`${CATEGORY_URL}/vendor/${brand.slug}`} className='relative w-full h-full hover:-top-1 transition-all duration-100'>
                                                        <Image src={brand.logo} alt={brand.name} width={217} height={106} className='rounded-md' />
                                                    </Link>
                                                </SwiperSlide>
                                            )

                                        }
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
                {flashSale && promotions && (
                    <div className="w-full max-w-[1440px] mx-auto p-2 smd:p-[25px] rounded-2xl bg-yellow-300 space-y-5">
                        <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-end">
                            <Image src={"/images/flash_sale.webp"} alt='flash_sale ' width={267} height={51} />
                            <div >
                                <p className=' font-[700] text-center lg:text-start'>Thời gian còn lại</p>
                                {flashSale.end_date && (<CountdownTimer targetTime={flashSale?.end_date} />)}
                            </div>
                            <Link href={`${PROMOTION_URL}/${flashSale.slug}`} className=" hidden  lg:block py-3 px-6 mt-1 lg:mt-0 rounded-md text-sm text-pink-400 cursor-pointer   font-bold w-fit border border-color bg-white">Xem tất cả</Link>
                        </div>
                        {isLoadingPromotion ? (
                            <LoadingPage className='w-full !h-[275px] sm:!h-[400px]' />
                        ) :
                            (
                                <Carousel
                                    spaceBetween={10}
                                    breakpoints={breakpoints}
                                    slidesPerGroupBreakpoints={breakpointsPerview}
                                    customSwipeWrap=' !h-[275px] sm:!h-[400px]'
                                >
                                    {flashSale.products.map((product) => (
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
                                                    product_discount={calculateDiscount(product)}
                                                    product_thumbnail={product.product_thumbnail}
                                                    product_thumbnail_2={product.product_images ? product.product_images[1]?.image_url : ""}
                                                    product_name={product.product_name}
                                                    product_price={product.product_price}
                                                    product_rate={product.product_rate}
                                                    product_brand={product.product_vendor.name}
                                                    product_description={product.product_description}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Carousel>
                            )}
                        <Link href={`${PROMOTION_URL}/${flashSale.slug}`} className=" flex lg:hidden w-full justify-center  mt-1 lg:mt-0 rounded-md text-sm  cursor-pointer   "><p className='text-center  font-bold border border-color py-3 px-6 text-pink-500 rounded-full bg-white '>Xem tất cả</p></Link>
                    </div>

                )}

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
                                (brand: BrandType) => (
                                    <SwiperSlide key={brand.id}>
                                        <Link href={`${CATEGORY_URL}/product_vendor/${brand.id}`} className=' relative block w-full h-full hover:-top-1 transition-all duration-100'>
                                            <Image src={brand.logo} alt={brand.name} height={201} width={422} className='rounded-md w-full h-full' />
                                        </Link>
                                    </SwiperSlide>
                                )
                            )
                        ) : (
                            <LoadingPage className='w-full !h-[275px] sm:!h-[400px]' />
                        )}
                    </Carousel>
                </div>


                <div className="w-full  rounded-md mt-[30px]">
                    <h1 className=' text-[18px] sm:text-[20px] md:text-[26px] leading-[36px] font-[700] text-center pb-[30px]'>Hàng ngoại giá tốt</h1>
                    {loadingInternal ? (
                        <LoadingPage className='w-full !h-[400px]' />
                    ) : (
                        <div className='space-y-3'>
                            <Carousel
                                breakpoints={breakpoints}
                                slidesPerGroupBreakpoints={breakpointsPerview}
                            >
                                {product_internal_display.map(
                                    (product) => (
                                        <SwiperSlide key={product.id} className='!py-[10px]'>
                                            <Link href={`${DETAIL_PRODUCT_URL}/${product.product_slug}`} className='block w-full h-full'>
                                                <CardProductFull
                                                    key={product.id}
                                                    id={product.id}
                                                    product_discount={calculateDiscount(product)}
                                                    product_thumbnail={product.product_thumbnail}
                                                    product_thumbnail_2={product.product_images ? product.product_images[1]?.image_url : ""}
                                                    product_name={product.product_name}
                                                    product_price={product.product_price}
                                                    product_rate={product.product_rate}
                                                    product_brand={product.product_vendor.name}
                                                    product_description={product.product_description}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    )
                                )}
                            </Carousel>
                            <div className="flex justify-center">
                                <Link href={`${INTERNATIONAL_PRODUCT_URL}`} className=" block py-2 px-4 rounded-full text-sm text-pink-400 cursor-pointer  border-[1px] font-bold w-fit">Xem tất cả</Link>
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-full  rounded-md mt-[30px]">
                    <h1 className=' text-[18px] sm:text-[20px] md:text-[26px] leading-[36px] font-[700] text-center pb-[30px]'>Sản Phẩm mới</h1>
                    {loadingDiscount ? (
                        <LoadingPage className='w-full !h-[430px]' />
                    ) : (
                        <div className='space-y-3'>
                            <Carousel
                                slidesPerGroupBreakpoints={breakpointsPerview}
                                breakpoints={breakpoints}
                            >
                                {products_display.map(
                                    (product) => (
                                        <SwiperSlide key={product.id} className='!py-[10px]'>
                                            <Link href={`${DETAIL_PRODUCT_URL}/${product.product_slug}`} className='block w-full h-full'>
                                                <CardProductFull
                                                    key={product.id}
                                                    id={product.id}
                                                    product_discount={calculateDiscount(product)}
                                                    product_thumbnail={product.product_thumbnail}
                                                    product_thumbnail_2={product.product_images ? product.product_images[1]?.image_url : ""}
                                                    product_name={product.product_name}
                                                    product_price={product.product_price}
                                                    product_rate={product.product_rate}
                                                    product_brand={product.product_vendor.name}
                                                    product_description={product.product_description}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    )
                                )}
                            </Carousel>
                            <div className="flex justify-center">
                                <Link href={`${NEW_PRODUCT_URL}`} className=" block py-2 px-4 rounded-full text-sm text-pink-400 cursor-pointer  border-[1px] font-bold w-fit">Xem tất cả</Link>
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
                            <div className=" col-span-2  lg:col-span-4  flex items-center justify-center">
                                <Carousel customSwipeWrap='!p-0 !h-full !max-h-full' slidesPerView={1} loop clickable enableAutoPlay>
                                    {promotions && promotions.map(({ id, slug, thumbnail }) => (
                                        <SwiperSlide key={id}>
                                            <Link href={`${PROMOTION_URL}/${slug}`} className='w-full h-full relative'>
                                                <Image
                                                    src={thumbnail}
                                                    alt="carousel-image"
                                                    className="h-full max-h-[250px] w-full object-cover"
                                                    width={702} height={301}
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
                                            product_discount={calculateDiscount(product)}
                                            product_thumbnail={product.product_thumbnail}
                                            product_thumbnail_2={product.product_images ? product.product_images[1]?.image_url : ""}
                                            product_name={product.product_name}
                                            product_price={product.product_price}
                                            product_rate={product.product_rate}
                                            product_brand={product.product_vendor.name}
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
                            <button className='flex items-center py-2 px-4 rounded-full text-sm text-pink-400 cursor-pointer  border-[1px] font-bold w-fit'
                                onClick={handleLoadMore} >
                                {loading && (
                                    <svg className="animate-spin h-5 w-5 text-pink-400" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"
                                        />
                                    </svg>
                                )}
                                Xem Thêm</button>
                        </div>
                    )
                }
            </div >


        </ContainerLayout >

    );
};

export default HomePage;
