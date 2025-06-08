"use client";

import { Permissions } from "@/config/auth.config";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { ContainerLayout } from "../../layouts/ContainerLayout";
import ProductDetailModal from "./ProductDetailModal";
import { useGetAllPromotionQuery } from "@/redux/slices/promotion.slice";
import Link from "next/link";
import { PROMOTION_MANAGE_URL, PROMOTION_URL } from "@/routers";


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

// Mock API data based on the new structure
const mockPrograms: DiscountProgram[] = [
    {
        id: "cbab3a0b-01a2-43ac-b13d-f16290c0e752",
        vendor: null,
        title: "Giảm 30%",
        slug: "giam-30",
        thumbnail: "https://res.cloudinary.com/dwu92ycra/image/upload/v1748770622/JOYBOY/c10cf785-2185-4e9d-ad52-b0733db22020_qvxpey_qzwlw9.png",
        discount_percent: 30,
        start_date: "2025-05-01T00:00:00Z",
        end_date: "2025-05-31T23:59:59Z",
        products: [
            {
                id: "4ec0eb64-2faa-4b6f-a5c8-aaffae6787f9",
                product_name: "Tinh Chất Dr.Belmeur Dưỡng Săn Chắc Da",
                product_slug: "tinh-chat-drbelmeur",
                product_price: 650000,
                product_thumbnail: "https://res.cloudinary.com/dwu92ycra/image/upload/v1748770622/JOYBOY/c10cf785-2185-4e9d-ad52-b0733db22020_qvxpey_qzwlw9.png",
                product_type: {
                    id: "9d4208f2-694f-4bef-ba43-38eaf91fe2b9",
                    title: "Serum",
                    slug: "serum",
                    category: null
                },
                product_images: [],
                product_brand: {
                    id: "",
                    image: "",
                    slug: ""
                    ,
                    specific: false,
                    title: ""
                },
                product_made: "South Korea",
                product_discount: false,
                product_discount_percent: 0,
                product_discount_start: null,
                product_discount_end: null,
                product_promotion: {
                    id: "cbab3a0b-01a2-43ac-b13d-f16290c0e752",
                    title: "Giảm 30%",
                    discount_percent: 30
                },
                product_sold: 160,
                product_international: true,
                product_rate: 5.0,
                product_ingredient: "Probiotics, Peptides",
                product_stock_quantity: 70,
                is_active: true,
                product_expiration_date: null,
                created_at: "2025-06-05T08:07:12.047453Z",
                updated_at: "2025-06-05T08:07:12.047724Z"
            }
        ],
        is_active: false,
        created_at: "2025-06-02T06:54:31.019050Z",
        updated_at: "2025-06-02T06:54:31.020603Z"
    }
];




export default function PromotionPage() {
    const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

    const { data: programs = [] } = useGetAllPromotionQuery()

    const handleViewProgram = (programId: string) => {
        setSelectedProgram(programId);
    };

    const handleCloseDetail = () => {
        setSelectedProgram(null);
    };


    const currentProgram = programs.find((program) => program.id === selectedProgram);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN");
    };

    return (
        <ContainerLayout isPrivate authentication={Permissions.sell}>
            <div className="w-full p-4">
                <h1 className="text-2xl font-bold mb-4 text-purple-800">
                    Quản lý chương trình ưu đãi
                </h1>

                {/* Program List Table */}
                <div className="w-full bg-white border border-purple-300 rounded">
                    <table className="w-full divide-y divide-gray-200 table-auto">
                        <thead className="bg-purple-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                                    Tên chương trình
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                                    Giảm giá (%)
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                                    Thời gian
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                                    Số sản phẩm
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {programs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-2 text-center text-gray-500">
                                        Không có chương trình nào.
                                    </td>
                                </tr>
                            ) : (
                                programs.map((program) => (
                                    <>
                                        <tr key={program.id}>
                                            <td className="px-4 py-2 font-medium">{program.title}</td>
                                            <td className="px-4 py-2">{program.discount_percent}%</td>
                                            <td className="px-4 py-2">
                                                {formatDate(program.start_date ?? "")} - {formatDate(program.end_date ?? "")}
                                            </td>
                                            <td className="px-4 py-2">{program.products.length}</td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${program.is_active
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                        }`}
                                                >
                                                    {program.is_active ? "Hoạt động" : "Không hoạt động"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 flex items-center gap-3">
                                                {currentProgram && selectedProgram === program.id ? (
                                                    <button
                                                        onClick={handleCloseDetail}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <IoCloseCircle size={20} />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleViewProgram(program.id)}
                                                        className="bg-purple-600 text-white py-1 px-2 rounded hover:bg-purple-700 text-sm"
                                                    >
                                                        Chi tiết
                                                    </button>

                                                )}
                                                <Link
                                                    href={`${PROMOTION_MANAGE_URL}?promotionId=${program.slug}`}
                                                    className="bg-purple-600 text-white py-1 px-2 rounded hover:bg-purple-700 text-sm"
                                                >
                                                    Chỉnh sửa
                                                </Link>
                                                <button
                                                    onClick={() => handleViewProgram(program.id)}
                                                    className="bg-purple-600 text-white py-1 px-2 rounded hover:bg-purple-700 text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                        {currentProgram && selectedProgram === program.id && (
                                            <tr>
                                                <td colSpan={6}>
                                                    <ProductDetailModal program={currentProgram} />
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </ContainerLayout>
    );
}