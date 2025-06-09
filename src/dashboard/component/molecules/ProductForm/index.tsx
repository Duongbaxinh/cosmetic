// src/components/ProductForm.tsx

import { useGetAllBrandQuery } from "@/redux/slices/brand.slice";
import { useGetAllPromotionQuery } from "@/redux/slices/promotion.slice";
import { useGetAllTypeQuery } from "@/redux/slices/typeproduct.slice";
import { Control, useController } from "react-hook-form";

interface ProductFormProps {
    control: Control<any>;
    register: any;
    errors: any;
    index?: number;
    prefix?: string;
}

export default function ProductForm({ control, register, errors, index, prefix = "" }: ProductFormProps) {
    const { data: productTypes, isLoading: isLoadingTypes, error: errorTypes } = useGetAllTypeQuery()
    const { data: brands, isLoading: loadingBrand, error: errorBrand } = useGetAllBrandQuery()
    const { data: promotions, isLoading: isLoadingPromotions } = useGetAllPromotionQuery();


    const { field: discountField } = useController({
        control,
        name: `${prefix}product_discount`,
    });


    const getFieldName = (field: string) => (index !== undefined ? `products.${index}.${field}` : `${prefix}${field}`);

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* Tên sản phẩm */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                <input
                    type="text"
                    {...register(getFieldName("product_name"), { required: "Tên sản phẩm là bắt buộc" })}
                    className="mt-1 p-2 w-full border border-purple-300 rounded"
                    placeholder="Nhập tên sản phẩm"
                />
                {errors?.product_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.product_name.message}</p>
                )}
            </div>

            {/* Giá sản phẩm */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Giá sản phẩm</label>
                <input
                    type="text"
                    {...register(getFieldName("product_price"), { required: "Giá sản phẩm là bắt buộc" })}
                    className="mt-1 p-2 w-full border border-purple-300 rounded"
                    placeholder="Nhập giá sản phẩm"
                />
                {errors?.product_price && (
                    <p className="text-red-500 text-sm mt-1">{errors.product_price.message}</p>
                )}
            </div>

            {/* Loại sản phẩm */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Loại sản phẩm</label>
                <select
                    {...register(getFieldName("product_type_id"), { required: "Loại sản phẩm là bắt buộc" })}
                    className="mt-1 p-2 w-full border border-purple-300 rounded"
                    disabled={isLoadingTypes}
                >
                    <option value="">Chọn loại sản phẩm</option>
                    {productTypes?.map((type) => (
                        <option key={type.id} value={type.title}>
                            {type.title}
                        </option>
                    ))}
                </select>
                {errors?.product_type_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.product_type_id.message}</p>
                )}
            </div>

            {/* Nơi sản xuất */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Nơi sản xuất</label>
                <input
                    type="text"
                    {...register(getFieldName("product_made"), { required: "Nơi sản xuất là bắt buộc" })}
                    className="mt-1 p-2 w-full border border-purple-300 rounded"
                    placeholder="Nhập nơi sản xuất"
                />
                {errors?.product_made && (
                    <p className="text-red-500 text-sm mt-1">{errors.product_made.message}</p>
                )}
            </div>

            {/* Số lượng tồn kho */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Số lượng tồn kho</label>
                <input
                    type="number"
                    {...register(getFieldName("product_stock_quantity"), {
                        required: "Số lượng tồn kho là bắt buộc",
                        min: { value: 0, message: "Số lượng không được âm" },
                    })}
                    className="mt-1 p-2 w-full border border-purple-300 rounded"
                    placeholder="Nhập số lượng tồn kho"
                />
                {errors?.product_stock_quantity && (
                    <p className="text-red-500 text-sm mt-1">{errors.product_stock_quantity.message}</p>
                )}
            </div>

            {/* Ngày hết hạn */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Ngày hết hạn</label>
                <input
                    type="date"
                    {...register(getFieldName("product_expiration_date"), { required: "Ngày hết hạn là bắt buộc" })}
                    className="mt-1 p-2 w-full border border-purple-300 rounded"
                />
                {errors?.product_expiration_date && (
                    <p className="text-red-500 text-sm mt-1">{errors.product_expiration_date.message}</p>
                )}
            </div>

            {/* Chương trình khuyến mãi */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Chương trình khuyến mãi</label>
                <select
                    {...register(getFieldName("product_promotion_id"))}
                    className="mt-1 p-2 w-full border border-purple-300 rounded"
                    disabled={isLoadingPromotions}
                >
                    <option value="">Chọn chương trình</option>
                    {promotions?.map((promotion) => (
                        <option key={promotion.id} value={promotion.title}>
                            {promotion.title}
                        </option>
                    ))}
                </select>
                {errors?.product_promotion_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.product_promotion_id.message}</p>
                )}
            </div>

            {/* Checkbox sản phẩm quốc tế */}
            <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-2">Sản phẩm quốc tế</label>
                <input
                    type="checkbox"
                    {...register(getFieldName("product_international"))}
                    className="mt-1 h-5 w-5 text-purple-600"
                />
            </div>

            {/* Checkbox giảm giá */}
            <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-2">Giảm giá</label>
                <input
                    type="checkbox"
                    {...register(getFieldName("product_discount"))}
                    className="mt-1 h-5 w-5 text-purple-600"
                />
            </div>

            {/* Các trường liên quan đến giảm giá */}
            {discountField.value && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phần trăm giảm giá</label>
                        <input
                            type="number"
                            {...register(getFieldName("product_discount_percent"), {
                                required: "Phần trăm giảm giá là bắt buộc",
                                min: { value: 0, message: "Phần trăm không được âm" },
                                max: { value: 100, message: "Phần trăm không được vượt quá 100" },
                            })}
                            className="mt-1 p-2 w-full border border-purple-300 rounded"
                            placeholder="Nhập phần trăm"
                        />
                        {errors?.product_discount_percent && (
                            <p className="text-red-500 text-sm mt-1">{errors.product_discount_percent.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ngày bắt đầu</label>
                        <input
                            type="date"
                            {...register(getFieldName("product_discount_start"), { required: "Ngày bắt đầu là bắt buộc" })}
                            className="mt-1 p-2 w-full border border-purple-300 rounded"
                        />
                        {errors?.product_discount_start && (
                            <p className="text-red-500 text-sm mt-1">{errors.product_discount_start.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ngày kết thúc</label>
                        <input
                            type="date"
                            {...register(getFieldName("product_discount_end"), { required: "Ngày kết thúc là bắt buộc" })}
                            className="mt-1 p-2 w-full border border-purple-300 rounded"
                        />
                        {errors?.product_discount_end && (
                            <p className="text-red-500 text-sm mt-1">{errors.product_discount_end.message}</p>
                        )}
                    </div>
                </>
            )}

            {/* Thành phần */}
            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Thành phần</label>
                <textarea
                    {...register(getFieldName("product_ingredient"), { required: "Thành phần là bắt buộc" })}
                    className="mt-1 p-2 w-full border border-purple-300 rounded"
                    placeholder="Nhập thành phần"
                    rows={3}
                />
                {errors?.product_ingredient && (
                    <p className="text-red-500 text-sm mt-1">{errors.product_ingredient.message}</p>
                )}
            </div>

            {/* Mô tả */}
            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                    {...register(getFieldName("product_description"), { required: "Mô tả là bắt buộc" })}
                    className="mt-1 p-2 w-full border border-purple-300 rounded"
                    placeholder="Nhập mô tả"
                    rows={5}
                />
                {errors?.product_description && (
                    <p className="text-red-500 text-sm mt-1">{errors.product_description.message}</p>
                )}
            </div>
        </div>
    );
}