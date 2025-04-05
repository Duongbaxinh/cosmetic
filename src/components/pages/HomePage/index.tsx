'use client'
import { Product } from '@/types';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SwiperSlide } from 'swiper/react';
import Carousel from '../../atoms/Carousel';
import CardProduct from '../../molecules/CardProduct';
import CardProductFull from '../../molecules/CardProductFull';
import ListTemplate from '../../molecules/ListTemplate';
import BrandCard from '../../atoms/BranchCard';
import { useGetAllProducts, useGetBrand } from '@/services';
import { createParams } from '@/utils';
import ContainerLayout from '@/layouts/ContainerLayout';
import { categories } from '@/fakes';


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
    640: {
        slidesPerView: 3,
    },
    768: {
        slidesPerView: 3,
    },
    1024: {
        slidesPerView: 3,
    },
    1280: {
        slidesPerView: 6,
    },
}
const HomePage: React.FC = () => {

    const [filter, setFilter] = useState<Record<string, number>>({
        page: 1,
        limit: 10,
    });

    const filterParams = useMemo(() => createParams(filter), [filter]);
    const internationalParams = useMemo(() => createParams({ product_international: true }), []);
    const productDiscountParams = useMemo(() => createParams({ discount: true }), []);

    const { products, loading } = useGetAllProducts(filterParams, true);
    const { products: product_internationals, loading: loading_pr_inter } = useGetAllProducts(internationalParams, true);
    const { products: product_discounts, loading: loading_pr_discount } = useGetAllProducts(productDiscountParams, true);
    const { brands: brands, loading: loading_brand } = useGetBrand(filterParams, true);

    const handleLoadMore = () => {
        setFilter((prev) => ({ ...prev, limit: prev.limit + 5 }));
    }
    console.log('products', products.length);
    console.log('product_internationals', brands);
    // if (loading) return <div className="text-center">Loading ....</div>;

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
                <div className="w-full bg-white rounded-md  ">
                    <ListTemplate
                        time={{ hour: 1, minus: 30 }}
                        leading={TITLE[0].leading}
                        trailing={TITLE[0].trailing}
                    >
                        <Carousel
                            breakpoints={breakpoints}
                        >
                            {product_discounts.map(
                                ({
                                    product_id,
                                    product_price,
                                    product_thumbnail,

                                }) => (
                                    <SwiperSlide key={product_id}>
                                        <Link href={`/detailproduct/${product_id}`}>
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

                    </ListTemplate>
                </div>
                {/* Nhập khẩu chính hãng */}
                <div className="w-full bg-white rounded-md  ">
                    <ListTemplate
                        leading='Nhập khẩu chính hãng'
                        trailing='Xem tất cả'
                    >

                        <Carousel
                            breakpoints={breakpoints}
                        >
                            {products.map(
                                ({
                                    product_id,
                                    product_name,
                                    product_thumbnail,
                                    product_genuine,
                                    product_price,
                                }) => (
                                    <SwiperSlide key={product_id}>
                                        <a href={`/detailproduct/${product_id}`}>
                                            <CardProductFull
                                                key={product_id}
                                                product_id={product_id}
                                                product_thumbnail={product_thumbnail}
                                                product_name={product_name}
                                                product_price={product_price}
                                            />
                                        </a>
                                    </SwiperSlide>


                                )
                            )}
                        </Carousel>

                    </ListTemplate>
                </div>

                {/* Thương hiệu nổi bật */}
                <div className="w-full bg-white rounded-md  ">
                    <ListTemplate
                        leading='Thương hiệu nổi bật'
                        trailing='Xem tất cả'
                    >

                        <Carousel
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
                        </Carousel>

                    </ListTemplate>
                </div>


                {/* Nhập khẩu chính hãng */}
                <div className="w-full bg-white rounded-md  ">
                    <ListTemplate
                        leading='Hàng ngoại giá tốt'
                        trailing='Xem tất cả'
                    >

                        <Carousel
                            breakpoints={breakpoints}
                        >
                            {product_internationals.map(
                                ({
                                    product_id,
                                    product_name,
                                    product_thumbnail,
                                    product_genuine,
                                    product_price,
                                }) => (
                                    <SwiperSlide key={product_id}>
                                        <a href={`/detailproduct/${product_id}`}>
                                            <CardProductFull
                                                key={product_id}
                                                className='min-h-[330px]'
                                                product_id={product_id}
                                                product_thumbnail={product_thumbnail}
                                                product_name={product_name}
                                                product_price={product_price}
                                            />
                                        </a>
                                    </SwiperSlide>
                                )
                            )}
                        </Carousel>

                    </ListTemplate>
                </div>
                <div className="w-full bg-white rounded-md  ">
                    <ListTemplate
                        leading='Gợi ý hôm nay'
                        trailing='Xem tất cả'
                    >

                        <div className="grid grid-cols-3 lg:grid-cols-6  space-x-3 space-y-3">
                            {/* Banner */}
                            <div className=" col-span-1  md:col-span-2  flex items-center justify-center">
                                <img src='' alt='' className='w-full h-full object-cover' />
                            </div>
                            {/* Products */}
                            {products.map(({
                                product_id,
                                product_name,
                                product_thumbnail,
                                product_genuine,
                                product_price,
                            }) => (
                                <div key={product_id} className=" flex items-center justify-center">
                                    <CardProductFull
                                        key={product_id}
                                        product_id={product_id}
                                        product_thumbnail={product_thumbnail}
                                        product_name={product_name}
                                        product_price={product_price}
                                    />
                                </div>
                            ))}
                            {/* Banner */}
                        </div>

                    </ListTemplate>
                </div>

                <div className="w-full flex items-center justify-center">
                    <button onClick={handleLoadMore} >Xem Them</button>
                </div>
            </div>


        </ContainerLayout>

    );
};

export default HomePage;
