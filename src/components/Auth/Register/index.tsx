'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface RegisterProps {
    onLogin: () => void;
    onClose: () => void;
}

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const Register: React.FC<RegisterProps> = ({ onLogin, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

    const handleRegister = async (dataRegister: RegisterFormData) => {
        try {
            const response = await axios.post('http://localhost:8080/api/register', {
                ...dataRegister,
            });

            if (response.status === 200) {
                alert('Registered successfully!');
                onLogin();
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.error('Error during registration', error);
        }
    };

    const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
        handleRegister(data);
    };

    return (
        <div className="p-4 rounded-lg shadow-md bg-white">
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Register</h2>
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
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            {...register('email', { required: 'Email is required' })}
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
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
                    <div>
                        <label className="block text-sm font-medium">First Name</label>
                        <input
                            {...register('firstName', { required: 'First Name is required' })}
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Last Name</label>
                        <input
                            {...register('lastName', { required: 'Last Name is required' })}
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Register
                    </button>
                </form>
                <div className="flex items-center gap-2 mt-4">
                    <span className="text-sm text-gray-600">Have an account?</span>
                    <button
                        onClick={onLogin}
                        className="text-sm text-blue-500 hover:underline"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
