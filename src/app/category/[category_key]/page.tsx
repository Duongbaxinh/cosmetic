import CategoryPage from '@/components/pages/CategoryPage';
import { useGetAllCategoryQuery } from '@/redux/slices/category.slice';
import { Props } from '@/types';
import React from 'react';

function page(props: Props) {

    return (
        <CategoryPage category_key='' />
    );
}

export default page;