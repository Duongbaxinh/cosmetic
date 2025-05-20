"use client";
import { TrashIcon } from '@/assets/icons';
import EmailIcon from '@/assets/icons/EmailIcon';
import LockIcon from '@/assets/icons/LockIcon';
import PhoneIcon from '@/assets/icons/PhoneIcon';
import ProfileIcon from '@/assets/icons/ProfileIcon';
import InputForm from '@/components/atoms/InputForm';
import { useAuth } from '@/contexts/auth.context';
import ContainerLayout from '@/layouts/ContainerLayout';
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
        <ContainerLayout isSidebar={false} isSidebarDetail={true}>
            <FormProvider {...methods}>
                <div className="flex  bg-gray-100">
                    <div className="bg-white p-6 rounded-lg shadow-md flex w-full max-w-4xl">
                        {/* Left Section */}
                        <div className="w-1/2 pr-6">
                            <h2 className="text-lg text-gray-400  mb-4">Thông tin cá nhân</h2>

                            {/* Profile Picture and Name */}
                            <div className="flex items-center mb-4">
                                <div className="w-[80px] h-[80px] rounded-full bg-gray-200 flex items-center justify-center mr-4">
                                    <ProfileIcon className="w-[50px] h-[50px]" />
                                </div>
                                <div className="flex-1">
                                    <InputForm
                                        label='User name'
                                        name="username"
                                        placeholder="Username"
                                        defaultValue={user?.username}
                                    />

                                    <div className="flex items-center mt-2">
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
                                    </div>
                                </div>
                            </div>

                            {/* Date of Birth */}
                            {/* <DatePicker
                                dayName="user_day"
                                monthName="user_month"
                                yearName="user_year"
                                label="Ngày sinh"
                            /> */}

                            {/* Gender */}
                            {/* <div className="flex gap-8 py-8">
                                <label className="block text-[13px]">Giới tính</label>
                                <div className="flex space-x-4 text-[13px]">
                                    <label>
                                        <input type="radio" {...register('gender')} value="Nam" className="mr-1" /> Nam
                                    </label>
                                    <label>
                                        <input type="radio" {...register('gender')} value="Nữ" className="mr-1" /> Nữ
                                    </label>
                                    <label>
                                        <input type="radio" {...register('gender')} value="Khác" className="mr-1" /> Khác
                                    </label>
                                </div>
                            </div> */}

                            {/* Nationality */}
                            {/* <div className="flex items-center gap-8 mb-8 text-[13px] ">
                                <label className="whitespace-nowrap">Quốc tịch</label>
                                <Select
                                    name="nationality"
                                    options={[
                                        { value: "", label: "Chọn quốc tịch" },
                                        { value: "Việt Nam", label: "Việt Nam" },
                                        { value: "Other", label: "Other" },
                                    ]}

                                />
                            </div> */}

                            {/* Save Button */}
                            <button
                                type="button"
                                onClick={handleSubmit(onSubmit)}
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                                Lưu thay đổi
                            </button>
                        </div>

                        {/* Right Section */}
                        <div className="w-1/2 pl-6 border-l text-[13px]">
                            <h2 className="text-lg text-gray-400 mb-4">Số điện thoại và Email</h2>

                            {/* Phone Number */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2 items-center text-[14px] text-gray-400">
                                        <PhoneIcon />
                                        <div className="">
                                            <p>Số điện thoại</p>
                                            <p>{user?.phone}</p>
                                        </div>
                                    </div>
                                    <Link href={EDIT_PHONE_URL} className=" block text-blue-500 border-[1px] border-blue-500 px-2 py-1 rounded-sm cursor-pointer">Cập nhật</Link>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2 items-center text-[14px] text-gray-400">
                                    <EmailIcon />
                                    <div className="">
                                        <p>Địa chỉ email</p>
                                        <p>{user?.email ?? ""}</p>
                                    </div>
                                </div>
                                <Link href={`${EDIT_EMAIL_URL}/phone`} className="block text-blue-500 border-[1px] border-blue-500 px-2 py-1 rounded-sm cursor-pointer">Cập nhật</Link>
                            </div>
                            <h2 className="text-lg text-gray-400 my-4">Bảo mật</h2>
                            {/* Password */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2 items-center">
                                        <LockIcon />
                                        <span>Đổi mật khẩu</span>
                                    </div>
                                    <Link href={CHANGE_PASSWORD_URL} className="block text-blue-500 border-[1px] border-blue-500 px-2 py-1 rounded-sm">Cập nhật</Link>
                                </div>
                            </div>

                            {/* PIN */}
                            {/* <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2 items-center">
                                        <ShieldCheckIcon />
                                        <span>Thiết lập mã PIN</span>
                                    </div>
                                    <button className="text-blue-500 border-[1px] border-blue-500 px-2 py-1 rounded-sm">Thiết lập</button>
                                </div>
                            </div> */}

                            {/* Delete Account */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2 items-center">
                                        <TrashIcon />
                                        <span>Yêu cầu xóa tài khoản</span>
                                    </div>
                                    <button className="text-blue-500 border-[1px] border-blue-500 px-2 py-1 rounded-sm">Yêu cầu</button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </FormProvider>
        </ContainerLayout>
    );
}

export default ProfilePage;