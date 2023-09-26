"use client";

import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

type Props = Omit<Parameters<typeof Link>[0], "ref"> & {changeColorOfCurPathLink?: boolean};

export const CustomLink = React.forwardRef((props: Props, ref: React.Ref<HTMLAnchorElement> | undefined) => {
    const pathname = usePathname();
    
    return (
        <Link
            {...props}
            ref = {ref}
            className = {twMerge(
                props.changeColorOfCurPathLink && props.href === pathname ? "text-light-orange" : "",   
                "hover:text-dark-orange",
                props.className
            )}
        />
    );
});

CustomLink.displayName = "CustomLink";
