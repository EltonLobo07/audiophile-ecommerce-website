"use client";

import { twMerge } from "tailwind-merge";
import { Loader } from "~/components/icons/Loader";
import { helpers } from "~/helpers";
import { VisuallyHidden } from "~/components/VisuallyHidden";

type Props = {
    loading: boolean,
    children: string,
    showLoadingMessage?: boolean,
    showLoadedMessage?: boolean,
    loaderClassName?: string,
    className?: string
};

export function Loading(props: Props) {
    return (
        <div
            className = {twMerge(
                helpers.formatClassName(
                    `
                        flex
                        flex-col
                        gap-y-2
                        items-center
                        text-center
                    `
                ),
                props.className
            )}
        >
            {
                props.loading && (
                    <Loader
                        aria-hidden 
                        className = {twMerge(
                            "animate-spin",
                            props.loaderClassName
                        )}
                    />   
                )
            }
            <div
                aria-atomic
                aria-relevant = "all"
                aria-live = "polite"
                className = {helpers.formatClassName(
                    `
                        relative
                        cfont-body
                        text-[#7F7F7F]
                    `
                )}
            >
                {
                    props.loading
                    ? (props.showLoadingMessage ?? true)
                      ? props.children
                      : (<VisuallyHidden inline>{props.children}</VisuallyHidden>)
                    : (props.showLoadedMessage ?? true)
                      ? props.children
                      : (<VisuallyHidden inline>{props.children}</VisuallyHidden>)
                }
            </div>
        </div>
    );
}
