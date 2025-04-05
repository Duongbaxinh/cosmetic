'use client'
import ListSpecial from '@/components/molecules/ListSpecial';
import { Product } from '@/types';
import React from 'react';

interface OverviewProductProps {
    product: Product
}

const OverviewProduct: React.FC<OverviewProductProps> = ({ product }) => {
    const [prevImage, setPrevImage] = React.useState<string | null>(() => product.product_thumbnail);
    const [showBackground, setShowBackground] = React.useState<string | null>(null);
    const handleShowBackground = (url_image: string | null) => {
        setShowBackground(url_image);
    }
    const handleChangeImage = (url_image: string) => {
        setPrevImage(url_image);
    }
    return (
        <div className="lg:sticky top-0 left-0 h-fit p-0 w-full max-w-full lg:min-w-[400px] lg:max-w-[400px] h-fit-content max-h-[620px] bg-white rounded-md">
            <div className="p-[16px]">
                <div className="flex flex-col gap-[5px]">
                    <div className="p-[5px] border-[0.5px] border-solid border-gray-200 aspect-w-368 aspect-h-368">
                        <img src={showBackground ? showBackground : prevImage ?? ""} alt="" className="w-[368px] h-[368px]" />

                    </div>
                    <div className="flex justify-start gap-[5px]">
                        {product && product.product_images.length > 0 && [...product?.product_images, product.product_thumbnail].map((image, index) => (
                            <div
                                key={index}
                                onClick={() => handleChangeImage(image)}
                                onMouseOver={() => handleShowBackground(image)}
                                onMouseLeave={() => handleShowBackground(null)}
                                className={`p-[8px] cursor-pointer max-w-[43px] rounded-sm ${image === prevImage ? "border-[2px] border-blue-500" : ""} `}
                            >
                                <img src={image} alt='' />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewProduct;
