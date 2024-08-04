import type { CartItem, Guitar } from "../types";
import { db } from "../data/db";

export interface AddToCart {
  type: "add-to-cart";
  payload: { item: Guitar };
}
export interface RemoveFromCart {
  type: "remove-from-cart";
  payload: { id: Guitar["id"] };
}

export interface DecreaseQuantity {
  type: "decrease-quantity";
  payload: { id: Guitar["id"] };
}

export interface IncreaseQuantity {
  type: "increase-quantity";
  payload: { id: Guitar["id"] };
}

export interface ClearCart {
  type: "clear-cart";
}

export type CartActions =
  | AddToCart
  | RemoveFromCart
  | DecreaseQuantity
  | IncreaseQuantity
  | ClearCart;

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

export const initialState: CartState = {
  data: db,
  cart: initialCart(),
};

const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === "add-to-cart") {
    const itemExists = state.cart.find(
      (guitar) => guitar.id === action.payload.item.id
    );

    let updatedCart: CartItem[] = [];
    if (itemExists) {
      updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          if (item.quantity >= MAX_ITEMS) return item;
          return { ...item, quantity: item.quantity++ };
        }
        return item;
      });
    } else {
      const newItem: CartItem = { ...action.payload.item, quantity: 1 };
      updatedCart = [...state.cart, newItem];
    }

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "remove-from-cart") {
    const updatedCart = state.cart.filter(
      (item) => item.id !== action.payload.id
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "decrease-quantity") {
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        const quantity =
          item.quantity === MIN_ITEMS ? item.quantity : item.quantity - 1;
        return { ...item, quantity };
      }
      return item;
    });

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "increase-quantity") {
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        const quantity =
          item.quantity === MAX_ITEMS ? item.quantity : item.quantity + 1;
        return { ...item, quantity };
      }
      return item;
    });

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "clear-cart") {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};
