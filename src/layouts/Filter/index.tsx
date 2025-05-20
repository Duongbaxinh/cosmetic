import StarIcon from '@/assets/icons/Star';
import FilterOption from '@/components/atoms/FilterOption';
import Input, { typeInput } from '@/components/atoms/Input';
import GroupStart from '@/components/organisms/GroupStart';
import { Brand, CategoryFilter, FilterProductType } from '@/types';
import React, { useState } from 'react';

type PriceFilterType = {
    min_price: number,
    max_price: number
}
export type FilterType = {
    categories?: CategoryFilter[]
    brands?: Brand[],
    isFiltered: any[],
    onFilter: (filed: keyof FilterProductType, value: any) => void,
    className?: string
}


function Filter({ categories, brands, isFiltered, onFilter, className }: FilterType) {
    const [values, setValues] = useState<PriceFilterType>({
        min_price: 0,
        max_price: 0
    })
    const isApply: boolean =
        typeof values.min_price === "number" &&
        typeof values.max_price === "number" &&
        values.min_price >= 0 &&
        values.max_price > values.min_price;
    const handleChangeProduct = (filed: keyof PriceFilterType, value: number) => {
        if (value < 0) return
        setValues(prev => ({ ...prev, [filed]: value }))
    }

    const handleApply = () => {
        if (isApply) {
            return onFilter("price", [values.min_price, values.max_price])
        }
    }
    return (
        <div className={`w-[240px] min-[240px] px-3 rounded-md hidden md:block ${className}`}>
            {categories && (
                <>
                    <div className="">
                        <FilterOption title='Khám phá theo danh mục' customTextSelected=' pb-2 text-gray-500 !text-[14px] !leading-[21px] !font-[600]' customIcon='px-2' >
                            <div
                                onClick={() => onFilter("category", "")}
                                className={`py-3 text-[12px] font-[500] leading-[18px]  ${isFiltered.includes("category") && "bg-gray-300"} hover:bg-gray-300 rounded-sm`}>
                                <p className='px-5'>Tất cả danh mục</p>
                            </div>
                            {categories && categories.map((category) => (
                                <div
                                    key={category.key}
                                    onClick={() => onFilter("category", category.key)}
                                    className={`cursor-pointer py-3 text-[12px] font-[500] leading-[18px] ${isFiltered.includes(category.key) && "bg-gray-300"} hover:bg-gray-300 rounded-sm `}>
                                    <p className='px-5'>{category.title}</p>
                                </div>
                            ))
                            }
                        </FilterOption >
                    </div >
                    <hr /></>
            )}

            <div className="py-3">
                <div className="pb-2 text-[14px] text-gray-500 leading-[21px] font-[600] ">Thương hiệu</div>
                {brands && brands.map((brand) => (
                    <div key={brand.id} className={`w-full flex gap-2 items-center`}>
                        <input id={brand.id} checked={isFiltered.includes(brand.id)} type='checkbox' onChange={() => onFilter("brand", brand.id)} />
                        <label htmlFor={brand.id} className=" py-2 text-[12px] font-[500] leading-[18px] cursor-pointer ">{brand.name}</label>
                    </div>
                ))}
            </div>
            <hr />
            <div className="py-3">
                <div className="pb-2 text-[14px] text-gray-500 leading-[21px] font-[600] ">Khoảng giá</div>
                <div className="flex gap-3 items-center">
                    <Input type={typeInput.NUMBER} placeholder='Từ' value={values.min_price} onChange={(e) => handleChangeProduct("min_price", Number(e.target.value))} />
                    -
                    <Input type={typeInput.NUMBER} placeholder='Đến' value={values.max_price} onChange={(e) => handleChangeProduct("max_price", Number(e.target.value))} />
                </div>
                <button
                    disabled={!isApply}
                    onClick={handleApply}
                    className="mt-5 w-full bg-red-400 p-1 rounded-sm text-white cursor-pointer disabled:bg-gray-400 disabled:opacity-50"
                >
                    Áp dụng
                </button>
            </div>
            <hr />
            <div className="py-3">
                <div className="pb-2 text-[14px] text-gray-500 leading-[21px] font-[600] ">Đánh giá</div>
                <div className="flex flex-col-reverse">
                    {Array.from({ length: 5 }).map((_, i) => {
                        const starCount = i + 1;
                        return (
                            <GroupStart
                                className={`${isFiltered.includes(starCount) && "bg-gray-300"} p-2 rounded-sm`}
                                onClick={() => onFilter("rate", starCount)}
                                starActive={starCount}
                                label={starCount.toString()} />
                        );
                    })}
                </div>

            </div>


        </div >
    );
}

export default Filter;