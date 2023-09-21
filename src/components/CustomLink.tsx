import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = Omit<Parameters<typeof Link>[0], "ref">;

export const CustomLink = React.forwardRef((props: Props, ref: React.Ref<HTMLAnchorElement> | undefined) => {
    return (
        <Link
            {...props}
            ref = {ref}
            className = {twMerge(
                "hover:text-dark-orange",
                props.className
            )}
        />
    );
});

CustomLink.displayName = "CustomLink";
