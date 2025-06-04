"use client";
import CloseIcon from "@/assets/icons/CloseIcon";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchStream } from "./fetchStream";

// Định nghĩa kiểu cho sản phẩm
interface Product {
    productName: string;
    linkProduct: string | null;
}

// Định nghĩa kiểu cho tin nhắn
interface Message {
    role: "user" | "ai";
    content: string | Product[];
}

export default function ChatBox() {
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [chat, setChat] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [isStreaming, setIsStreaming] = useState<boolean>(false);

    // Xử lý dữ liệu stream
    const handleStream = async (): Promise<void> => {
        setIsStreaming(true);
        setChat("");
        setProducts([]);

        try {
            await fetchStream(
                "https://joyboybe-production.up.railway.app/chatbot/guest",
                {
                    role: "user",
                    content: inputMessage,
                },

                (chunk: string) => {
                    setChat((prev) => prev + chunk);
                }
            );
        } catch (error) {
            console.error("Error during streaming:", error);
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: "Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại!" },
            ]);
        } finally {
            setIsStreaming(false);
        }
    };

    const handleSendMessage = (): void => {
        if (inputMessage.trim()) {
            setMessages((prev) => [...prev, { role: "user", content: inputMessage }]);
            setInputMessage("");
            handleStream();
        }
    };

    useEffect(() => {
        if (!isStreaming && chat) {
            const parts = chat.split(/###+#/);
            const message = parts[0].trim();
            let newProducts: Product[] = [];

            if (parts[1]) {
                const text = parts[1];
                const productText = text.split("- **").slice(1);
                newProducts = productText.map((item) => {
                    const product = item.split("**");
                    const productLink = product[product.length - 1].trim();
                    const regex = /\[.*?\]\((https?:\/\/[^\)]+)\)/;
                    const match = productLink.match(regex);
                    const link = match ? match[1] : null;
                    return {
                        productName: product[0],
                        linkProduct: link,
                    };
                });
                setProducts(newProducts);
            }

            setMessages(prev => [...prev, { role: "ai", content: message }, { role: "ai", content: newProducts }])

            setChat("");
        }
    }, [isStreaming, chat]);

    const handleChatToggle = (): void => {
        setIsChatOpen((prev) => !prev);
    };

    return (
        <div className="relative">
            {/* Chat Icon */}
            <button
                onClick={handleChatToggle}
                className="fixed bottom-4 right-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-[30px] p-3 rounded-full shadow-lg z-50 transform hover:scale-110 transition-transform duration-300 hover:shadow-xl"
            >
                💬
            </button>

            {/* Chat Box */}
            {isChatOpen && (
                <div
                    className="fixed bottom-[90px] right-10 w-[300px] sm:w-[600px] h-[500px] bg-pink-50 rounded-xl shadow-2xl flex flex-col z-50 transition-all duration-300 ease-in-out transform"
                    style={{ opacity: isChatOpen ? 1 : 0, scale: isChatOpen ? 1 : 0.95 }}
                >
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white flex justify-between items-center rounded-t-xl">
                        <h2 className="text-lg font-bold">Trò chuyện AI</h2>
                        <button
                            onClick={handleChatToggle}
                            className="text-white hover:bg-pink-600 p-1 rounded-full transition-colors duration-200"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-pink-50">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex items-start ${message.role === "user" ? "justify-end" : "justify-start"
                                    } animate-slide-in`}
                            >
                                {message.role === "ai" && (
                                    <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mr-2"></div>
                                )}
                                <div
                                    className={`p-3 rounded-lg shadow-md max-w-[50%] sm:max-w-[70%] ${message.role === "user"
                                        ? "bg-purple-100 text-gray-900"
                                        : "bg-white text-gray-900"
                                        }`}
                                >
                                    {typeof message.content === "string" ? (
                                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {message.content.map((product: Product, idx: number) => (
                                                <Link
                                                    href={product.linkProduct ?? "#"}
                                                    key={idx}
                                                    className="p-4 bg-pink-100 rounded-lg hover:bg-pink-200 transition-all duration-200 flex items-center space-x-3 transform hover:scale-105 border border-pink-300 shadow-sm"
                                                >
                                                    <span className="text-pink-500 text-lg">✨</span>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                                                            {product.productName}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Nhấn để xem chi tiết sản phẩm
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {message.role === "user" && (
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full ml-2"></div>
                                )}
                            </div>
                        ))}
                        {/* Hiển thị tin nhắn đang stream (nếu có) */}
                        {isStreaming && chat && (
                            <div className="flex items-start justify-start animate-slide-in">
                                <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mr-2"></div>
                                <div className="p-3 rounded-lg shadow-md bg-white text-gray-900 max-w-[70%]">
                                    <p className="text-sm whitespace-pre-line">{chat}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter" && !isStreaming) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                value={inputMessage}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setInputMessage(e.target.value)
                                }
                                placeholder="Nhập nội dung chat"
                                className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200"
                                disabled={isStreaming}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isStreaming}
                                className={`bg-gradient-to-r from-pink-400 to-purple-500 text-white p-2 rounded-lg hover:scale-105 transition-transform duration-200 ${isStreaming ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isStreaming ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"
                                        />
                                    </svg>
                                ) : (
                                    "Gửi"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}