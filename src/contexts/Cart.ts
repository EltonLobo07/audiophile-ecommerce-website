"use client";

import React from "react";
import { StateAndSetter } from "~/type-helpers";

export type Cart = {
  image: string,
  name: string,
  slug: string,
  price: number,
  quantity: number
}[];

type CartOrUndefined = Cart | undefined;

export const CartContext = React.createContext<StateAndSetter<CartOrUndefined> | null>(null);
