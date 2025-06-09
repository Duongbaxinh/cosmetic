"use client";
import NotFound from '@/components/molecules/NotFound';
import { useCart } from '@/contexts/cart.context';
import { useOrder } from '@/contexts/order.context';
import ContainerLayout from '@/layouts/ContainerLayout';
import { useGetAllProductsQuery, useGetProductByIdQuery } from '@/redux/slices/product.slice';
import { setShippingAddress } from '@/redux/slices/shippingAddress.slice';
import { RootState } from '@/redux/store';
import { OrderProduct } from '@/types';
import { createParams } from '@/utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingPage from '../LoadingPage';
import DetailProduct from './DetailProduct';
import OverviewProduct from './OverviewProduct';

export type PopupContactType = {
    openLogin: boolean;
    openContact: boolean;
};

function DetailProductPage({ id }: { id: string | number }) {
    const { handlePurchase } = useOrder();
    const { cart, addToCart } = useCart();
    const [quantity, setQuantity] = useState<number>(1);
    const { data: product, isLoading: loadingProduct, error: errorProduct } = useGetProductByIdQuery(id);
    const params = createParams({ product_type: product?.product_type ?? "" });
    const { data: products, isLoading: loading, error } = useGetAllProductsQuery(params);
    // const { data: reviewProduct, error: errorReview, isLoading: reviewLoading } = useGetReviewProductByIdQuery(id);

    const dispatch = useDispatch();
    const shippingAddress = useSelector((state: RootState) => state.address.shippingAddress);

    useEffect(() => {
        const shippingData = localStorage.getItem("shippingAddress");
        if (shippingData) {
            dispatch(setShippingAddress(JSON.parse(shippingData)));
        }
    }, [dispatch]);


    if (loadingProduct) return <LoadingPage className="w-screen h-screen bg-pink-50" />;

    if (!product) return <NotFound content="Không tìm thấy sản phẩm" className="!justify-center w-screen h-screen" />;

    const productDiscountDirect = product.product_discount ? product.product_discount_percent : 0
    const productDiscountPromotion = product.product_promotion?.discount_percent ? product.product_promotion.discount_percent : 0
    const productDiscountConclude = productDiscountPromotion > 0 ? productDiscountPromotion : productDiscountDirect
    const productDiscountPrice = (product.product_price * productDiscountConclude / 100)
    const finalPrice = product.product_price - productDiscountPrice
    const cost_tentative = product ? quantity * finalPrice : 0

    const handleIncrease = () => {
        if (Number(quantity + 1) > 50) {
            return toast.info("Vui lòng liên hệ trực tiếp qua hotline để mua hàng với số lượng lớn")
        }
        setQuantity((prev) => prev + 1);
    };

    const handleDecrease = () => {
        quantity > 1 && setQuantity((prev) => prev - 1);
    };

    const handleChangeQuantity = (number: string) => {
        if (Number(number) > 50) {
            toast.info("Vui lòng liên hệ trực tiếp qua hotline để mua hàng với số lượng lớn")
        }
        setQuantity(() => Math.min(50, Number(number)));
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            setQuantity(1);
        }
    };

    const handleAddToCart = async ({ product_id, quantity }: { product_id: string; quantity: number }) => {
        if (!cart || !cart?.id) return;
        await addToCart(cart?.id, product_id, quantity);
        toast.success("Đã thêm vào giỏ hàng thành công")

    };

    const handlePurchaseProcess = () => {
        if (!product) return;
        const orderProduct: OrderProduct = {
            id: product.id,
            product_name: product.product_name,
            product_price: finalPrice,
            product_thumbnail: product.product_thumbnail,
            product_type: product.product_type?.slug ?? "",
            product_brand: product.product_brand?.slug,
            quantity: quantity,
            product_discount: 0
        };
        return handlePurchase(orderProduct);
    };

    const breadcrumbDetailProduct = [
        { label: "Trang Chủ", href: "/" },
        { label: product.product_type?.title ?? "", href: "#" },
        { label: product.product_name ?? "", href: "#" },
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
                    product_price={product.product_price}
                    product_quantity={quantity}
                    cost_tentative={cost_tentative}
                    product_discount={productDiscountPrice}
                    product_discount_percent={productDiscountConclude}
                    onIncrease={handleIncrease}
                    onBlur={handleOnBlur}
                    onDecrease={handleDecrease}
                    onChangeQuantity={handleChangeQuantity}
                    onPurchase={handlePurchaseProcess}
                    onAddToCart={handleAddToCart}

                />
            </div>
            {/* <div className="w-full bg-white rounded-lg shadow-sm mt-4 border border-gray-200">
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
            </div> */}
        </ContainerLayout>
    );
}

export default DetailProductPage;