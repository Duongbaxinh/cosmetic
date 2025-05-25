import CategoryPage from '@/components/pages/CategoryPage';
import { Props } from '@/types';

export default async function Page({
    params,
}: Props) {
    const { category_key, value } = await params;
    return <CategoryPage category_key={category_key} value={value} />;
}
