import React, { useState, useEffect } from 'react';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const menuItems = [
        { icon: '🎉', label: 'Promotion' },
        { icon: '📦', label: 'Product' },
        { icon: '📋', label: 'Order' },
    ];

    useEffect(() => {
        console.log('Is Collapsed:', isCollapsed);
    }, [isCollapsed]);

    return (
        <div className={`sticky top-0 left-0 h-screen bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-52 min-w-[200px]'}`}>
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
                <h2
                    className={`text-xl font-bold overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}
                >
                    Vexel
                </h2>
                <button
                    onClick={toggleSidebar}
                    className="flex-shrink-0 focus:outline-none hover:bg-gray-700 p-1 rounded transition-colors duration-200"
                >
                    {isCollapsed ? '▶' : '◀'}
                </button>
            </div>
            <nav className="mt-4 px-2">
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}
                    >
                        <span className="flex-shrink-0">{item.icon}</span>
                        <span
                            className={`ml-2 overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}
                        >
                            {item.label}
                        </span>
                    </a>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;