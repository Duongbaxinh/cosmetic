'use client'

import { productList } from '@/fakes';
import ContainerLayout from '@/layouts/ContainerLayout';
import { placeOrder, useGetAllProducts, useGetProductDetail } from '@/services';
import { handleCheckout } from '@/services/checkout.service';
import { useMemo, useState } from 'react';
import DetailProduct from './DetailProduct';
import OverviewProduct from './OverviewProduct';
import Purchase from './Purchase';
import { redirect } from 'next/navigation';

function DetailProductPage({ product_id }: { product_id: string | number }) {
    const [quantity, setQuantity] = useState<number>(1)
    const params = useMemo(() => { return { type: "Kem dưỡng trắng da" } }, []);
    const { products: similar_products } = useGetAllProducts(params, false);
    const { product: products, loading } = useGetProductDetail(0, false);
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
        redirect(`/checkout/${result?.order_id}`)
        console.log("check result purchase :::: ", result)
    }

    const handleAddToCart = () => {
        alert("add to cart")
    }

    if (loading) return <div className='w-full h-full flex justify-center items-center'>Loading...</div>;

    return (
        <ContainerLayout isSidebar={false} >
            <div className="w-full flex flex-col lg:flex-row justify-center gap-3">
                <OverviewProduct
                    product={product}
                />
                <DetailProduct product={product} similar_product={similar_products} />
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
        </ContainerLayout>
    );
}

export default DetailProductPage;