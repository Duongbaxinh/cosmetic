'use client'

import PopupInfo from '@/components/molecules/PopupInfo';
import PopupPrivate from '@/components/molecules/PopupPrivate';
import { useCart } from '@/contexts/cart.context';
import { useOrder } from '@/contexts/order.context';
import ContainerLayout from '@/layouts/ContainerLayout';
import { setUser } from '@/redux/slices/auth.slice';
import { useGetAllProductsQuery, useGetProductByIdQuery } from '@/redux/slices/product.slice';
import { useGetReviewProductByIdQuery } from '@/redux/slices/review.slice';
import { setShippingAddress } from '@/redux/slices/shippingAddress.slice';
import { RootState } from '@/redux/store';
import { OrderProduct, ShippingAddress } from '@/types';
import { createParams } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailProduct from './DetailProduct';
import OverviewProduct from './OverviewProduct';
import ReviewProduct from './ReviewProduct';

export type PopupContactType = {
    openLogin: boolean;
    openContact: boolean
}

function DetailProductPage({ id }: { id: string | number }) {
    const { handlePurchase, proceedToCheckout, isOpen, setIsOpen } = useOrder()
    const { cart, addToCart } = useCart()
    const [quantity, setQuantity] = useState<number>(1)
    const params = createParams({ product_type: '' });
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


    const handlePurchaseProcess = () => {
        if (!product) return
        const orderProduct: OrderProduct = {
            id: product.id,
            product_name: product.product_name,
            product_price: product.product_price,
            product_thumbnail: product.product_thumbnail,
            quantity: quantity,
        }
        return handlePurchase(orderProduct)

    }

    const proceedToCheckoutOrder = (shippingAddressNew?: ShippingAddress) => {
        alert("new address ::: ")
        console.log("shipping address :::: ", shippingAddressNew)
        if (!product) return
        const orderProduct: OrderProduct = {
            id: product.id,
            product_name: product.product_name,
            product_price: product.product_price,
            product_thumbnail: product.product_thumbnail,
            quantity: quantity,
        }
        proceedToCheckout({ shippingAddressNew: shippingAddressNew, product: orderProduct })
    }


    const handleAddToCart = async ({ product_id, quantity }: { product_id: string, quantity: number }) => {
        console.log("check cart", cart)
        if (!cart || !cart?.cart_id) return
        await addToCart(cart?.cart_id, product_id, quantity)
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
            {isOpen.openContact && (<PopupInfo isOpen={isOpen.openContact} onClose={() => handleClosePopup('openContact')} callBack={proceedToCheckoutOrder} />)}

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 ">
                <OverviewProduct
                    product={product}
                />
                <DetailProduct
                    breadcrumbDetailProduct={breadcrumbDetailProduct}
                    shippingAddress={shippingAddress}
                    product={product}
                    similarProduct={products?.results ?? []}
                    similarProductLoading={loading}
                    numberReview={reviewProduct?.total_reviews ?? 0}
                    product_price={product.product_price}
                    product_quantity={quantity}
                    cost_tentative={cost_tentative}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                    onChangeQuantity={handleChangeQuantity}
                    onPurchase={handlePurchaseProcess}
                    onAddToCart={handleAddToCart}
                />
            </div>
            <div className="w-full  bg-white rounded-md shadow-sm mt-3">
                <ReviewProduct review={reviewProduct} />
            </div>
        </ContainerLayout>
    );
}

export default DetailProductPage;