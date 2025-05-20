import SearchPage from '@/components/pages/SearchPage';
import { Props } from '@/types';
import React from 'react';

async function page({ params }: Props) {
    const textSearch = (await params).text_search
    return (
        <SearchPage text_search={textSearch} />
    );
}

export default page;
