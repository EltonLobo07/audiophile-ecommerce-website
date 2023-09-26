"use client";

import React from "react";
import { useCartContext } from "~/custom-hooks/useCartContext";
import { Loading } from "~/components/Loading";
import Image from "next/image";
import { helpers } from "~/helpers";
import { Amount } from "~/components/Amount";
import { VisuallyHidden } from "~/components/VisuallyHidden";

type Props = {
    setSubmitClickTimestamp: (timestamp: number) => void
};

export function CheckoutCartSummary(props: Props) {
    const [cart] = useCartContext();
    const mainSectionTitle = "cart summary";
    
    let mainContent = (
        <Loading
            loading
        >
            Loading cart details
        </Loading>
    );
    if (cart !== undefined) {
        let cartContent: JSX.Element | null = null;
        if (cart.length) {
            const cartTotal = helpers.caculateCartTotal(cart);
            const shipping = 50;
            const vat = cartTotal * 0.2;
            const grandTotal = cartTotal + vat + shipping;
            const dtClassName = "cfont-body uppercase text-platinum-granite";
            const ddClassName = "cfont-modal-total-amount";
            const dtDlClassName = "flex justify-between gap-x-2 overflow-x-auto";
            cartContent = (
                <>
                    <ul
                        className = {helpers.formatClassName(
                            `
                                flex
                                flex-col
                                gap-y-6
                                mb-8
                            `
                        )}
                    >
                        {
                            cart.map(cartItem => (
                                <li
                                    key = {cartItem.slug}
                                    className = {helpers.formatClassName(
                                        `
                                            flex
                                            gap-x-[16px]
                                            items-center
                                        `
                                    )}
                                >
                                    <Image 
                                        src = {cartItem.image}
                                        alt = {`${cartItem.name} sample`}
                                        width = {64}
                                        height = {64}
                                        className = {helpers.formatClassName(
                                            `
                                                object-contain
                                                bg-grayish-white
                                                rounded-[8px]
                                                flex-shrink-0
                                            `
                                        )}
                                    />
                                    <div
                                        className = {helpers.formatClassName(
                                            `
                                                flex
                                                flex-col
                                                flex-grow
                                            `
                                        )}
                                    >
                                        <div
                                            className = {helpers.formatClassName(
                                                `
                                                    flex
                                                    gap-x-2
                                                    justify-between
                                                    items-baseline
                                                    cfont-modal-main
                                                `
                                            )}
                                        >
                                            <span
                                                className = {helpers.formatClassName(
                                                    `
                                                        text-black
                                                    `
                                                )}
                                            >
                                                {cartItem.name}
                                            </span>
                                            <span
                                                className = {helpers.formatClassName(
                                                    `
                                                        relative
                                                        text-platinum-granite
                                                    `
                                                )}
                                            >
                                                <VisuallyHidden
                                                    inline
                                                >
                                                    quantity
                                                </VisuallyHidden>
                                                <span
                                                    aria-hidden
                                                >
                                                    x   
                                                </span>
                                                <span>
                                                    {cartItem.quantity}
                                                </span>
                                            </span>
                                        </div>
                                        <Amount
                                            className = {helpers.formatClassName(
                                                `
                                                    cfont-modal-price
                                                    text-platinum-granite
                                                `
                                            )}
                                        >
                                            {cartItem.price}
                                        </Amount>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <dl
                        className = {helpers.formatClassName(
                            `
                                mb-8
                                flex
                                flex-col
                                gap-y-2
                            `
                        )}
                    >
                        <div
                            className = {dtDlClassName}
                        >
                            <dt
                                className = {dtClassName}
                            >
                                total
                            </dt>
                            <dd
                                className = {ddClassName}
                            >
                                <Amount>
                                    {cartTotal}
                                </Amount>
                            </dd>
                        </div>
                        <div
                            className = {dtDlClassName}
                        >
                            <dt
                                className = {dtClassName}
                            >
                                shipping
                            </dt>
                            <dd
                                className = {ddClassName}
                            >
                                <Amount>
                                    {shipping}
                                </Amount>
                            </dd>
                        </div>
                        <div
                            className = {dtDlClassName}
                        >
                            <dt
                                className = {dtClassName}
                            >
                                vat (included)
                            </dt>
                            <dd
                                className = {ddClassName}
                            >
                                <Amount>
                                    {vat}
                                </Amount>
                            </dd>
                        </div>
                        <div
                            className = {helpers.formatClassName(
                                `
                                    ${dtDlClassName}
                                    mt-4
                                `
                            )}
                        >
                            <dt
                                className = {dtClassName}
                            >
                                grand total
                            </dt>
                            <dd
                                className = {helpers.formatClassName(
                                    `
                                        ${dtClassName}
                                        text-dark-orange
                                    `
                                )}
                            >
                                <Amount>
                                    {grandTotal}
                                </Amount>
                            </dd>
                        </div>
                    </dl>
                    <button
                        onClick = {() => props.setSubmitClickTimestamp(Date.now())}
                        className = {helpers.formatClassName(
                            `
                                bg-dark-orange hover:bg-light-orange
                                text-white
                                cfont-subtitle
                                px-[15px]
                                py-[0.9375rem]
                                w-full
                            `
                        )}
                    >
                        continue & pay
                    </button>
                </>
            );
        }

        mainContent = (
            <>
                <Loading
                    loading = {false}
                    showLoadedMessage = {cart.length === 0}
                >
                    {
                        cart.length === 0
                        ? "No items in the cart"
                        : "Loaded cart data"
                    }
                </Loading>
                {cartContent}
            </>
        );
    }

    return (
        <section
            aria-label = {mainSectionTitle}
            className = {helpers.formatClassName(
                `
                    laptopAndUp:flex-shrink-0
                    laptopAndUp:w-[21.875rem]
                    rounded-[8px]
                    bg-white
                    px-[24px] tabAndUp:px-[28px] laptopAndUp:px-[33px]
                    py-[32px]
                    h-fit
                `
            )}
        >
            <h3
                className = {helpers.formatClassName(
                    `
                        cfont-h6
                        text-black
                        mb-8
                    `
                )}
            >
                summary
            </h3>
            {mainContent}
        </section>
    );
}
