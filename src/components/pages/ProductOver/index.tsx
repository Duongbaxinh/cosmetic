"use client"

import ContainerLayout from "@/layouts/ContainerLayout";

function ProductOver() {

    return (
        <ContainerLayout isSidebar={false} isSidebarDetail={true}>
            <h1 className='mb-4'>Sản phẩm đã xem</h1>
            <div className="w-full h-full bg-white flex items-center justify-center">
                <h1>Chức năng sẽ sớm được cập nhật</h1>
            </div>
        </ContainerLayout>
    );
}

export default ProductOver;
