'use client'

import Breadcrumb from '@/components/atoms/Breadcrumb';
import { productList } from '@/fakes';
import ContainerLayout from '@/layouts/ContainerLayout';
import { useGetAllProductsQuery } from '@/redux/slices/product.slice';
import { CHECKOUT_URL } from '@/routers';
import { placeOrder } from '@/services';
import { redirect } from 'next/navigation';
import { useMemo, useState } from 'react';
import DetailProduct from './DetailProduct';
import OverviewProduct from './OverviewProduct';
import Purchase from './Purchase';
import ReviewProduct from './ReviewProduct';
import { useGetReviewProductByIdQuery } from '@/redux/slices/review.slice';

function DetailProductPage({ product_id }: { product_id: string | number }) {
    const [quantity, setQuantity] = useState<number>(1)
    const params = useMemo(() => { return { type: "Kem dưỡng trắng da" } }, []);
    // const { data: products, isLoading: loading, error } = useGetProductByIdQuery(product_id);
    const { data: products, isLoading: loading, error } = useGetAllProductsQuery(params);
    const { data: reviewProduct, error: errorReview, isLoading: reviewLoading } = useGetReviewProductByIdQuery("123");
    const product = productList[0]
    const cost_tentative = useMemo(() => quantity * product.product_price, [quantity])
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
        const payload = {
            product_id: product_id,
            product_quantity: quantity
        }
        console.log("check payload purchase :::: ", payload)
        const result = await placeOrder(payload, true)
        redirect(`${CHECKOUT_URL}/${result?.order_id}`)
    }

    const handleAddToCart = () => {
        alert("add to cart")
    }

    if (loading) return <div className='w-full h-full flex justify-center items-center'>Loading...</div>;
    const breadcrumbDetailProduct = [{ label: "Trang Chủ", href: "/" }, { label: product.product_type, href: "#" }, { label: product.product_name, href: "#" }]
    return (
        <ContainerLayout isSidebar={false} >
            <div className="pb-3">
                <Breadcrumb items={breadcrumbDetailProduct} />
            </div>
            <div className="w-full flex flex-col lg:flex-row  gap-3">
                <OverviewProduct
                    product={product}
                />
                <DetailProduct product={product} similar_product={products?.products ?? []} />
                <Purchase
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