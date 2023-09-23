"use client";

import React from "react";
import { CartContext } from "~/contexts/Cart";
import { useSSRSafeLocalStorageState } from "~/custom-hooks/useLocalStorageState";

type Props = {
    children: React.ReactNode
};

export function CartContextProvider(props: Props) {
    const initialState = React.useCallback(() => [], []);
    const isCart = React.useCallback((possibleCart: unknown): possibleCart is string[] => (
        Array.isArray(possibleCart) &&
        possibleCart.every(inCart => typeof inCart === "string")
    ), []);

    const [cart, setCart] = useSSRSafeLocalStorageState({
        initialState,
        isState: isCart,
        lsKey: "cart"
    });

    const setCartWrapper = React.useCallback((newCart: string[] | (() => string[])) => {
        setCart(newCart);
    }, [setCart]);

    return (
        <CartContext.Provider
            value = {[cart, setCartWrapper]}
        >
            {props.children}
        </CartContext.Provider>
    );
}
