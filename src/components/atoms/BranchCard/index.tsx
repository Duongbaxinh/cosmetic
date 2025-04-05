// components/BrandCard.tsx

'use client'
interface BrandCardProps {
    productImage: string;
    logoImage: string;
    title: string;
    discount: string;
}

const BrandCard: React.FC<BrandCardProps> = ({
    productImage,
    logoImage,
    title,
    discount,
}) => {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            {/* Hình ảnh sản phẩm */}
            <div className="flex justify-center p-4">
                <img
                    src={productImage}
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