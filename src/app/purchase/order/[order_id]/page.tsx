import OrderDetailPage from "@/components/pages/OrderDetailPage";


interface Props {
    params: {
        order_id: string;
    };
}

export default function Page({ params }: Props) {
    const { order_id } = params;

    return <OrderDetailPage order_id={order_id} />;
}
