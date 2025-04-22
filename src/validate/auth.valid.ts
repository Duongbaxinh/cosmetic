import * as yup from "yup";
import DOMPurify from "dompurify";
import { MESS_LOGIN } from "@/config/mess.config";

const sanitizeInput = (value: any) => DOMPurify.sanitize(value || "").trim();

export const authValid = yup
  .object({
    username: yup
      .string()
      .transform(sanitizeInput)
      .required(MESS_LOGIN.USERNAME_REQUIRED)
      .test(
        "no-spaces-in-middle",
        MESS_LOGIN.USERNAME_NO_SPACES,
        (value) => !/\s/.test(value || "")
      )
      .matches(/^[a-zA-Z0-9@.+-_]+$/, MESS_LOGIN.USERNAME_INVALID_CHARACTERS)
      .test("is-email-or-phone", MESS_LOGIN.USERNAME_NOT_VALID, (value) => {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(0|\+84)[0-9]{9}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }),

    password: yup
      .string()
      .required(MESS_LOGIN.PASSWORD_REQUIRED)
      .test(
        "no-spaces-in-middle",
        MESS_LOGIN.PASSWORD_NO_SPACES,
        (value) => !/\s/.test(value || "")
      )
      .min(8, MESS_LOGIN.PASSWORD_MIN)
      .max(20, MESS_LOGIN.PASSWORD_MAX)
      .test(
        "no-strange-symbols",
        MESS_LOGIN.PASSWORD_INVALID_CHARACTERS,
        (value) => {
          if (!value) return false;
          const allowedRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\-]*$/;
          return allowedRegex.test(value);
        }
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).+$/,
        MESS_LOGIN.PASSWORD_WEEK
      )
      .transform(sanitizeInput),
  })
  .required();
