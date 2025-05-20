import ResetPasswordPage from "@/components/pages/ResetPasswordPage";
import { Props } from "@/types";

export default async function Page({ searchParams }: Props) {
    const { token } = await searchParams;
    return <ResetPasswordPage token={token} />;
}
