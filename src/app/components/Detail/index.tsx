"use client"
import { useRouter } from 'next/router';
import React from 'react';

function Detail(props: any) {
    const router = useRouter()
    router.push('/')
    return (
        <div>
            detaipp
        </div>
    );
}

export default Detail;