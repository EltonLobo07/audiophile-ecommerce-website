"use client";

import { twMerge } from "tailwind-merge";
import { RootNav } from "~/components/RootNav";
import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";

type Props = {
    rootNav: JSX.Element
};

export function RootHeaderNavDisplayer(props: Props) {
    const [showModalType] = useShowModalTypeContext();
    return showModalType !== "nav-menu" ? props.rootNav : null; 
}
