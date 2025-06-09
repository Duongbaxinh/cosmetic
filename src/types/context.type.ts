import { Dispatch, SetStateAction } from "react";
import { ShippingAddress, UserProfileType } from "./auth.type";
import { Category, OrderProduct, Promotion } from "./data.type";
import { ProductResponse } from "./response.type";
import { FilterProductType } from "./page.type";
import { CartCheckoutType } from "./cart.type";
import { BrandType, BrandTypeResponse } from "./brand.type";
import { ProductTypeResponse } from "./product.type";

export type CartContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleDrawer: () => void;
  cart: CartCheckoutType | null;
  addToCart: (
    cart_id: string,
    product_id: string,
    quantity: number
  ) => Promise<void>;
  updateCartItem: (cartDetailId: string, quantity: number) => Promise<void>;
  removeFromCart: (product_id: string) => Promise<void>;
  removeMultiProductInCart: (productIds: string[]) => Promise<void>;
  clearCart: () => Promise<void>;
};

export type FilterParamItem = {
  limitnumber: number;
  page: number;
  vendor?: string;
};

export type ParamFilter = {
  brand: FilterParamItem;
  type: FilterParamItem;
};
export const initParam: ParamFilter = {
  brand: { limitnumber: 5, page: 1 },
  type: { limitnumber: 5, page: 1 },
};

export type DataContextType = {
  categories: Category[] | [];
  brands: BrandTypeResponse | undefined;
  productTypes: ProductTypeResponse | undefined;
  promotions: Promotion[] | [];
  products: ProductResponse | undefined;
  params: ParamFilter;
  refetch: any;
  allBrand: BrandType[] | undefined;
  setParams: React.Dispatch<ParamFilter>;
  filters: FilterProductType;
  setFilters: React.Dispatch<SetStateAction<FilterProductType>>;
};

export type ErrorContextType = {
  handleError: (error: any) => void;
};

export type ProcessOrder = {
  shippingAddressNew?: ShippingAddress;
  product?: OrderProduct | OrderProduct[];
};
export type OrderContextType = {
  handlePurchase: (product: OrderProduct | OrderProduct[]) => void;
  proceedToCheckout: ({ ...arg }: ProcessOrder) => void;
  isOpen: { openLogin: boolean; openContact: boolean };
  orderProducts: OrderProduct | OrderProduct[];
  setOrderProduct: Dispatch<SetStateAction<OrderProduct | OrderProduct[]>>;
  setIsOpen: Dispatch<
    SetStateAction<{ openLogin: boolean; openContact: boolean }>
  >;
};

export type AuthContextType = {
  accessToken: string;
  setAccessToken: (token: string) => void;
  scope: string;
  setScope: (scope: string) => void;
  setRefetchToken: (token: string) => void;
  refreshToken: (user: any) => void;
  setIsLogin: (isLogin: boolean) => void;
  isLogin: boolean;
  fetchUserInfo: () => Promise<any>;
  fetchShipping: () => Promise<any>;
  userProfile: UserProfileType | undefined;
  shippingAddress: ShippingAddress[] | undefined;
  logout: () => void;
  isAuth: { form: "login" | "register"; isOpen: boolean } | null;
  setIsAuth: (form: { form: "login" | "register"; isOpen: boolean }) => void;
};
