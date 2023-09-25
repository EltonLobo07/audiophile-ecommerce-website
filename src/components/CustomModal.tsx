"use client";

import { Dialog } from "@headlessui/react";
import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";
import { CartModalContent } from "~/components/CartModalContent";
import { RootNavModal } from "~/components/RootNavModal";
import { OrderConfirmationModalContent } from "~/components/OrderConfirmationModalContent";
import { useCartContext } from "~/custom-hooks/useCartContext";

type Props = {
    rootHeader: JSX.Element,
    rootCategoryUnorderedList: JSX.Element,
    className?: string
};

export function CustomModal(props: Props) {
    const [showModalType, setShowModalType] = useShowModalTypeContext();
    const setCart = useCartContext()[1];

    const commonContentModalProps = {
        Title: Dialog.Title,
        Description: Dialog.Description
    };

    return (
        <Dialog
            open = {showModalType !== "none"}
            onClose = {() => {
                if (showModalType === "order-confirmation") {
                    setCart([]);
                }
                setShowModalType("none");
            }}
            className = {props.className}
        >
            <div 
                className = "fixed inset-0 bg-black/40"
            />
            <Dialog.Panel
                className = "relative"
            >
                {
                    showModalType === "cart"
                    ? <CartModalContent {...commonContentModalProps} />
                    : showModalType === "nav-menu"
                      ? (
                        <RootNavModal 
                            {...commonContentModalProps}
                            rootCategoryUnorderedList = {props.rootCategoryUnorderedList} 
                        />
                      )
                      : showModalType === "order-confirmation"
                        ? <OrderConfirmationModalContent {...commonContentModalProps} />
                        : null
                }
                {
                    showModalType !== "order-confirmation" && (
                        <div
                            className = "fixed top-0 left-0 right-0"
                        >
                            {props.rootHeader}
                        </div>
                    )
                }
            </Dialog.Panel>
        </Dialog>
    );
}
