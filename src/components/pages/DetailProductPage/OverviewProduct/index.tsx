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
        <div className=" static lg:sticky top-0 left-0 h-fit p-0 w-full max-w-full  h-fit-content  lg:max-h-[620px] bg-white rounded-md">
            <div className="p-0 md:p-4 h-full">
                <div className="flex flex-col-reverse md:flex-row gap-[5px]">
                    <div className="flex space-x-2 sm:space-x-4 md:space-x-0 md:block space-y-2 max-w-full md:max-h-[380px] overflow-x-scroll md:overflow-y-scroll no-scrollbar">
                        {product && product.product_images.length > 0 && [...product?.product_images.flatMap(image => image.image_url), product.product_thumbnail].map((image, index) => (
                            <div
                                key={index}
                                onClick={() => handleChangeImage(image)}
                                onMouseOver={() => handleShowBackground(image)}
                                onMouseLeave={() => handleShowBackground(null)}
                                className={`cursor-pointer min-w-[86px] md:min-w-full  max-w-[86px]  ${image === prevImage ? "border-[2px] border-blue-500" : ""} `}
                            >
                                <Image src={image ?? null} alt='' width={86} height={86} className='rounded-sm' />
                            </div>
                        ))}
                    </div>
                    <div className=" w-full h-full">
                        <Image src={showBackground ? showBackground : prevImage ?? ""} alt="" height={450} width={450} className="w-full lg:w-[450px] h-full lg:h-[450px] object-cove rounded-md" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OverviewProduct;
