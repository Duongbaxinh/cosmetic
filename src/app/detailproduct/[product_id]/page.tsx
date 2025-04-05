"use client";

import DetailProductPage from "@/components/pages/DetailProductPage";
import { Props } from "@/types";


export default function ProductDetail(props: Props) {
    console.log("check param ", props.params.product_id);

    return <DetailProductPage product_id={1} />;
}
