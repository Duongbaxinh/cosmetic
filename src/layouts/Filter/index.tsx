import FilterOption from '@/components/atoms/FilterOption';
import GroupStart from '@/components/organisms/GroupStart';
import { priceRanges } from '@/config/data.config';
import { Brand, CategoryFilter, FilterProductType } from '@/types';


export type FilterType = {
    categories?: CategoryFilter[]
    brands?: Brand[],
    isFiltered: any[],
    onFilter: (filed: keyof FilterProductType, value: any) => void,
    className?: string
}


function Filter({ categories, brands, isFiltered, onFilter, className }: FilterType) {

    return (
        <div className={`max-w-[250px] min-w-[250px] w-fit rounded-md  text-black ${className && className}`}>
            {categories && (
                <>
                    <div className="">
                        <FilterOption title='Loại sản phẩm' customTextSelected=' pb-2 text-black !text-[14px] !leading-[21px] !font-[600]' customIcon='px-2' >
                            <div className="max-h-[250px] overflow-auto no-scrollbar shadow">
                                {categories && categories.map((category) => (
                                    <div
                                        key={category.key}
                                        onClick={() => onFilter("product_type", category.key)}
                                        className={`cursor-pointer p-2 text-[12px] font-[500] leading-[18px] rounded-sm flex `}>
                                        <input id={category.key} checked={isFiltered.includes(`type_${category.title}`)} type='checkbox' onChange={() => onFilter("product_type", { title: category.title, value: category.key })}
                                            className='min-w-[20px] min-h-[20px]'
                                        />
                                        <p className='px-2'>{category.title}</p>
                                    </div>
                                ))
                                }
                            </div>
                        </FilterOption >
                    </div >
                </>
            )}

            <div className="py-3 ">
                <FilterOption title='Thương hiệu' customTextSelected=' pb-2 text-black !text-[14px] !leading-[21px] !font-[600]' customIcon='px-2'>
                    <div className="max-h-[250px] overflow-auto no-scrollbar shadow">
                        {brands && brands.map((brand) => (
                            <div key={brand.id} className={`w-full flex gap-2 items-center`}>
                                <input id={brand.id} checked={isFiltered.includes(`brand_${brand.title}`)} type='checkbox' onChange={() => onFilter("brand", { title: brand.title, value: brand.id })}
                                    className='min-w-[20px] min-h-[20px]' />
                                <label htmlFor={brand.id} className=" py-2 text-[12px] font-[500] leading-[18px] cursor-pointer uppercase ">{brand.title}</label>
                            </div>
                        ))}
                    </div>
                </FilterOption>
            </div>

            <div className="py-3 ">
                <div className="pb-2 text-[14px]  leading-[21px] font-[600] ">Giá sản phẩm</div>
                {priceRanges && priceRanges.map((price) => (
                    <div key={price.key} className={`w-full flex gap-2 items-center`}>
                        <input id={price.key} checked={isFiltered.includes(`price_${price.key}`)} type='radio' name="price" onChange={() => onFilter("price", price.key)}
                            className='min-w-[20px] min-h-[20px]' />
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