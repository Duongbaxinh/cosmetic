export enum MESS_CART {
  CONFIRM_DELETE_MANY = "Bạn muốn xóa những sản phẩm đã chọn ??",
  CONFIRM_DELETE_ONE = "Bạn muốn xóa sản phẩm này ??",
  ERROR_EMPTY_DELETE = "Chọn sản phẩm bạn muốn xóa",
}

export enum MESS_AUTH {
  // Username
  USERNAME_REQUIRED = "Tài khoản người dùng không được để trống",
  USERNAME_NO_SPACES = "Tài khoản người dùng không được chứa khoảng trắng",
  USERNAME_INVALID_CHARACTERS = "Tài khoản người dùng không được chứa ký tự đặc biệt",
  USERNAME_NOT_VALID = "Tài khoản người dùng phải là email hoặc số điện thoại hợp lệ",
  USERNAME_MIN = "Tài khoản người dùng phải có ít nhất 4 ký tự",
  USERNAME_MAX = "Tài khoản người dùng không được vượt quá 20 ký tự",

  // Email & Phone
  INVALID_EMAIL = "Email không đúng định dạng",
  INVALID_PHONE = "Số điện thoại không đúng định dạng",

  // Password
  PASSWORD_REQUIRED = "Mật khẩu không được để trống",
  PASSWORD_NO_SPACES = "Mật khẩu không được chứa khoảng trắng",
  PASSWORD_MIN = "Mật khẩu ít nhất 8 ký tự",
  PASSWORD_MAX = "Mật khẩu tối đa 14 ký tự",
  PASSWORD_INVALID_CHARACTERS = "Mật khẩu không được chứa ký tự lạ hoặc mã HTML",
  PASSWORD_WEAK = "Mật khẩu phải có ít nhất 1 ký tự Hoa, 1 ký tự thường và 1 ký tự đặc biệt",
  PASSWORD_NOT_MATCH = "Mật khẩu xác nhận không khớp",
  PASSWORD_SAME_OLD = "Mật khẩu mới không được trùng với mật khẩu hiện tại",

  // Confirm Password
  CONFIRM_PASSWORD_REQUIRED = "Vui lòng xác nhận lại mật khẩu",

  // Auth logic
  LOGIN_FAILED = "Sai tài khoản người dùng hoặc mật khẩu",
  ACCOUNT_NOT_FOUND = "Tài khoản không tồn tại",
  ACCOUNT_LOCKED = "Tài khoản của bạn đã bị khóa",
  FORM_EMPTY = "Vui lòng nhập đầy đủ thông tin để đăng nhập",
  UNAUTHORIZED = "Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn",
  FORBIDDEN = "Bạn không có quyền truy cập tính năng này",

  // Common
  UNKNOWN_ERROR = "Đã xảy ra lỗi, vui lòng thử lại sau",
}

export enum MESS_DELIVERY {
  ADDRESS_MESS = "Bạn muốn giao hàng đến địa điểm nào ??",
}
