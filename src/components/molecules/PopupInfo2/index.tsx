"use client";

import Popup from "@/components/atoms/Popup";
import Input, { typeInput } from "@/components/atoms/Input";
import Select from "@/components/atoms/Select"; // <-- Import Select component
import { LOGIN_URL } from "@/routers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { setShippingAddress, useCreateShippingAddressMutation } from "@/redux/slices/shippingAddress.slice";
import { AddressInfo, ShippingAddress } from "@/types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUser } from "@/redux/slices/auth.slice";
import { toast } from "react-toastify";
import { useOrder } from "@/contexts/order.context";
import { useAuth } from "@/contexts/auth.context";

export type Province = { code: number; name: string };
export type District = { code: number; name: string };
export type Ward = { code: number; name: string };

export type PopupInfoType = {
    isOpen: boolean;
    onClose: () => void;
    callBack?: (shippingAddress?: ShippingAddress) => void
};

export type FormValues = {
    province: string;
    district: string;
    ward: string;
    address: string;
};

function PopupInfo2({ isOpen, onClose, callBack }: PopupInfoType) {
    const { shippingAddress } = useAuth()
    const router = useRouter();

    const methods = useForm<FormValues>();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = methods;

    const selectedProvince = watch("province");
    const selectedDistrict = watch("district");

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.user.user);
    const [createShippingAddress, { isLoading, error }] = useCreateShippingAddressMutation()

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
        } else {
            setDistricts([]);
        }
    }, [selectedProvince, setValue]);

    useEffect(() => {
        if (selectedDistrict) {
            fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
                .then((res) => res.json())
                .then((data) => setWards(data.wards));
            setValue("ward", "");
        } else {
            setWards([]);
        }
    }, [selectedDistrict, setValue]);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("userInfo");
        if (accessToken && userData) {
            dispatch(setUser(JSON.parse(userData)));
        }
    }, []);

    const onSubmit = async (data: FormValues) => {
        const { address, ward, district, province } = data;

        const selectedProvinceName = provinces.find((p) => p.code.toString() === province)?.name || "";
        const selectedDistrictName = districts.find((d) => d.code.toString() === district)?.name || "";
        const selectedWardName = wards.find((w) => w.code.toString() === ward)?.name || "";

        const fullAddress = [address, selectedWardName, selectedDistrictName, selectedProvinceName]
            .filter(Boolean)
            .join(", ");

        const dataShipping: AddressInfo = {
            address: fullAddress,
            city: selectedProvinceName,
            zip: "",
            country: "Việt Nam",
            phone: userInfo?.phone ?? "",
        };
        const dataCreateShippingAddress = await createShippingAddress(dataShipping);
        if (dataCreateShippingAddress.data) {
            if (callBack) {
                callBack(dataCreateShippingAddress.data)
            }
            onClose()
            dispatch(setShippingAddress([...(shippingAddress || []), dataCreateShippingAddress.data]))
        } else {
            toast.error("Lỗi khi tạo địa chỉ giao hàng. Vui lòng thử lại sau.");
        }
    };

    const handlePopup = (type: "cancel" | "continue") => {
        if (type === "cancel") {
            onClose();
        }
    };

    return (
        <Popup isOpen={isOpen} onClose={onClose} title="Thông tin địa chỉ">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  min-w-[300px] sm:min-w-[400px] md:min-w-[500px]">
                    <Select
                        name="province"
                        label="Tỉnh / Thành phố"
                        options={[
                            { label: "Chọn tỉnh / thành", value: "" },
                            ...provinces.map((p) => ({ value: p.code, label: p.name })),
                        ]}
                        validationRules={{ required: "Vui lòng chọn tỉnh / thành phố" }}
                    />

                    <Select
                        name="district"
                        label="Quận / Huyện"
                        options={[
                            { label: "Chọn quận / huyện", value: "" },
                            ...districts.map((d) => ({ value: d.code, label: d.name })),
                        ]}
                        validationRules={{ required: "Vui lòng chọn quận / huyện" }}
                    />

                    <Select
                        name="ward"
                        label="Phường / Xã"
                        options={[
                            { label: "Chọn phường / xã", value: "" },
                            ...wards.map((w) => ({ value: w.code, label: w.name })),
                        ]}
                        validationRules={{ required: "Vui lòng chọn phường / xã" }}
                    />

                    <Input
                        placeholder="Nhập số nhà, tên đường"
                        type={typeInput.TEXT}
                        {...register("address")}
                        error={!!errors.address}
                        message={errors.address?.message}
                    />

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={() => handlePopup("cancel")}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            {isLoading ? " Saving..." : "Lưu"}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </Popup>
    );
}

export default PopupInfo2;
