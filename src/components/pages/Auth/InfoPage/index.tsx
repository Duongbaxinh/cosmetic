"use client"
import PopupInfo from '@/components/molecules/PopupInfo';
import { useOrder } from '@/contexts/order.context';

function InfoPage() {
    const { isOpen, setIsOpen } = useOrder();
    return (
        <PopupInfo isOpen={isOpen.openContact} onClose={() => setIsOpen(prev => ({ ...prev, openContact: false }))} />
    );
}

export default InfoPage;