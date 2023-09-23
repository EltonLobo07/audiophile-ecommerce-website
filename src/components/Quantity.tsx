"use client";

import { Minus } from "~/components/icons/Minus";
import { Plus } from "~/components/icons/Plus";
import { helpers } from "~/helpers";
import { VisuallyHidden } from "~/components/VisuallyHidden";

type Props = {
    children: `${number}` | number,
    onIncrement: () => void,
    onDecrement: () => void
};

export function Quantity(props: Props) {
    const commonBtnClassName = helpers.formatClassName(
        `
            p-[0.9375rem] 
            text-[#B5B5B5] hover:text-dark-orange
            hover:bg-gray-300 
        `
    );
    const commonIconClassName = "w-4 h-[1.125rem]";

    return (
        <div
            className = {helpers.formatClassName(
                `
                    flex 
                    gap-x-1
                  bg-grayish-white
                    cfont-subtitle
                    w-fit
                `
            )}
        >
            <button
                onClick = {() => props.onDecrement()}
                className = {commonBtnClassName}
            >
                <Minus 
                    aria-label = "decrease quantity"
                    className = {commonIconClassName}
                />
            </button>
            <div
                aria-atomic
                aria-live = "assertive"
                aria-relevant = "all"
                className = {helpers.formatClassName(
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
                onClick = {() => props.onIncrement()}
                className = {commonBtnClassName}
            >
                <Plus 
                    aria-label = "increase quantity"
                    className = {commonIconClassName}
                />
            </button>
        </div>
    );
}
