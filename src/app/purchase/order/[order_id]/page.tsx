import OrderDetailPage from '@/components/pages/OrderDetailPage';
import { Props } from '@/types';
import React from 'react';

function page(props: Props) {
    console.log("check id order ", props.params.order_id)
    const order_id = props.params.order_id
    return (
        <OrderDetailPage order_id={order_id} />
    );
}

export default page;