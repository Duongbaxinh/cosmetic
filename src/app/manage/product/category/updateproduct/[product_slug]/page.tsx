
import UpdateProductPage from '@/dashboard/component/pages/UpdateProductPage';
import { Props } from '@/types';
import React from 'react';

async function page({ params }: Props) {
    const { product_slug } = await params
    return (
        <UpdateProductPage productSlug={product_slug} />
    );
}

export default page;