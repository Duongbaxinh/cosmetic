"use client"
import ContainerLayout from '@/layouts/ContainerLayout';
import PhoneEdit from './PhoneEdit';
import ChangePassword from './ChangePassword';
import { TypeEdit } from '@/types';
import SideBarDetail from '@/layouts/SideBarDetail';

function EditPage({ type_edit }: { type_edit: keyof TypeEdit }) {
    const pages: TypeEdit = {
        phone: <PhoneEdit />,
        password: <ChangePassword />
    }
    return (
        <ContainerLayout >
            <div className="flex gap-4 max-w-[1024px] mx-auto ">
                <SideBarDetail />

                {pages[type_edit] ?? <h1>Không tìm thấy trang</h1>}

            </div>

        </ContainerLayout >
    );
}

export default EditPage;