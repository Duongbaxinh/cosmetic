"use client"
import Breadcrumb from '@/components/atoms/Breadcrumb';
import Input from '@/components/atoms/Input';
import { MESS_SYSTEM } from '@/config/mess.config';
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
        try {
            const payload = {
                "email": data.email,
            }
            const dataForgotPassword = await forgotPassword(payload).unwrap()
            if (dataForgotPassword) {
                toast.success("Yêu cầu đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến hoặc thư mục spam.");
            }
        } catch (error) {
            toast.error(MESS_SYSTEM.UNKNOWN_ERROR)
        }
    };

    return (
        <ContainerLayout>
            <div className=' bg-white w-full h-screen flex justify-center items-start mt-[60px] '>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full   flex items-center justify-center py-8 "
                >
                    <div className="border border-gray-300 md:min-w-[400px] max-w-[350px] md:max-w-[500px] p-5 rounded-lg space-y-4 shadow shadow-pink-300">
                        <div className='space-y-4 w-full'>
                            <p className="text-[13px] font-bold text-pink-300 pb-2">Email đăng ký tài khoản</p>
                            <p className="text-[13px] font-bold text-pink-300 pb-2 break-words">Hãy nhập chính xác email mà bạn đã đăng ký tài khoản để chúng tôi có thể tiếp tục xử lý việc khôi phục lại mật khẩu cho bạn</p>
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
                            className={`w-full p-2 text-white text-[14px] cursor-pointer  rounded-full transition ${!isValid || !isDirty
                                ? "bg-gray-200 cursor-not-allowed"
                                : "bg-gradient"
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