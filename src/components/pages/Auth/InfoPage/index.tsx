"use client"
import Popup from '@/components/atoms/Popup';
import PopupInfo from '@/components/molecules/PopupInfo';
import { useOrder } from '@/contexts/order.context';
import React from 'react';

function InfoPage() {
    const { isOpen, setIsOpen } = useOrder();
    return (
        <PopupInfo isOpen={isOpen.openContact} onClose={() => setIsOpen(prev => ({ ...prev, openContact: false }))} />
    );
}

export default InfoPage;