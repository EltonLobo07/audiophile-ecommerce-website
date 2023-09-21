import React from "react";

type OmitStyle<T extends "div" | "span"> = Omit<JSX.IntrinsicElements[T], "style">;

type Props = 
    | ({inline: true} & OmitStyle<"span">)
    | ({inline: false} & OmitStyle<"div">);

function removeInline<TObj extends object>(obj: TObj): Omit<TObj, "inline"> {
    if ("inline" in obj) {
        const {
            inline,
            ...otherProps
        } = obj;
        return otherProps;
    }
    return obj;
}

const VISUALLY_HIDDEN: React.CSSProperties = {
    display: "inline-block",
    position: "absolute",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    height: 1,
    width: 1,
    margin: 0,
    padding: 0,
    border: 0,
};

export function VisuallyHidden(props: Props) {
    if (props.inline) {
        return (
            <span
                {...removeInline(props)}
                style = {VISUALLY_HIDDEN}
            />
        );
    }
    return (
        <div 
            {...removeInline(props)}
            style = {VISUALLY_HIDDEN}
        />
    );
}
