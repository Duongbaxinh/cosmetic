import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input, { typeInput } from "@/components/atoms/Input";
import EyeIcon from "@/assets/icons/EyeIcon"; // nếu có
import { BsEyeSlash } from "react-icons/bs";
import { changePasswordSchema } from "@/validate";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setUser, useChangePasswordMutation, useChangeProfileMutation } from "@/redux/slices/auth.slice";
import { redirect } from "next/navigation";
import { LOGIN_URL } from "@/routers";

type FormData = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

function ChangePassword() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isDirty, isValid },
    } = useForm<FormData>({
        mode: "onChange",
        resolver: yupResolver(changePasswordSchema),
    });

    const [showCurrent, setShowCurrent] = React.useState(false);
    const [showNew, setShowNew] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);

    const [changePassword, { isLoading }] = useChangePasswordMutation()
    const dispatch = useDispatch()
    const userInfo = useSelector((state: RootState) => state.user.user)


    const onSubmit = async (data: FormData) => {
        if (!userInfo || !userInfo.email) return alert("use must login")
        const payload = {
            "email": userInfo?.email,
            "current_password": data.currentPassword,
            "new_password": data.newPassword
        }
        const dataChangePassword = await changePassword(payload)
        console.log("ssss", dataChangePassword)
        if (dataChangePassword.data) {
            console.log(dataChangePassword)
            alert(dataChangePassword.data)
            redirect(LOGIN_URL)
        }
    };
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("userInfo");
        if (accessToken && userData) {
            dispatch(setUser(JSON.parse(userData)));
        }
    }, [])
    return (
        <>
            <h1 className='mb-4'>Thay đổi mật khẩu</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full bg-white rounded-md flex items-center justify-center py-8"
            >
                <div className="border border-gray-300 md:min-w-[400px] p-3 rounded-md space-y-4">
                    <div>
                        <p className="text-[13px]">Mật khẩu hiện tại</p>
                        <Input
                            type={showCurrent ? typeInput.TEXT : typeInput.PASSWORD}
                            placeholder="Nhập mật khẩu hiện tại"
                            {...register("currentPassword")}
                            tailIcon={
                                <div onClick={() => setShowCurrent(!showCurrent)} className="cursor-pointer">
                                    {showCurrent ? <BsEyeSlash /> : <EyeIcon />}
                                </div>
                            }
                        />
                        {errors.currentPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>
                        )}
                    </div>

                    <div>
                        <p className="text-[13px]">Mật khẩu mới</p>
                        <Input
                            type={showNew ? typeInput.TEXT : typeInput.PASSWORD}
                            placeholder="Nhập mật khẩu mới"
                            {...register("newPassword")}
                            tailIcon={
                                <div onClick={() => setShowNew(!showNew)} className="cursor-pointer">
                                    {showNew ? <BsEyeSlash /> : <EyeIcon />}
                                </div>
                            }
                        />
                        <p className="text-[13px] text-gray-400">Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số</p>
                        {errors.newPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
                        )}
                    </div>

                    <div>
                        <p className="text-[13px]">Nhập lại mật khẩu mới</p>
                        <Input
                            type={showConfirm ? typeInput.TEXT : typeInput.PASSWORD}
                            placeholder="Nhập lại mật khẩu mới"
                            {...register("confirmPassword")}
                            tailIcon={
                                <div onClick={() => setShowConfirm(!showConfirm)} className="cursor-pointer">
                                    {showConfirm ? <BsEyeSlash /> : <EyeIcon />}
                                </div>
                            }
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!isValid || !isDirty}
                        className={`w-full p-2 text-white text-[14px] rounded-md transition ${!isValid || !isDirty
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        {isLoading ? "Changing..." : "Lưu thay đổi"}
                    </button>
                </div>
            </form></>
    );
}

export default ChangePassword;
