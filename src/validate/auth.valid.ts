import * as yup from "yup";
import DOMPurify from "dompurify";
import { MESS_AUTH } from "@/config/mess.config";

const sanitizeInput = (value: any) => DOMPurify.sanitize(value || "").trim();

const emailRegex =
  /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

const passwordSchema = yup
  .string()
  .required(MESS_AUTH.PASSWORD_REQUIRED)
  .test(
    "no-spaces-in-middle",
    MESS_AUTH.PASSWORD_NO_SPACES,
    (value) => !/\s/.test(value || "")
  )
  .min(8, MESS_AUTH.PASSWORD_MIN)
  .max(20, MESS_AUTH.PASSWORD_MAX)
  .test(
    "no-strange-symbols",
    MESS_AUTH.PASSWORD_INVALID_CHARACTERS,
    (value) => {
      if (!value) return false;
      const allowedRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\-]*$/;
      return allowedRegex.test(value);
    }
  )
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).+$/,
    MESS_AUTH.PASSWORD_WEAK
  )
  .transform(sanitizeInput);

const schemaEmail = yup
  .string()
  .transform(sanitizeInput)
  .required("Vui lòng nhập email")
  .matches(emailRegex, "Email không đúng định dạng");

export const authRegisterValid = yup
  .object({
    username: yup
      .string()
      .transform(sanitizeInput)
      .required(MESS_AUTH.USERNAME_REQUIRED)
      .test(
        "no-spaces-in-middle",
        MESS_AUTH.USERNAME_NO_SPACES,
        (value) => !/\s/.test(value || "")
      )
      .matches(/^[a-zA-Z0-9@.+-_]+$/, MESS_AUTH.USERNAME_INVALID_CHARACTERS),

    phone: yup
      .string()
      .transform(sanitizeInput)
      .required("Vui lòng nhập số điện thoại")
      .matches(/^(0|\+84)(\d{9})$/, "Số điện thoại không hợp lệ"),

    email: schemaEmail,

    password: passwordSchema,

    confirmPassword: yup
      .string()
      .required(MESS_AUTH.CONFIRM_PASSWORD_REQUIRED)
      .oneOf([yup.ref("password")], MESS_AUTH.PASSWORD_NOT_MATCH),
  })
  .required();

export const authLoginValid = yup
  .object({
    username: schemaEmail,

    password: passwordSchema,
  })
  .required();

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required(MESS_AUTH.PASSWORD_REQUIRED),
  newPassword: yup
    .string()
    .required(MESS_AUTH.PASSWORD_REQUIRED)
    .min(8, MESS_AUTH.PASSWORD_MIN)
    .max(20, MESS_AUTH.PASSWORD_MAX)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/,
      MESS_AUTH.PASSWORD_WEAK
    ),
  confirmPassword: yup
    .string()
    .required(MESS_AUTH.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref("newPassword")], MESS_AUTH.PASSWORD_NOT_MATCH),
});
export const forgotPasswordSchema = yup.object({
  email: schemaEmail,
});

export const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required(MESS_AUTH.PASSWORD_REQUIRED)
    .test(
      "no-spaces-in-middle",
      MESS_AUTH.PASSWORD_NO_SPACES,
      (value) => !/\s/.test(value || "")
    )
    .min(8, MESS_AUTH.PASSWORD_MIN)
    .max(20, MESS_AUTH.PASSWORD_MAX)
    .test(
      "no-strange-symbols",
      MESS_AUTH.PASSWORD_INVALID_CHARACTERS,
      (value) => {
        if (!value) return false;
        const allowedRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\-]*$/;
        return allowedRegex.test(value);
      }
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).+$/,
      MESS_AUTH.PASSWORD_WEAK
    )
    .transform(sanitizeInput),
  confirmPassword: yup
    .string()
    .required(MESS_AUTH.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref("newPassword")], MESS_AUTH.PASSWORD_NOT_MATCH),
});
