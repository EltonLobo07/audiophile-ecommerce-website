import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";

type Props = JSX.IntrinsicElements["div"];

export const maxWitdhContainerClassName = helpers.formatClassName(
    `
        max-w-screen-laptopAndUp mx-auto
        px-[24px] tabAndUp:px-[40px] laptopAndUp:px-[8px]
    `
);

export function MaxWidthContainer(props: Props) {
    return (
        <div
            {...props}
            className = {twMerge(
                maxWitdhContainerClassName,
                props.className
            )}
        />
    );
}
