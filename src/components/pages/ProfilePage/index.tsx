"use client";
import { TrashIcon } from '@/assets/icons';
import EmailIcon from '@/assets/icons/EmailIcon';
import FacebookIcon from '@/assets/icons/FacebookIcon';
import GoogleIcon from '@/assets/icons/GoogleIcon';
import LockIcon from '@/assets/icons/LockIcon';
import PhoneIcon from '@/assets/icons/PhoneIcon';
import ProfileIcon from '@/assets/icons/ProfileIcon';
import ShieldCheckIcon from '@/assets/icons/ShieldCheckIcon';
import InputForm from '@/components/atoms/InputForm';
import Select from '@/components/atoms/Select';
import DatePicker from '@/components/molecules/DatePicker';
import { useAuth } from '@/contexts/auth.context';
import ContainerLayout from '@/layouts/ContainerLayout';
import { useChangeProfileMutation } from '@/redux/slices/auth.slice';
import { formatUserBirthday } from '@/utils/handleDate';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

interface ProfileFormData extends FieldValues {
    fullName: string;
    nickname: string;
    user_day: string;
    user_month: string;
    user_year: string;
    gender: string;
    nationality: string;
}

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
    const { user } = useAuth();

    const onSubmit = async (data: ProfileFormData) => {

        const { user_day, user_month, user_year, ...rest } = data;
        const birthday = formatUserBirthday({ day: user_day, month: user_month, year: user_year });
        const formData = {
            ...rest,
            birthday: birthday,
        };
        console.log('check form data :::: ', formData, isLoading, error);
        await changeProfile(formData).unwrap();
        console.log('check form data 222:::: ', formData, isLoading, error);
    };

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
                                        label='Họ & Tên'
                                        name="fullName"
                                        placeholder="Họ & Tên"
                                        defaultValue={user?.last_name + ' ' + user?.first_name}
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
                            <DatePicker
                                dayName="user_day"
                                monthName="user_month"
                                yearName="user_year"
                                label="Ngày sinh"
                            />

                            {/* Gender */}
                            <div className="flex gap-8 py-8">
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
                            </div>

                            {/* Nationality */}
                            <div className="flex items-center gap-8 mb-8 text-[13px] ">
                                <label className="whitespace-nowrap">Quốc tịch</label>
                                <Select
                                    name="nationality"
                                    options={[
                                        { value: "", label: "Chọn quốc tịch" },
                                        { value: "Việt Nam", label: "Việt Nam" },
                                        { value: "Other", label: "Other" },
                                    ]}

                                />
                            </div>

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
                                            <p>0378700020</p>
                                        </div>
                                    </div>
                                    <button className="text-blue-500 border-[1px] border-blue-500 px-2 py-1 rounded-sm">Cập nhật</button>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2 items-center text-[14px] text-gray-400">
                                    <EmailIcon />
                                    <div className="">
                                        <p>Địa chỉ email</p>
                                        <p>{user?.email_address ?? ""}</p>
                                    </div>
                                </div>
                                <button className="text-blue-500 border-[1px] border-blue-500 px-2 py-1 rounded-sm">Cập nhật</button>
                            </div>
                            <h2 className="text-lg text-gray-400 my-4">Bảo mật</h2>
                            {/* Password */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2 items-center">
                                        <LockIcon />
                                        <span>Đổi mật khẩu</span>
                                    </div>
                                    <button className="text-blue-500 border-[1px] border-blue-500 px-2 py-1 rounded-sm">Cập nhật</button>
                                </div>
                            </div>

                            {/* PIN */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2 items-center">
                                        <ShieldCheckIcon />
                                        <span>Thiết lập mã PIN</span>
                                    </div>
                                    <button className="text-blue-500 border-[1px] border-blue-500 px-2 py-1 rounded-sm">Thiết lập</button>
                                </div>
                            </div>

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

                            {/* Social Connections */}
                            <h2 className="text-lg text-gray-400 mb-4">Liên kết mạng xã hội</h2>
                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2 items-center">
                                        <FacebookIcon />
                                        <span>Facebook</span>
                                    </div>
                                    <button className="text-blue-500 border-[1px] border-blue-500 px-2 py-1 rounded-sm">Liên kết</button>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2 items-center">
                                        <GoogleIcon />
                                        <span>Google</span>
                                    </div>
                                    <button className="text-blue-500 border-[1px] border-blue-500 px-2 py-1 rounded-sm">Liên kết</button>
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