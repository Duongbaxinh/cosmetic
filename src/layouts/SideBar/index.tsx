
import ItemRectangle from '@/components/atoms/ItemRetangle';
import { SIDEBAR_ITEMS } from '@/components/config/sidebarItem';
import Link from 'next/link';
import React from 'react';
interface SideBarProps {

}

const SideBar: React.FC<SideBarProps> = () => {
    return (
        <div className=" hidden sm:block max-w-[230px] min-w-[230px] px-1 sticky top-0 left-0 bg-white text-black max-h-screen  overflow-auto scrollbar-none rounded-md "
            style={{ scrollbarWidth: "none" }}>
            <div className="flex flex-col gap-4 p-2">
                <div className='w-full'>
                    <p className='text-[14px] font-bold' >Danh mục</p>
                    {SIDEBAR_ITEMS.map(({ path, title, icon }, index) => (
                        <Link key={index} href={path}>
                            <ItemRectangle
                                className='truncate'
                                icon={<img src={icon} alt={title} className="max-w-8 max-h-8" />}
                                title={title}
                            />
                        </Link>
                    ))}
                </div>
                <div>
                    <p className='text-[14px] font-bold' >Nổi bật</p>
                    {SIDEBAR_ITEMS.map(({ path, title, icon }, index) => (
                        <ItemRectangle
                            key={index}
                            icon={<img src={""} alt={title} className="max-w-8 max-h-8" />}
                            title={title}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
