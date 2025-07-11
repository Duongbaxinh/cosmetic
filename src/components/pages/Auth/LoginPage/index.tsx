'use client';
import Input, { typeInput } from '@/components/atoms/Input';
import { MESS_SYSTEM } from '@/config/mess.config';
import { useAuth } from '@/contexts/auth.context';
import { useError } from '@/contexts/error.context';
import { useLoginMutation } from '@/redux/slices/auth.slice';
import { FORGOT_PASSWORD_URL } from '@/routers';
import { AuthDataLogin } from '@/types';
import { authLoginValid } from '@/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsEye } from 'react-icons/bs';
import { HiEyeOff } from 'react-icons/hi';
import { toast } from 'react-toastify';

const LoginPage = () => {

    const { handleError } = useError()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthDataLogin>({
        resolver: yupResolver(authLoginValid),
    });

    const {
        ref: passwordRef,
        onChange: onPasswordChange,
        onBlur: onPasswordBlur,
        name: passwordName,
    } = register('password');

    const {
        ref: usernameRef,
        onChange: onUsernameChange,
        onBlur: onUsernameBlur,
        name: usernameName,
    } = register('username');

    const [showPassword, setShowPassword] = useState(false);
    const { setIsLogin, setAccessToken, setRefetchToken, setScope, setIsAuth, } = useAuth();
    const [login, { isLoading, error }] = useLoginMutation();

    const handleLogin = async (dataLogin: AuthDataLogin) => {
        try {
            const res = await login(dataLogin);
            if (res.error) {
                return handleError(res.error)
            }
            if (res.data) {
                setIsLogin(true);
                setScope(res.data.scope)
                setAccessToken(res.data.access_token);
                setRefetchToken(res.data.refresh_token);
                setIsAuth({ form: 'login', isOpen: false });
            }
        } catch (error) {
            toast.error(MESS_SYSTEM.UNKNOWN_ERROR)
        }
    };

    const onSubmit: SubmitHandler<AuthDataLogin> = (data) => {
        handleLogin(data);
    };
    const moveRegister = () => {
        setIsAuth({ form: 'register', isOpen: true })
    }

    return (

        <div className="bg-white h-fit w-[280px] sm:w-[500px] sm:h-[500px] my-0 mx-auto px-[10px] sm:px-[30px] md:px-[90px] py-3 md:py-6 ">
            <div className="flex justify-center ">
                <div className="w-full bg-white  flex flex-col justify-center">
                    <h1 className="text-2xl font-bold  mb-2 uppercase text-center">Đăng nhập</h1>
                    <p className="text-[14px] leading-[17px] font-[500] mb-6 text-center">Hành trình làm đẹp của bạn bắt đầu từ đây</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="mb-1 sm:mb-4 relative">
                            <Input
                                className=' px-1 py-3 sm:px-3 sm:py-4 border border-color'
                                type={typeInput.TEXT}
                                placeholder="Nhập email của bạn"
                                error={!!errors.username}
                                message={errors.username?.message}
                                ref={usernameRef}
                                onChange={onUsernameChange}
                                onBlur={onUsernameBlur}
                                name={usernameName}
                            />
                        </div>

                        <div className="mb-1 sm:mb-4 relative">
                            <Input
                                className='px-1 py-3 sm:px-3 sm:py-4 border border-color'
                                type={showPassword ? typeInput.TEXT : typeInput.PASSWORD}
                                placeholder="Nhập mật khẩu của bạn"
                                error={!!errors.password}
                                message={errors.password?.message}
                                ref={passwordRef}
                                onChange={onPasswordChange}
                                onBlur={onPasswordBlur}
                                name={passwordName}
                                tailIcon={showPassword ? <HiEyeOff size={20} /> : <BsEye size={20} />}
                                onHandleTailIcon={() => setShowPassword((prev) => !prev)}
                            />
                        </div>

                        <div className="flex justify-end mb-2">
                            <Link target='_blank' href={FORGOT_PASSWORD_URL} className="text-sm text-purple-600 hover:underline">
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient rounded-full text-white p-1 sm:p-3  hover:bg-purple-700 transition disabled:bg-purple-400"
                        >
                            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Cần tạo tài khoản?{' '}
                        <button onClick={moveRegister} className="text-purple-600 hover:underline">
                            Đăng Ký
                        </button>
                    </p>
                </div>
            </div>

        </div>

    );
};

export default LoginPage;