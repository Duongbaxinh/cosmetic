'use client';
import { ChevronRightIcon } from "@/assets/icons";
import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
    return (
        <nav className={`text-[14px] font-[300] leading-[20px] text-gray-500 flex items-center" aria-label="Breadcrumb ${className}`}>
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {item.href ? (
                        <Link href={item.href} className="text-gray-500 hover:underline ">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-700">{item.label}</span>
                    )}
                    {index < items.length - 1 && <span ><ChevronRightIcon /></span>}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumb;
