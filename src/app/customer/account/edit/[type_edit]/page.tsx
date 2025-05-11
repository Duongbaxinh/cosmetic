import EditPage from '@/components/pages/EditPage';
import { Props } from '@/types';

export default async function page({ params }: Props) {
    const { type_edit } = await params;
    console.log(type_edit);
    return (
        <EditPage type_edit={type_edit} />
    );
}

