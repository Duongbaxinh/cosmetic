import React from 'react';

const Header = () => {
    return (
        <header className="bg-white shadow-md ">
            <div className="flex justify-between items-center py-[10px]">
                <div className="flex items-center">
                    <span className="text-gray-600 mr-2">K</span>
                    <input
                        type="text"
                        placeholder="Search for results..."
                        className="border rounded p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <button className="text-gray-600 hover:text-gray-800 relative">
                        <span role="img" aria-label="bell">🔔</span>
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">4</span>
                    </button>
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://via.placeholder.com/30"
                            alt="User"
                            className="w-8 h-8 rounded-full"
                        />
                        <div>
                            <div className="text-gray-700 font-[13px]">Json Taylor</div>
                            <div className="text-gray-500 text-[12px]">Web Designer</div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="text-gray-600 flex justify-between border-t border-gray-200 px-4 py-2">
                <span>Dashboard</span>
                <span className="ml-2 text-teal-500">Admin / Dashboard</span>
            </div>
        </header>
    );
};

export default Header;