import { postData } from "@/api";
import { AuthType, LoginType, UserType } from "@/types";
import { handleError } from "@/utils";
import { useState } from "react";

export const Login = async (payload: LoginType): Promise<UserType | null> => {
  //   const [auth, setAuth] = useState<AuthType | null>(null);

  try {
    const url = `/user`;
    const response = await postData(url, payload, false);
    const auth = response as AuthType;
    return auth.user;
  } catch (error) {
    handleError(error);
  }
  return null;
};
