"use client"
import CloseIcon from '@/assets/icons/CloseIcon';
import FilterIcon from '@/assets/icons/FilterIcon';
import Breadcrumb from '@/components/atoms/Breadcrumb';
import Chip from '@/components/atoms/Chip';
import IconButton from '@/components/atoms/IconButton';
import { ProductSkeleton } from '@/components/atoms/ProductSkeleton';
import CardProductFull from '@/components/molecules/CardProductFull';
import Drawer from '@/components/molecules/Drawer';
import NotFound from '@/components/molecules/NotFound';
import { priceRanges } from '@/config/data.config';
import ContainerLayout from '@/layouts/ContainerLayout';
import Filter from '@/layouts/Filter';
import { useGetBrandsQuery } from '@/redux/slices/brand.slice';
import { useGetAllCategoryQuery } from '@/redux/slices/category.slice';
import { useGetDetailPromotionQuery } from '@/redux/slices/promotion.slice';

import { useGetAllTypeQuery } from '@/redux/slices/typeproduct.slice';
import { DETAIL_PRODUCT_URL } from '@/routers';
import { FilterProductType, Product } from '@/types';
import { isArray } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
const initFilter: FilterProductType = {
    limitnumber: 5,
    page: 1,
    brand: [],
    product_category: [],
    product_type: [],
    price: { key: "", value: [] },
    rate: null,
    sortPrice: "",
    order: 'asc',
    sortBy: ''
}
function PromotionPage({ promotion }: { promotion: string }) {
    const [filters, setFilter] = useState<FilterProductType>(initFilter)
    const [showFilter, setShowFilter] = useState<boolean>(false)
    const { data: promotionData, isLoading: loadingPromotion, error: errorProductSearch } = useGetDetailPromotionQuery(promotion)
    const { data: categories, isLoading, error } = useGetAllCategoryQuery()
    const { data: productTypes, isLoading: isLoadingTypes, error: errorTypes } = useGetAllTypeQuery()
    const { data: brands, isLoading: loadingBrand, error: errorBrand } = useGetBrandsQuery()

    // const totalPage = productSearch ? Math.ceil(productSearch.count / productSearch.limitnumber) : 1
    // const currentPage = Math.min(filters.page, Math.max(1, productSearch?.number_page ?? 1))
    // const productsDisplay = productSearch?.results ?? []

    const isFiltered = [
        ...(filters.product_type?.map(item => `product_type-${item.title}`) || []),
        filters.price?.value && filters.price.value.length > 0 ? "price_" + filters.price?.key || null : null,
        filters.rate !== null ? "rate-" + filters.rate || null : null,
        filters.sortBy !== "" ? filters.sortBy || null : null,
        ...(filters.product_category?.map(item => `product_category-${item.title}`) || []),
        ...(filters.brand?.map((item: { title: any; }) => `product_brand-${item.title}`) || [])
    ].filter(Boolean);

    // const handlePagination = (type: "next" | "prev") => {
    //     if (type === 'next' && currentPage < totalPage) {
    //         setFilter(prev => ({ ...prev, page: (prev.page + 1) }))
    //     }
    //     if (type === "prev" && Math.max(1, currentPage) > 1) {
    //         setFilter(prev => ({ ...prev, page: (prev.page - 1) }))
    //     }
    // }

    const newArr = (arr: any[], element: any) => {
        if (arr.flatMap(item => item.value).includes(element.value)) {
            return arr.filter((i) => i.value !== element.value)
        } else {
            return [...arr, element]
        }
    }

    const handleFilter = (filed: keyof FilterProductType, value: any) => {
        if (filed === "price") {
            const priceValue = priceRanges.find(item => item.key === value)
            if (priceValue) {
                setFilter(prev => ({ ...prev, price: { key: value, value: [priceValue.min, priceValue.max] } }))
            }
            return
        }
        const newData = isArray(filters[filed]) ? newArr(filters[filed], value) : value
        setFilter(prev => ({ ...prev, [filed]: newData }))
    }

    const handleResetFilter = () => {
        setFilter(initFilter)
    }
    const handleRemoveFilter = (str: string) => {
        const [key, value] = str.split("-")
        if (key === "price") {
            const priceValue = priceRanges.find(item => item.key === value)
            if (priceValue) {
                setFilter(prev => ({ ...prev, price: { key: "", value: [] } }))
            }
            return
        }
        let filed = key as keyof FilterProductType
        const newData = isArray(filters[filed]) ? filters[filed].flatMap(item => item.title).includes(value) ? filters[filed].filter((i) => i.title !== value) : filters[filed] : null
        const check = isArray(filters[filed]) && filters[filed].flatMap(item => item.title).includes(value)
        setFilter(prev => ({ ...prev, [filed]: newData }))
    }
    // useEffect(() => {
    //     setFilter(prev => ({ ...prev, page: currentPage }))
    // }, [productSearch])

    // const isPrevious = currentPage > 1
    // const isNext = currentPage < totalPage
    const disableStyle = "pointer-events-none opacity-40"
    if (!promotionData) return <NotFound content="Chương trình khuyến mãi đã hết hoặc không có chương trình khuyến mãi này chưa diễn ra" />
    return (
        <ContainerLayout isSidebar={false}>
            <Drawer title='Bộ lọc' isOpen={showFilter} onClose={() => setShowFilter(false)} className='!w-fit'>
                <div className=" w-full px-3">
                    <Filter onFilter={handleFilter} categories={categories ?? []} brands={brands ?? []} productType={productTypes ?? []} isFiltered={isFiltered} />
                </div>
            </Drawer>
            <div className="pb-3">
                <Image
                    src={promotionData.thumbnail}
                    alt="carousel-image"
                    className="h-full  max-h-[350px] w-full object-cover rounded-2xl"
                    width={500}
                    height={350}
                />
                <div className="py-10">
                    <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: `${promotionData.title}"`, href: '#' }]} />

                </div>
                <h1 className='text-[25px] font-[700] w-full text-center '>{promotionData.title}</h1>

                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-3 flex-grow items-center">
                            <div className="block md:hidden cursor-pointer" onClick={() => setShowFilter(!showFilter)}>  <FilterIcon /></div>
                            <h1 className='text[18px] font-[700] leading-[28px] uppercase'>Bộ lọc</h1>
                            <div className="flex gap-2 max-w-[500px] overflow-auto no-scrollbar ">
                                {isFiltered.map((item) => (
                                    <Chip title={(item?.split("-")[1] ?? "").toString() ?? ""} trailing={
                                        <div onClick={() => handleRemoveFilter(item as string)}><CloseIcon /></div>
                                    } />
                                ))}
                            </div>
                            {isFiltered.length > 0 && <IconButton onClick={handleResetFilter} className='text-[13px]' title='Xóa bộ lọc' icon={<CloseIcon />} />}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[14px]">
                        {/* <span>{productSearch?.count} Kết quả</span> */}
                        <span>{promotionData?.products.length} Kết quả</span>
                        {/* <span> Lọc theo</span>
                        <select value={filters.sortBy ? filters.sortBy : 'Tất cả'}
                            onChange={(e) => handleFilter("sortBy", e.target.value)}
                            className='py-2 outline-none font-bold w-fit'>
                            <option value={""} >Tất cả</option>
                            <option value={"price"} >Giá thấp đến cao</option>
                            <option value={"-price"}>Giá cao đến thấp</option>
                        </select> */}
                    </div>

                </div>
            </div>
            <div className="w-full h-full py-2">
                <div className="flex gap-2">
                    <div className="hidden md:block">
                        <Filter onFilter={handleFilter} categories={categories ?? []} brands={brands ?? []} productType={productTypes ?? []} isFiltered={isFiltered} />
                    </div>
                    {promotionData?.products.length > 0 ? (
                        <div className="w-full bg-white min-h-[100vh] py-3 rounded-md">
                            <div className="w-full flex justify-between px-3 py-2">

                                {/* {totalPage >= 2 && (
                                    <div className="flex items-center gap-1">
                                        <span>{currentPage}/{totalPage}</span>
                                        <IconButton onClick={() => handlePagination("prev")} className={`bg-white shadow-md ${!isPrevious && disableStyle}`} icon={<ChevronLeftIcon />} />
                                        <IconButton onClick={() => handlePagination("next")} className={`bg-white shadow-md ${!isNext && disableStyle}`} icon={<ChevronRightIcon />} />
                                    </div>
                                )} */}
                            </div>

                            {loadingPromotion ? (
                                <ProductSkeleton length={20} />
                            ) :
                                (<div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-3 gap-2 px-2">
                                    {promotionData.products.map((product: Product) => (
                                        <div key={product.id} className=" flex items-center justify-center w-full h-full">
                                            <Link href={`${DETAIL_PRODUCT_URL}/${product.product_slug}`} className='block w-full h-full'>
                                                <CardProductFull
                                                    key={product.id}
                                                    id={product.id}
                                                    product_brand={product.product_brand}
                                                    product_description={product.product_description}
                                                    product_thumbnail={product.product_thumbnail}
                                                    product_name={product.product_name}
                                                    product_price={product.product_price}
                                                    product_rate={product.product_rate}
                                                    product_discount={promotionData.discount_percent}
                                                />
                                            </Link>
                                        </div>
                                    ))}
                                    {/* Banner */}
                                </div>)}
                            {/* {totalPage >= 2 && (
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
                            )} */}
                        </div>
                    ) : (
                        <div className=" flex w-full h-full min-h-screen items-center justify-center">Rong</div>
                    )}

                </div>
            </div>

        </ContainerLayout>
    );
}


export default PromotionPage;