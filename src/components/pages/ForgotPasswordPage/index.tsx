"use client"
import Breadcrumb from '@/components/atoms/Breadcrumb';
import Input from '@/components/atoms/Input';
import ContainerLayout from '@/layouts/ContainerLayout';
import { useForgotPasswordMutation } from '@/redux/slices/auth.slice';
import { ForgotPasswordPayload } from '@/types';
import { forgotPasswordSchema } from '@/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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

            toast.success("Yêu cầu đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến hoặc thư mục spam.");

        }
    };

    return (
        <ContainerLayout isCategory={false} classHeader='!h-[50px] justify-between '>
            <Breadcrumb items={[{ href: '/', label: "Trang chủ" }, { href: "#", label: 'Quên mật khẩu' }]} className='px-[60px] mt-[20px]' />
            <div className=' bg-white w-full h-screen flex justify-center items-start mt-[80px]'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full  rounded-md flex items-center justify-center py-8 "
                >
                    <div className="border border-gray-300 md:min-w-[400px] p-5 rounded-md space-y-4 shadow shadow-pink-300">
                        <div className='space-y-4'>
                            <p className="text-[13px] font-bold text-pink-300 pb-2">Email đăng ký tài khoản</p>
                            <Input
                                className='border border-color py-3'
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
        </ContainerLayout>
    );
}

export default ForgotPasswordPage;