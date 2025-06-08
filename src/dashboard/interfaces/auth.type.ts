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

export type AuthDataRegister = {
    username: string;
    password: string;
    email: string;
    phone: string;
    confirmPassword: string;
};
export interface RegisterResponse {
    id: string;
    username: string;
    email: string;
    phone: string;
    role: Role;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Role {
    id: string;
    name: string;
    scope: string;
    created_at: string;
    updated_at: string;
}

export type LoginType = Pick<UserType, "username"> & {password: string};
export type UserProfileType = {
    id: string;
    username: string;
    email?: string;
    phone?: string;
    created_at?: string;
    updated_at?: string;
};

export type ChangePasswordPayload = {
    email: string;
    current_password: string;
    new_password: string;
};

export type ShippingAddress = {
    id: string;
    user?: UserProfileType;
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    created_at?: string;
    updated_at?: string;
};

export type ForgotPasswordPayload = {
    email: string;
};
export type ResetPasswordPayload = {
    token: string;
    new_password: string;
};

export type UserRole = "customer" | "seller";

export interface Role {
    id: string;
    name: string;
    scope: string;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
    role: Role;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
