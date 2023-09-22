"use client";

import React from "react";
import { 
    ShowModalType, 
    ShowModalTypeContext 
} from "~/contexts/ShowModalType";

type Props = {
    children: React.ReactNode
};

export function ShowModalTypeContextProvider(props: Props) {
    const [showModalType, setShowModalType] = React.useState<ShowModalType>("none");

    return (
        <ShowModalTypeContext.Provider
            value = {[showModalType, setShowModalType]}
        >
            {props.children}
        </ShowModalTypeContext.Provider>
    );
}
