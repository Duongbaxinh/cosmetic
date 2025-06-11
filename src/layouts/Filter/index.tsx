import FilterOption from '@/components/atoms/FilterOption';
import { priceRanges } from '@/config/data.config';
import { Category, FilterProductType, ParamFilter, BrandType, TypeProductType } from '@/types';


export type FilterType = {
    categories?: Category[]
    brands?: BrandType[],
    productType?: TypeProductType[]
    isFiltered: any[],
    onFilter: (filed: keyof FilterProductType, value: any) => void,
    className?: string
    isStopLoadMoreBrand?: boolean,
    isStopLoadMoreType?: boolean,
    onLoadMoreBrandAndType?: (key: keyof ParamFilter) => void
}


function Filter({ categories, brands, isFiltered, onFilter, className, productType, isStopLoadMoreBrand, isStopLoadMoreType, onLoadMoreBrandAndType }: FilterType) {
    return (
        <div className={`max-w-[250px] min-w-[250px] w-fit rounded-md  text-black ${className && className}`}>


            <div className="">
                <FilterOption title='Danh mục sản phẩm' customTextSelected=' pb-2 text-black !text-[14px] !leading-[21px] !font-[600]' customIcon='px-2' >
                    <div className="max-h-[250px] overflow-auto scrollbar pl-1 space-y-3">
                        {categories && categories.map((category) => (
                            <div
                                key={category.id}
                                className={`cursor-pointer rounded-sm flex space-x-2 group `}>
                                <input id={category.id} checked={isFiltered.includes(`product_category-${category.title}`)} type='checkbox'
                                    onChange={() => onFilter("product_category", { title: category.title, value: category.slug })}
                                    className='min-w-[20px] min-h-[20px] group-hover:scale-[1.1]'
                                />
                                <label htmlFor={category.id} className=" py-2">{category.title}</label>
                            </div>
                        ))
                        }

                    </div>
                </FilterOption >
            </div >


            <div className="py-3 ">
                <FilterOption title='Loại sản phẩm' customTextSelected=' pb-2 text-black !text-[14px] !leading-[21px] !font-[600]' customIcon='px-2'>
                    <div className="max-h-[250px] overflow-auto scrollbar pl-1 ">
                        {productType && productType.map((type) => (
                            <div key={type.id} className={`w-full flex gap-2 items-center group`}>
                                <input id={type.id} checked={isFiltered.includes(`product_type-${type.title}`)} type='checkbox' onChange={() => onFilter("product_type", { title: type.title, value: type.slug })}
                                    className='min-w-[20px] min-h-[20px] group-hover:scale-[1.1]' />
                                <label htmlFor={type.id} className=" py-2 ">{type.title}</label>
                            </div>
                        ))}

                        {!isStopLoadMoreType && (<button className='text-pink-700 text-[12px]' onClick={() => { onLoadMoreBrandAndType ? onLoadMoreBrandAndType('type') : null }}>Xem thêm</button>)}

                    </div>
                </FilterOption>
            </div>
            {/* <div className="py-3 ">
                <FilterOption title='Thương hiệu' customTextSelected=' pb-2 text-black !text-[14px] !leading-[21px] !font-[600]' customIcon='px-2'>
                    <div className="max-h-[250px] overflow-auto scrollbar pl-1 ">
                        {brands && brands.map((brand) => (
                            <div key={brand.id} className={`w-full flex gap-2 items-center group`}>
                                <input id={brand.id} checked={isFiltered.includes(`product_brand-${brand.name}`)} type='checkbox' onChange={() => onFilter("product_brand", { title: brand.name, value: brand.slug })}
                                    className='min-w-[20px] min-h-[20px] group-hover:scale-[1.1]' />
                                <label htmlFor={brand.id} className=" py-2 text-[12px] font-[500] leading-[18px] cursor-pointer uppercase ">{brand.name}</label>
                            </div>
                        ))}
                        {!isStopLoadMoreBrand && (<button className='text-pink-700 text-[12px]' onClick={() => { onLoadMoreBrandAndType ? onLoadMoreBrandAndType('brand') : null }}>Xem thêm</button>)}
                    </div>

                </FilterOption>
            </div> */}

            <div className="py-3 ">
                <div className="pb-2 text-[14px]  leading-[21px] font-[600]  ">Thương hiệu</div>
                {brands && brands.map((vendor) => (
                    <div key={vendor.slug} className={`w-full flex gap-2 items-center group pl-1`}>
                        <input id={vendor.slug} checked={isFiltered.includes(`vendor-${vendor.name}`)} type='radio' name="vendor" onChange={() => onFilter("vendor", { key: vendor.name, value: vendor.slug })}
                            className='min-w-[20px] min-h-[20px] group-hover:scale-[1.1]' />
                        <label htmlFor={vendor.slug} className=" py-2 text-[12px] font-[500] leading-[18px] cursor-pointer uppercase ">{vendor.name}</label>
                    </div>
                ))}
            </div>


            <div className="py-3 ">
                <div className="pb-2 text-[14px]  leading-[21px] font-[600]  ">Giá sản phẩm</div>
                {priceRanges && priceRanges.map((price) => (
                    <div key={price.key} className={`w-full flex gap-2 items-center group pl-1`}>
                        <input id={price.key} checked={isFiltered.includes(`price-${price.label}`)} type='radio' name="price" onChange={() => onFilter("price", price.key)}
                            className='min-w-[20px] min-h-[20px] group-hover:scale-[1.1]' />
                        <label htmlFor={price.key} className=" py-2 text-[12px] font-[500] leading-[18px] cursor-pointer uppercase ">{price.label}</label>
                    </div>
                ))}
            </div>


            {/* <div className="py-3">
                <div className="pb-2 text-[14px]  leading-[21px] font-[600] ">Đánh giá</div>
                <div className="flex flex-col-reverse">
                    {Array.from({ length: 5 }).map((_, i) => {
                        const starCount = i + 1;
                        return (
                            <GroupStart
                                className={`${isFiltered.includes(`rate_${starCount}`) && "bg-gray-300"} p-2 rounded-sm`}
                                onClick={() => onFilter("rate", starCount)}
                                starActive={starCount}
                                label={starCount.toString()} />
                        );
                    })}
                </div>

            </div> */}


        </div >
    );
}

export default Filter;