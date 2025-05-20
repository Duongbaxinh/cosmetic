'use client';
import Breadcrumb from '@/components/atoms/Breadcrumb';
import Input, { typeInput } from '@/components/atoms/Input';
import { useSignUpMutation } from '@/redux/slices/auth.slice';
import { LOGIN_URL } from '@/routers';
import { AuthDataRegister } from '@/types';
import { authRegisterValid } from '@/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsEye } from 'react-icons/bs';
import { HiEyeOff } from 'react-icons/hi';

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthDataRegister>({
        resolver: yupResolver(authRegisterValid),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signUp, { isLoading }] = useSignUpMutation();
    const router = useRouter();

    const handleRegister = async (dataRegister: AuthDataRegister) => {
        const res = await signUp(dataRegister);
        router.push(LOGIN_URL);
    };

    const onSubmit: SubmitHandler<AuthDataRegister> = (data) => {
        handleRegister(data);
    };

    return (
        <div className="w-full h-full bg-white">
            <Head>
                <title>Access Beauty Account</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <Breadcrumb items={[{ label: "Home", href: '/' }, { label: "Sign Up" }]} />
                </div>

                <div className="flex justify-center mt-8">
                    <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
                        {/* Form Side */}
                        <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Beauty Account</h1>
                            <p className="text-gray-600 mb-6">Join us and enjoy exclusive benefits!</p>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <div className="mb-4">
                                    <Input
                                        placeholder="Enter your username"
                                        {...register('username')}
                                        error={!!errors.username}
                                        message={errors.username?.message}
                                    />
                                </div>

                                <div className="mb-4">
                                    <Input
                                        placeholder="Enter your email"
                                        {...register('email')}
                                        error={!!errors.email}
                                        message={errors.email?.message}
                                    />
                                </div>

                                <div className="mb-4">
                                    <Input
                                        placeholder="Enter your phone"
                                        {...register('phone')}
                                        error={!!errors.phone}
                                        message={errors.phone?.message}
                                    />
                                </div>

                                <div className="mb-4">
                                    <Input
                                        placeholder="Enter your password"
                                        type={showPassword ? typeInput.TEXT : typeInput.PASSWORD}
                                        {...register('password')}
                                        tailIcon={showPassword ? <HiEyeOff size={20} /> : <BsEye size={20} />}
                                        onHandleTailIcon={() => setShowPassword(!showPassword)}
                                        error={!!errors.password}
                                        message={errors.password?.message}
                                    />
                                </div>

                                <div className="mb-4">
                                    <Input
                                        placeholder="Confirm your password"
                                        type={showConfirmPassword ? typeInput.TEXT : typeInput.PASSWORD}
                                        {...register('confirmPassword')}
                                        tailIcon={showConfirmPassword ? <HiEyeOff size={20} /> : <BsEye size={20} />}
                                        onHandleTailIcon={() => setShowConfirmPassword(!showConfirmPassword)}
                                        error={!!errors.confirmPassword}
                                        message={errors.confirmPassword?.message}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition disabled:bg-purple-400"
                                >
                                    {isLoading ? 'Signing up...' : 'Sign Up'}
                                </button>
                            </form>

                            <p className="text-center text-sm text-gray-600 mt-4">
                                Already have an account?{' '}
                                <Link href={LOGIN_URL} className="text-purple-600 hover:underline">
                                    Log In
                                </Link>
                            </p>
                        </div>

                        {/* Image Side */}
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

export default RegisterPage;
