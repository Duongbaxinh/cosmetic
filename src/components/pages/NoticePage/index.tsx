"use client"

import ContainerLayout from "@/layouts/ContainerLayout";
import SideBarDetail from "@/layouts/SideBarDetail";

function NoticePage() {

    return (
        <ContainerLayout isSidebar={false}>
            <div className="flex gap-4 max-w-[1024px] mx-auto ">
                <SideBarDetail />
                <div className="flex flex-col gap-5 space-x-5 w-full">
                    <h1 className='mb-4 text-[19px] font-[700] '>Thông báo</h1>
                    <div className="w-full h-full bg-white flex items-center justify-center">
                        <h1>Chức năng sẽ sớm được cập nhật</h1>
                    </div>
                </div>
            </div>
        </ContainerLayout >
    );
}

export default NoticePage;
