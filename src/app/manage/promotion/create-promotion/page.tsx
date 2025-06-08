import PromotionFormPage from '@/dashboard/component/pages/PromotionFormPage';
import { Props } from '@/types';
import React from 'react';

async function page({ searchParams }: Props) {
    const { promotionId } = await searchParams
    return (
        <PromotionFormPage promotionId={promotionId} />
    );
}

export default page;