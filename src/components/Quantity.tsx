"use client";

import { Minus } from "~/components/icons/Minus";
import { Plus } from "~/components/icons/Plus";
import { helpers } from "~/helpers";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { twMerge } from "tailwind-merge";

type Props = {
    children: `${number}` | number,
    onIncrement: () => void,
    onDecrement: () => void,
    disableDecrementBtn?: boolean,
    btnClassName?: string,
    quantityClassName?: string,
    className?: string
};

export function Quantity(props: Props) {
    const commonBtnClassName = twMerge(
        helpers.formatClassName(
            `
                p-[0.9375rem] 
                text-[#B5B5B5] hover:text-dark-orange
                hover:bg-gray-300
                text-[1.125rem]
            `
        ),
        props.btnClassName
    );
    const commonIconClassName = "w-4 h-[1.125rem]";

    return (
        <div
            className = {twMerge(
                helpers.formatClassName(
                    `
                        flex 
                        gap-x-1
                      bg-grayish-white
                        cfont-subtitle
                        w-fit
                    `
                ),
                props.className
            )}
        >
            <button
                disabled = {props.disableDecrementBtn ?? false}
                aria-label = "decrease quantity"
                onClick = {() => props.onDecrement()}
                className = {twMerge(
                    props.disableDecrementBtn
                    ? "opacity-30"
                    : "",
                    commonBtnClassName
                )}
            >
                -
            </button>
            <div
                aria-atomic
                aria-live = "assertive"
                aria-relevant = "all"
                className = {twMerge(
                    helpers.formatClassName(
                        `
                            relative
                            cfont-subtitle
                            px-1
                            py-[0.9375rem]
                            text-black
                            text-center
                            break-normal
                            overflow-x-auto
                            w-[5ch]
                        `
                    ),
                    props.quantityClassName
                )} 
            >
                <VisuallyHidden
                    inline
                >
                    current quantity
                </VisuallyHidden>
                <span>
                    {props.children}
                </span>
            </div>
            <button
                aria-label = "increase quantity"
                onClick = {() => props.onIncrement()}
                className = {commonBtnClassName}
            >
                +
            </button>
        </div>
    );
}
