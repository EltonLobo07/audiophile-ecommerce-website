"use client";

import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";
import { Cart } from "~/components/icons/Cart";
import { X } from "./icons/X";

type Props = Omit<JSX.IntrinsicElements["button"], "type" | "onClick" | "children">;

export function CartBtn(props: Props) {
    const [showModalType, setShowModalType] = useShowModalTypeContext();
    const commonBtnIconClassName = "w-[1.4375rem] h-5";

    return (
        <button
            {...props}
            type = "button"
            onClick = {() => setShowModalType(showModalType === "cart" ? "none" : "cart")}
        >
            {
                showModalType === "cart"
                ? (
                    <X 
                        aria-label = "close cart modal"
                        className = {commonBtnIconClassName}
                    />
                )
                : (
                    <Cart 
                        aria-label = "open cart modal"
                        className = {commonBtnIconClassName}
                    />
                ) 
            }
        </button>
    );
}
