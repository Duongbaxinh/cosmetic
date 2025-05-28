"use client";
import { TrashIcon } from '@/assets/icons';
import EmailIcon from '@/assets/icons/EmailIcon';
import LockIcon from '@/assets/icons/LockIcon';
import PhoneIcon from '@/assets/icons/PhoneIcon';
import ProfileIcon from '@/assets/icons/ProfileIcon';
import InputForm from '@/components/atoms/InputForm';
import { useAuth } from '@/contexts/auth.context';
import ContainerLayout from '@/layouts/ContainerLayout';
import SideBarDetail from '@/layouts/SideBarDetail';
import { setUser, useChangeProfileMutation } from '@/redux/slices/auth.slice';
import { RootState } from '@/redux/store';
import { CHANGE_PASSWORD_URL, EDIT_EMAIL_URL, EDIT_PHONE_URL } from '@/routers';
import { ProfileFormData } from '@/types'; import Link from 'next/link';
import { useEffect } from 'react';
;
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


function ProfilePage() {
    const methods = useForm<ProfileFormData>({
        defaultValues: {
            fullName: '',
            nickname: '',
            user_day: '',
            user_month: '',
            user_year: '',
            gender: '',
            nationality: 'Chọn quốc tịch',
        },
    });
    const [changeProfile, { isLoading, error }] = useChangeProfileMutation();
    const { register, handleSubmit } = methods;
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch()

    const onSubmit = async (data: ProfileFormData) => {
        await changeProfile(data).unwrap();
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("userInfo");
        if (accessToken && userData) {
            dispatch(setUser(JSON.parse(userData)));
        }
    }, []);


    return (
        <ContainerLayout isSidebar={false} >
            <div className="flex gap-4 max-w-[1024px] mx-auto overflow-hidden ">
                <SideBarDetail />
                <div className="flex flex-col gap-5 space-x-5 w-full min-w-[300px]">
                    <FormProvider {...methods}>
                        <div className="flex ">
                            <div className="bg-white p-2 md:p-6 rounded-lg shadow-md flex w-full ">
                                {/* Left Section */}
                                <div className="w-full ">
                                    <h2 className="text-lg font-[700]  mb-4">Tài khoản</h2>

                                    {/* Profile Picture and Name */}
                                    <div className="grid grid-cols-2 grid-rows-2 gap-4 mb-4">

                                        <InputForm
                                            label='User name'
                                            name="username"
                                            placeholder="Username"
                                            defaultValue={user?.username}
                                        />


                                        <InputForm
                                            label='Nickname'
                                            name="nickname"
                                            placeholder="Nickname"
                                            validationRules={{
                                                maxLength: {
                                                    value: 20,
                                                    message: "Nickname không được vượt quá 20 ký tự",
                                                },
                                            }}
                                        />
                                        <InputForm
                                            label='Số điện thoại'
                                            name="phone"
                                            placeholder="Số điện thoại"
                                            defaultValue={user?.phone}
                                        />
                                        <InputForm
                                            label='Email'
                                            name="email"
                                            placeholder="Email"
                                            defaultValue={user?.email}
                                        />

                                    </div>
                                    <div className="flex items-center justify-between w-full mb-4">
                                        <div className="flex gap-2 items-center">
                                            <LockIcon />
                                            <span>Đổi mật khẩu</span>
                                        </div>
                                        <Link href={CHANGE_PASSWORD_URL} className="block text-blue-500 border-[1px] border-blue-500 px-2 py-1 rounded-sm w-[100px]">Cập nhật</Link>
                                    </div>
                                    <div className="flex items-center justify-between w-full mb-4">
                                        <div className="flex gap-2 items-center">
                                            <TrashIcon />
                                            <span>Yêu cầu xóa tài khoản</span>
                                        </div>
                                        <button className="text-blue-500 border-[1px] border-blue-500 px-2 py-1 rounded-sm w-[100px]">Yêu cầu</button>
                                    </div>
                                    {/* Save Button */}
                                    <button
                                        type="button"
                                        onClick={handleSubmit(onSubmit)}
                                        className="w-full bg-gradient text-white p-2  rounded-full"
                                    >
                                        Lưu thay đổi
                                    </button>
                                </div>


                            </div>
                        </div>
                    </FormProvider>
                </div>
            </div>
        </ContainerLayout>
    );
}

export default ProfilePage;