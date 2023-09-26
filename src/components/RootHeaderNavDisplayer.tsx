"use client";

import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";

type Props = {
    rootNav: JSX.Element
};

export function RootHeaderNavDisplayer(props: Props) {
    const [showModalType] = useShowModalTypeContext();
    return showModalType !== "nav-menu" ? props.rootNav : null; 
}
