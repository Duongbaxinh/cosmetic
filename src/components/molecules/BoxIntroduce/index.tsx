import { useRef, useState, useEffect } from 'react';
import IconButton from '@/components/atoms/IconButton';
import { CATEGORY_CONFIG } from '@/components/config/categories.config';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import { getTypeCategory } from '@/utils';
import { useData } from '@/contexts/data.context';
import { CategoryConfig } from '@/types';
import { CATEGORY_URL, PROMOTION_URL } from '@/routers';

// Define the shape of each category in CATEGORY_CONFIG
interface Category {
    url: string;
    title: string;
    slug?: string; // Added to match CategoryConfig usage
}

function BoxIntroduce() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
    const [showRightButton, setShowRightButton] = useState<boolean>(false);
    const [hoveredCategory, setHoveredCategory] = useState<CategoryConfig | null>(null);
    const [isDropdownHovered, setIsDropdownHovered] = useState<boolean>(false);

    const { categories, promotions, allBrand: brands } = useData();

    // Check scroll position to toggle button visibility
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1); // -1 for rounding errors
        }
    };

    // Handle scroll on button click
    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200; // Adjust this value for desired scroll distance
            const currentScroll = scrollContainerRef.current.scrollLeft;
            const newScroll = direction === 'left'
                ? currentScroll - scrollAmount
                : currentScroll + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScroll,
                behavior: 'smooth',
            });
        }
    };

    // Add scroll event listener
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            checkScrollPosition(); // Initial check
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollPosition);
            }
        };
    }, []);

    // Check scroll position on mount and window resize
    useEffect(() => {
        checkScrollPosition();
        window.addEventListener('resize', checkScrollPosition);
        return () => window.removeEventListener('resize', checkScrollPosition);
    }, []);

    // Handle mouse enter for buttons
    const handleButtonMouseEnter = (category: CategoryConfig) => {
        setHoveredCategory(category);
    };

    // Handle mouse leave for buttons
    const handleButtonMouseLeave = () => {
        // Only clear hoveredCategory if dropdown is not being hovered
        if (!isDropdownHovered) {
            setHoveredCategory(null);
        }
    };

    return (
        <div className="relative mt-4">
            {/* Navigation Buttons */}
            {showLeftButton && (
                <button
                    onClick={() => handleScroll('left')}
                    className="absolute -left-5 top-0 rounded-full h-full bg-pink-300 p-2 z-50 hover:bg-pink-200 transition-colors"
                >
                    <FaChevronLeft className="text-white" />
                </button>
            )}
            {showRightButton && (
                <button
                    onClick={() => handleScroll('right')}
                    className="absolute -right-5 top-0 rounded-full h-full bg-pink-300 p-2 z-50 hover:bg-pink-200 transition-colors"
                >
                    <FaChevronRight className="text-white" />
                </button>
            )}

            {/* Scrollable Content */}
            <div
                ref={scrollContainerRef}
                className="w-full overflow-x-scroll flex items-center gap-3 no-scrollbar scroll-smooth"
            >
                {(CATEGORY_CONFIG as CategoryConfig[]).map((category, index) => (
                    <Link
                        key={index}
                        href={category.url}
                        className="flex items-center justify-center h-full"
                    >
                        <IconButton
                            className="group whitespace-nowrap border border-gray-200 rounded-md !p-1 !text-gray-900 hover:text-pink-500 hover:font-[500] hover:bg-pink-100 transition-colors duration-200 !px-5"
                            title={category.title}
                            onMouseEnter={() => handleButtonMouseEnter(category)}
                            onMouseLeave={handleButtonMouseLeave}
                        />
                    </Link>
                ))}
            </div>
            {hoveredCategory?.url === '#' && (hoveredCategory || isDropdownHovered) && (
                <div
                    className="absolute z-50 top-[25px]  pt-4 left-0 w-full h-[350px] bg-transparent text-black  transition-transform duration-300 ease-in-out transform translate-y-0 opacity-100 data-[hidden=true]:translate-y-[-10px] data-[hidden=true]:opacity-0"
                    onMouseEnter={() => setIsDropdownHovered(true)}
                    onMouseLeave={() => {
                        setIsDropdownHovered(false);
                        if (hoveredCategory) {
                            setHoveredCategory(null);
                        }
                    }}
                    data-hidden={!(hoveredCategory || isDropdownHovered)}
                >
                    <div className="grid grid-cols-2  bg-white p-2 rounded-md shadow">
                        <div className="grid grid-cols-3 gap-2 min-h-[250px] p-4">
                            {hoveredCategory && hoveredCategory.id === "category" &&
                                getTypeCategory(categories, hoveredCategory.slug).map((item, idx) => (
                                    <Link href={`${CATEGORY_URL}/product_type/${item.slug}`} key={idx}>{item.title}</Link>
                                ))}
                            {hoveredCategory && hoveredCategory.id === "promotion" && promotions.map((promotion) => (
                                <Link href={`${PROMOTION_URL}/${promotion.slug}`} key={promotion.slug}>{promotion.title}</Link>
                            ))}
                            {hoveredCategory && hoveredCategory.id === "brand" && brands && brands.map((brand) => (
                                <Link href={`${CATEGORY_URL}/product_brand/${brand.slug}`} key={brand.slug}>{brand.title}</Link>
                            ))}
                        </div>
                        <div className='flex items-center gap-2 overflow-x-scroll no-scrollbar'>
                            {hoveredCategory && hoveredCategory.images && hoveredCategory.images.length > 0 &&
                                hoveredCategory.images.map((item, idx) => (
                                    <Link href={hoveredCategory.url}>
                                        <Image width={350} height={350} src={item || ""} alt="" className='rounded-md' />
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BoxIntroduce;