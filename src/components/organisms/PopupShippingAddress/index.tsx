import Popup from '@/components/atoms/Popup';
import PopupInfo2 from '@/components/molecules/PopupInfo2';
import { MESS_SYSTEM } from '@/config/mess.config';
import { useAuth } from '@/contexts/auth.context';
import { ShippingAddress } from '@/types';
import React, { SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

function PopupShippingAddress({ isOpen, setIsOpen, onChangeAddress }: { isOpen: boolean, setIsOpen: React.Dispatch<SetStateAction<boolean>>, onChangeAddress: (address: ShippingAddress) => void }) {
    const { shippingAddress } = useAuth()
    const [addShipping, setAddShipping] = useState<boolean>(false)
    const handleAddShippingAddress = () => {
        setIsOpen(false)
        setAddShipping(true)
    }
    if (shippingAddress && shippingAddress.length <= 0) return toast.error(MESS_SYSTEM.UNKNOWN_ERROR)
    return (
        <>
            <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} title='Danh sách địa chỉ'>
                <div className=" w-[350px] md:w-[500px] bg-white rounded-md shadow">
                    {shippingAddress?.map((shipping) =>
                        <div className="flex items-center gap-3 p-3" >
                            <input type='radio' name='shipping' onClick={() => onChangeAddress(shipping)} />
                            <div
                                className='rounded-md '>{shipping.address}</div>
                        </div>
                    )}
                </div>
                <button className='w-full text-center mt-3 bg-gradient py-2 rounded-full text-white font-bold' onClick={() => setIsOpen(false)}>Xác nhận</button>
                <button className='w-full text-center mt-3' onClick={handleAddShippingAddress}>+ Thêm địa chỉ mới</button>
            </Popup>
            <PopupInfo2 isOpen={addShipping} onClose={() => setAddShipping(false)} />
        </>
    );
}

export default PopupShippingAddress;