'use client';
import { EyeIcon } from '@/assets/icons';
import Breadcrumb from '@/components/atoms/Breadcrumb';
import Input, { typeInput } from '@/components/atoms/Input';
import { useAuth } from '@/contexts/auth.context';
import { useLoginMutation } from '@/redux/slices/auth.slice';
import { FORGOT_PASSWORD_URL, REGISTER_URL } from '@/routers';
import { AuthDataLogin } from '@/types';
import { handleError } from '@/utils';
import { authLoginValid } from '@/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsEye } from 'react-icons/bs';
import { HiEyeOff } from 'react-icons/hi';

const LoginPage = () => {
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
    const { setIsLogin, setAccessToken, setUser } = useAuth();
    const [login, { isLoading, error }] = useLoginMutation();
    const router = useRouter();

    const handleLogin = async (dataLogin: AuthDataLogin) => {
        setIsLogin(true);
        const res = await login(dataLogin);
        if (error) return handleError(error);
        if (res) {
            setAccessToken(res.data.access_token);
            router.push('/');
        }
        console.log('check res login :::: ', res);
    };

    const onSubmit: SubmitHandler<AuthDataLogin> = (data) => {
        handleLogin(data);
    };

    return (
        <div className="bg-white w-full h-full">
            <Head>
                <title>Access Beauty Account</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Login' }]} />
                </div>

                <div className="flex justify-center mt-8">
                    <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
                        {/* Left Side - Form */}
                        <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Beauty Account</h1>
                            <p className="text-gray-600 mb-6">Your beauty journey starts here</p>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <div className="mb-4 relative">
                                    <Input
                                        type={typeInput.TEXT}
                                        placeholder="Enter your email"
                                        error={!!errors.username}
                                        message={errors.username?.message}
                                        ref={usernameRef}
                                        onChange={onUsernameChange}
                                        onBlur={onUsernameBlur}
                                        name={usernameName}
                                    />
                                </div>

                                <div className="mb-4 relative">
                                    <Input
                                        type={showPassword ? typeInput.TEXT : typeInput.PASSWORD}
                                        placeholder="Enter your password"
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

                                <div className="flex justify-end mb-6">
                                    <Link target='_blank' href={FORGOT_PASSWORD_URL} className="text-sm text-purple-600 hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition disabled:bg-purple-400"
                                >
                                    {isLoading ? 'Logging in...' : 'Log In'}
                                </button>
                            </form>
                            <p className="text-center text-sm text-gray-600 mt-4">
                                Need to create an account?{' '}
                                <Link href={REGISTER_URL} className="text-purple-600 hover:underline">
                                    Sign Up
                                </Link>
                            </p>
                        </div>

                        {/* Right Side - Image */}
                        <div
                            className="w-1/2 bg-cover bg-center"
                            style={{
                                backgroundImage: `url('https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
