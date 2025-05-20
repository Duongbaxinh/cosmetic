"use client"
import Input from '@/components/atoms/Input';
import { useForgotPasswordMutation } from '@/redux/slices/auth.slice';
import { ForgotPasswordPayload } from '@/types';
import { forgotPasswordSchema } from '@/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

function ForgotPasswordPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isDirty, isValid },
    } = useForm<ForgotPasswordPayload>({
        mode: "onChange",
        resolver: yupResolver(forgotPasswordSchema),
    });

    const [showCurrent, setShowCurrent] = React.useState(false);

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation()


    const onSubmit = async (data: { email: string }) => {
        const payload = {
            "email": data.email,
        }
        const dataForgotPassword = await forgotPassword(payload)
        if (dataForgotPassword.data) {
            console.log(dataForgotPassword)
            alert(dataForgotPassword.data)
        }
    };

    return (
        <div className=' bg-white w-screen h-screen flex justify-center items-center'>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full  rounded-md flex items-center justify-center py-8"
            >
                <div className="border border-gray-300 md:min-w-[400px] p-3 rounded-md space-y-4">
                    <div>
                        <p className="text-[13px]">Email đăng ký tài khoản</p>
                        <Input
                            placeholder="Nhập email của bạn"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
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
                        {isLoading ? "Yêu cầu đang được gửi đi..." : "Gửi yêu cầu"}
                    </button>
                </div>
            </form></div>
    );
}

export default ForgotPasswordPage;