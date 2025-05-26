"use client";
import CloseIcon from "@/assets/icons/CloseIcon";
import { useSendMessageMutation } from "@/redux/slices/chat.slice";
import { DETAIL_PRODUCT_URL } from "@/routers";
import Link from "next/link";
import { useState, useEffect } from "react";
// Adjust path as needed

// Define the structure of the response data
interface Product {
    id: string;
    product_name: string;
}

interface ChatMessage {
    message: string;
    data: Product[];
}

interface Message {
    role: "user" | "ai";
    content: string | Product[];
}

export default function ChatBox() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [streamedMessage, setStreamedMessage] = useState("");
    const [streamedProducts, setStreamedProducts] = useState<Product[]>([]);
    const [isStreaming, setIsStreaming] = useState(false);

    // Use the sendMessage mutation from chatApi
    const [sendMessage, { isLoading }] = useSendMessageMutation();

    // Log state changes for debugging
    useEffect(() => {

    }, [isChatOpen]);

    // Function to call the chat API
    const fetchAIResponse = async (userMessage: string): Promise<ChatMessage> => {
        try {
            const response = await sendMessage({ role: "user", content: userMessage }).unwrap();
            return response;
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return {
                message: "Đã xảy ra lỗi khi lấy phản hồi từ AI.",
                data: [],
            }
        }
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            setMessages((prev) => [...prev, { role: "user", content: inputMessage }]);
            setInputMessage("");
            setIsStreaming(true);
            setStreamedMessage("");
            setStreamedProducts([]);

            const aiResponse = await fetchAIResponse(inputMessage);
            streamResponse(aiResponse);
        }
    };

    const streamResponse = (response: ChatMessage) => {
        let currentMessageIndex = 0;
        let currentProductIndex = 0;

        const streamMessage = () => {
            if (currentMessageIndex < response.message.length) {
                setStreamedMessage(response.message.slice(0, currentMessageIndex + 1));
                currentMessageIndex++;
                setTimeout(streamMessage, 20);
            } else {
                const streamProducts = () => {
                    if (currentProductIndex < response.data.length) {
                        setStreamedProducts(response.data.slice(0, currentProductIndex + 1));
                        currentProductIndex++;
                        setTimeout(streamProducts, 500);
                    } else {
                        setMessages((prev) => [
                            ...prev,
                            { role: "ai", content: response.message },
                            { role: "ai", content: response.data },
                        ]);
                        setIsStreaming(false);
                    }
                };
                streamProducts();
            }
        };
        streamMessage();
    };

    // Handle chat icon click with logging
    const handleChatToggle = () => {

        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="relative">
            {/* Chat Icon with Hover Effect */}
            <button
                onClick={handleChatToggle}
                className="fixed bottom-4 right-4 bg-gradient-to-r from-pink-300 to-purple-400 text-white text-[30px] p-2 rounded-full shadow-lg z-50 transform hover:scale-110 transition-transform duration-200 hover:shadow-xl"
            >
                💬
            </button>

            {/* Chat Box with Simplified Animation */}
            {isChatOpen && (
                <div
                    className="fixed bottom-[80px] right-4 w-80 sm:w-96 h-[500px] bg-pink-50 rounded-lg shadow-2xl flex flex-col z-50 transition-opacity duration-300 ease-in-out"
                    style={{ opacity: isChatOpen ? 1 : 0 }}
                >
                    <div className="p-4 bg-gradient-to-r from-pink-300 to-purple-400 text-white flex justify-between items-center rounded-t-lg">
                        <h2 className="text-lg font-bold">Trò chuyện AI</h2>
                        <button
                            onClick={handleChatToggle}
                            className="text-white hover:bg-pink-500 p-1 rounded-full transition-colors duration-200"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-pink-50">
                        {messages.length === 0 && (
                            <div className=""><h1>Xin chào bạn, tôi là AI hỗ trợ bạn. hãy đưa ra các vấn đề mà bạn đang thắc mắc</h1></div>
                        )}
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex items-start ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-in`}
                            >
                                {msg.role === "ai" && (
                                    <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mr-2"></div>
                                )}
                                <div
                                    className={`p-3 rounded-lg shadow-md ${msg.role === "user" ? "bg-pink-100 text-pink-900" : "bg-white text-gray-900"} max-w-[70%] transform transition-all duration-300 hover:shadow-lg`}
                                >
                                    {typeof msg.content === "string" ? (
                                        <p className="text-sm">{msg.content}</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {(msg.content as Product[]).map((product) => (
                                                <Link href={`${DETAIL_PRODUCT_URL}/${product.id}`}
                                                    key={product.id}
                                                    className="p-2 bg-pink-50 rounded-md hover:bg-pink-100 transition-colors duration-200 flex items-center space-x-2"
                                                >
                                                    <span className="text-pink-500">✨</span>
                                                    <p className="text-sm">{product.product_name}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {msg.role === "user" && (
                                    <div className="w-8 h-8 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full ml-2"></div>
                                )}
                            </div>
                        ))}
                        {/* Streaming AI message with typing effect */}
                        {(isStreaming || isLoading) && streamedMessage && (
                            <div className="flex items-start justify-start animate-fade-in">
                                <div className="bg-white p-3 rounded-lg shadow-md max-w-[70%]">
                                    <p className="animate-typing text-sm">{streamedMessage}</p>
                                    {streamedProducts.length > 0 && (
                                        <div className="space-y-2 mt-2">
                                            {streamedProducts.map((product) => (
                                                <Link key={product.id} href={`${DETAIL_PRODUCT_URL}/${product.id}`}>
                                                    <div className="p-2 bg-pink-50 rounded-md hover:bg-pink-100 transition-colors duration-200 flex items-center space-x-2">
                                                        <span className="text-pink-500">✨</span>
                                                        <p className="text-sm">{product.product_name}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-4 bg-white border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Nhập nội dung chat"
                                className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading}
                                className={`bg-gradient-to-r from-pink-300 to-purple-400 text-white p-2 rounded-lg hover:scale-105 transition-transform duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Custom CSS for Animations */}
            <style jsx>{`
                @keyframes slide-in {
                    from {
                        transform: translateY(10px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes typing {
                    from {
                        border-right: 2px solid transparent;
                    }
                    to {
                        border-right: 2px solid #4A4A4A;
                    }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
                .animate-typing {
                    border-right: 2px solid #4A4A4A;
                    animation: typing 0.5s infinite alternate;
                }
            `}</style>
        </div>
    );
}