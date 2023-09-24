"use client";

import React from "react";
import { Dialog } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { maxWitdhContainerClassName } from "~/components/MaxWidthContainer";
import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";
import { helpers } from "~/helpers";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Loading } from "~/components/Loading";
import { useCartContext } from "~/custom-hooks/useCartContext";
import { CartItem } from "~/components/CartItem";
import { Amount } from "~/components/Amount";
import { CustomModalCloseLink } from "./CustomModalCloseLink";

type Props = {
    Title: typeof Dialog.Title 
};

export function CartModalContent(props: Props) {
    const {
        Title
    } = props;

    const [cart, setCart] = useCartContext();
    const setShowModalType = useShowModalTypeContext()[1];

    let cartItemsContent: JSX.Element = (
        <div 
            className = "cfont-body text-[#7F7F7F]"
        >
            No items in the cart
        </div>
    );
    if (cart !== undefined && cart.length) {
        cartItemsContent = (
            <>
                <div
                    className = {helpers.formatClassName(
                        `
                            flex
                            justify-between
                            flex-wrap
                            gap-x-2
                        `
                    )}
                >
                    <div
                        className = {helpers.formatClassName(
                            `
                                relative
                                flex
                                gap-x-1
                                cfont-h6
                            `
                        )}
                    >
                        <span>
                            cart
                        </span>
                        <VisuallyHidden
                            inline
                        >
                            number of products
                        </VisuallyHidden>
                        <span>
                            {`(${cart.length})`}
                        </span>
                    </div>
                    <button
                        onClick = {() => setCart([])}
                        className = {helpers.formatClassName(
                            `
                                cfont-body
                                text-[#7F7F7F] hover:text-dark-orange
                                underline
                                decoration-[1px]
                            `
                        )}
                    >
                        Remove all
                    </button>
                </div>
                <ul
                    className = {
                        helpers.formatClassName(
                            `
                                flex
                                flex-col
                                gap-y-6
                                min-h-[6rem]
                                overflow-y-auto
                            `
                        )
                    }
                >                    
                    {
                        cart.map(cartItem => (
                            <CartItem 
                                key = {cartItem.slug}
                                cartItem = {cartItem}
                            />
                        ))
                    }
                </ul>
                <div
                    className = {helpers.formatClassName(
                        `
                            flex
                            flex-col
                            gap-y-6
                        `
                    )}
                >
                    <div
                        className = {helpers.formatClassName(
                            `
                                flex
                                flex-wrap
                                gap-x-1
                                justify-between
                            `
                        )}
                    >
                        <span
                            className = {helpers.formatClassName(
                                `
                                    font-sans 
                                    font-medium 
                                    text-[0.9375rem] 
                                    leading-[1.5625rem]
                                    uppercase
                                    text-[#7F7F7F]
                                `
                            )}
                        >
                            total
                        </span>
                        <Amount
                            className = "cfont-cart-total-amount"
                        >
                            {cart.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0)}
                        </Amount>
                    </div>
                    <CustomModalCloseLink
                        href = "/checkout"
                        className = {helpers.formatClassName(
                            `
                              bg-dark-orange hover:bg-light-orange
                              text-white hover:text-white
                                text-center
                                cfont-subtitle
                                py-[0.9375rem]
                                px-[15px]
                            `
                        )}
                    >
                        checkout
                    </CustomModalCloseLink>
                </div>

            </>
        );
    }

    let mainContent: JSX.Element | null = null;
    if (cart !== undefined) {
        mainContent = (
            <div
                className = {helpers.formatClassName(
                    `
                        relative
                        flex
                        flex-col
                        gap-y-8
                        max-h-full
                    `
                )}
            >
                <VisuallyHidden
                    inline = {false}
                >
                    <Title>
                        Cart details
                    </Title>
                </VisuallyHidden>
                {cartItemsContent}
            </div>
        );
    }

    return (
        <div
            className = {twMerge(
                maxWitdhContainerClassName,
                helpers.formatClassName(
                    `
                        fixed
                        top-[8.0625rem]
                        max-h-[calc(100%-8.0625rem)] 
                        left-0
                        right-0
                        flex
                        pb-[4px]
                    `
                )
            )}
        >
            <div
                onClick = {() => setShowModalType("none")}
                className = {helpers.formatClassName(
                    `
                        absolute
                        inset-0
                    `
                )}
            ></div>
            <div
                className = {helpers.formatClassName(
                    `
                        relative
                        ml-auto
                        bg-white
                        px-[28px] tabAndUp:px-[32px]
                        py-[32px]
                        rounded-2
                        max-h-[inherit]
                        overflow-y-auto
                    `
                )}
            >
                <Loading
                    loading = {cart === undefined}
                    showLoadedMessage = {false}
                >
                    {
                        cart === undefined
                        ? "Loading cart"
                        : "loaded items"
                    }
                </Loading>
                {mainContent}   
            </div>
        </div>
    );
}
