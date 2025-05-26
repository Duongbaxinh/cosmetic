import { SearchIcon } from '@/assets/icons';
import Input from '@/components/atoms/Input';
import useClickOutside from '@/hooks/useClickOuside';
import { useSearchProductsQuery } from '@/redux/slices/product.slice';
import { DETAIL_PRODUCT_URL, SEARCH_URL } from '@/routers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import { HiSearchCircle } from 'react-icons/hi'; // Tail icon (can be replaced with a custom icon)

function BoxSearch({ className }: { className?: string }) {
    const router = useRouter();
    const [textSearch, setTextSearch] = useState('');
    const paramSearch = useMemo(() => ({ textSearch: textSearch }), [textSearch]);
    const [showBox, setShowBox] = useState(false);
    const refBox = useRef(null);

    const { data, error: errDiscount, isLoading: loadingDiscount } = useSearchProductsQuery(paramSearch);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!showBox) {
            setShowBox(true);
        }
        setTextSearch(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleMovePageSearch()
        }
    };

    useClickOutside([refBox], () => {
        setShowBox(false);
    });

    const handleMovePageSearch = () => {
        router.push(`${SEARCH_URL}/${encodeURIComponent(textSearch)}`);
    };

    const products = data ? data : [];

    return (
        <div ref={refBox} className="w-full relative">
            <Input
                value={textSearch}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e)}
                placeholder="Tìm kiếm sản phẩm..." // You can change this to "Mua 1 Tặng 1 Kem Ch..." if needed
                className="p-2 text-gray-700 bg-gray-100 !rounded-full"
                leadingIcon={<SearchIcon className="text-gray-500 w-[20px] h-[20px]" />}
                tailIcon={<HiSearchCircle className="text-blue-500 w-[24px] h-[24px]" />}
                onKeyDown={handleKeyDown}
                onHandleTailIcon={handleMovePageSearch}
            />

            {products && products.length > 0 && showBox && (
                <div className="absolute top-auto left-0 right-0 w-[250px] sm:w-full bg-white shadow-lg border border-gray-200 mt-1 rounded z-50">
                    {products.map((item, index) => (
                        <Link
                            href={`${DETAIL_PRODUCT_URL}/${item.id}`}
                            key={index}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <SearchIcon className="text-gray-500 w-[20px] h-[20px]" />
                            <span className="text-sm text-gray-800">{item.product_name}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BoxSearch;