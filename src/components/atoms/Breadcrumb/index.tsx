'use client';
import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className="text-sm text-gray-500 mb-6 flex items-center" aria-label="Breadcrumb">
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {item.href ? (
                        <Link href={item.href} className="text-purple-600 hover:underline">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-700">{item.label}</span>
                    )}
                    {index < items.length - 1 && <span className="mx-2">›</span>}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumb;
