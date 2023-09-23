"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";

type Props = Omit<JSX.IntrinsicElements["button"], "type" | "onClick" | "children">;

export function GoBackBtn(props: Props) {
    const router = useRouter();

    return (
        <button
            {...props}
            type = "button"
            onClick = {() => router.back()}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        cfont-body
                        text-[#7D7D7D] hover:text-dark-orange
                        capitalize
                    `   
                ),
                props.className
            )}
        >
            go back
        </button>
    );
}
