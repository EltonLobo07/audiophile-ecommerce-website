import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";

type Props = {
    nativePictureProps?: Omit<JSX.IntrinsicElements["picture"], "children">,
    nativeImgProps: Omit<JSX.IntrinsicElements["img"], "src" | "alt"> & Record<"alt", string>,
    images: Record<"desktop" | "tablet" | "mobile", string>
};

function getMinWidthMediaQuery(minWidth: CSSProperties["width"]) {
    return `(min-width: ${minWidth})`;
}

/*
    Make sure to double check the breakpoints, it show match the breakpoints setup of the 
    tailwind config file
*/

export function CustomImage(props: Props) {
    const {
        alt,
        ...otherNativeImgProps
    } = props.nativeImgProps;

    return (
        <picture
            {...props.nativePictureProps}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        relative
                        inline-block
                    `
                ),
                props.nativePictureProps?.className
            )}
        >
            <source 
                media = {getMinWidthMediaQuery("69.375rem")}
                srcSet = {props.images.desktop}
            />
            <source 
                media = {getMinWidthMediaQuery("45rem")}
                srcSet = {props.images.tablet}
            />
            <img 
                alt = {alt}
                {...otherNativeImgProps}
                src = {props.images.mobile}
                className = {twMerge(
                    helpers.formatClassName(
                        `
                            absolute 
                            w-full h-full
                            left-0 top-0
                            object-cover
                            object-center
                        `
                    ),
                    props.nativeImgProps.className
                )}
            />
        </picture>
    );
}
