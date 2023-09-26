"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";

type Props = {
    forceStartedTyping: boolean,
    children: string,
    capitalizeLabel?: boolean,
    labelProps?: Omit<JSX.IntrinsicElements["label"], "children">,
    inputProps: 
        Omit<JSX.IntrinsicElements["input"], "value" | "onChange" | "pattern"> & 
        {
            value: string,
            onChange: (newValue: string) => void,
            pattern?: string | RegExp
        }
};

export function LabelAndInput(props: Props) {
    const [errorMsg, setErrorMsg] = React.useState("");
    const [typingStarted, setTypingStarted] = React.useState(false);
    const {
        value,
        onChange,
        pattern,
        ...otherInputProps
    } = props.inputProps;

    React.useEffect(() => {
        if (typingStarted) {
            if (otherInputProps.required && !value) {
                setErrorMsg("Field cannot be empty");
            } else if (
                pattern !== undefined && 
                !new RegExp(pattern).test(value)
            ) {
                setErrorMsg("Wrong format");
            } else if (errorMsg) {
                setErrorMsg("");
            }
        }
    }, [typingStarted, otherInputProps.required, pattern, value, errorMsg]);

    React.useEffect(() => {
        if (props.forceStartedTyping && !typingStarted) {
            setTypingStarted(true);
        }   
    }, [props.forceStartedTyping, typingStarted]);

    return (
        <label
            {...props.labelProps}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        flex
                        flex-col
                        gap-y-2
                    `
                ),
                props.labelProps?.className
            )}
        >
            <span
                className = {helpers.formatClassName(
                    `
                        font-sans
                        font-bold
                        text-[0.75rem]
                        leading-[1.03125rem]
                        tracking-[-0.013125rem]
                        flex
                        gap-x-1
                        justify-between
                        ${errorMsg ? "text-dark-red" : "text-black"}
                    `
                )}
            >
                <span
                    className = {helpers.formatClassName(
                        `
                            text-right
                            ${(props.capitalizeLabel ?? true) ? "capitalize" : ""}
                            flex
                            gap-x-[0.1rem]
                        `
                    )}
                >
                    {props.children}
                    {
                        props.inputProps.required && (
                            <span
                                aria-hidden
                                className = "text-dark-red"
                            >
                                *
                            </span>
                        )
                    }
                </span>
                <span
                    aria-atomic
                    aria-relevant = "all"
                    aria-live = "polite"
                    className = {helpers.formatClassName(
                        `
                            font-medium
                            text-right
                        `
                    )}
                >
                    {errorMsg}
                </span>
            </span>
            <input 
                {...otherInputProps}
                value = {value}
                onChange = {e => {
                    if (!typingStarted) {
                        setTypingStarted(true);
                    }
                    onChange(e.target.value);
                }}
                className = {twMerge(
                    helpers.formatClassName(
                        `
                            border
                            ${errorMsg ? "border-dark-red" : "border-american-silver"}
                            focus:outline
                            focus:border-dark-orange
                            outline-dark-orange
                            rounded-2
                            px-[24px]
                            pt-[1.125rem]
                            pb-[1.1875rem]
                            placeholder-[#999999]
                            font-bold
                            text-[0.875rem]
                            leading-[1.195rem]
                            tracking-[-0.015625rem]
                        `
                    ),
                    props.inputProps.className
                )}
            />
        </label>
    );
}
