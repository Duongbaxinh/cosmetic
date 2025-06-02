import DetailProductPage from "@/components/pages/DetailProductPage";
import PromotionPage from "@/components/pages/PromotionPage";
import { Props } from "@/types";

export default async function Page({ params }: Props) {
    const { promotion } = await params;
    return <PromotionPage promotion={promotion} />;
}
