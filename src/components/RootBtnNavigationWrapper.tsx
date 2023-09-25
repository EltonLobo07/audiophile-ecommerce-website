"use client";

import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";
import { BtnNavigation } from "./BtnNavigation";
import { twMerge } from "tailwind-merge";

type Props = Parameters<typeof BtnNavigation>[0];

export function RootBtnNavigationWrapper(props: Props) {
    const [showModalType] = useShowModalTypeContext();

    return (
        <BtnNavigation 
            {...props}
            className = {twMerge(
                props.className,
                showModalType === "nav-menu"
                ? "laptopAndUp:inline-block laptopAndUp:mr-[3rem]"
                : ""
            )}
        />
    );
}
