"use client";

import { Dialog } from "@headlessui/react";
import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";

type Props = {
    rootHeader: JSX.Element,
    className?: string
};

export function CustomModal(props: Props) {
    const [showModalType, setShowModalType] = useShowModalTypeContext();

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
                <div
                    className = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"
                >
                    <Dialog.Title>
                        Test title
                    </Dialog.Title>
                    <Dialog.Description>
                        Test description
                    </Dialog.Description>
                    {showModalType}
                    <button>test</button>
                </div>
                <div
                    className = "fixed top-0 left-0 right-0"
                >
                    {props.rootHeader}
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
