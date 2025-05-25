import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white py-6 text-black mt-[30px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Beauty Box Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">BEAUTY BOX</h3>
                        <div className="flex space-x-4 mb-4">
                            <a href="#" aria-label="Facebook">
                                <span className="sr-only">Facebook</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-4.192 2.692-4.192 4.192v3.808z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="Instagram">
                                <span className="sr-only">Instagram</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.316 3.608 1.291.974.974 1.229 2.242 1.291 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.316 2.633-1.291 3.608-.974.974-2.242 1.229-3.608 1.291-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.316-3.608-1.291-.974-.974-1.229-2.242-1.291-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.316-2.633 1.291-3.608.974-.974 2.242-1.229 3.608-1.291 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.667.014-4.947.072-1.31.064-2.554.343-3.51.927-1.068.656-1.973 1.561-2.629 2.629-.584.956-.863 2.2-.927 3.51-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.064 1.31.343 2.554.927 3.51.656 1.068 1.561 1.973 2.629 2.629.956.584 2.2.863 3.51.927 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.31-.064 2.554-.343 3.51-.927 1.068-.656 1.973-1.561 2.629-2.629.584-.956.863-2.2.927-3.51.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.064-1.31-.343-2.554-.927-3.51-.656-1.068-1.561-1.973-2.629-2.629-.956-.584-2.2-.863-3.51-.927-1.28-.058-1.688-.072-4.947-.072z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="TikTok">
                                <span className="sr-only">TikTok</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2v-2h-2z" />
                                </svg>
                            </a>
                        </div>
                        <img src="/da-thong-bao.png" alt="Đã thông báo" className="h-10" />
                    </div>

                    {/* Vẻ Beauty Box Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">VẺ BEAUTY BOX</h3>
                        <ul className="text-sm space-y-1">
                            <li>Câu chuyện thương hiệu</li>
                            <li>Về chúng tôi</li>
                            <li>Liên hệ</li>
                        </ul>
                    </div>

                    {/* Chăm Sóc Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">CHĂM SÓC</h3>
                        <ul className="text-sm space-y-1">
                            <li>Chính sách vận chuyển</li>
                            <li>Chính sách giao hàng</li>
                            <li>Chính sách đổi trả sản phẩm</li>
                            <li>Chính sách bảo mật thông tin</li>
                            <li>Điều khoản sử dụng</li>
                        </ul>
                    </div>

                    {/* My Beauty Box & Đối Tác Section */}
                    <div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">MY BEAUTY BOX</h3>
                            <ul className="text-sm space-y-1">
                                <li>Quyền lợi thành viên</li>
                                <li>Thống tin thành viên</li>
                                <li>Thẻ điểm đổi hàng</li>
                                <li>Hướng dẫn mua hàng online</li>
                            </ul>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">ĐỐI TÁC - LIÊN KẾT</h3>
                            <p className="text-sm">THE FACE SHOP Vietnam</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;