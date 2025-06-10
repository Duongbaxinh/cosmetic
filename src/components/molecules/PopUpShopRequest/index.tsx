"use client";

import Input, { typeInput } from "@/components/atoms/Input";
import Popup from "@/components/atoms/Popup";
import Select from "@/components/atoms/Select";
import { useError } from "@/contexts/error.context";
import { useSignUpShopeMutation } from "@/redux/slices/auth.slice";
import { RootState } from "@/redux/store";
import { handleThumbnailChange } from "@/utils/uploadFile";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TbPhotoExclamation } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export type Province = { code: number; name: string };
export type District = { code: number; name: string };
export type Ward = { code: number; name: string };

export type PopupInfoType = {
    isOpen: boolean;
    onClose: () => void;
};

export type FormValues = {
    province: string;
    district: string;
    ward: string;
    address: string;
    name: string;
    phone: string;
};

function PopupShopRequest({ isOpen, onClose }: PopupInfoType) {
    const methods = useForm<FormValues>();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = methods;

    const { handleError } = useError();
    const selectedProvince = watch("province");
    const selectedDistrict = watch("district");

    const [previewImage, setPreviewImage] = useState<(string | null)[]>([""]);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.user.user);
    const [requestShope, { isLoading }] = useSignUpShopeMutation();

    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/p/")
            .then((res) => res.json())
            .then((data) => setProvinces(data));
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
                .then((res) => res.json())
                .then((data) => setDistricts(data.districts));
            setValue("district", "");
            setValue("ward", "");
            setWards([]);
        }
    }, [selectedProvince, setValue]);

    useEffect(() => {
        if (selectedDistrict) {
            fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
                .then((res) => res.json())
                .then((data) => setWards(data.wards));
            setValue("ward", "");
        }
    }, [selectedDistrict, setValue]);

    const onSubmit = async (data: FormValues) => {
        const { address, ward, district, province } = data;
        const fullAddress = [
            address,
            wards.find((w) => w.code.toString() === ward)?.name,
            districts.find((d) => d.code.toString() === district)?.name,
            provinces.find((p) => p.code.toString() === province)?.name,
        ]
            .filter(Boolean)
            .join(", ");

        try {
            await requestShope({
                name: data.name,
                logo: previewImage[0] || "",
                description: "",
                phone: data.phone,
                address: fullAddress,
                slug: data.name.split(" ").join("-"),
            }).unwrap();
            toast.info("Yêu cầu của bạn đã được gửi. Chúng tôi sẽ sớm liên hệ!");
            onClose();
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Popup isOpen={isOpen} onClose={onClose} title="Đăng ký cửa hàng">
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 w-full max-w-3xl mx-auto"
                >
                    <div className="grid md:grid-cols-2 gap-6 max-w-[300px] w-full sm:max-w-[500px] p-3">
                        {/* Left Column: Shop Info */}
                        <div className="flex flex-col gap-2">
                            <div className="">
                                <label className="block whitespace-nowrap text-[13px] font-medium text-gray-700">
                                    Tên cửa hàng
                                </label>
                                <Input
                                    className="border border-color min-h-[29px]"
                                    placeholder="Nhập tên cửa hàng"
                                    type={typeInput.TEXT}

                                    {...register("name", { required: "Vui lòng nhập tên cửa hàng" })}
                                    error={!!errors.name}
                                    message={errors.name?.message}
                                />
                            </div>
                            <div className="">
                                <label className="block whitespace-nowrap text-[13px] font-medium text-gray-700">
                                    Số điện thoại
                                </label>
                                <Input
                                    className="border border-color min-h-[29px]"
                                    placeholder="Nhập số điện thoại"
                                    type={typeInput.TEXT}
                                    {...register("phone", { required: "Vui lòng nhập số điện thoại" })}
                                    error={!!errors.phone}
                                    message={errors.phone?.message}
                                />
                            </div>
                            <div className="relative w-full aspect-square border rounded-md overflow-hidden">
                                {previewImage[0] ? (
                                    <Image
                                        src={previewImage[0]}
                                        alt="Logo Preview"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <label
                                        htmlFor="shop-logo"
                                        className="w-full h-full flex items-center justify-center cursor-pointer text-gray-400"
                                    >
                                        <TbPhotoExclamation size={48} />
                                    </label>
                                )}
                                <input
                                    id="shop-logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleThumbnailChange(0, e, previewImage, setPreviewImage)
                                    }
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Right Column: Address Info */}
                        <div className="flex flex-col gap-2">
                            <Select
                                name="province"
                                label="Tỉnh / Thành phố"
                                options={[
                                    { label: "Chọn tỉnh / thành", value: "" },
                                    ...provinces.map((p) => ({
                                        label: p.name,
                                        value: p.code.toString(),
                                    })),
                                ]}
                                validationRules={{ required: "Vui lòng chọn tỉnh / thành" }}
                            />
                            <Select
                                name="district"
                                label="Quận / Huyện"
                                options={[
                                    { label: "Chọn quận / huyện", value: "" },
                                    ...districts.map((d) => ({
                                        label: d.name,
                                        value: d.code.toString(),
                                    })),
                                ]}
                                validationRules={{ required: "Vui lòng chọn quận / huyện" }}
                            />
                            <Select
                                name="ward"
                                label="Phường / Xã"
                                options={[
                                    { label: "Chọn phường / xã", value: "" },
                                    ...wards.map((w) => ({
                                        label: w.name,
                                        value: w.code.toString(),
                                    })),
                                ]}
                                validationRules={{ required: "Vui lòng chọn phường / xã" }}
                            />
                            <Input
                                placeholder="Số nhà, tên đường"
                                type={typeInput.TEXT}
                                {...register("address", { required: "Vui lòng nhập địa chỉ" })}
                                error={!!errors.address}
                                message={errors.address?.message}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            {isLoading ? "Đang lưu..." : "Lưu"}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </Popup>
    );
}

export default PopupShopRequest;
