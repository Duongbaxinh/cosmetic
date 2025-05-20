'use client'

import Breadcrumb from '@/components/atoms/Breadcrumb';
import PopupPrivate from '@/components/molecules/PopupPrivate';
import { useAuth } from '@/contexts/auth.context';
import ContainerLayout from '@/layouts/ContainerLayout';
import { setUser, useGetUserQuery } from '@/redux/slices/auth.slice';
import { useGetAllProductsQuery, useGetProductByIdQuery } from '@/redux/slices/product.slice';
import { useGetReviewProductByIdQuery } from '@/redux/slices/review.slice';
import { CHECKOUT_URL } from '@/routers';
import { placeOrder } from '@/services';
import { redirect } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import DetailProduct from './DetailProduct';
import OverviewProduct from './OverviewProduct';
import Purchase from './Purchase';
import ReviewProduct from './ReviewProduct';
import PopupInfo from '@/components/molecules/PopupInfo';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setShippingAddress } from '@/redux/slices/shippingAddress.slice';
import { useDispatch } from 'react-redux';

export type PopupContactType = {
    openLogin: boolean;
    openContact: boolean
}

function DetailProductPage({ id }: { id: string | number }) {
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState({
        openLogin: false,
        openContact: false
    })
    const [quantity, setQuantity] = useState<number>(1)
    const params = useMemo(() => { return { product_type: '' } }, []);
    const { data: product, isLoading: loadingProduct, error: errorProduct } = useGetProductByIdQuery(id);
    const { data: products, isLoading: loading, error } = useGetAllProductsQuery(params);
    const { data: reviewProduct, error: errorReview, isLoading: reviewLoading } = useGetReviewProductByIdQuery(id);

    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.user.user);
    const shippingAddress = useSelector((state: RootState) => state.address.shippingAddress);
    const cost_tentative = useMemo(() => product ? quantity * product.product_price : 0, [quantity, product])


    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("userInfo");
        const shippingData = localStorage.getItem("shippingAddress");

        if (accessToken && userData) {
            dispatch(setUser(JSON.parse(userData)));
        }

        if (shippingData) {
            dispatch(setShippingAddress(JSON.parse(shippingData)));
        }
    }, []);

    if (loadingProduct) return <h1>Loading...</h1>

    const handleIncrease = () => {
        setQuantity(prev => prev + 1)
    }

    const handleDecrease = () => {
        quantity > 1 && setQuantity(prev => prev - 1)
    }

    const handleChangeQuantity = (number: number) => {
        setQuantity(() => Math.max(1, Math.min(number, 50)))
    }

    const handlePurchase = async () => {

        if (!userInfo) {
            return setIsOpen((prev => ({ ...prev, openLogin: true })))
        }
        if (shippingAddress.length <= 0) {
            return setIsOpen((prev => ({ ...prev, openContact: true })))
        }

        const totalPrice = product?.product_price ? product.product_price * quantity : 0
        const orderTemporary = {
            "order_quantity": quantity,
            "order_total_price": totalPrice,
            "order_discount": 0,
            "order_final_price": totalPrice,
            "order_shipping": 15000,
            "order_shippingAddress": shippingAddress[0],
            "order_expected_delivery_time": "2025-04-13T19:00:00Z",
            "order_user": {
                "user_id": user?.id,
                "user_name": user?.username,
                "user_address": user?.address
            },
            "order_products": [
                {
                    "id": product?.id,
                    "product_price": product?.product_price,
                    "product_thumbnail": product?.product_thumbnail,
                    "product_name": product?.product_name,
                    "quantity": quantity,
                    "product_total_price": (product?.product_price ?? 0) * quantity,
                    "product_discount": 0
                },
            ]
        }
        sessionStorage.setItem(`order`, JSON.stringify(orderTemporary))
        // const result = await placeOrder(payload, true)
        redirect(`${CHECKOUT_URL}`)
    }

    const handleAddToCart = () => {
        alert("add to cart")
    }

    const handleClosePopup = (filed: "openLogin" | "openContact") => {
        setIsOpen(prev => ({ ...prev, [filed]: false }))
    }

    if (!product) return <h1> not found</h1>
    if (loadingProduct) return <div className='w-full h-full flex justify-center items-center'>Loading...</div>;
    const breadcrumbDetailProduct = [{ label: "Trang Chủ", href: "/" }, { label: product.product_type, href: "#" }, { label: product.product_name, href: "#" }]
    return (
        <ContainerLayout isSidebar={false} >

            {/* <Popup isOpen={true} /> */}
            {isOpen.openLogin && (<PopupPrivate isOpen={isOpen.openLogin} onClose={() => handleClosePopup('openLogin')} />)}
            {isOpen.openContact && (<PopupInfo isOpen={isOpen.openContact} onClose={() => handleClosePopup('openContact')} />)}
            <div className="pb-3">
                <Breadcrumb items={breadcrumbDetailProduct} />
            </div>
            <div className="w-full flex flex-col lg:flex-row  gap-3">
                <OverviewProduct
                    product={product}
                />
                <DetailProduct
                    shippingAddress={shippingAddress}
                    product={product}
                    similarProduct={products?.results ?? []}
                    similarProductLoading={loading} />
                <Purchase
                    numberReview={reviewProduct?.total_reviews ?? 0}
                    product_price={product.product_price}
                    product_quantity={quantity}
                    cost_tentative={cost_tentative}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onChangeQuantity={handleChangeQuantity}
                    onPurchase={handlePurchase}
                    onAddToCart={handleAddToCart} />
            </div>
            <div className="w-full  bg-white rounded-md shadow-sm mt-3">
                <ReviewProduct review={reviewProduct} />
            </div>
        </ContainerLayout>
    );
}

export default DetailProductPage;