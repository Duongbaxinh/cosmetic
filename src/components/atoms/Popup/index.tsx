'use client'
import React, { useState } from 'react';

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
        <div className=""></div>
    );
};

export default Popup;
