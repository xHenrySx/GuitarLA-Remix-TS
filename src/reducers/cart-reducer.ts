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

export const initialState: CartState = {
  data: db,
  cart: [],
};

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === "add-to-cart") {
    return {
      ...state,
    };
  }

  if (action.type === "remove-from-cart") {
    return {
      ...state,
    };
  }

  if (action.type === "decrease-quantity") {
    return {
      ...state,
    };
  }

  if (action.type === "increase-quantity") {
    return {
      ...state,
    };
  }

  if (action.type === "clear-cart") {
    return {
      ...state,
    };
  }

  return state;
};
