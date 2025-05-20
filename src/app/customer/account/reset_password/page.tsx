import ResetPasswordPage from "@/components/pages/ResetPasswordPage";
import { Props } from "@/types";

interface PageProps {
    searchParams: {
        token: string;
    };
}
export default async function Page({ searchParams }: PageProps) {
    const { token } = await searchParams;
    console.log("check token ::: ", token)
    return <ResetPasswordPage token={token} />;
}
