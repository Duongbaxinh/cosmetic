'use client';
import Input, { typeInput } from '@/components/atoms/Input';
import { MESS_SYSTEM } from '@/config/mess.config';
import { useAuth } from '@/contexts/auth.context';
import { useError } from '@/contexts/error.context';
import { useSendOTP2Mutation, useSendOTPMutation, useSignUpMutation } from '@/redux/slices/auth.slice';
import { AuthDataRegister } from '@/types';
import { authRegisterValid } from '@/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsEye } from 'react-icons/bs';
import { HiEyeOff } from 'react-icons/hi';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger
    } = useForm<AuthDataRegister>({
        resolver: yupResolver(authRegisterValid),
        mode: 'onChange',
    });
    const { handleError } = useError();
    const { setIsAuth } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signUp, { isLoading }] = useSignUpMutation();
    const [otp, setOtp] = useState<string>('');
    const [emailSend, setEmailSend] = useState<string>('');
    const [sendOTP] = useSendOTPMutation();
    const [sendOTP2] = useSendOTP2Mutation();
    const [step, setStep] = useState<'email' | 'otp' | 'register'>('email');

    const handleEmailChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setEmailSend(e.target.value);
        },
        [setEmailSend]
    );

    const handleRegister = async (dataRegister: AuthDataRegister) => {
        try {
            const registerData = await signUp(dataRegister);
            if (registerData.error) {
                return handleError(registerData.error);
            }
            setIsAuth({ form: 'login', isOpen: true });
            toast.success('Đăng ký thành công!');
        } catch (error) {
            toast.error(MESS_SYSTEM.UNKNOWN_ERROR);
        }
    };

    const onSubmit: SubmitHandler<AuthDataRegister> = (data) => {
        handleRegister(data);
    };

    const moveLogin = () => {
        setIsAuth({ form: 'login', isOpen: true });
    };

    const handleSendOTP = async () => {
        try {
            // alert(`${emailSend} --- ${otp}`)
            const payload = await sendOTP2({ email: emailSend, otp }).unwrap();
            if (payload) {
                setStep('register');
                toast.success('Xác nhận OTP thành công!');
            } else {
                toast.error('Mã OTP không hợp lệ');
            }
        } catch (error) {
            console.log("check 00000", error)
            handleError(error)
        }
    };

    const handleOTP = async () => {
        const isValid = await trigger('email');
        if (!isValid) {
            toast.error('Vui lòng nhập email hợp lệ');
            return;
        }

        try {
            const dataRes = await sendOTP(emailSend).unwrap();
            if (dataRes) {
                setStep('otp');
                toast.success('Mã OTP đã được gửi đến email của bạn!');
            } else {
                toast.error('Gửi OTP thất bại');
            }
        } catch (error) {
            toast.error(MESS_SYSTEM.UNKNOWN_ERROR);
        }
    };

    return (
        <div className="bg-white w-[280px] h-fit sm:w-[500px] my-0 mx-auto px-0 sm:px-[30px] md:px-[60px] py-3 md:py-6">
            <div className="w-full bg-white flex flex-col justify-center">
                <h1 className="text-xl sm:text-2xl font-bold mb-2 uppercase text-center">Tạo tài khoản Beauty</h1>
                <p className="text-[14px] leading-[17px] font-[500] mb-6 text-center">
                    Tham gia với chúng tôi và tận hưởng những lợi ích độc quyền!
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="w-full grid grid-cols-2 gap-1 sm:gap-3">
                        {step === 'email' && (
                            <div className="mb-4 col-span-2">
                                <Input
                                    className="!px-1 !py-3 sm:px-3 sm:py-5 border border-color"
                                    placeholder="Nhập email của bạn"
                                    {...register('email', {
                                        onChange: handleEmailChange,
                                    })}
                                    value={emailSend}
                                    styleError=""
                                    error={!!errors.email}
                                    message={errors.email?.message}
                                />
                                <button
                                    type="button"
                                    onClick={handleOTP}
                                    disabled={!emailSend || isLoading}
                                    className="w-full bg-gradient rounded-full text-white p-1 sm:p-3 mt-2 hover:bg-purple-700 transition disabled:bg-purple-400"
                                >
                                    {isLoading ? 'Đang gửi OTP...' : 'Gửi OTP'}
                                </button>
                            </div>
                        )}

                        {step === 'otp' && (
                            <div className="mb-4 col-span-2">
                                <Input
                                    className="!px-1 !py-3 sm:px-3 sm:py-5 border border-color"
                                    placeholder="Nhập mã OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    styleError=""
                                />
                                <button
                                    type="button"
                                    onClick={handleSendOTP}
                                    disabled={!otp || isLoading}
                                    className="w-full bg-gradient rounded-full text-white p-1 sm:p-3 mt-2 hover:bg-purple-700 transition disabled:bg-purple-400"
                                >
                                    {isLoading ? 'Đang xác nhận...' : 'Xác nhận OTP'}
                                </button>
                            </div>
                        )}

                        {step === 'register' && (
                            <>
                                <div className="mb-4 col-span-2">
                                    <Input
                                        className="!px-1 !py-2 sm:px-3 sm:py-4 border border-color"
                                        placeholder="Nhập tài khoản người dùng"
                                        {...register('username')}
                                        styleError=""
                                        error={!!errors.username}
                                        message={errors.username?.message}
                                    />
                                </div>
                                <div className="mb-4 col-span-2">
                                    <Input
                                        className="!px-1 !py-2 sm:px-3 sm:py-4 border border-color"
                                        placeholder="Nhập số điện thoại"
                                        {...register('phone')}
                                        styleError=""
                                        error={!!errors.phone}
                                        message={errors.phone?.message}
                                    />
                                </div>
                                <div className="mb-4 col-span-2">
                                    <Input
                                        className="!px-1 !py-2 sm:px-3 sm:py-4 border border-color"
                                        placeholder="Nhập mật khẩu"
                                        type={showPassword ? typeInput.TEXT : typeInput.PASSWORD}
                                        {...register('password')}
                                        tailIcon={
                                            showPassword ? (
                                                <HiEyeOff className="text-[15px] sm:text-[20px]" />
                                            ) : (
                                                <BsEye className="text-[15px] sm:text-[20px]" />
                                            )
                                        }
                                        onHandleTailIcon={() => setShowPassword(!showPassword)}
                                        error={!!errors.password}
                                        styleError="!top-[42px]"
                                        message={errors.password?.message}
                                    />
                                </div>
                                <div className="mb-4 col-span-2">
                                    <Input
                                        className="!px-1 !py-2 sm:px-3 sm:py-4 border border-color"
                                        placeholder="Xác nhận mật khẩu"
                                        type={showConfirmPassword ? typeInput.TEXT : typeInput.PASSWORD}
                                        {...register('confirmPassword')}
                                        tailIcon={
                                            showConfirmPassword ? (
                                                <HiEyeOff className="text-[15px] sm:text-[20px]" />
                                            ) : (
                                                <BsEye className="text-[15px] sm:text-[20px]" />
                                            )
                                        }
                                        onHandleTailIcon={() => setShowConfirmPassword(!showConfirmPassword)}
                                        error={!!errors.confirmPassword}
                                        styleError="!top-[42px]"
                                        message={errors.confirmPassword?.message}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full col-span-2 bg-gradient rounded-full text-white p-1 sm:p-3 hover:bg-purple-700 transition disabled:bg-purple-400"
                                >
                                    {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
                                </button>
                            </>
                        )}
                    </div>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Đã có tài khoản?{' '}
                    <button onClick={moveLogin} className="text-purple-600 hover:underline">
                        Đăng nhập
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;