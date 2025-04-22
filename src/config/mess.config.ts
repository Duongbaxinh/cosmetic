export enum MESS_CART {
  CONFIRM_DELETE_MANY = "Bạn muốn xóa những sản phẩm đã chọn ??",
  CONFIRM_DELETE_ONE = "Bạn muốn xóa sản phẩm này ??",
  ERROR_EMPTY_DELETE = "Chọn sản phẩm bạn muốn xóa",
}

export enum MESS_LOGIN {
  USERNAME_REQUIRED = "Username không được để trống",
  USERNAME_NO_SPACES = "Username không được chứa khoảng trắng",
  USERNAME_INVALID_CHARACTERS = "Username không được chứa ký tự đặc biệt",
  USERNAME_NOT_VALID = "Username phải là email hoặc số điện thoại hợp lệ",
  USERNAME_MIN = "Username phải có ít nhất 4 ký tự",
  USERNAME_MAX = "Username không được vượt quá 20 ký tự",

  PASSWORD_REQUIRED = "Password không được để trống",
  PASSWORD_NO_SPACES = "Password không được chứa khoảng trắng",
  PASSWORD_MIN = "Password ít nhất 8 ký tự",
  PASSWORD_MAX = "Password tối đa 14 ký tự",
  PASSWORD_INVALID_CHARACTERS = "Password không được chứa ký tự lạ hoặc mã HTML",
  PASSWORD_WEEK = "Password phải có ít nhất 1 ký tự Hoa, 1 ký tự thường và 1 ký tự đặc biệt",

  LOGIN_FAILED = "Sai username hoặc mật khẩu",
  ACCOUNT_NOT_FOUND = "Tài khoản không tồn tại",
  ACCOUNT_LOCKED = "Tài khoản của bạn đã bị khóa",
  FORM_EMPTY = "Vui lòng nhập đầy đủ thông tin để đăng nhập",

  INVALID_EMAIL = "Email không đúng định dạng",
  INVALID_PHONE = "Số điện thoại không đúng định dạng",
}
