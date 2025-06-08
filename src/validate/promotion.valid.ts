import * as yup from "yup";
export const promotionSchema = yup.object().shape({
  title: yup.string().required("Tên chương trình là bắt buộc"),
  discount_percent: yup
    .number()
    .typeError("Phần trăm giảm giá phải là số")
    .required("Phần trăm giảm giá là bắt buộc")
    .min(0, "Phần trăm phải từ 0 đến 100")
    .max(100, "Phần trăm phải từ 0 đến 100"),
  start_date: yup.string().required("Ngày bắt đầu là bắt buộc"),
  end_date: yup
    .string()
    .required("Ngày kết thúc là bắt buộc")
    .test(
      "is-after-start",
      "Ngày kết thúc phải sau ngày bắt đầu",
      function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true;
        return new Date(value) > new Date(startDate);
      }
    ),
  product_ids: yup
    .array()
    .min(5, "Vui lòng chọn ít nhất 5 sản phẩm")
    .max(10, "Không thể chọn quá 10 sản phẩm")
    .required("Vui lòng chọn sản phẩm"),
});
