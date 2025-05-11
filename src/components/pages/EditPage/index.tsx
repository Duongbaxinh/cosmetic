"use client"
import ContainerLayout from '@/layouts/ContainerLayout';
import PhoneEdit from './PhoneEdit';
import ChangePassword from './ChangePassword';
import { TypeEdit } from '@/types';

function EditPage({ type_edit }: { type_edit: keyof TypeEdit }) {
    const pages: TypeEdit = {
        phone: <PhoneEdit />,
        password: <ChangePassword />
    }
    return (
        <ContainerLayout isSidebar={false} isSidebarDetail={true}>
            {pages[type_edit] ?? <h1>Không tìm thấy trang</h1>}
        </ContainerLayout >
    );
}

export default EditPage;