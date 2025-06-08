// src/components/CreateProductPage.tsx
"use client";

import { MESS_ERROR, MESS_SUCCESSFUL } from "@/config/mess.config";
import { initProduct } from "@/dashboard/consts";
import { useGetAllBrandQuery } from "@/redux/slices/brand.slice";
import { useCreateProductImagesMutation, useCreateProductMutation } from "@/redux/slices/manage/manageproduct.api";
import { useGetAllPromotionQuery } from "@/redux/slices/promotion.slice";
import { useGetAllTypeQuery, useGetTypeQuery } from "@/redux/slices/typeproduct.slice";
import { ImageProduct, ProductFormData } from "@/types";
import { convertEmptyStringToNull } from "@/utils/converStringEmptyToNull";
import { handleImagesChange, handleThumbnailChange, uploadFile } from "@/utils/uploadFile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { IoCloseCircle } from "react-icons/io5";
import { TbPhotoExclamation } from "react-icons/tb";
import { toast } from "react-toastify";
import { ContainerLayout } from "../../layouts/ContainerLayout";
import { useError } from "@/contexts/error.context";
import { isArray } from "lodash";



type FormData = {
    products: ProductFormData[];
};

export default function CreateProductPage() {
    const { handleError } = useError()
    const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            products: [
                initProduct,
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products",
    });

    // State Management
    const [previewImages, setPreviewImages] = useState<(string | null)[]>([]);
    const [uploadedImages, setUploadedImages] = useState<string[][]>([[]]);
    const [isDiscountActive, setIsDiscountActive] = useState<boolean[]>([false]);

    const router = useRouter()

    const { data: productTypes, isLoading: isLoadingTypes, error: errorTypes } = useGetAllTypeQuery();
    const { data: promotions, isLoading: loadingPromotion, error: errorPromotion } = useGetAllPromotionQuery();
    const [createProduct, { isLoading: loadingCreateProduct, error }] = useCreateProductMutation()
    const [createProductImage, { isLoading: loadingCreateProductImage, error: errorCreateProductImage }] = useCreateProductImagesMutation()
    // Form Submission Handler
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const dataProduct: ProductFormData[] = data.products.map((product, index) => {
                return convertEmptyStringToNull({
                    ...product,
                    product_thumbnail: previewImages[index] ? previewImages[index] : ""
                })
            })

            const datCreateResponse = await createProduct(dataProduct).unwrap();
            if (isArray(datCreateResponse)) {
                const dataProductImage: ImageProduct[][] = datCreateResponse.map((product, index) => {
                    const images = uploadedImages[index] || [];
                    return images.map(image => ({
                        product_id: product.product_slug,
                        image_url: image,
                        alt_text: product.product_name,
                    }));
                });
                await Promise.all(
                    dataProductImage.map((productImageList) => {
                        return createProductImage(productImageList).unwrap();
                    })
                );
                toast.success(MESS_SUCCESSFUL.ADD_PRODUCT_PROCESS)
            }

        } catch (error) {
            console.log(error)
            handleError(error)
            toast.error(MESS_ERROR.SYSTEM_ERROR_PROCESS)
        }

    };


    // Handle Add New Product
    const handleAddProduct = () => {
        append(initProduct);
        setPreviewImages((prev) => [...prev, null]);
        setUploadedImages((prev) => [...prev, []]);
        setIsDiscountActive((prev) => [...prev, false]);
    };

    // Handle Remove Product
    const handleRemoveProduct = (index: number) => {
        remove(index);
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
        setIsDiscountActive((prev) => prev.filter((_, i) => i !== index));
    };

    // Handle Discount Toggle
    const handleDiscountToggle = (index: number, checked: boolean) => {
        const newDiscountStates = [...isDiscountActive];
        newDiscountStates[index] = checked;
        setIsDiscountActive(newDiscountStates);
    };

    // JSX Rendering
    return (
        <ContainerLayout isPrivate authentication="admin:all_manage vendor:basic_access">
            <div className="container mx-auto p-4 text-black ">
                <h1 className="text-2xl font-bold mb-4 text-purple-800">Thêm sản phẩm</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {fields.map((field, index) => {
                        const previewImage = previewImages[index] || null;
                        const uploadedImageArray = uploadedImages[index] || [];
                        const isDiscountChecked = isDiscountActive[index] || false;

                        return (
                            <div key={field.id} className="relative flex flex-col md:flex-row gap-4 border border-purple-300 rounded p-4">

                                <div className="w-full md:w-2/3 bg-white p-4 rounded">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                                            <input
                                                type="text"
                                                {...register(`products.${index}.product_name`, { required: "Tên sản phẩm là bắt buộc" })}
                                                className="mt-1 p-2 w-full border border-purple-300 rounded"
                                                placeholder="Nhập tên sản phẩm"
                                            />
                                            {errors.products?.[index]?.product_name && (
                                                <p className="text-red-500 text-sm mt-1">{errors.products[index]?.product_name?.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Giá sản phẩm</label>
                                            <input
                                                type="text"
                                                {...register(`products.${index}.product_price`, { required: "Giá sản phẩm là bắt buộc" })}
                                                className="mt-1 p-2 w-full border border-purple-300 rounded"
                                                placeholder="Nhập giá sản phẩm"
                                            />
                                            {errors.products?.[index]?.product_price && (
                                                <p className="text-red-500 text-sm mt-1">{errors.products[index]?.product_price?.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Loại sản phẩm</label>
                                            <select
                                                {...register(`products.${index}.product_type_id`, { required: "Loại sản phẩm là bắt buộc" })}
                                                className="mt-1 p-2 w-full border border-purple-300 rounded"
                                            >
                                                <option value="">Chọn loại sản phẩm</option>
                                                {productTypes?.map((type) => (
                                                    <option key={type.id} value={type.title}>
                                                        {type.title}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.products?.[index]?.product_type_id && (
                                                <p className="text-red-500 text-sm mt-1">{errors.products[index]?.product_type_id?.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Nơi sản xuất</label>
                                            <input
                                                type="text"
                                                {...register(`products.${index}.product_made`, { required: "Nơi sản xuất là bắt buộc" })}
                                                className="mt-1 p-2 w-full border border-purple-300 rounded"
                                                placeholder="Nhập nơi sản xuất"
                                            />
                                            {errors.products?.[index]?.product_made && (
                                                <p className="text-red-500 text-sm mt-1">{errors.products[index]?.product_made?.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Số lượng tồn kho</label>
                                            <input
                                                type="number"
                                                {...register(`products.${index}.product_stock_quantity`, { required: "Số lượng tồn kho là bắt buộc", min: 0 })}
                                                className="mt-1 p-2 w-full border border-purple-300 rounded"
                                                placeholder="Nhập số lượng tồn kho"
                                            />
                                            {errors.products?.[index]?.product_stock_quantity && (
                                                <p className="text-red-500 text-sm mt-1">{errors.products[index]?.product_stock_quantity?.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Ngày hết hạn</label>
                                            <input
                                                type="date"
                                                {...register(`products.${index}.product_expiration_date`, { required: "Ngày hết hạn là bắt buộc" })}
                                                className="mt-1 p-2 w-full border border-purple-300 rounded"
                                            />
                                            {errors.products?.[index]?.product_expiration_date && (
                                                <p className="text-red-500 text-sm mt-1">{errors.products[index]?.product_expiration_date?.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Chương trình khuyến mãi</label>
                                            <select
                                                {...register(`products.${index}.product_promotion_id`)}
                                                className="mt-1 p-2 w-full border border-purple-300 rounded"
                                            >
                                                <option value="">Chọn chương trình</option>
                                                {promotions?.map((promotion) => (
                                                    <option key={promotion.id} value={promotion.title}>
                                                        {promotion.title}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.products?.[index]?.product_promotion_id && (
                                                <p className="text-red-500 text-sm mt-1">{errors.products[index]?.product_promotion_id?.message}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center">
                                            <label className="block text-sm font-medium text-gray-700 mr-2">Sản phẩm quốc tế</label>
                                            <input
                                                type="checkbox"
                                                {...register(`products.${index}.product_international`)}
                                                className="mt-1 h-5 w-5 text-purple-600"
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <label className="block text-sm font-medium text-gray-700 mr-2">Giảm giá</label>
                                            <input
                                                type="checkbox"
                                                {...register(`products.${index}.product_discount`)}
                                                checked={isDiscountChecked}
                                                onChange={(e) => handleDiscountToggle(index, e.target.checked)}
                                                className="mt-1 h-5 w-5 text-purple-600"
                                            />
                                        </div>
                                        {isDiscountChecked && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Phần trăm giảm giá</label>
                                                    <input
                                                        type="number"
                                                        {...register(`products.${index}.product_discount_percent`, { required: "Phần trăm giảm giá là bắt buộc", min: 0, max: 100 })}
                                                        className="mt-1 p-2 w-full border border-purple-300 rounded"
                                                        placeholder="Nhập phần trăm"
                                                    />
                                                    {errors.products?.[index]?.product_discount_percent && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.products[index]?.product_discount_percent?.message}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Ngày bắt đầu</label>
                                                    <input
                                                        type="date"
                                                        {...register(`products.${index}.product_discount_start`, { required: "Ngày bắt đầu là bắt buộc" })}
                                                        className="mt-1 p-2 w-full border border-purple-300 rounded"
                                                    />
                                                    {errors.products?.[index]?.product_discount_start && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.products[index]?.product_discount_start?.message}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Ngày kết thúc</label>
                                                    <input
                                                        type="date"
                                                        {...register(`products.${index}.product_discount_end`, { required: "Ngày kết thúc là bắt buộc" })}
                                                        className="mt-1 p-2 w-full border border-purple-300 rounded"
                                                    />
                                                    {errors.products?.[index]?.product_discount_end && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.products[index]?.product_discount_end?.message}</p>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Thành phần</label>
                                            <textarea
                                                {...register(`products.${index}.product_ingredient`, { required: "Thành phần là bắt buộc" })}
                                                className="mt-1 p-2 w-full border border-purple-300 rounded"
                                                placeholder="Nhập thành phần"
                                                rows={3}
                                            />
                                            {errors.products?.[index]?.product_ingredient && (
                                                <p className="text-red-500 text-sm mt-1">{errors.products[index]?.product_ingredient?.message}</p>
                                            )}
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                                            <textarea
                                                {...register(`products.${index}.product_description`, { required: "Mô tả là bắt buộc" })}
                                                className="mt-1 p-2 w-full border border-purple-300 rounded"
                                                placeholder="Nhập mô tả"
                                                rows={5}
                                            />
                                            {errors.products?.[index]?.product_description && (
                                                <p className="text-red-500 text-sm mt-1">{errors.products[index]?.product_description?.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Image Preview and Gallery */}
                                <div className="flex flex-col items-center bg-white p-4 rounded">
                                    <div className="w-full min-w-[350px] max-w-[350px] rounded-md flex items-center justify-center mb-4">

                                        {previewImage ? (
                                            <Image src={previewImage || "image/product.png"} alt={`Thumbnail Preview ${index}`} width={350} height={3500} className="w-full h-full object-cover rounded-md" />
                                        ) : (
                                            <div className="w-full">
                                                <label htmlFor="product_thumbnail1"> <TbPhotoExclamation className="w-full h-full" /></label>
                                                <input
                                                    id="product_thumbnail1"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleThumbnailChange(index, e, previewImages, setPreviewImages)}
                                                    className="hidden"
                                                />
                                            </div>

                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {uploadedImageArray.map((img, imgIndex) => (
                                            <div key={imgIndex} className="w-16 h-16 border-2 border-gray-300 rounded flex items-center justify-center">
                                                <img src={img} alt={`Uploaded ${index}-${imgIndex}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => handleImagesChange(index, e, uploadedImages, setUploadedImages)}
                                            className="hidden"
                                            id={`imageUpload-${index}`}
                                        />
                                        <label htmlFor={`imageUpload-${index}`} className="w-16 h-16 border-2 border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100">
                                            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                            </svg>
                                        </label>
                                    </div>
                                </div>


                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveProduct(index)}
                                        className="absolute top-0 right-0 mt-4 w-full md:w-auto  text-black py-2 px-4 rounded "
                                    >
                                        <IoCloseCircle size={30} />
                                    </button>
                                )}
                            </div>
                        );
                    })}
                    <button
                        type="button"
                        onClick={handleAddProduct}
                        className="mt-4 w-full bg-green-600 text-black py-2 px-4 rounded hover:bg-green-700"
                    >
                        Thêm sản phẩm khác
                    </button>
                    <button
                        type="submit"
                        className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                    >
                        Lưu tất cả sản phẩm
                    </button>
                </form>
            </div>
        </ContainerLayout>
    );
}