"use client";

import { twMerge } from "tailwind-merge";
import { useCartContext } from "~/custom-hooks/useCartContext";
import { helpers } from "~/helpers";

type Props = {
    productSlug: string,
    className?: string
};

export function AddToOrRemoveFromCartBtn(props: Props) {
    const [cart, setCart] = useCartContext();

    if (cart === undefined) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    const handleClick = () => {
        const newCart: string[] = [];
        let productSlugFoundInCart = false;
        for (let i = 0; i < cart.length; i += 1) {
            const curInCartProductSlug = cart[i];
            if (curInCartProductSlug === props.productSlug) {
                productSlugFoundInCart = true;
            } else {
                newCart.push(curInCartProductSlug);
            }
        }
        if (!productSlugFoundInCart) {
            newCart.push(props.productSlug);
        }
        setCart(newCart);
    };

    return (
        <button
            onClick = {handleClick}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        text-white
                        cfont-subtitle
                        bg-dark-orange hover:bg-light-orange
                        px-[30px]
                        py-[0.9375rem]                    
                    `
                ),
                props.className
            )}
        >
            {`${cart.includes(props.productSlug) ? "remove from" : "add to"} cart`}
        </button>
    );
}
