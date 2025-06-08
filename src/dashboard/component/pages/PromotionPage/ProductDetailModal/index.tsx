import { Product } from '@/types';
import Image from 'next/image';
import React from 'react';

interface DiscountProgram {
    id: string;
    vendor: any;
    title: string;
    slug: string;
    thumbnail: string;
    discount_percent: number;
    start_date: string;
    end_date: string;
    products: Product[];
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface ProductDetailModalProps {
    program: DiscountProgram;
}
const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ program }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN");
    };

    return (
        <div className="p-4 bg-gray-50 border-t border-purple-300 transition-all duration-300 ease-in-out">
            <div className="flex items-start mb-4">
                <div className="w-full max-w-[250px] h-24 relative mr-4">
                    <Image
                        src={program.thumbnail ?? null}
                        alt={program.title}
                        fill
                        className="object-cover rounded"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-purple-800">
                        {program.title} ({program.discount_percent}%)
                    </h2>
                    <p className="text-sm text-gray-600">
                        Thời gian: {formatDate(program.start_date)} - {formatDate(program.end_date)}
                    </p>
                    <p className="text-sm text-gray-600">
                        Trạng thái: {program.is_active ? "Đang hoạt động" : "Không hoạt động"}
                    </p>
                </div>
            </div>

            <h3 className="text-md font-semibold text-purple-800 mb-2">
                Sản phẩm áp dụng ({program.products.length})
            </h3>
            <table className="w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-purple-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                            Hình ảnh
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                            Tên sản phẩm
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                            Loại
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                            Giá gốc
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                            Giảm giá
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {program.products.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                                Không có sản phẩm nào.
                            </td>
                        </tr>
                    ) : (
                        program.products.map((product) => (
                            <tr key={product.id}>
                                <td className="px-4 py-2">
                                    <div className="w-12 h-12 relative">
                                        <Image
                                            src={product.product_thumbnail ?? null}
                                            alt={product.product_name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-4 py-2">{product.product_name}</td>
                                <td className="px-4 py-2">
                                    {product.product_type?.title || "N/A"}
                                </td>
                                <td className="px-4 py-2">
                                    {product.product_price.toLocaleString("vi-VN")} VND
                                </td>
                                <td className="px-4 py-2">
                                    {product.product_promotion?.discount_percent || 0}%
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductDetailModal;