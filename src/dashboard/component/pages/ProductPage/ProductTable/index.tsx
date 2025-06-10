"use client";

import Image from "next/image";
import { SetStateAction, useState } from "react";
import DetailItem from "./ProductDetail";
import { ProductSelected } from "..";
import { Product } from "@/types";
import Price from "@/components/atoms/Price";

export interface TableProps {
    isDetail: boolean;
    setIsDetail: React.Dispatch<SetStateAction<boolean>>;
    className?: string;
    productSelected?: ProductSelected[];
    productLabels: any[];
    body: Product[];
    onSelect: (
        status: "add" | "delete" | "all" | "clean",
        product: Product
    ) => void;
}

const ProductTable: React.FC<TableProps> = ({
    isDetail,
    setIsDetail,
    className,
    body,
    onSelect,
    productSelected,
    productLabels
}) => {
    const [detailItem, setDetailItem] = useState<string>('')
    const toggleDetailItem = (id: string) => {
        if (id === "") {
            setIsDetail(false)
            setDetailItem(id)
        }
        if (id === detailItem) {
            setIsDetail(!isDetail)
        } else {
            setIsDetail(true)
            setDetailItem(id)
        }
    };

    const handleSelectProduct = ({ e, product, status }: { e: any, product: Product, status: "add" | "delete" | "all" | "clean" }) => {
        e.stopPropagation();

        onSelect(status, product)
    }
    const tBody = (product: Product, key: keyof Product) => {
        if (key === 'product_thumbnail') {
            const imageUrl = product[key];
            const isValidImage = typeof imageUrl === 'string' && imageUrl.startsWith('http');

            return (
                <Image
                    src={isValidImage ? imageUrl : "/fallback-image.jpg"}
                    alt="lll"
                    width={80}
                    height={80}
                    className="rounded-md"
                />
            );
        }
        if (key === 'product_price') {
            return (<Price product_price={product[key]} />)
        }
        if (key === "product_promotion" || key === "product_type") {
            return (<p>{product[key]?.title ?? "-"}</p>)
        }
        if (key === "product_images") {
            return
        }
        if (key === "product_brand") {
            return (<p>{product[key]?.name ?? "-"}</p>)
        }
        if (key === "product_vendor") {
            return (<p>{product[key].name ?? "-"}</p>)
        }
        if (key === "reviews") {
            return
        }
        return (<p>{product[key] ?? "-"}</p>)
    }
    const isItemDetailSelected = (productId: number | string) => {
        return productId === detailItem
    }
    return (
        <div
            className={` bg-white text-text text-[13px] leading-[29px]  ${className}`}>
            <table className=" min-w-full divide-y divide-gray-200">
                <thead
                    className={`bg-purple-100 ${!isDetail ? " sticky top-0" : ""} px-3 left-0 z-10`}>
                    <tr className="px-3" >
                        <th className="px-4 py-0 text-left text-xs font-medium text-purple-800 uppercase tracking-wider ">
                            <input
                                checked={productSelected?.length === body.length}
                                type="checkbox"
                                onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                                    handleSelectProduct({
                                        e,
                                        status: (e.target as HTMLInputElement).checked ? "all" : "clean",
                                        product: body[0]
                                    })
                                }
                            />
                        </th>
                        {productLabels.map((col: any) => (
                            <th
                                key={col.key}
                                className="pl-4 text-left whitespace-nowrap w-full py-4 ">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {body.map((row: Product, index: number) => (
                        <>
                            {(row.id !== detailItem) &&
                                <tr
                                    key={index}
                                    className={`bg-white hover:bg-pink-100 ${isDetail &&
                                        isItemDetailSelected(row.id ?? "") &&
                                        "font-bold bg-pink-400 hover:bg-pink-400"
                                        } `}
                                    onClick={() => toggleDetailItem(row.id ?? "")}>

                                    <td className="py-2 px-3">
                                        <input
                                            checked={productSelected?.flatMap((product) => product.id).includes(row.id)}
                                            type="checkbox"
                                            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                                                handleSelectProduct({
                                                    e,
                                                    status: (e.target as HTMLInputElement).checked ? "add" : "delete",
                                                    product: row
                                                })
                                            }
                                        />
                                    </td>

                                    {productLabels.map(
                                        (col: { key: keyof Product, label: any }, index) => (
                                            <td
                                                key={index}
                                                className="pl-4 py-[12px] w-full whitespace-nowrap text-left">
                                                {tBody(row, col.key)}
                                            </td>
                                        )
                                    )}
                                </tr >
                            }

                            {detailItem === row.id && isDetail && (
                                <tr key={row.id} >
                                    <td colSpan={Object.keys(row).length}>
                                        <DetailItem setDetailItem={setDetailItem} setIsDetail={setIsDetail} product={row} />
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default ProductTable;
