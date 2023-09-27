"use client";

import { Dialog } from "@headlessui/react";
import { helpers } from "~/helpers";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Check } from "~/components/icons/Check";
import { CustomModalCloseLink } from "~/components/CustomModalCloseLink";
import { Amount } from "~/components/Amount";
import { useCartContext } from "~/custom-hooks/useCartContext";
import { Loading } from "~/components/Loading";
import Image from "next/image";
import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";

type Props = {
    Title: typeof Dialog.Title,
    Description: typeof Dialog.Description
};

export function OrderConfirmationModalContent(props: Props) {
    const {
        Title,
        Description
    } = props;

    const [cart, setCart] = useCartContext();
    const [showModalType, setShowModalType] = useShowModalTypeContext();

    const loading = !Boolean(cart);
    const firstCartItem = cart?.[0];
    const backToHomeBtn = (
        <CustomModalCloseLink
            href = "/"
            onClick = {() => {
                setShowModalType("none");
                setCart([]);
            }}
            className = {helpers.formatClassName(
                `
                    py-[0.9375rem]
                    px-[15px]
                    text-white hover:text-white
                    text-center
                    bg-dark-orange hover:bg-light-orange
                    cfont-subtitle
                    inline-block
                    mt-2 tabAndUp:mt-5
                    w-full
                `
            )}
        >
            back to home
        </CustomModalCloseLink>
    );
    
    return (
        <div
            className = {helpers.formatClassName(
                `
                    fixed
                    left-[24px]
                    right-[24px]
                    w-[min(calc(100%-48px),33.75rem)]
                    mx-auto
                    top-1/2
                    -translate-y-1/2
                    bg-white
                    rounded-[8px]
                    p-[32px] tabAndUp:p-[48px]
                    max-h-full
                    overflow-y-auto
                    text-wrap
                `
            )}
        >
            {
                <Loading
                    showLoadedMessage = {cart && cart.length === 0}
                    loading = {loading}
                >
                    {
                        loading
                        ? "Loading order details"
                        : `Loaded order details${cart && cart.length === 0 ? ". No items present. This shouldn't happen, please contact support" : ""}`
                    }
                </Loading>       
            }
            {
                firstCartItem && (
                    <>
                        <Title>
                            <VisuallyHidden
                                inline
                            >
                                success
                            </VisuallyHidden>
                        </Title>
                        <div
                            className = {helpers.formatClassName(
                                `
                                    flex
                                    flex-col
                                    gap-y-4 tabAndUp:gap-y-6
                                `
                            )}
                        >
                            <Check 
                                aria-hidden
                                strokeWidth = {3}
                                className = {helpers.formatClassName(
                                    `
                                        w-[64px]
                                        h-[64px]
                                        bg-dark-orange
                                        stroke-white
                                        p-[18px]
                                        rounded-full
                                    `
                                )}
                            />
                            <Description
                                className = {helpers.formatClassName(
                                    `
                                        cfont-h3
                                        flex
                                        flex-col
                                        mt-2
                                    `
                                )}
                            >
                                <span>
                                    thank you
                                </span>
                                <span>
                                    for your order
                                </span>
                            </Description>
                            <p
                                className = {helpers.formatClassName(
                                    `
                                        font-sans 
                                        font-normal 
                                        text-[0.9375rem] 
                                        leading-[1.5625rem]
                                        tracking-normal
                                        text-platinum-granite
                                        mb-2
                                    `
                                )}
                            >
                                You will receive an email confirmation shortly.
                            </p>
                            <section
                                className = {helpers.formatClassName(
                                    `
                                        rounded-[8px]
                                        overflow-auto
                                        bg-grayish-white
                                        flex
                                        flex-wrap
                                    `
                                )}
                            >
                                <VisuallyHidden
                                    inline = {false}
                                >
                                    <h3>
                                        short summary
                                    </h3>
                                </VisuallyHidden>
                                <div
                                    className = {helpers.formatClassName(
                                        `
                                            p-6
                                            flex-grow
                                        `
                                    )}
                                >
                                    <div
                                        className = {helpers.formatClassName(
                                            `
                                                flex
                                                gap-x-4
                                            `
                                        )}
                                    >
                                        <Image 
                                            width = {50}
                                            height = {50}
                                            src = {firstCartItem.image}
                                            alt = {`${firstCartItem.name} sample`}
                                            className = {helpers.formatClassName(
                                                `
                                                    object-contain 
                                                    bg-grayish-white
                                                `
                                            )}
                                        />
                                        <div
                                            className = {helpers.formatClassName(
                                                `
                                                    flex
                                                    flex-col
                                                `
                                            )}
                                        >
                                            <span
                                                className = {helpers.formatClassName(
                                                    `
                                                        cfont-modal-main
                                                        text-black
                                                    `
                                                )}
                                            >
                                                {firstCartItem.name}
                                            </span>
                                            <Amount
                                                className = {helpers.formatClassName(
                                                    `
                                                        cfont-modal-price
                                                        text-[#787878]
                                                    `
                                                )}
                                            >
                                                {firstCartItem.price}
                                            </Amount>
                                        </div>
                                        <div
                                            className = {helpers.formatClassName(
                                                `
                                                    relative
                                                    cfont-modal-main
                                                    text-[#787878]
                                                    ml-auto
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
                                                {firstCartItem.quantity}
                                            </span>
                                        </div>
                                    </div>
                                    {
                                        cart.length > 1 && (
                                            <>
                                                <div
                                                    className = {helpers.formatClassName(
                                                        `
                                                            h-[1px]
                                                            bg-gray-300/75
                                                            my-3 
                                                        `
                                                    )}
                                                >
                                                </div>
                                                <div
                                                    className = {helpers.formatClassName(
                                                        `
                                                            text-[#787878]
                                                            font-sans
                                                            font-bold
                                                            text-[0.75rem]
                                                            leading-[1.03125rem]
                                                            tracking-[0.013125rem]
                                                            text-center
                                                        `
                                                    )}
                                                >
                                                    {`and ${cart.length - 1} other item${cart.length - 1 > 1 ? "s" : ""}`}
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                                <div
                                    className = {helpers.formatClassName(
                                        `
                                            bg-black
                                            text-white
                                            p-6
                                            flex
                                            flex-col
                                            justify-center
                                            gap-y-2
                                            flex-grow
                                        `
                                    )}
                                >
                                    <span
                                        className = {helpers.formatClassName(
                                            `
                                                inline-block
                                                uppercase
                                                text-[#808080]
                                            `
                                        )}
                                    >
                                        grand total
                                    </span>
                                    <Amount
                                        className = "cfont-modal-total-amount"
                                    >
                                        {helpers.caculateCartTotal(cart)}
                                    </Amount>
                                </div>
                            </section>
                            {backToHomeBtn}
                        </div>
                    </>
                )
            }
            {
                !firstCartItem && backToHomeBtn
            }
        </div>
    );
}
