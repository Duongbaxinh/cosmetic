"use client";

import InputForm from "@/components/atoms/InputForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { PromotionFormType } from "@/types";
import { promotionSchema } from "@/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContainerLayout } from "../../layouts/ContainerLayout";
import { ProductSelected } from "../ProductPage";
import { mapProductToSelected } from "@/utils/productFormMapper";
import Image from "next/image";
import { uploadFile } from "@/utils/uploadFile";
import { useCreatePromotionMutation } from "@/redux/slices/manage/managepromotion.api";
import { useGetDetailPromotionQuery } from "@/redux/slices/promotion.slice";

export default function PromotionFormPage({ promotionId }: { promotionId?: string }) {
    const [preview, setPreview] = useState<string>('')
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<PromotionFormType>({
        resolver: yupResolver(promotionSchema),
        defaultValues: {
            title: "",
            discount_percent: 0,
            start_date: "",
            end_date: "",
            product_ids: [],
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<ProductSelected[]>([]);
    const [createPromotion] = useCreatePromotionMutation();
    const { data: promotionData, isLoading: isFetching, error } = useGetDetailPromotionQuery(promotionId ?? "", {
        skip: !promotionId,
    });

    // Populate form with API data when promotionId exists
    useEffect(() => {
        if (promotionId && promotionData) {
            setValue("title", promotionData.title || "");
            setValue("thumbnail", promotionData.thumbnail || "");
            setValue("discount_percent", promotionData.discount_percent || 0);
            setValue("start_date", promotionData.start_date || "");
            setValue("end_date", promotionData.end_date || "");
            setValue("product_ids", promotionData.products?.map((p: any) => p.id) || []);
            setSelectedProducts(promotionData.products?.map(mapProductToSelected) || []);
        }
    }, [promotionId, promotionData, setValue]);

    // Handle sessionStorage for new promotions
    useEffect(() => {
        if (!promotionId) {
            const storedProducts = sessionStorage.getItem("productSelected");
            if (storedProducts) {
                const products = JSON.parse(storedProducts) as ProductSelected[];
                if (products.length >= 5 && products.length <= 10) {
                    setSelectedProducts(products);
                    setValue("product_ids", products.map((p) => p.id));
                } else {
                    toast.error("Vui lòng chọn từ 5 đến 10 sản phẩm!");
                    router.push("/products");
                }
            }
        }
    }, [promotionId, setValue, router]);

    // Handle loading and error states
    useEffect(() => {
        setIsLoading(isFetching);
        if (error) {
            toast.error("Không thể tải dữ liệu khuyến mãi!");
            router.push("/programs");
        }
    }, [isFetching, error, router]);

    const handleRemoveProduct = (productId: string) => {
        const newProducts = selectedProducts.filter((p) => p.id !== productId);
        setSelectedProducts(newProducts);
        setValue("product_ids", newProducts.map((p) => p.id));
        if (!promotionId) {
            sessionStorage.setItem("productSelected", JSON.stringify(newProducts));
        }
    };

    const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = await uploadFile([file]);
            if (url && url.length > 0) {
                setPreview(url[0]);
            }
        }
    }
    const onSubmit = async (data: PromotionFormType) => {
        try {
            setIsLoading(true);
            console.log("check data promotion form ::: ", data);
            await createPromotion({ ...data, thumbnail: preview }).unwrap();
            toast.success(promotionId ? "Cập nhật thành công!" : "Thêm thành công!");
            sessionStorage.removeItem("productSelected"); // Clean up sessionStorage
            router.push("/programs");
        } catch (error) {
            toast.error("Đã xảy ra lỗi!");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ContainerLayout>
            <div className="w-full p-4">
                <h1 className="text-2xl font-bold mb-4 text-purple-800">
                    {promotionId ? "Cập nhật chương trình ưu đãi" : "Thêm chương trình ưu đãi"}
                </h1>

                <div className="grid md:grid-cols-3 gap-6">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full bg-white border col-span-1 border-purple-300 rounded p-6"
                    >
                        <div className="mb-4">
                            <InputForm
                                label="Tên chương trình"
                                {...register("title")}
                                error={errors.title?.message}
                                placeholder="Nhập tên chương trình"
                                className="focus:ring-purple-600 focus:border-purple-600"
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm
                                htmlFor="thumbnail"
                                idFor="thumbnail"
                                label="Thumbnail URL"
                                type="file"
                                onChange={handleUploadFile}
                                error={errors.thumbnail?.message}
                                placeholder="Nhập URL hình ảnh"
                                className="hidden"
                            />
                            {preview && (
                                <Image src={preview ?? ''} alt="thumbnail" width={200} height={100} className="w-full h-full" />
                            )}
                        </div>
                        <div className="mb-4">
                            <InputForm
                                label="Giảm giá (%)"
                                {...register("discount_percent")}
                                error={errors.discount_percent?.message}
                                type="number"
                                placeholder="Nhập phần trăm giảm giá"
                                className="focus:ring-purple-600 focus:border-purple-600"
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm
                                label="Thời gian bắt đầu"
                                {...register("start_date")}
                                error={errors.start_date?.message}
                                type="date"
                                className="focus:ring-purple-600 focus:border-purple-600"
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm
                                label="Thời gian kết thúc"
                                {...register("end_date")}
                                error={errors.end_date?.message}
                                type="date"
                                className="focus:ring-purple-600 focus:border-purple-600"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:bg-purple-400"
                            >
                                {isSubmitting || isLoading ? "Đang xử lý..." : "Lưu"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    sessionStorage.removeItem("productSelected");
                                    router.push("/programs");
                                }}
                                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
                            >
                                Hủy
                            </button>
                        </div>
                    </form>

                    {/* Right Column: Selected Products */}
                    <div className="w-full col-span-2 bg-white border border-purple-300 rounded p-6">
                        <h2 className="text-lg font-semibold text-purple-800 mb-4">
                            Sản phẩm áp dụng ({selectedProducts.length}/10)
                        </h2>
                        {selectedProducts.length === 0 ? (
                            <p className="text-gray-500 text-center">Không tìm thấy sản phẩm.</p>
                        ) : (
                            <>
                                <table className="w-full divide-y divide-gray-200 table-auto">
                                    <thead className="bg-purple-100 sticky top-0">
                                        <tr>
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
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {selectedProducts.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-4 py-2">{product.product_name}</td>
                                                <td className="px-4 py-2">{product.product_type}</td>
                                                <td className="px-4 py-2">{product.product_price.toLocaleString()} VND</td>
                                                <td className="px-4 py-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveProduct(product.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {errors.product_ids && (
                                    <p className="mt-2 text-sm text-red-600">{errors.product_ids.message}</p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </ContainerLayout>
    );
}