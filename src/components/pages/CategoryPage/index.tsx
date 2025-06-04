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
import ContainerLayout from '@/layouts/ContainerLayout';
import Filter from '@/layouts/Filter';
import { useGetBrandsQuery } from '@/redux/slices/brand.slice';
import { useGetAllCategoryQuery } from '@/redux/slices/category.slice';
import { useGetProductFilterQuery } from '@/redux/slices/product.slice';
import { useGetAllTypeQuery } from '@/redux/slices/typeproduct.slice';
import { DETAIL_PRODUCT_URL } from '@/routers';
import { FilterProductType } from '@/types';
import { cleanFilter } from '@/utils';
import { isArray } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { SwiperSlide } from 'swiper/react';

const labelCategory = {
    top_sales: "Sản phẩm bán chạy",
    product_discount: "Sản phẩm giảm giá",
    product_international: "Hàng ngoại giá tốt",
    new_products: "Sản phẩm mới",
    product_brand: "Thương hiệu nổi bật"
}

function CategoryPage({ category_key, value }: { category_key: string, value: string }) {
    const initFilter: FilterProductType = {
        limitnumber: 10,
        page: 1,
        product_brand: [],
        product_category: [],
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
    const { data: categories, isLoading, error } = useGetAllCategoryQuery()
    const { data: productTypes, isLoading: isLoadingTypes, error: errorTypes } = useGetAllTypeQuery()
    const { data: brands, isLoading: loadingBrand, error: errorBrand } = useGetBrandsQuery()


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
        setFilter(initFilter)
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
    }, [products])

    const totalPage = products ? Math.ceil(products.count / filters.limitnumber) : 1
    const currentPage = Math.min(filters.page, Math.max(1, products?.page ?? 1))
    const productsDisplay = products?.results ?? []
    const isPrevious = currentPage > 1
    const isNext = currentPage < totalPage
    const banner = category_key === "product_brand" ? brands?.find(brand => brand.slug === value)?.image : ""

    const isFiltered = [
        ...(filters.product_type?.map(item => `product_type-${item.title}`) || []),
        filters.price?.value && filters.price.value.length > 0 ? "price-" + filters.price?.key || null : null,
        filters.rate !== null ? "rate-" + filters.rate || null : null,
        ...(filters.product_category?.map(item => `product_category-${item.title}`) || []),
        ...(filters.product_brand?.map(item => `product_brand-${item.title}`) || [])
    ].filter(Boolean);


    return (
        <ContainerLayout isSidebar={false}>
            <Drawer title='Bộ lọc' isOpen={showFilter} onClose={() => setShowFilter(false)} className='!w-fit'>
                <div className=" w-full px-3">
                    <Filter onFilter={handleFilter} categories={categories ?? []} brands={brands ?? []} productType={productTypes ?? []} isFiltered={isFiltered} />
                </div>
            </Drawer>
            <div className="w-full h-full py-5 space-y-5">
                {banner ? (
                    <Image
                        src={banner ?? ""}
                        alt="carousel-image"
                        className="h-full  max-h-[350px] w-full object-cover rounded-2xl"
                        width={500}
                        height={350}
                    />
                ) : (
                    <Carousel slidesPerView={1} clickable className='!h-fit'>
                        {brands && brands.map(({ id, slug, image }) => (
                            <SwiperSlide key={id}>
                                <Link href={`/category/product_brand/${slug}`}>
                                    <Image
                                        src={image}
                                        alt="carousel-image"
                                        className="h-full  max-h-[350px] w-full object-cover rounded-2xl"
                                        width={500}
                                        height={350}
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}

                    </Carousel>
                )}
                <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: category_key, href: "#" }]} />
                <h1 className='text[25px] font-[700] leading-[25px] uppercase'>{labelCategory[category_key as keyof typeof labelCategory]}</h1>
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
                    <div className="flex items-center gap-2 text-[14px]">
                        <span>{products?.count} Kết quả</span>
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

                <div className="flex gap-2">
                    <div className="hidden md:block">
                        <Filter onFilter={handleFilter} productType={productTypes ?? []} categories={categories ?? []} brands={brands ?? []} isFiltered={isFiltered} />
                    </div>
                    <div className="w-full bg-white min-h-[100vh] py-3 rounded-md">
                        {loadingProduct ? (
                            <ProductSkeleton length={20} />
                        ) :
                            productsDisplay.length > 0 ? (
                                <div className="grid grid-cols-2 grid-rows-auto md:grid-cols-2 lg:grid-cols-3 gap-2 px-2">
                                    {productsDisplay.map((product) => (
                                        <div key={product.id} className=" flex items-center justify-center w-full h-full ">
                                            <Link href={`${DETAIL_PRODUCT_URL}/${product.product_slug}`} className='block shadow w-full h-full '>
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
                                    className='flex gap-4 items-center justify-center cursor-pointer '
                                    breakLabel="..."

                                    nextLabel={<button disabled={!isNext} className='disabled:hidden cursor-pointer'>
                                        <ChevronRightIcon />
                                    </button>}
                                    activeClassName='bg-gray-300 min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px] flex items-center justify-center rounded-sm'
                                    pageRangeDisplayed={products?.page}
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

                </div>
            </div>

        </ContainerLayout >
    );
}



export default CategoryPage;