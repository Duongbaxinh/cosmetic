"use client";

import { convertEmptyStringToNull } from "@/utils/converStringEmptyToNull";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { ContainerLayout } from "@/dashboard/component/layouts/ContainerLayout";
import ImageUploader from "@/dashboard/component/molecules/ImageUploader";
import ProductForm from "@/dashboard/component/molecules/ProductForm";
import { useDeleteProductImageMutation, useUpdateProductMutation } from "@/redux/slices/manage/manageproduct.api";
import { useGetProductByIdQuery } from "@/redux/slices/product.slice";
import { PRODUCT_MANAGE_URL } from "@/routers";
import { ProductFormData, ProductImageType } from "@/types";
import { mapProductToFormValues } from "@/utils/productFormMapper";
import Image from "next/image";
import { IoCloseCircle } from "react-icons/io5";
import { useDataManage } from "@/contexts/data.manage.context";

interface UpdateProductPageProps {
    productSlug: string;
}

export default function UpdateProductPage({ productSlug }: UpdateProductPageProps) {
    const router = useRouter();
    const { refetch } = useDataManage()
    const { data: product, isLoading, error: productError } = useGetProductByIdQuery(productSlug);
    const [updateProduct, { isLoading: isUpdatingProduct }] = useUpdateProductMutation();
    const [deleteProductImage, { isLoading: isDeletingImage }] = useDeleteProductImageMutation(); // Thêm mutation để xóa
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<string[]>([]); // Lưu danh sách hình ảnh mới

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<ProductFormData>({
        defaultValues: {},
    });

    useEffect(() => {
        if (product) {
            const mappedValues = mapProductToFormValues(product);
            reset(mappedValues);

            setPreviewImage(product.product_thumbnail || null);
            setUploadedImages(product.product_images?.map((img: ProductImageType) => img.image_url) || []);
        }
    }, [product, reset]);

    const handleRemoveImage = async (index: number) => {
        const imageToRemove = uploadedImages[index];

        try {
            const image = product?.product_images.find(image => image.image_url === imageToRemove)
            if (image && image.id) {
                await deleteProductImage({ imageId: image.id }).unwrap();
                toast.success("Xóa hình ảnh thành công!");
            }
            // Cập nhật danh sách hình ảnh
            setUploadedImages((prev) => prev.filter((_, i) => i !== index));
            setNewImages((prev) => prev.filter((img) => img !== imageToRemove)); // Xóa khỏi danh sách hình ảnh mới nếu có
        } catch (error: any) {
            toast.error(error?.data?.message || "Lỗi khi xóa hình ảnh");
        }
    };

    const onSubmit = async (data: ProductFormData) => {
        if (!product?.product_slug) {
            toast.error("Không tìm thấy sản phẩm để cập nhật!");
            return;
        }
        const imageData = newImages.map((image) => ({
            image_url: image
        }));
        try {
            const productData = convertEmptyStringToNull({
                ...data,
                product_thumbnail: previewImage || data.product_thumbnail,
                product_images: imageData
            }) as ProductFormData;

            await updateProduct({ ...productData, product_slug: product.product_slug }).unwrap();
            await refetch()
            toast.success("Cập nhật sản phẩm thành công!");
            router.push(PRODUCT_MANAGE_URL);
        } catch (error: any) {
            toast.error(error?.data?.message || "Lỗi khi cập nhật sản phẩm");
        }
    };

    // Cập nhật ImageUploader để theo dõi hình ảnh mới
    const handleImagesUploaded = (urls: string[]) => {
        setUploadedImages((prev) => [...prev, ...urls]);
        setNewImages((prev) => [...prev, ...urls]); // Lưu các hình ảnh mới
    };

    if (isLoading) return <div className="text-center">Đang tải...</div>;
    if (productError) return <div className="text-center text-red-500">Lỗi khi tải sản phẩm!</div>;

    return (
        <ContainerLayout isPrivate authentication="">
            <div className="container mx-auto p-4 text-black">
                <h1 className="text-2xl font-bold mb-4 text-purple-800">Cập nhật sản phẩm</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 border border-purple-300 rounded p-4">
                        <div className="w-full md:w-2/3 bg-white p-4 rounded">
                            <ProductForm control={control} register={register} errors={errors} />
                        </div>
                        <div className="flex flex-col items-center bg-white p-4 rounded">
                            {/* Thumbnail */}
                            <ImageUploader
                                onImagesUploaded={(urls) => setPreviewImage(urls[0])}
                                isThumbnail={true}
                                initialImage={previewImage}
                            />
                            {/* Gallery */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {uploadedImages.map((img, index) => (
                                    <div key={index} className="relative w-16 h-16 border-2 border-gray-300 rounded">
                                        <Image
                                            src={img}
                                            alt={`Uploaded ${index}`}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute -top-2 -right-2 text-red-500"
                                            disabled={isDeletingImage}
                                        >
                                            <IoCloseCircle size={20} />
                                        </button>
                                    </div>
                                ))}
                                <ImageUploader
                                    onImagesUploaded={handleImagesUploaded}
                                    maxFiles={5 - uploadedImages.length}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isUpdatingProduct || isDeletingImage}
                        className={`mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 ${isUpdatingProduct || isDeletingImage ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isUpdatingProduct || isDeletingImage ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
                    </button>
                </form>
            </div>
        </ContainerLayout>
    );
}