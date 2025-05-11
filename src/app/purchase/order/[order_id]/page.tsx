import OrderDetailPage from "@/components/pages/OrderDetailPage";
import { Props } from "@/types";

export default async function Page({ params }: Props) {
    const { order_id } = await params;

    return <OrderDetailPage order_id={order_id} />;
}
