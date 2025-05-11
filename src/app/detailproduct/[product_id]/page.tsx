"use client";

import DetailProductPage from "@/components/pages/DetailProductPage";
import { Props } from "@/types";

export default async function Page({ params }: Props) {
    const { product_id } = await params;
    return <DetailProductPage product_id={product_id} />;
}
