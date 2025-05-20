'use client'
import { ProductSkeleton } from '@/components/atoms/ProductSkeleton';
import { categories } from '@/fakes';
import ContainerLayout from '@/layouts/ContainerLayout';
import { useGetAllProductsDiscountQuery, useGetAllProductsInternalQuery, useGetAllProductsQuery } from '@/redux/slices/product.slice';
import { CATEGORY_URL, DETAIL_PRODUCT_URL } from '@/routers';
import { useGetBrand } from '@/services';
import { ProductResponse } from '@/types';
import { createParams, handleError } from '@/utils';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SwiperSlide } from 'swiper/react';
import BrandCard from '../../atoms/BranchCard';
import Carousel from '../../atoms/Carousel';
import CardProduct from '../../molecules/CardProduct';
import CardProductFull from '../../molecules/CardProductFull';
import ListTemplate from '../../molecules/ListTemplate';
import { setUser, useGetUserQuery } from '@/redux/slices/auth.slice';
import { useDispatch } from 'react-redux';
import { setShippingAddress, useGetAddressQuery } from '@/redux/slices/shippingAddress.slice';


const TITLE = [
    {
        leading: 'Giá tốt hôm nay',
        trailing: 'Xem tất cả',
    },
    {
        leading: 'Nhập khẩu chính hãng',
        trailing: '',
    },
];

const breakpoints = {
    300: {
        slidesPerView: 2,
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
}
const HomePage: React.FC = () => {
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    const { data: userProfile, error: errorProfile, isLoading } = useGetUserQuery(undefined, {
        skip: !accessToken,
    });

    const { data: shippingAddress, error: errorShippingAddress, isLoading: loadingShippingAddress } = useGetAddressQuery(undefined, {
        skip: !accessToken,
    });

    const [filter, setFilter] = useState<Record<string, number>>({ page: 1, limitnumber: 10, });
    const filterParams = useMemo(() => createParams(filter), [filter]);
    const [products, setProducts] = useState<ProductResponse | null>(null)
    const internationalParams = useMemo(() => createParams({ product_international: true }), []);
    const discountParams = useMemo(() => createParams({ product_discount: true }), []);
    const { data, error, isLoading: loading } = useGetAllProductsQuery(filter)
    const { data: productsDiscount, error: errDiscount, isLoading: loadingDiscount } = useGetAllProductsDiscountQuery(discountParams)
    const { data: productsInternal, error: errInternal, isLoading: loadingInternal } = useGetAllProductsInternalQuery(internationalParams)
    const { brands: brands, loading: loading_brand } = useGetBrand(filterParams, true);

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
        if (userProfile) {
            dispatch(setUser(userProfile));
        }
        if (shippingAddress) {
            dispatch(setShippingAddress(shippingAddress))
        }
    }, [userProfile]);

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
        <ContainerLayout >
            <div className="w-full flex-col gap-8 space-y-4 text-black">
                {/* CATEGORY */}
                <div className=" w-full p-3 bg-white rounded-md">
                    <Carousel slidesPerView={2} clickable>
                        {categories.map(({ id, product_thumbnail }) => (
                            <SwiperSlide key={id}>
                                <Link href={`/category/${id}`}>
                                    <img
                                        src={product_thumbnail}
                                        alt="carousel-image"
                                        className="h-full max-h-[250px] w-full object-cover"
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}

                    </Carousel>
                </div>

                {/* Giá tốt hôm nay */}
                <div className="w-full bg-white rounded-md">
                    <ListTemplate
                        time={{ hour: 1, minus: 30 }}
                        leading={TITLE[0].leading}
                        trailing={<Link href={`${CATEGORY_URL}/category_key`} className="text-sm text-blue-400 cursor-pointer">Xem tất cả</Link>}
                    >
                        {loadingDiscount ? (
                            <ProductSkeleton />
                        ) : (
                            <Carousel
                                breakpoints={breakpoints}
                            >
                                {product_discounts_display.map(
                                    ({
                                        id,
                                        product_price,
                                        product_thumbnail,

                                    }) => (
                                        <SwiperSlide key={id}>
                                            <Link href={`${DETAIL_PRODUCT_URL}/${id}`}>
                                                <CardProduct
                                                    key={id}
                                                    product_price={product_price}
                                                    product_purchase={product_price ?? 0}
                                                    product_thumbnail={product_thumbnail}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    )
                                )}
                            </Carousel>
                        )}

                    </ListTemplate>
                </div>

                {/* Nhập khẩu chính hãng */}
                <div className="w-full bg-white rounded-md min-h-[330px]  ">
                    <ListTemplate
                        leading='Nhập khẩu chính hãng'
                        trailing={<Link href={`${CATEGORY_URL}/category_key`} className="text-sm text-blue-400 cursor-pointer">Xem tất cả</Link>}
                    >
                        {loading ? (
                            <ProductSkeleton />
                        ) :
                            (<Carousel
                                breakpoints={breakpoints}
                            >
                                {products_display.map(
                                    ({
                                        id,
                                        product_name,
                                        product_thumbnail,
                                        product_price,
                                        product_rate
                                    }) => (
                                        <SwiperSlide key={id}>
                                            <Link href={`${DETAIL_PRODUCT_URL}/${id}`}>
                                                <CardProductFull
                                                    key={id}
                                                    id={id}
                                                    product_thumbnail={product_thumbnail}
                                                    product_name={product_name}
                                                    product_price={product_price}
                                                    product_rate={product_rate}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    )
                                )}
                            </Carousel>)}

                    </ListTemplate>
                </div>

                {/* Thương hiệu nổi bật */}
                <div className="w-full bg-white rounded-md  min-h-[330px] ">
                    <ListTemplate
                        leading='Thương hiệu nổi bật'
                        trailing={<Link href={`${CATEGORY_URL}/category_key`} className="text-sm text-blue-400 cursor-pointer">Xem tất cả</Link>}
                    >
                        {loading ? (
                            <ProductSkeleton />
                        ) :
                            (<Carousel
                                breakpoints={breakpoints}
                            >
                                {brands.map(
                                    ({
                                        discount, id,
                                        logo_image,
                                        product_image,
                                        title
                                    }) => (
                                        <SwiperSlide key={id}>
                                            <Link href={"#"}>
                                                <BrandCard
                                                    key={id}
                                                    discount={discount}
                                                    productImage={product_image}
                                                    logoImage={logo_image}
                                                    title={title}
                                                // discount={discount}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    )
                                )}
                            </Carousel>)}

                    </ListTemplate>
                </div>

                {/* Nhập khẩu chính hãng */}
                <div className="w-full bg-white rounded-md  min-h-[330px] ">
                    <ListTemplate
                        leading='Hàng ngoại giá tốt'
                        trailing={<Link href={`${CATEGORY_URL}/category_key`} className="text-sm text-blue-400 cursor-pointer">Xem tất cả</Link>}

                    >
                        {loadingInternal ? (
                            <ProductSkeleton />
                        ) :
                            (<Carousel
                                breakpoints={breakpoints}
                            >
                                {product_internal_display.map(
                                    ({
                                        id,
                                        product_name,
                                        product_thumbnail,
                                        product_rate,
                                        product_price,
                                    }) => (
                                        <SwiperSlide key={id}>
                                            <Link href={`${DETAIL_PRODUCT_URL}/${id}`}>
                                                <CardProductFull
                                                    key={id}
                                                    className='min-h-[330px]'
                                                    id={id}
                                                    product_thumbnail={product_thumbnail}
                                                    product_name={product_name}
                                                    product_price={product_price}
                                                    product_rate={product_rate}
                                                />
                                            </Link>
                                        </SwiperSlide>
                                    )
                                )}
                            </Carousel>)}

                    </ListTemplate>
                </div>

                <div className="w-full bg-white rounded-md  min-h-[330px] ">
                    <ListTemplate
                        leading='Gợi ý hôm nay'
                        trailing={<Link href={`${CATEGORY_URL}/category_key`} className="text-sm text-blue-400 cursor-pointer">Xem tất cả</Link>}
                    >

                        {loading ? (
                            <ProductSkeleton length={20} />
                        ) :
                            (<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  space-x-3 space-y-3">
                                {/* Banner */}
                                <div className=" col-span-1  md:col-span-2  flex items-center justify-center">
                                    <img src='' alt='' className='w-full h-full object-cover' />
                                </div>
                                {/* Products */}
                                {products_display.map(({
                                    id,
                                    product_name,
                                    product_thumbnail,
                                    product_rate,
                                    product_price,
                                }) => (
                                    <div key={id} className=" flex items-center justify-center">
                                        <Link href={`${DETAIL_PRODUCT_URL}/${id}`}>
                                            <CardProductFull
                                                key={id}
                                                id={id}
                                                product_thumbnail={product_thumbnail}
                                                product_name={product_name}
                                                product_price={product_price}
                                                product_rate={product_rate}
                                            /></Link>
                                    </div>
                                ))}
                                {/* Banner */}
                            </div>)}

                    </ListTemplate>
                </div>

                {check_load && (
                    <div className="w-full flex items-center justify-center ">
                        <button className='cursor-pointer p-2 border-[1px] border-gray-300 text-blue-300 rounded-md' onClick={handleLoadMore} >Xem Them</button>
                    </div>
                )}
            </div>


        </ContainerLayout >

    );
};

export default HomePage;
