import { twMerge } from "tailwind-merge";
import { helpers } from "~/src/helpers";

type Props = JSX.IntrinsicElements["div"];

export function MaxWidthContainer(props: Props) {
    return (
        <div
            {...props}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        max-w-screen-laptopAndUp mx-auto
                        px-[24px] tabAndUp:px-[40px] laptopAndUp:px-[16px]
                    `
                ),
                props.className
            )}
        />
    );
}
