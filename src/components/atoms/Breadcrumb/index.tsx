'use client';
import { ChevronRightIcon } from "@/assets/icons";
import Link from "next/link";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
    return (
        <nav className={`text-[12px] font-[300] leading-[20px] text-gray-500 flex items-center ${className}`}>
            {items.map((item, index) => (
                <div key={index} className="flex items-center max-w-[300px] sm:max-w-[450px] overflow-hidden">
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="text-gray-500 hover:underline truncate whitespace-nowrap overflow-hidden"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-700 truncate whitespace-nowrap overflow-hidden">
                            {item.label}
                        </span>
                    )}
                    {index < items.length - 1 && (
                        <span className="mx-1 flex-shrink-0">
                            <ChevronRightIcon />
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumb;
