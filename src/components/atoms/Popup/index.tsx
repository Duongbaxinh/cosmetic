'use client'
import React, { useState } from 'react';
import Login from '../../Auth/Login';
import Register from '../../Auth/Register';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
    const [auth, setAuth] = useState(true);

    const handleLogin = () => {
        setAuth(true);
    };

    const handleRegister = () => {
        setAuth(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white w-96 rounded-lg shadow-lg">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl">Modal Title</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    {auth ? (
                        <Login onRegister={handleRegister} onClose={onClose} />
                    ) : (
                        <Register onLogin={handleLogin} onClose={onClose} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Popup;
