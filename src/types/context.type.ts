import { Dispatch, SetStateAction } from "react";
import { ShippingAddress } from "./auth.type";
import { CartCheckout, OrderProduct } from "./data.type";

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
  updateCartItem: (
    cart_id: string,
    product_id: string,
    quantity: number
  ) => Promise<void>;
  removeFromCart: (product_id: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

export type OrderContextType = {
  handlePurchase: (product: OrderProduct | OrderProduct[]) => void;
  proceedToCheckout: (arg: {
    shippingAddressId?: ShippingAddress;
    product?: OrderProduct | OrderProduct[];
  }) => void;
  isOpen: { openLogin: boolean; openContact: boolean };
  setIsOpen: Dispatch<
    SetStateAction<{ openLogin: boolean; openContact: boolean }>
  >;
};
