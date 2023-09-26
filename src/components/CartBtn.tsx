"use client";

import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";
import { Cart } from "~/components/icons/Cart";
import { X } from "./icons/X";
import { useCartContext } from "~/custom-hooks/useCartContext";
import { Loading } from "./Loading";
import { helpers } from "~/helpers";
import { VisuallyHidden } from "./VisuallyHidden";
import { twMerge } from "tailwind-merge";

type Props = Omit<JSX.IntrinsicElements["button"], "type" | "onClick" | "children">;

export function CartBtn(props: Props) {
    const [showModalType, setShowModalType] = useShowModalTypeContext();
    const [cart] = useCartContext();
    const commonBtnIconClassName = "w-[23px] h-[20px]";    

    let content = (
        <Loading 
            loading
            showLoadedMessage = {false}
            showLoadingMessage = {false}
            loaderClassName = {commonBtnIconClassName}
            className = "gap-y-0"
        >
            Loading cart details
        </Loading>
    );
    if (cart !== undefined) {
        content = (
            <>
                <Loading 
                    loading = {false}
                    showLoadedMessage = {false}
                    showLoadingMessage = {false}
                    loaderClassName = {commonBtnIconClassName}
                >
                    Loaded cart details
                </Loading>
                {
                    showModalType === "cart"
                    ? (
                        <X 
                            aria-label = "close cart modal"
                            className = {commonBtnIconClassName}
                        />
                    )
                    : (
                        <>
                            <Cart 
                                aria-label = "open cart modal"
                                className = {commonBtnIconClassName}
                            />
                            {
                                cart.length === 0
                                ? null
                                : (
                                    <>
                                        <VisuallyHidden
                                            inline
                                        >
                                            item(s) present in the cart
                                        </VisuallyHidden>
                                        <span
                                            className = {helpers.formatClassName(
                                                `
                                                    inline-block
                                                    bg-dark-orange
                                                    w-[12px] h-[12px]
                                                    rounded-full
                                                    absolute
                                                    top-0
                                                    right-0
                                                    translate-x-1/2
                                                    -translate-y-1/2
                                                `
                                            )}
                                        ></span>
                                    </>
                                )
                            }
                        </>
                    ) 
                }
            </>
        );
    }

    return (
        <button
            {...props}
            type = "button"
            onClick = {() => setShowModalType(showModalType === "cart" ? "none" : "cart")}
            className = {twMerge(
                "relative",
                props.className
            )}
        >
            {content}
        </button>
    );
}
