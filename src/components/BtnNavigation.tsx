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
            aria-label = "toggle navigation menu's visibility"
            onClick = {() => setShowModalType(showModalType === "navigation" ? "none" : "navigation")}
            className = {props.className}
        >
            {showModalType === "navigation" ? props.openContent : props.closeContent}
        </button>
    );
}
