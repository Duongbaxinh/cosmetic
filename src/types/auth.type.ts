export type UserType = {
  id: string;
  first_name?: string;
  last_name?: string;
  username: string;
  phone: string;
  address: string;
  email_address: string;
  birthday?: string;
  nickname?: string;
  fullname?: string;
  gender?: string;
  avatar?: string;
  nationality?: string;
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
export type UserProfileType = Pick<
  UserType,
  "fullname" | "nickname" | "birthday" | "gender" | "nationality"
>;
