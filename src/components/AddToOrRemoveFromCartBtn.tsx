"use client";

import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";

type Props = {
    productInCart: boolean,
    onClick: () => void,
    className?: string
};

export function AddToOrRemoveFromCartBtn(props: Props) {
    return (
        <button
            type = "button"
            onClick = {props.onClick}
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
            {`${props.productInCart ? "remove from" : "add to"} cart`}
        </button>
    );
}
