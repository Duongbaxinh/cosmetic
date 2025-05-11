import CheckoutPage from '@/components/pages/CheckoutPage';
import { Props } from '@/types';

export default async function Page({ params }: Props) {
    const { order_id } = await params;
    return <CheckoutPage order_id={order_id} />;
}
