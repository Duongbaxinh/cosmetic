"use client"
import ContainerLayout from '@/layouts/ContainerLayout';
import SideBarDetail from '@/layouts/SideBarDetail';
import { setUser } from '@/redux/slices/auth.slice';
import { RootState } from '@/redux/store';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function ManageShopePage() {
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch()
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("userInfo");
        if (accessToken && userData) {
            dispatch(setUser(JSON.parse(userData)));
        }
    }, []);

    return (
        <ContainerLayout isSidebar={false}>
            <div className="flex gap-4 max-w-[1024px] mx-auto ">
                <SideBarDetail />
                <div className="flex flex-col gap-5 space-x-5 w-full">
                    <h1 className='mb-4 text-[19px] font-[700] '>Thông báo</h1>
                    <div className="flex ">
                        <div className="bg-white p-2 md:p-6 rounded-lg shadow-md flex w-full ">
                            {/* Left Section */}
                            <div className="w-full ">
                                <h2 className="text-lg font-[700]  mb-4">Tài khoản</h2>

                                {/* Profile Picture and Name */}
                                <div className="grid grid-cols-2 grid-rows-2 gap-4 mb-4">

                                    <p>{user?.username}</p>

                                    <p>{user?.phone}</p>

                                    <p>{user?.email}</p>

                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </ContainerLayout >
    );
}

export default ManageShopePage;