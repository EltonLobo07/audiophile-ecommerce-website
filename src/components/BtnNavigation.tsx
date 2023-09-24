"use client";

import React from "react";
import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";

type Props = {
    openContent: JSX.Element,
    closeContent: JSX.Element,
    className?: string
};

export function BtnNavigation(props: Props) {
    const [showModalType, setShowModalType] = useShowModalTypeContext();

    return (
        <button
            onClick = {() => setShowModalType(showModalType === "nav-menu" ? "none" : "nav-menu")}
            className = {props.className}
        >
            {showModalType === "nav-menu" ? props.openContent : props.closeContent}
        </button>
    );
}
