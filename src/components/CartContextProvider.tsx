"use client";

import React from "react";
import { CartContext } from "~/contexts/Cart";
import { useCart } from "~/custom-hooks/useCart";

type Props = {
    children: React.ReactNode
};

export function CartContextProvider(props: Props) {
    const [cart, setCart] = useCart();

    return (
        <CartContext.Provider
            value = {[cart, setCart]}
        >
            {props.children}
        </CartContext.Provider>
    );
}
