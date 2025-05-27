"use client";
import NotFound from '@/components/molecules/NotFound';
import { useCart } from '@/contexts/cart.context';
import { useOrder } from '@/contexts/order.context';
import ContainerLayout from '@/layouts/ContainerLayout';
import { useGetAllProductsQuery, useGetProductByIdQuery } from '@/redux/slices/product.slice';
import { useGetReviewProductByIdQuery } from '@/redux/slices/review.slice';
import { setShippingAddress } from '@/redux/slices/shippingAddress.slice';
import { RootState } from '@/redux/store';
import { OrderProduct, ShippingAddress } from '@/types';
import { createParams } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingPage from '../LoadingPage';
import DetailProduct from './DetailProduct';
import OverviewProduct from './OverviewProduct';
import ReviewProduct from './ReviewProduct';

export type PopupContactType = {
    openLogin: boolean;
    openContact: boolean;
};

function DetailProductPage({ id }: { id: string | number }) {
    const { handlePurchase, proceedToCheckout, isOpen, setIsOpen } = useOrder();
    const { cart, addToCart } = useCart();
    const [quantity, setQuantity] = useState<number>(1);
    const { data: product, isLoading: loadingProduct, error: errorProduct } = useGetProductByIdQuery(id);
    const params = createParams({ product_type: product?.product_type ?? "" });
    const { data: products, isLoading: loading, error } = useGetAllProductsQuery(params);
    const { data: reviewProduct, error: errorReview, isLoading: reviewLoading } = useGetReviewProductByIdQuery(id);

    const dispatch = useDispatch();
    const shippingAddress = useSelector((state: RootState) => state.address.shippingAddress);
    const cost_tentative = useMemo(() => (product ? quantity * product.product_price : 0), [quantity, product]);

    useEffect(() => {
        const shippingData = localStorage.getItem("shippingAddress");
        if (shippingData) {
            dispatch(setShippingAddress(JSON.parse(shippingData)));
        }
    }, [dispatch]);

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrease = () => {
        quantity > 1 && setQuantity((prev) => prev - 1);
    };

    const handleChangeQuantity = (number: string) => {
        setQuantity(() => Number(number));
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            setQuantity(1);
        }
    };

    const handlePurchaseProcess = () => {
        if (!product) return;
        const orderProduct: OrderProduct = {
            id: product.id,
            product_name: product.product_name,
            product_price: product.product_price,
            product_thumbnail: product.product_thumbnail,
            quantity: quantity,
        };
        return handlePurchase(orderProduct);
    };



    const handleAddToCart = async ({ product_id, quantity }: { product_id: string; quantity: number }) => {

        if (!cart || !cart?.id) return;
        await addToCart(cart?.id, product_id, quantity);
        toast.success("Đã thêm vào giỏ hàng thành công")

    };

    const handleClosePopup = (field: "openLogin" | "openContact") => {
        setIsOpen((prev) => ({ ...prev, [field]: false }));
    };

    if (loadingProduct)
        return <LoadingPage className="w-screen h-screen bg-pink-50" />;
    if (!product)
        return <NotFound content="Không tìm thấy sản phẩm" className="!justify-center w-screen h-screen" />;

    const breadcrumbDetailProduct = [
        { label: "Trang Chủ", href: "/" },
        { label: product.product_type, href: "#" },
        { label: product.product_name, href: "#" },
    ];
    const similarProduct = products?.results.filter((item) => item.id !== product.id) || [];
    return (
        <ContainerLayout isSidebar={false}>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                <OverviewProduct product={product} />
                <DetailProduct
                    breadcrumbDetailProduct={breadcrumbDetailProduct}
                    shippingAddress={shippingAddress}
                    product={product}
                    similarProduct={similarProduct}
                    similarProductLoading={loading}
                    numberReview={reviewProduct?.total_reviews ?? 0}
                    product_price={product.product_price}
                    product_quantity={quantity}
                    cost_tentative={cost_tentative}
                    onIncrease={handleIncrease}
                    onBlur={handleOnBlur}
                    onDecrease={handleDecrease}
                    onChangeQuantity={handleChangeQuantity}
                    onPurchase={handlePurchaseProcess}
                    onAddToCart={handleAddToCart}

                />
            </div>
            <div className="w-full bg-white rounded-lg shadow-sm mt-4 border border-gray-200">
                {reviewProduct && reviewProduct.reviews.length > 0 ? (
                    <ReviewProduct review={reviewProduct} />
                ) : (
                    <div className="p-4 text-gray-500 w-full h-full min-h-[300px] flex items-center justify-center">
                        <NotFound
                            className="!justify-center text-gray-500"
                            content="Không có đánh giá nào"
                        />
                    </div>
                )}
            </div>
        </ContainerLayout>
    );
}

export default DetailProductPage;