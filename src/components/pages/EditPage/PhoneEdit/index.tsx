import PhoneIcon from '@/assets/icons/PhoneIcon';
import Input, { typeInput } from '@/components/atoms/Input';
import { useAuth } from '@/contexts/auth.context';
import React from 'react';

function PhoneEdit() {
    const { userProfile } = useAuth()
    const [phone, setPhone] = React.useState<string>('');
    const [announce, setAnnounce] = React.useState<boolean>(false);
    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnnounce(true);
        setPhone(e.target.value);
    }
    const announceText = "Mã xác thực (OTP) sẽ được gửi đến số điện thoại này để xác minh số điện thoại là của bạn"
    return (
        <>
            <h1 className='mb-4'>Cập nhật số điện thoai</h1>
            <div className="w-full bg-white rounded-md flex items-center justify-center py-8">
                <div className=" border-gray-300 border-[1px] md:min-w-[400px] md:max-w-[400px] p-3 rounded-md space-y-4">
                    <p className='text-[13px]'>Số điện thoại</p>
                    <Input leadingIcon={<PhoneIcon />} type={typeInput.NUMBER} placeholder={userProfile?.phone ?? "Nhập số điện thoại"} value={phone ?? userProfile?.phone} onChange={(e: any) => handleChangePhone(e)} classInput='border-gray-400' />
                    <p className='text-[13px] text-gray-400 '>{announce && announceText}</p>
                    <button className='w-full p-2 bg-blue-400 text-white text-[14px] rounded-md'>Lưu thay đổi</button>
                </div>
            </div>
        </>
    );
}

export default PhoneEdit;