"use client"
import Input from '@/components/atoms/Input';
import { MESS_SYSTEM } from '@/config/mess.config';
import ContainerLayout from '@/layouts/ContainerLayout';
import { useResetPasswordMutation } from '@/redux/slices/auth.slice';
import { resetPasswordSchema } from '@/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function ResetPasswordPage({ token }: { token: string }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isDirty, isValid },
    } = useForm<{ newPassword: string, confirmPassword: string }>({
        mode: "onChange",
        resolver: yupResolver(resetPasswordSchema),
    });

    const [resetPassword, { isLoading }] = useResetPasswordMutation()
    const router = useRouter()

    const onSubmit = async (data: { newPassword: string }) => {
        try {
            alert("run at here")
            const payload = {
                "token": token,
                "new_password": data.newPassword,
            }
            const dataForgotPassword = await resetPassword(payload).unwrap()
            if (dataForgotPassword) {
                alert(dataForgotPassword)
                router.push("/")
            }
        } catch (error) {

            toast.error(MESS_SYSTEM.UNKNOWN_ERROR)
        }
    };

    return (
        <ContainerLayout>
            <div className=' bg-white w-full h-screen flex justify-center items-start mt-[60px]'>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full  rounded-md flex items-center justify-center py-8"
                >
                    <div className="border border-gray-300 md:min-w-[400px] max-w-[350px] md:max-w-[500px] p-5 rounded-lg space-y-4 shadow shadow-pink-300">
                        <div>
                            <p className="text-[13px] font-bold text-black pb-2">Nhập mật khẩu mới</p>
                            <p className="text-[13px] font-bold text-black pb-2">Hãy nhập mật khẩu mới và nhấn xác nhân mật khẩu để tiếp tục hành trình khám phá vẻ đẹp với chúng tôi</p>
                            <div className="mb-3">
                                <Input
                                    className='border border-color py-3'
                                    placeholder="Nhập mật khẩu mới"
                                    {...register("newPassword")}
                                />
                                {errors.newPassword && (
                                    <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
                                )}
                            </div>
                            <div className="">
                                <Input
                                    className='border border-color py-3'
                                    placeholder="Nhập lại mật khẩu"
                                    {...register("confirmPassword")}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!isValid || !isDirty}
                            className={`w-full p-2 text-white text-[14px] rounded-full transition ${!isValid || !isDirty
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

export default ResetPasswordPage;