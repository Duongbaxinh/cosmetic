"use client"
import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons';
import FilterIcon from '@/assets/icons/FilterIcon';
import Breadcrumb from '@/components/atoms/Breadcrumb';
import Carousel from '@/components/atoms/Carousel';
import IconButton from '@/components/atoms/IconButton';
import { ProductSkeleton } from '@/components/atoms/ProductSkeleton';
import CardProductFull from '@/components/molecules/CardProductFull';
import { categories as example } from '@/fakes';
import ContainerLayout from '@/layouts/ContainerLayout';
import Filter from '@/layouts/Filter';
import { useGetBrandsQuery } from '@/redux/slices/brand.slice';
import { useGetAllCategoryQuery } from '@/redux/slices/category.slice';
import { useGetAllProductsQuery, useGetProductFilterQuery, useSearchProductsQuery } from '@/redux/slices/product.slice';
import { DETAIL_PRODUCT_URL } from '@/routers';
import { FilterProductType } from '@/types';
import { isArray } from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { SwiperSlide } from 'swiper/react';

function SearchPage({ text_search }: { text_search: string }) {
    const [filters, setFilter] = useState<FilterProductType>({
        limitnumber: 30,
        page: 1,
        // brand: [],
        // category: '',
        // price: [],
        // rate: 5,
        // sortPrice: "",
        // order: 'asc',
        // sortBy: '',
        textSearch: decodeURIComponent(text_search)
    })
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const { data: brands, isLoading: loadingBrand, error: errorBrand } = useGetBrandsQuery()
    const { data: productSearch, error: errSearch, isLoading: loadingSearch } = useGetAllProductsQuery(filters)

    const handlePagination = (type: "next" | "prev") => {
        if (type === 'next' && currentPage < totalPage) {
            setFilter(prev => ({ ...prev, page: (prev.page + 1) }))
        }
        if (type === "prev" && Math.max(1, currentPage) > 1) {
            setFilter(prev => ({ ...prev, page: (prev.page - 1) }))
        }
    }

    const newArr = (arr: any[], element: any) => {
        if (arr.includes(element)) {
            return arr.filter((i) => i !== element)
        } else {
            return [...arr, element]
        }
    }

    const handleFilter = (filed: keyof FilterProductType, value: any) => {
        const newData = isArray(filters[filed]) && (filed !== "price") ? newArr(filters[filed], value) : value
        setFilter(prev => ({ ...prev, [filed]: newData }))
    }
    useEffect(() => {
        setFilter(prev => ({ ...prev, page: currentPage }))
    }, [productSearch])

    const totalPage = productSearch ? productSearch.number_page : 1
    const currentPage = Math.min(filters.page, Math.max(1, productSearch?.number_page ?? 1))
    const productsDisplay = productSearch?.results ?? []

    const isPrevious = currentPage > 1
    const isNext = currentPage < totalPage
    const disableStyle = "pointer-events-none opacity-40"


    const isFiltered = [
        filters.category ? `category${filters.category}` : null,
        filters.rate || null,
        filters.sortBy || null,
        ...(filters.brand || [])
    ].filter(Boolean);

    return (
        <ContainerLayout isSidebar={false}>
            <div className="pb-3">
                <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: `Kết quả tìm kiếm "${filters.textSearch}"`, href: '#' }]} />
            </div>
            <div className="w-full h-full py-5">
                <div className="flex gap-2">
                    <Filter onFilter={handleFilter} brands={brands ?? []} isFiltered={isFiltered} />
                    {productsDisplay.length > 0 ? (
                        <div className="w-full bg-white min-h-[100vh] py-3 rounded-md">
                            <div className="w-full flex justify-between px-3 py-2">
                                <div className="relative block md:hidden">
                                    <IconButton
                                        onClick={() => setShowMobileFilter(prev => !prev)}
                                        className=' shadow-md' icon={<FilterIcon />} />
                                    {showMobileFilter && (
                                        <div className=" absolute z-20 max-h-[300px] overflow-auto shadow-2xs py-3 bg-white rounded-md border border-gray-500">
                                            <div className=" flex flex-col gap-3 p-3">
                                                <div className="w-full flex gap-2 justify-between"> <button className='bg-gray-200 px-3 py-2'>Mới nhất</button>
                                                    <button onClick={() => handleFilter("sortBy", "product_sold")}
                                                        className={`bg-gray-200 px-3 py-2
                                                         ${isFiltered.includes("product_sold")
                                                            && "bg-red-400 text-white"}`}
                                                    >Bán chạy</button></div>
                                                <select value={filters.sortPrice} onChange={(e) => handleFilter("sortPrice", e.target.value)} className='px-3 py-2 outline-none bg-gray-200'>
                                                    <option value={""} >Giá</option>
                                                    <option value={"asc"} >Giá thấp đến cao</option>
                                                    <option value={"desc"}>Giá cao đến thấp</option>
                                                </select>
                                            </div>
                                            {/* <Filter onFilter={handleFilter} categories={categories ?? []} brands={brands ?? []} isFiltered={isFiltered}
                                            className=' !flex flex-wrap top-0 left-0 overflow-auto w-fit h-fit ' /> */}
                                        </div>)}
                                </div>
                                <div className="hidden space-x-2 text-[14px] leading-[17px] md:flex flex-nowrap items-center justify-start">
                                    <span className="hidden lg:block">Sắp xếp theo </span>
                                    {/* <button className='bg-gray-200 px-3 py-2'>Phổ biến</button> */}
                                    <button className='bg-gray-200 px-3 py-2'>Mới nhất</button>
                                    <button onClick={() => handleFilter("sortBy", "product_sold")} className={`bg-gray-200 px-3 py-2 ${isFiltered.includes("product_sold") && "bg-red-400 text-white"}`}>Bán chạy</button>
                                    <select value={filters.sortPrice} onChange={(e) => handleFilter("sortPrice", e.target.value)} className='px-3 py-2 outline-none bg-gray-200'>
                                        <option value={""} >Giá</option>
                                        <option value={"asc"} >Giá thấp đến cao</option>
                                        <option value={"desc"}>Giá cao đến thấp</option>
                                    </select>
                                </div>
                                {totalPage >= 2 && (
                                    <div className="flex items-center gap-1">
                                        <span>{currentPage}/{totalPage}</span>
                                        <IconButton onClick={() => handlePagination("prev")} className={`bg-white shadow-md ${!isPrevious && disableStyle}`} icon={<ChevronLeftIcon />} />
                                        <IconButton onClick={() => handlePagination("next")} className={`bg-white shadow-md ${!isNext && disableStyle}`} icon={<ChevronRightIcon />} />
                                    </div>
                                )}
                            </div>

                            {loadingSearch ? (
                                <ProductSkeleton length={20} />
                            ) :
                                (<div className="grid grid-cols-2 grid-rows-6 md:grid-cols-4 lg:grid-cols-5 gap-2 px-2">
                                    {productsDisplay.map(({
                                        id,
                                        product_name,
                                        product_thumbnail,
                                        product_price,
                                        product_rate
                                    }) => (
                                        <div key={id} className=" flex items-center justify-center">
                                            <Link href={`${DETAIL_PRODUCT_URL}/${id}`} className='block w-full'>
                                                <CardProductFull
                                                    key={id}
                                                    className='min-h-[330px]'
                                                    id={id}
                                                    product_thumbnail={product_thumbnail}
                                                    product_name={product_name}
                                                    product_price={product_price}
                                                    product_rate={product_rate}
                                                />
                                            </Link>
                                        </div>
                                    ))}
                                    {/* Banner */}
                                </div>)}
                            <div className="flex justify-center items-center gap-2 mt-4 pt-[30px]">
                                <ReactPaginate
                                    className='flex gap-4 items-center justify-center '
                                    breakLabel="..."
                                    nextLabel={<ChevronRightIcon />}
                                    activeClassName='bg-gray-300 min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px] flex items-center justify-center rounded-sm'
                                    pageRangeDisplayed={4}
                                    initialPage={currentPage - 1}
                                    onPageChange={(selectedItem) => {
                                        handleFilter("page", selectedItem.selected + 1);
                                    }}
                                    pageCount={totalPage}
                                    previousLabel={<ChevronLeftIcon />}
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className=" flex w-full h-full min-h-screen items-center justify-center">Rong</div>
                    )}

                </div>
            </div>

        </ContainerLayout>
    );
}


export default SearchPage;