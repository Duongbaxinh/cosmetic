'use client'
import { useForm, SubmitHandler } from 'react-hook-form';
import React from 'react';
import axios from 'axios';

interface LoginProps {
    onRegister: () => void;
    onClose: () => void;
}

interface LoginFormData {
    username: string;
    password: string;
}

const Login: React.FC<LoginProps> = ({ onRegister, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    const handleLogin = async (dataLogin: LoginFormData) => {
        try {
            const { data } = await axios.post('http://localhost:8080/api/generateToken', {
                username: dataLogin.username,
                password: dataLogin.password,
            });
            localStorage.setItem('Logined', 'true');
            localStorage.setItem('UserType', JSON.stringify(data));
        } catch (error) {
            console.log('Error during login', error);
        }
    };

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        handleLogin(data);
    };

    return (
        <div className="p-4 rounded-lg shadow-md bg-white">
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium">Username</label>
                        <input
                            {...register('username', { required: 'Username is required' })}
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            {...register('password', { required: 'Password is required' })}
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Login
                    </button>
                </form>
                <div className="flex items-center gap-2 mt-4">
                    <span className="text-sm text-gray-600">Haven't an account?</span>
                    <button
                        onClick={onRegister}
                        className="text-sm text-blue-500 hover:underline"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
