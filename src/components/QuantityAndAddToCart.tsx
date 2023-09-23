"use client";

import React from "react";
import { Quantity } from "~/components/Quantity";
import { useSSRSafeLocalStorageState } from "~/custom-hooks/useLocalStorageState";
import { AddToOrRemoveFromCartBtn } from "./AddToOrRemoveFromCartBtn";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";

type Props = {
    productSlug: string,
    className?: string
};

export function QuantityAndAddToCart(props: Props) {
    const isQuantity = React.useCallback((possibleQuantity: unknown): possibleQuantity is number => (
        typeof possibleQuantity === "number" &&
        Number.isFinite(possibleQuantity) &&
        possibleQuantity > -1 &&
        Math.trunc(possibleQuantity) === possibleQuantity
    ), []);

    const [quantity, setQuantity] = useSSRSafeLocalStorageState<number>({
        initialState: 0,
        isState: isQuantity,
        lsKey: props.productSlug 
    });

    let content: React.ReactNode = "Loading...";
    if (quantity !== undefined) {
        content = (
            <>
                <Quantity
                    onIncrement = {() => setQuantity(quantity + 1)}
                    onDecrement = {() => setQuantity(Math.max(quantity - 1, 0))}
                >
                    {quantity}
                </Quantity>
                <AddToOrRemoveFromCartBtn
                    productSlug = {props.productSlug}
                />
            </>
        );
    }

    return (
        <div
            className = {twMerge(
                helpers.formatClassName(
                    `
                        flex
                        gap-x-4
                        items-center
                    `
                ),
                props.className
            )}
        >
            {content}
        </div>
    );
}
