"use client";

import React from "react";
import { Quantity } from "~/components/Quantity";
import { AddToOrRemoveFromCartBtn } from "~/components/AddToOrRemoveFromCartBtn";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { Loading } from "~/components/Loading";
import { useCartContext } from "~/custom-hooks/useCartContext";
import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";

type Props = {
    product: {
        name: string,
        image: string,
        slug: string,
        price: number
    },
    className?: string
};

export function QuantityAndAddToCart(props: Props) {
    const [cart, setCart] = useCartContext();
    const [showModalType] = useShowModalTypeContext();
    const [quantity, setQuantity] = React.useState<number | undefined>();
    const productSlug = props.product.slug;
    const productInCart = Boolean(cart?.find(cartItem => cartItem.slug === productSlug));

    React.useEffect(() => {
        if (!cart) {
            return;
        }
        if (quantity === undefined) {
            const targetProduct = cart.find(cartItem => cartItem.slug === productSlug);
            setQuantity(targetProduct ? targetProduct.quantity : 1);
        }
    }, [cart, quantity, productSlug]);

    React.useEffect(() => {
        // showModalType cart check will prevent this effect from running when the cart modal is open
        if (!cart || quantity === undefined || showModalType === "cart") {
            return;
        }
        const product = cart.find(cartItem => cartItem.slug === productSlug);
        if (!product || product.quantity === quantity) {
            return;
        }
        setCart(cart.map(cartItem => (
            cartItem.slug === productSlug 
            ? {...cartItem, quantity}
            : cartItem
        )));
    }, [cart, quantity, productSlug, setCart, showModalType]);

    React.useEffect(() => {
        if (!cart) {
            return;
        }
        if (showModalType === "cart") {
            const product = cart.find(cartItem => cartItem.slug === productSlug);
            if (!product || product.quantity === quantity) {
                return;
            }
            setQuantity(product.quantity);
        }
    }, [showModalType, cart, productSlug, quantity]);

    const handleAddToOrRemoveFromCartClick = () => {
        if (!cart) {
            return;
        }
        if (productInCart) {
            setCart(cart.filter(cartItem => cartItem.slug !== productSlug));
        } else if (quantity !== undefined) {
            setCart([
                ...cart,
                {
                    ...props.product,
                    quantity
                }
            ]);
        }
    };

    let content: React.ReactNode = null;
    if (quantity !== undefined && productInCart !== undefined && cart !== undefined) {
        content = (
            <>
                <Quantity
                    disableDecrementBtn = {quantity === 1}
                    onIncrement = {() => setQuantity(quantity + 1)}
                    onDecrement = {() => setQuantity(Math.max(quantity - 1, 1))}
                >
                    {quantity}
                </Quantity>
                <AddToOrRemoveFromCartBtn
                    productInCart = {productInCart}
                    onClick = {handleAddToOrRemoveFromCartClick}
                />
            </>
        );
    }

    const loading = quantity === undefined || productInCart === undefined || cart === undefined;

    return (
        <div
            className = {twMerge(
                helpers.formatClassName(
                   `
                        flex
                        flex-col
                        gap-y-2
                    `
                ),
                props.className
            )}
        >
            <Loading
                loading = {loading}
                showLoadedMessage = {false}
            >
                {
                    loading
                    ? "Loading quantity & cart button"
                    : "Loaded quantity & cart button"
                }
            </Loading>
            <div
                className = {helpers.formatClassName(
                    `
                        flex
                        gap-x-4
                        gap-y-2
                        items-center
                        flex-wrap
                    `
                )}
            >
                {content}
            </div>
        </div>
    );
}
