import { SearchIcon } from '@/assets/icons';
import Input from '@/components/atoms/Input';
import useClickOutside from '@/hooks/useClickOuside';
import { useSearchProductsQuery } from '@/redux/slices/product.slice';
import { DETAIL_PRODUCT_URL, SEARCH_URL } from '@/routers';
import { createParams } from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import { HiSearchCircle } from 'react-icons/hi';

function BoxSearch() {
    const router = useRouter()
    const [textSearch, setSetTextSearch] = useState("");
    const paramSearch = useMemo(() => createParams({ textSearch: textSearch }), [textSearch]);
    const [showBox, setShowBox] = useState(false)
    const refBox = useRef(null)

    const { data, error: errDiscount, isLoading: loadingDiscount } = useSearchProductsQuery(paramSearch)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!showBox) {
            setShowBox(true)
        }
        setSetTextSearch(e.target.value)
    };
    useClickOutside([refBox], () => {
        setShowBox(false)
    })

    const handleMovePageSearch = () => {
        router.push(`${SEARCH_URL}/${encodeURIComponent(textSearch)}`)
    }
    const products = data ? data : []
    return (
        <div ref={refBox} className="w-full relative">
            <Input
                value={textSearch}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e)}
                placeholder='Tìm kiếm sản phẩm...'
                className='p-2 text-gray-400 '
                tailIcon={<HiSearchCircle />}
                onHandleTailIcon={handleMovePageSearch} />

            {products && products.length > 0 && showBox && (
                <div className="absolute top-auto left-0 right-0 bg-white shadow-lg border border-gray-200 mt-1 rounded z-50 ">
                    {/* Suggestion items */}
                    {products.map((item, index) => (
                        <Link href={`${DETAIL_PRODUCT_URL}/${item.id}`}
                            key={index}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <SearchIcon className="text-gray-500 w-[20px] h-[20px]" />
                            {/* <Image src={'https://salt.tikicdn.com/ts/upload/e8/aa/26/42a11360f906c4e769a0ff144d04bfe1.png'}
                                alt=''
                                width={20}
                                height={20}
                            /> */}
                            <span className="text-sm text-gray-800">{item.product_name}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BoxSearch;