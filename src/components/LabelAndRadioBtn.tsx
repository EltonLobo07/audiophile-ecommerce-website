"use client";

import React from "react";
import { helpers } from "~/helpers";

// 32 -> 24 -> 24
// 30

type Props = {
    labelProps?: Omit<JSX.IntrinsicElements["label"], "children">,
    inputProps: Omit<
        JSX.IntrinsicElements["input"],
        | "type"
        // So that I don't accidentally style the native input element
        | "style"
        | "className"
        | "id"
    >
    children: string
};

export function LabelAndRadioBtn(props: Props) {
    const [focused, setFocused] = React.useState(false);

    return (
        <label
            {...props.labelProps}
            className = {helpers.formatClassName(
                `
                    cursor-pointer
                    hover:border-dark-orange
                    hover:outline
                    outline-dark-orange
                    border
                    ${focused ? "border-dark-orange" : "border-american-silver"}
                    ${focused ? "outline" : ""}
                    rounded-2
                    pt-[1.125rem]
                    pb-[1.1875rem]
                    px-[16px]
                    flex
                    gap-x-4
                    items-center
                    font-bold
                    text-[0.875rem]
                    leading-[1.195rem]
                    tracking-[-0.015625rem]
                `
            )}
        >
            <div
                className = {helpers.formatClassName(
                    `
                        relative
                        w-[20px]
                        h-[20px]
                        flex
                    `
                )}
            >
                <input 
                    {...props.inputProps}
                    type = "radio"
                    onFocus = {() => setFocused(true)}
                    onBlur = {() => setFocused(false)}
                    className = {
                        helpers.formatClassName(
                            `
                                absolute
                                w-full
                                h-full
                            `
                        )
                    }
                />
                <div
                    className = {helpers.formatClassName(
                        `   
                            relative
                            bg-white
                            w-full
                            h-full
                            rounded-full
                            border
                          border-american-silver
                            flex
                        `
                    )}
                >
                    <div
                        className = {helpers.formatClassName(
                            `
                                w-1/2
                                h-1/2
                                m-auto
                                rounded-full
                                ${props.inputProps.checked ? "bg-dark-orange" : ""}
                            `
                        )}
                    ></div>
                </div>
            </div>
            <span>
                {props.children}
            </span>
        </label>
    );
}
