import CheckoutPage from '@/components/pages/CheckoutPage';
import { Props } from '@/types';
import React from 'react';


function page(props: Props) {
    const order_id = props.params.order_id
    return (
        <CheckoutPage order_id={order_id} />
    );
}

export default page;