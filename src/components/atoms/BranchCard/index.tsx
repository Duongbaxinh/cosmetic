// components/BrandCard.tsx

'use client'

import Image from "next/image";

interface BrandCardProps {
    id: string
    brandImage: string;
    title: string;


}

const BrandCard: React.FC<BrandCardProps> = ({
    title, brandImage
}) => {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
            {/* Hình ảnh sản phẩm */}
            <div className="flex justify-center p-4">
                <Image
                    src={brandImage}
                    alt="Product"
                    width={300}
                    height={300}
                    className="object-contain"
                />
            </div>
        </div>
    );
};

export default BrandCard;