"use client"
import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons';
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
import { initFilterProduct } from '@/consts/data';
import { useData } from '@/contexts/data.context';
import ContainerLayout from '@/layouts/ContainerLayout';
import Filter from '@/layouts/Filter';
import { useGetAllCategoryQuery } from '@/redux/slices/category.slice';
import { useGetProductFilterQuery } from '@/redux/slices/product.slice';
import { DETAIL_PRODUCT_URL } from '@/routers';
import { BrandType, FilterProductType, ParamFilter, TypeProductType } from '@/types';
import { calculateDiscount, cleanFilter } from '@/utils';
import { isArray } from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

function SearchPage({ text_search }: { text_search: string }) {
    const { brands, productTypes, setParams, params } = useData()
    const [brandData, setBrandData] = useState<BrandType[]>([])
    const [typeData, setTypeData] = useState<TypeProductType[]>([])
    const [filters, setFilter] = useState<FilterProductType>(initFilterProduct)
    const [showFilter, setShowFilter] = useState<boolean>(false)

    // Lấy dữ liệu sản phẩm và category
    const { data: productSearch, isLoading: loadingSearch } = useGetProductFilterQuery({ ...cleanFilter(filters), textSearch: text_search })
    const { data: categories } = useGetAllCategoryQuery()


    useEffect(() => {
        if (brands && brands.results) {
            setBrandData(brands.results)
        }
        if (productTypes && productTypes.results) {
            setTypeData(productTypes.results)
        }
    }, [brands, productTypes])

    // Tạo ra một mảng những thuộc tính được chọn để lọc sản phẩm
    const isFiltered = [
        ...(filters.product_type?.map(item => `product_type-${item.title}`) || []),
        filters.price?.value && filters.price.value.length > 0 ? "price-" + filters.price?.key || null : null,
        filters.rate !== null ? "rate-" + filters.rate || null : null,
        filters.vendor?.key !== "" ? "vendor-" + filters.vendor?.key || null : null,
        ...(filters.product_category?.map(item => `product_category-${item.title}`) || []),
        ...(filters.product_brand?.map(item => `product_brand-${item.title}`) || [])
    ].filter(Boolean);

    const handlePagination = (type: "next" | "prev") => {
        if (type === 'next' && currentPage < totalPage) {
            setFilter(prev => ({ ...prev, page: (prev.page + 1) }))
        }
        if (type === "prev" && Math.max(1, currentPage) > 1) {
            setFilter(prev => ({ ...prev, page: (prev.page - 1) }))
        }
    }

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
                setFilter(prev => ({ ...prev, price: { key: priceValue.label, value: [priceValue.min, priceValue.max] } }))
            }
            return
        }
        const newData = isArray(filters[filed]) ? newArr(filters[filed], value) : value
        setFilter(prev => ({ ...prev, [filed]: newData }))
    }

    const handleResetFilter = () => {
        setFilter(initFilterProduct)
    }
    const handleRemoveFilter = (str: string) => {
        const [key, value] = str.split("-")
        if (key === "price") {
            const priceValue = priceRanges.find(item => item.label === value)
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
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setFilter(prev => ({ ...prev, page: currentPage }))
    }, [productSearch])

    const handleLoadMoreBrandAndType = (key: keyof ParamFilter) => {
        setParams({
            ...params,
            [key]: {
                ...params[key],
                limitnumber: params[key].limitnumber + 5
            }
        });
    }

    const isStopLoadMoreType = productTypes?.count === params.type.limitnumber
    const isStopLoadMoreBrand = brands?.count === params.brand.limitnumber

    const totalPage = productSearch ? Math.ceil(productSearch.count / filters.limitnumber) : 1
    const currentPage = Math.min(filters.page, Math.max(1, productSearch?.page ?? 1))
    const productsDisplay = productSearch?.results ?? []
    const isPrevious = currentPage > 1
    const isNext = currentPage < totalPage
    const disableStyle = "pointer-events-none opacity-40"
    return (
        <ContainerLayout isSidebar={false}>
            <Drawer title='Bộ lọc' isOpen={showFilter} onClose={() => setShowFilter(false)} className='!w-fit'>
                <div className=" w-full px-3">
                    <Filter isStopLoadMoreBrand={isStopLoadMoreBrand}
                        isStopLoadMoreType={isStopLoadMoreType}
                        onFilter={handleFilter}
                        categories={categories ?? []}
                        brands={brandData ?? []}
                        productType={typeData ?? []}
                        onLoadMoreBrandAndType={handleLoadMoreBrandAndType}
                        isFiltered={isFiltered} />
                </div>
            </Drawer>
            <div className="pb-3">
                <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: `Kết quả tìm kiếm "${text_search}"`, href: '#' }]} />
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
                        <span>{productSearch?.count} Kết quả</span>
                        <span> Lọc theo</span>
                        <select value={filters.sortBy ? filters.sortBy : 'Tất cả'}
                            onChange={(e) => handleFilter("sortBy", e.target.value)}
                            className='py-2 outline-none font-bold w-fit'>
                            <option value={""} >Tất cả</option>
                            <option value={"price"} >Giá thấp đến cao</option>
                            <option value={"-price"}>Giá cao đến thấp</option>
                        </select>
                    </div>

                </div>
            </div>
            <div className="w-full h-full py-2">
                <div className="flex gap-2">
                    <div className="hidden md:block">
                        <Filter isStopLoadMoreBrand={isStopLoadMoreBrand}
                            isStopLoadMoreType={isStopLoadMoreType}
                            onFilter={handleFilter}
                            categories={categories ?? []}
                            brands={brandData ?? []}
                            productType={typeData ?? []}
                            onLoadMoreBrandAndType={handleLoadMoreBrandAndType}
                            isFiltered={isFiltered} />
                    </div>
                    {productsDisplay.length > 0 ? (
                        <div className="w-full bg-white min-h-[100vh] py-3 rounded-md">

                            {loadingSearch ? (
                                <ProductSkeleton length={20} />
                            ) :
                                (<div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-3 gap-2 px-2">
                                    {productsDisplay.map((product) => (
                                        <div key={product.id} className=" flex items-center justify-center w-full h-full">
                                            <Link href={`${DETAIL_PRODUCT_URL}/${product.product_slug}`} className='block w-full h-full'>
                                                <CardProductFull
                                                    key={product.id}
                                                    id={product.id}
                                                    product_discount={calculateDiscount(product)}
                                                    product_thumbnail={product.product_thumbnail}
                                                    product_thumbnail_2={product.product_images ? product.product_images[1]?.image_url : ""}
                                                    product_name={product.product_name}
                                                    product_price={product.product_price}
                                                    product_rate={product.product_rate}
                                                    product_brand={product.product_vendor.name}
                                                    product_description={product.product_description}
                                                />
                                            </Link>
                                        </div>
                                    ))}
                                    {/* Banner */}
                                </div>)}
                            {totalPage > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-4 pt-[30px]">
                                    <ReactPaginate
                                        className='flex gap-4 items-center justify-center cursor-pointer '
                                        breakLabel="..."

                                        nextLabel={<button disabled={!isNext} className='disabled:hidden cursor-pointer'>
                                            <ChevronRightIcon />
                                        </button>}
                                        activeClassName='bg-gray-300 min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px] flex items-center justify-center rounded-sm'
                                        pageRangeDisplayed={productSearch?.page}
                                        initialPage={currentPage - 1}
                                        onPageChange={(selectedItem) => {
                                            handleFilter("page", selectedItem.selected + 1);
                                        }}
                                        pageCount={totalPage}
                                        previousLabel={<button disabled={!isPrevious} className='disabled:hidden cursor-pointer'>
                                            <ChevronLeftIcon />
                                        </button>}
                                        renderOnZeroPageCount={null}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <NotFound content='Hiện tại sản phẩm mà bạn đang tìm kiếm không có trong danh sách sản phẩm của chúng tôi' />
                    )}

                </div>
            </div>

        </ContainerLayout>
    );
}


export default SearchPage;