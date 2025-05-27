"use client"
import Popup from '@/components/atoms/Popup';
import React from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { useAuth } from '@/contexts/auth.context';

function AuthPage() {
    const { isAuth, setIsAuth } = useAuth()
    const pages: { login: React.ReactNode, register: React.ReactNode } = {
        login: <LoginPage />,
        register: <RegisterPage />
    }
    if (!isAuth) return
    return (
        <Popup isOpen={isAuth.isOpen} onClose={() => setIsAuth({ form: isAuth.form, isOpen: false })}  >
            {pages[isAuth?.form]}
        </Popup>
    );
}

export default AuthPage;