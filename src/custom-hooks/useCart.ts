import React from "react";
import { Cart } from "~/contexts/Cart";
import { useSSRSafeLocalStorageState } from "~/custom-hooks/useLocalStorageState";

type CartItem = Cart[number];

export function useCart() {
    const initialState = React.useCallback(() => [], []);
    const isCart = React.useCallback((possibleCart: unknown): possibleCart is CartItem[] => {
        const res = (
            Array.isArray(possibleCart) &&
            possibleCart.every((cartItem: unknown) => (
                cartItem && 
                typeof cartItem === "object" &&
                "name" in cartItem &&
                typeof cartItem["name"] === "string" &&
                "slug" in cartItem &&
                typeof cartItem["slug"] === "string" &&
                "price" in cartItem &&
                typeof cartItem["price"] === "number" &&
                cartItem["price"] > 0 &&
                "quantity" in cartItem &&
                typeof cartItem["quantity"] === "number" && 
                cartItem["quantity"] > 0 &&
                "image" in cartItem &&
                typeof cartItem["image"] === "string"
            ))
        );
        return res;
    }, []);
    const [cart, setCart] = useSSRSafeLocalStorageState<Cart>({
        initialState,
        isState: isCart,
        lsKey: "cart"
    });
    return [cart, setCart] as const;
}
