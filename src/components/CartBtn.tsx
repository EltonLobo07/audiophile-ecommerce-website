"use client";

import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";
import { Cart } from "~/components/icons/Cart";

type Props = Omit<JSX.IntrinsicElements["button"], "type" | "onClick" | "children">;

export function CartBtn(props: Props) {
    const [showModalType, setShowModalType] = useShowModalTypeContext();

    return (
        <button
            {...props}
            type = "button"
            onClick = {() => setShowModalType(showModalType === "cart" ? "none" : "cart")}
        >
            <Cart 
                aria-label = "toggle cart modal"
            />
        </button>
    );
}
