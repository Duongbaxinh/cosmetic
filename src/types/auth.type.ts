export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  address: string;
};

export type AuthType = {
  user: UserType;
  token: string;
};

export type AuthDataLogin = {
  username: string;
  password: string;
};
export type LoginType = Pick<UserType, "username"> & { password: string };
