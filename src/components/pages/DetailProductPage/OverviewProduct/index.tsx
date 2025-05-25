'use client'
import { Product } from '@/types';
import Image from 'next/image';
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
        <div className="lg:sticky top-0 left-0 h-fit p-0 w-full max-w-full  h-fit-content max-h-[620px] bg-white rounded-md">
            <div className="p-[16px]">
                <div className="flex gap-[5px]">
                    <div className="space-y-2">
                        {product && product.product_images.length > 0 && [...product?.product_images, product.product_thumbnail].map((image, index) => (
                            <div
                                key={index}
                                onClick={() => handleChangeImage(image)}
                                onMouseOver={() => handleShowBackground(image)}
                                onMouseLeave={() => handleShowBackground(null)}
                                className={`cursor-pointer max-w-[86px] rounded-sm ${image === prevImage ? "border-[2px] border-blue-500" : ""} `}
                            >
                                <Image src={image ?? null} alt='' width={86} height={86} />
                            </div>
                        ))}
                    </div>
                    <div className="p-[5px] aspect-w-322 aspect-h-316 w-full h-full">
                        <Image src={showBackground ? showBackground : prevImage ?? ""} alt="" height={322} width={316} className="w-full lg:w-[368px] h-full lg:h-[368px] object-cover" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OverviewProduct;
