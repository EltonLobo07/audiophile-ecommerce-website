"use client";

import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

type Props = Omit<Parameters<typeof Link>[0], "ref"> & {changeColorOfCurPathLink?: boolean};

export const CustomLink = React.forwardRef((props: Props, ref: React.Ref<HTMLAnchorElement> | undefined) => {
    const {
        changeColorOfCurPathLink,
        ...otherProps
    } = props;
    const pathname = usePathname();

    return (
        <Link
            {...otherProps}
            ref = {ref}
            className = {twMerge(
                changeColorOfCurPathLink && otherProps.href === pathname ? "text-light-orange" : "",   
                "hover:text-dark-orange",
                otherProps.className
            )}
        />
    );
});

CustomLink.displayName = "CustomLink";
