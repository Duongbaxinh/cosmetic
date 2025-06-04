'use client'
import CartIcon from '@/assets/icons/CartIcon';
import Breadcrumb, { BreadcrumbItem } from '@/components/atoms/Breadcrumb';
import Carousel from '@/components/atoms/Carousel';
import IconButton from '@/components/atoms/IconButton';
import Price from '@/components/atoms/Price';
import { ProductSkeleton, Skeleton } from '@/components/atoms/ProductSkeleton';
import Tag from '@/components/atoms/Tag';
import CardProductSimilar from '@/components/molecules/CardProductSimilar';
import GroupStart from '@/components/organisms/GroupStart';
import { MESS_DELIVERY } from '@/config/mess.config';
import { useAuth } from '@/contexts/auth.context';
import { DETAIL_PRODUCT_URL } from '@/routers';
import { Product, ShippingAddress } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { SwiperSlide } from 'swiper/react';

interface DetailProductProps {
    product: Product;
    similarProduct?: Product[];
    shippingAddress?: ShippingAddress[],
    similarProductLoading?: boolean
    numberReview: number;
    product_price: number;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    product_quantity: number;
    cost_tentative: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onChangeQuantity: (value: string) => void;
    onPurchase: () => void;
    onAddToCart: ({ product_id, quantity }: { product_id: string, quantity: number }) => void;
    breadcrumbDetailProduct: BreadcrumbItem[]
}

const DetailProduct: React.FC<DetailProductProps> = ({
    product,
    similarProduct,
    shippingAddress,
    breadcrumbDetailProduct,
    product_quantity,
    cost_tentative,
    onIncrease,
    onBlur,
    onDecrease,
    onChangeQuantity,
    onPurchase,
    onAddToCart
}) => {
    const { userProfile } = useAuth()
    const [showMore, setShowMore] = useState({
        productDescription: false,
        productInfo: false,
    });
    const productDiscount = product.product_promotion?.discount_percent ? product.product_price * (product.product_promotion.discount_percent / 100) : 0
    return (
        <div className="flex flex-col gap-2.5 w-full max-w-full  rounded-md  order-2 lg:order-1 ">
            {/* Product Info */}
            <div className="px-1 md:px-4  bg-white rounded-md ">
                <div className="flex flex-col gap-2.5">
                    <div className="pb-3">
                        <Breadcrumb items={breadcrumbDetailProduct} />
                    </div>
                    <div className="flex">
                        <div className="flex space-x-2.5">
                            <p className="text-[14px] font-[700] leading-5 uppercase">{`${product.product_brand?.title}`}</p>
                        </div>
                    </div>
                    <p className=" text-[20px] font-[700] leading-[26px]">{product.product_name}</p>

                    <div className="flex justify-start items-center gap-2 pr-0 md:pr-24">
                        <div className="flex items-center gap-2.5">
                            <GroupStart starActive={Math.round(Number(product.product_rate))} className='w-[100px]' />
                            <p className='text-[14px]  font-[500]'>({product.product_rate})</p>
                            <p className="text-[12px] "> <b>xuất xứ</b> {`${product.product_made}`}</p>
                        </div>
                        <p className="text-[12px] leading-[24px] "> <b>Đã bán</b> {` (${product.product_sold})`}</p>
                    </div>
                    <div className="flex items-center gap-5">
                        {productDiscount > 0 && (
                            <Price
                                className="text-pink-600 justify-center font-medium text-[20px]"
                                product_price={productDiscount}
                            />
                        )}
                        <Price
                            className={`!text-[14px] justify-center  ${productDiscount ? "line-through text-gray-400 font-600 " : 'text-pink-300 font-bold'}`}
                            product_price={product.product_price}
                        />
                        {productDiscount > 0 && (
                            <Tag value={product.product_promotion?.discount_percent?.toString() ?? ''} />
                        )}
                        {/* {(product.product_discount) && (<Chip title={product.dis} />)} */}
                        {/* <p className='line-through text-[14px] text-gray-400'>{Number(product.product_price).toLocaleString("vi-VN")}<sup>đ</sup></p> */}
                    </div>
                    <div className="mb-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-3 fixed left-0 bottom-0 z-30 w-full md:static px-2 sm:px-0 py-5 md:py-0 bg-white ">
                            <div className=" flex h-[48px] gap-5 flex-grow">
                                <div className="  h-full flex items-center gap-2 border-[2px] border-gray-200 rounded-full overflow-hidden ">
                                    <IconButton icon={<BiMinus />} onClick={() => onDecrease()} className='w-[30px] h-full ' />
                                    <input
                                        type="text"
                                        value={product_quantity === 0 ? "" : product_quantity.toString()}
                                        onBlur={(e) => onBlur(e)}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                onChangeQuantity(value);
                                            }
                                        }}
                                        className="bg-white w-[30px] h-full rounded-sm text-black text-center"
                                    />

                                    <IconButton icon={<BiPlus />} onClick={() => onIncrease()} className='w-[30px] h-full ' />
                                </div>
                                <button onClick={() => onAddToCart({ product_id: product.id, quantity: product_quantity || 1 })}
                                    className="flex flex-grow gap-2 items-center justify-center py-3 px-1 md:px-[27px] 
                                    rounded-full  text-white bg-black hover:bg-gradient-to-tl hover:from-pink-400 hover:to-purple-400  cursor-pointer">
                                    <CartIcon className='text-white' fill='#ffffff' /> Thêm vào giỏ hàng
                                </button>
                            </div>
                            <button onClick={onPurchase} className=" bg-gradient text-white py-[14px] px-[23px] min-w-[100px] rounded-full cursor-pointer hover:bg-red-600">
                                Mua ngay
                            </button>


                        </div>
                        <div className='flex items-center gap-5 pt-4' >
                            <p className="font-medium">Tạm tính</p>
                            <p className="text-2xl font-bold text-black">
                                <Price className='text-[24px]' product_price={cost_tentative} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping Info */}
            <div className="px-2 space-y-2  bg-white rounded-md ">
                <h2 className="text-[16px] font-bold leading-[24px]">Thông tin vận chuyển</h2>
                <div className="flex justify-between items-center gap-2.5 text-[14px] leading-[21px] font-light">
                    <p>Giao đến: {shippingAddress && shippingAddress.length > 0 ? (shippingAddress[0].address) : MESS_DELIVERY.ADDRESS_MESS}</p>
                    {shippingAddress && shippingAddress[0] && shippingAddress[0].address && (<button className="text-blue-300 cursor-pointer">Đổi</button>)}
                </div>
            </div >
            <div className="relative p-2 space-y-2  bg-white rounded-md ">
                <div className={` ${showMore.productInfo && 'hidden'} absolute rounded-md pb-6 top-0 left-0 w-full h-full flex items-end justify-center bg-gradient-to-b from-transparent from-30% via-white via-80% to-white to-100% `}>
                    <button className='text-[13px] leading-[39px] text-blue-300 w-full cursor-pointer' onClick={() => setShowMore({ ...showMore, productInfo: true })}> Xem thêm </button>
                </div>
                <h2 className="text-[16px] font-bold leading-[24px]">Thông tin chi tiết</h2>
                <div className={`text-[14px] text-gray-400 leading-[21px] ${showMore.productInfo ? "" : "line-clamp-[15]"}`}>
                    <div className="grid grid-cols-2 py-2"><p>Thương hiệu</p> <p>{product.product_brand?.title}</p></div>
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
                                        <div className=" w-full grid grid-cols-3 space-x-2 space-y-2  ">
                                            {
                                                similarProduct && similarProduct.length > 0 && similarProduct.slice(index * 6, index * 6 + 6).map((product, index) => (
                                                    <Link key={index} href={`${DETAIL_PRODUCT_URL}/${product.product_slug}`} >
                                                        <CardProductSimilar
                                                            product_brand={product.product_brand}
                                                            product_description={product.product_description}
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
