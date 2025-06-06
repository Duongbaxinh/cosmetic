import { Dispatch, SetStateAction } from "react";
import { ShippingAddress } from "./auth.type";
import {
  CartCheckout,
  Category,
  OrderProduct,
  ProductBrand,
  ProductBrandTypeResponse,
  ProductTypeResponse,
  Promotion,
} from "./data.type";

export type CartContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleDrawer: () => void;
  cart: CartCheckout | null;
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
  brands: ProductBrandTypeResponse | undefined;
  productTypes: ProductTypeResponse | undefined;
  promotions: Promotion[] | [];
  params: ParamFilter;
  allBrand: ProductBrand[] | undefined;
  setParams: React.Dispatch<ParamFilter>;
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
