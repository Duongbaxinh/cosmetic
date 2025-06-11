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