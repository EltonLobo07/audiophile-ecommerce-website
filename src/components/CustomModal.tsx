"use client";

// import React from "react";
import { Dialog } from "@headlessui/react";
import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";
import { CartModalContent } from "~/components/CartModalContent";
import { MaxWidthContainer } from "./MaxWidthContainer";

type Props = {
    rootHeader: JSX.Element,
    className?: string
};

export function CustomModal(props: Props) {
    const [showModalType, setShowModalType] = useShowModalTypeContext();

    const commonContentModalProps = {
        Title: Dialog.Title,
        Description: Dialog.Description
    };

    return (
        <Dialog
            open = {showModalType !== "none"}
            onClose = {() => setShowModalType("none")}
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
                    : null
                }
                <div
                    className = "fixed top-0 left-0 right-0"
                >
                    {props.rootHeader}
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
