"use client"
import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons';
import CloseIcon from '@/assets/icons/CloseIcon';
import FilterIcon from '@/assets/icons/FilterIcon';
import Breadcrumb from '@/components/atoms/Breadcrumb';
import Carousel from '@/components/atoms/Carousel';
import Chip from '@/components/atoms/Chip';
import IconButton from '@/components/atoms/IconButton';
import { ProductSkeleton } from '@/components/atoms/ProductSkeleton';
import CardProductFull from '@/components/molecules/CardProductFull';
import Drawer from '@/components/molecules/Drawer';
import NotFound from '@/components/molecules/NotFound';
import { priceRanges } from '@/config/data.config';
import { categories as example } from '@/fakes';
import ContainerLayout from '@/layouts/ContainerLayout';
import Filter from '@/layouts/Filter';
import { useGetBrandsQuery } from '@/redux/slices/brand.slice';
import { useGetAllCategoryQuery } from '@/redux/slices/category.slice';
import { useGetProductFilterQuery } from '@/redux/slices/product.slice';
import { DETAIL_PRODUCT_URL } from '@/routers';
import { FilterProductType } from '@/types';
import { cleanFilter, toQueryString } from '@/utils';
import { isArray } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { SwiperSlide } from 'swiper/react';


function CategoryPage({ category_key, value }: { category_key: string, value: string }) {
    const initFilter: FilterProductType = {
        limitnumber: 30,
        page: 1,
        brand: [],
        product_type: [],
        price: { key: "", value: [] },
        rate: null,
        sortPrice: "",
        order: 'asc',
        sortBy: ''
    }
    const [filters, setFilter] = useState<FilterProductType>(initFilter)
    const [showFilter, setShowFilter] = useState<boolean>(false)

    const { data: products, isLoading: loadingProduct, error: errorProduct } = useGetProductFilterQuery({ ...cleanFilter(filters), [category_key]: value })
    const { data: categories, isLoading, error } = useGetAllCategoryQuery(category_key)
    const { data: brands, isLoading: loadingBrand, error: errorBrand } = useGetBrandsQuery()


    const totalPage = products ? Math.ceil(products.count / products.limitnumber) : 1
    const currentPage = Math.min(filters.page, Math.max(1, products?.number_page ?? 1))
    const productsDisplay = products?.results ?? []

    const isFiltered = [
        ...(filters.product_type?.map(item => `type_${item.title}`) || []),
        filters.price?.value && filters.price.value.length > 0 ? "price_" + filters.price?.key || null : null,
        filters.rate !== null ? "rate_" + filters.rate || null : null,
        filters.sortBy !== "" ? filters.sortBy || null : null,
        ...(filters.brand?.map(item => `brand_${item.title}`) || [])
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
        const [key, value] = str.split("_")
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
    useEffect(() => {
        setFilter(prev => ({ ...prev, page: currentPage }))
    }, [products])

    const isPrevious = currentPage > 1
    const isNext = currentPage < totalPage
    const disableStyle = "pointer-events-none opacity-40"
    return (
        <ContainerLayout isSidebar={false}>
            <Drawer title='Bộ lọc' isOpen={showFilter} onClose={() => setShowFilter(false)} className='!w-fit'>
                <div className=" w-full px-3">
                    <Filter onFilter={handleFilter} categories={categories ?? []} brands={brands ?? []} isFiltered={isFiltered} />
                </div>
            </Drawer>
            <div className="w-full h-full py-5 space-y-5">
                <Carousel slidesPerView={1} clickable className='!h-fit'>
                    {example.map(({ id, product_thumbnail }) => (
                        <SwiperSlide key={id}>
                            <Link href={`/category/${id}`}>
                                <Image
                                    src={product_thumbnail}
                                    alt="carousel-image"
                                    className="h-full  max-h-[350px] w-full object-cover rounded-2xl"
                                    width={500}
                                    height={350}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}

                </Carousel>
                <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: category_key, href: "#" }]} />
                <h1 className='text[25px] font-[700] leading-[25px] uppercase'>{category_key} {value}</h1>
                <div className="flex items-center justify-between">
                    <div className="flex gap-3 flex-grow items-center">
                        <div className="block md:hidden cursor-pointer" onClick={() => setShowFilter(!showFilter)}>  <FilterIcon /></div>

                        <h1 className='text[18px] font-[700] leading-[28px] uppercase'>Bộ lọc</h1>
                        <div className="flex gap-2 max-w-[500px] overflow-auto no-scrollbar ">
                            {isFiltered.map((item) => (
                                <Chip title={item?.toString() ?? ""} trailing={
                                    <div onClick={() => handleRemoveFilter(item as string)}><CloseIcon /></div>
                                } />
                            ))}
                        </div>
                        {isFiltered.length > 0 && <IconButton onClick={handleResetFilter} className='text-[13px]' title='Xóa bộ lọc' icon={<CloseIcon />} />}
                    </div>
                    <div className="flex items-center gap-2 text-[14px]">
                        <span>{products?.count} Kết quả</span>
                        <span> Lọc theo</span>
                        <select value={filters.sortPrice}
                            onChange={(e) => handleFilter("sortPrice", e.target.value)}
                            className='py-2 outline-none font-bold w-fit'>
                            <option value={""} >Tất cả</option>
                            <option value={"asc"} >Giá thấp đến cao</option>
                            <option value={"desc"}>Giá cao đến thấp</option>
                        </select>
                    </div>

                </div>
                <div className="flex gap-2">
                    <div className="hidden md:block">
                        <Filter onFilter={handleFilter} categories={categories ?? []} brands={brands ?? []} isFiltered={isFiltered} />
                    </div>
                    <div className="w-full bg-white min-h-[100vh] py-3 rounded-md">
                        <div className="w-full flex justify-between px-3 py-2">
                            {totalPage >= 2 && (
                                <div className="flex items-center gap-1">
                                    <span>{currentPage}/{totalPage}</span>
                                    <IconButton onClick={() => handlePagination("prev")} className={`bg-white shadow-md ${!isPrevious && disableStyle}`} icon={<ChevronLeftIcon />} />
                                    <IconButton onClick={() => handlePagination("next")} className={`bg-white shadow-md ${!isNext && disableStyle}`} icon={<ChevronRightIcon />} />
                                </div>
                            )}
                        </div>

                        {loadingProduct ? (
                            <ProductSkeleton length={20} />
                        ) :
                            productsDisplay.length > 0 ? (
                                <div className="grid grid-cols-2 grid-rows-auto md:grid-cols-2 lg:grid-cols-3 gap-2 px-2">
                                    {productsDisplay.map((product) => (
                                        <div key={product.id} className=" flex items-center justify-center w-full h-full ">
                                            <Link href={`${DETAIL_PRODUCT_URL}/${product.id}`} className='block shadow w-full h-full '>
                                                <CardProductFull
                                                    product_brand={product.product_brand}
                                                    product_description={product.product_description}
                                                    key={product.id}
                                                    className='min-h-[330px]'
                                                    id={product.id}
                                                    product_thumbnail={product.product_thumbnail}
                                                    product_name={product.product_name}
                                                    product_price={product.product_price}
                                                    product_rate={product.product_rate}
                                                />
                                            </Link>
                                        </div>
                                    ))}
                                    {/* Banner */}
                                </div>
                            ) : (
                                <NotFound content='Không tìm thấy sản phẩm nào phù hợp'
                                    onFc={handleResetFilter}
                                    labelButton='Xóa lọc' />
                            )}
                        {totalPage > 1 && (
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
                        )}
                    </div>

                </div>
            </div>

        </ContainerLayout >
    );
}

// const FilterComponent = () => (<div className="hidden  space-x-2 text-[14px] leading-[17px] md:flex flex-nowrap items-center">
//     <span className="">Sắp xếp theo </span>
//     {/* <button className='bg-gray-200 px-3 py-2'>Phổ biến</button> */}
//     <button className='bg-gray-200 px-3 py-2'>Mới nhất</button>
//     <button onClick={() => handleFilter("sortBy", "product_sold")} className={`bg-gray-200 px-3 py-2 ${isFiltered.includes("product_sold") && "bg-red-400 text-white"}`}>Bán chạy</button>
//     <select value={filters.sortPrice} onChange={(e) => handleFilter("sortPrice", e.target.value)} className='px-3 py-2 outline-none bg-gray-200'>
//         <option value={""} >Giá</option>
//         <option value={"asc"} >Giá thấp đến cao</option>
//         <option value={"desc"}>Giá cao đến thấp</option>
//     </select>
// </div>)

export default CategoryPage;