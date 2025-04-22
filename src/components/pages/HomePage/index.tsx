'use client'
import { ProductSkeleton } from '@/components/atoms/ProductSkeleton';
import { categories } from '@/fakes';
import ContainerLayout from '@/layouts/ContainerLayout';
import { createParams, handleAxiosError } from '@/utils';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { Product, ProductEnum, ProductResponse } from '@/types';
import { useDispatch } from 'react-redux';
import { useGetAllProductsDiscountQuery, useGetAllProductsInternalQuery, useGetAllProductsQuery } from '@/redux/slices/product.slice';
import { useGetBrand } from '@/services';
import { CATEGORY_URL, DETAIL_PRODUCT_URL } from '@/routers';


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
        slidesPerView: 6,
    },
}
const HomePage: React.FC = () => {
    const [filter, setFilter] = useState<Record<string, number>>({ page: 1, limit: 10, });
    const filterParams = useMemo(() => createParams(filter), [filter]);
    const [products, setProducts] = useState<ProductResponse | null>(null)
    const internationalParams = useMemo(() => createParams({ product_international: true }), []);
    const discountParams = useMemo(() => createParams({ discount: true }), []);
    const { data, error, isLoading: loading } = useGetAllProductsQuery(filter)
    const { data: productsDiscount, error: errDiscount, isLoading: loadingDiscount } = useGetAllProductsDiscountQuery(filter)
    const { data: productsInternal, error: errInternal, isLoading: loadingInternal } = useGetAllProductsInternalQuery(filter)
    const { brands: brands, loading: loading_brand } = useGetBrand(filterParams, true);
    // if (!products) return
    const check_load = products ? (products.total - products.products.length) > 0 : false
    const handleLoadMore = async () => {
        try {
            if (!check_load) return
            const newLimit = products ? (products.total - products.products.length) : 0
            const newFilter = { ...filter, page: filter.page + 1, limit: Math.min(filter.limit, newLimit) };
            setFilter(newFilter)
        } catch (error) {
            const mess = handleAxiosError(error)
        }
    }
    useEffect(() => {
        if (data) {
            setProducts(prev => {
                const prevProducts = prev?.products ?? [];
                return {
                    ...data,
                    products: [...prevProducts, ...data.products],
                };
            });
        }
    }, [data]);

    const product_internal_display = productsInternal?.products ?? []
    const product_discounts_display = productsDiscount?.products ?? []
    const products_display = products?.products ?? []

    console.log("check product discount", productsDiscount)
    return (
        <ContainerLayout >
            <div className="w-full flex-col gap-8 space-y-4 text-black">
                {/* CATEGORY */}
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

                {/* Giá tốt hôm nay */}
                <div className="w-full bg-white rounded-md min-h-[330px]  ">
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
                                        product_id,
                                        product_price,
                                        product_thumbnail,

                                    }) => (
                                        <SwiperSlide key={product_id}>
                                            <Link href={`${DETAIL_PRODUCT_URL}/${product_id}`}>
                                                <CardProduct
                                                    key={product_id}
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
                                        product_id,
                                        product_name,
                                        product_thumbnail,
                                        product_price,
                                        product_rate
                                    }) => (
                                        <SwiperSlide key={product_id}>
                                            <Link href={`${DETAIL_PRODUCT_URL}/${product_id}`}>
                                                <CardProductFull
                                                    key={product_id}
                                                    product_id={product_id}
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
                                        product_id,
                                        product_name,
                                        product_thumbnail,
                                        product_rate,
                                        product_price,
                                    }) => (
                                        <SwiperSlide key={product_id}>
                                            <Link href={`${DETAIL_PRODUCT_URL}/${product_id}`}>
                                                <CardProductFull
                                                    key={product_id}
                                                    className='min-h-[330px]'
                                                    product_id={product_id}
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
                            (<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  space-x-3 space-y-3">
                                {/* Banner */}
                                <div className=" col-span-1  md:col-span-2  flex items-center justify-center">
                                    <img src='' alt='' className='w-full h-full object-cover' />
                                </div>
                                {/* Products */}
                                {products_display.map(({
                                    product_id,
                                    product_name,
                                    product_thumbnail,
                                    product_rate,
                                    product_price,
                                }) => (
                                    <div key={product_id} className=" flex items-center justify-center">
                                        <Link href={`${DETAIL_PRODUCT_URL}/${product_id}`}>
                                            <CardProductFull
                                                key={product_id}
                                                product_id={product_id}
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
                    <div className="w-full flex items-center justify-center">
                        <button onClick={handleLoadMore} >Xem Them</button>
                    </div>
                )}
            </div>


        </ContainerLayout >

    );
};

export default HomePage;
