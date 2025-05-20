"use client"
import Input from '@/components/atoms/Input';
import { useResetPasswordMutation } from '@/redux/slices/auth.slice';
import { LOGIN_URL } from '@/routers';
import { resetPasswordSchema } from '@/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';

function ResetPasswordPage({ token }: { token: string }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isDirty, isValid },
    } = useForm<{ new_password: string }>({
        mode: "onChange",
        resolver: yupResolver(resetPasswordSchema),
    });

    const [resetPassword, { isLoading }] = useResetPasswordMutation()

    const onSubmit = async (data: { new_password: string }) => {
        const payload = {
            "token": token,
            "new_password": data.new_password,
        }
        const dataForgotPassword = await resetPassword(payload)
        if (dataForgotPassword.data) {
            console.log(dataForgotPassword)
            alert(dataForgotPassword.data)
            redirect(LOGIN_URL)
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
                        <p className="text-[13px]">Nhập mật khẩu mới</p>
                        <Input
                            placeholder="Nhập mật khẩu mới"
                            {...register("new_password")}
                        />
                        {errors.new_password && (
                            <p className="text-red-500 text-xs mt-1">{errors.new_password.message}</p>
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

export default ResetPasswordPage;