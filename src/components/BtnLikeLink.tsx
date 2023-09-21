import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";

type Props = Parameters<typeof Link>[0];

export function BtnLikeLink(props: Props) {
    return (
        <Link
            {...props}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        px-[1.875rem]
                        py-[0.9375rem]
                        text-white
                        cfont-subtitle
                    `
                ),
                props.className
            )}
        />
    );
}
