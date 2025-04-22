'use client';
import { useSingUpMutation } from '@/redux/slices/auth.slice';
import { AuthDataLogin } from '@/types';
import { authValid } from '@/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthDataLogin>({
        resolver: yupResolver(authValid),
    });
    const [singUp, { isLoading }] = useSingUpMutation();

    const handleRegister = async (dataLogin: AuthDataLogin) => {
        console.log('check data singUp :::: ', dataLogin);
        singUp(dataLogin);
    };

    const onSubmit: SubmitHandler<AuthDataLogin> = (data) => {
        handleRegister(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Head>
                <title>Access Beauty Account</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
                {/* Left Side - Form */}
                <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign-In Beauty Account</h1>
                    <p className="text-gray-600 mb-6">Your beauty journey starts here</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="mb-4">
                            <input
                                placeholder="Enter your username"
                                {...register('username')}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="Enter your password"
                                {...register('password')}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>
                        <div className="flex justify-end mb-6">
                            <a href="#" className="text-sm text-purple-600 hover:underline">
                                Forgot password?
                            </a>
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
                        You have account?{' '}
                        <a href="/auth/login" className="text-purple-600 hover:underline">
                            Sign in
                        </a>
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
    );
};

export default RegisterPage;