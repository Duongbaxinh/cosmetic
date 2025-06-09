
import IconButton from "@/components/atoms/IconButton";
import { useData } from "@/contexts/data.context";
import { useDeleteProductMutation } from "@/redux/slices/manage/manageproduct.api";
import { UPDATE_PRODUCT_URL } from "@/routers";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";
type StockLimit = {
    min: number;
    max: number;
};

type ProductInfo = {
    productCode: string;
    barcode: string;
    category: string;
    type: string;
    brand: string;
    stockLimit: any;
    price: number;
    costPrice: number;
    weight: string;
    location: string;
};


function DetailItem({ product, setIsDetail, setDetailItem }: {
    product: Product,
    setIsDetail: Dispatch<SetStateAction<boolean>>,
    setDetailItem: Dispatch<SetStateAction<string>>,
}) {
    const [imageDisplay, setImageDisplay] = useState("")
    const { refetch } = useData()
    const [deleteProduct, { isLoading: isDeleteProduct, error: errorDeleteProduct }] = useDeleteProductMutation()
    const handleImageDisplay = (image: string) => {
        setImageDisplay(image);
    };
    const handleDeleteProduct = async (slug: string) => {
        try {
            if (!slug) return toast.error("Đã có lỗi xảy ra")
            await deleteProduct(slug).unwrap()
            await refetch()
            toast.success("Sản phẩm đã được xóa")
        } catch (error) {
            toast.error("ddax co loi xay ra")

        }
    }
    const setClose = () => {
        setIsDetail(false)
        setDetailItem("")
    }
    if (!product) return <h1>Loading</h1>;
    return (
        <div className="relative px-2 py-2 w-full  lg:h-full   border border-blue-300 overflow-hidden rounded-md ">
            <IconButton className="absolute right-0 top-0 !bg-transparent hover:!bg-transparent text-black" icon={<IoCloseCircle className="text-black w-[20px] " />} onClick={setClose} />
            <div className="w-full space-y-5 h-fit mb-[60px] ">
                <div className="grid grid-cols-8 gap-4 w-full  ">
                    <div className="pt-2 col-span-3  ">
                        <Image
                            src={(imageDisplay && imageDisplay.startsWith('http') ? imageDisplay : product.product_thumbnail) ?? "/images/product.png"}
                            alt=""
                            className="rounded-md shadow-md object-cover !w-full !h-auto"
                            width={350} height={350}
                        />
                    </div>
                    <div className=" col-span-1 flex flex-col gap-3 pt-2  overflow-y-scroll max-h-[390px] no-scrollbar">
                        {product.product_images.map((image, index: number) => (
                            <Image
                                onClick={() => handleImageDisplay(image.image_url)}
                                key={index}
                                src={image.image_url && image.image_url.startsWith('http') ? image.image_url : "/images/product.png"}
                                alt=""
                                width={60}
                                height={60}
                                className="w-full h-auto rounded-sm"
                            />
                        ))}
                    </div>
                    <div className="w-full col-span-4 gap-10 text-text space-y-3">
                        <h1 className=" text-[20px] font-[700] leading-[26px]"> {product.product_name}</h1>
                        <div className="grid grid-cols-2">
                            <p>Thương hiệu: </p>  <p className="text-[14px]  leading-5 "> {`${product.product_vendor.name}`}</p>
                            {/* <p>Danh mục sản phẩm: </p> <p className="text-[14px]  leading-5 "> {`${product.product_type?.}`}</p> */}
                            <p>Loại sản phẩm: </p><p className="text-[14px]  leading-5 "> {`${product.product_type?.title}`}</p>
                            <p>Xuất xứ: </p><p className=" text-[14px]  leading-[26px]">  {`${product.product_made}`}</p>
                            <p>Số lượng đã bán: </p><p className=" text-[14px]  leading-[26px]">  {`${product.product_sold}`}</p>
                            <p>Tồn kho: </p><p className=" text-[14px]  leading-[26px]">  {`${product.product_stock_quantity}`}</p>
                            <p>Hạn sử dụng: </p><p className=" text-[14px]  leading-[26px]">  {`${product.product_discount_end}`}</p>
                        </div>
                    </div>
                </div>
                {product.product_description && (
                    <>
                        <h1 className=" text-[20px] font-[700] leading-[26px]">Mô tả sản phẩm</h1>
                        <p className=" text-[13px]  leading-[26px] w-full break-words "> {product.product_description}</p></>
                )}
                {product.product_ingredient && (
                    <>
                        <h1 className=" text-[20px] font-[700] leading-[26px]">Thành phần</h1>
                        <p className=" text-[13px]  leading-[26px] w-full break-words "> {product.product_ingredient}</p></>
                )}
            </div>
            <div className="absolute bottom-0 right-0 px-3 py-2 w-full flex justify-end gap-10 bg-pink-50 h-[60px]">
                <Link href={`${UPDATE_PRODUCT_URL}/${product.product_slug}`}
                    className="flex items-center text-white px-4 h-full !rounded-md !bg-blue-300"
                > Chỉnh sửa</Link>
                <button onClick={() => { handleDeleteProduct(product.product_slug) }} className="px-4 h-full !rounded-md !bg-red-400">{`${isDeleteProduct ? "Đang xóa..." : "Xóa sản phẩm"}`} </button>
            </div>
        </div>
    );
}

export default DetailItem;
