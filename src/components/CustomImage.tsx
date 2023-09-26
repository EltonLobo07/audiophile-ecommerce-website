"use client";

import React, { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";

type Props = {
    nativePictureProps?: Omit<JSX.IntrinsicElements["picture"], "children">,
    nativeImgProps: Omit<JSX.IntrinsicElements["img"], "src" | "alt" | "ref"> & Record<"alt", string>,
    images: Record<"desktop" | "tablet" | "mobile", string>,
    filterProps?: Omit<JSX.IntrinsicElements["div"], "children">,
    isDecorative?: boolean
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

    const imgRef = React.useRef<HTMLImageElement | null>(null);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    React.useEffect(() => {
        const imgElement = imgRef.current;
        if (!imgElement) {
            return;
        }
        const eventName = "load";
        const handleLoad = () => {
            setImageLoaded(true);
        };
        imgElement.addEventListener(eventName, handleLoad);
        return () => {
            imgElement.removeEventListener(eventName, handleLoad);
        };
    }, []);

    React.useEffect(() => {
        const imgElement = imgRef.current;
        if (!imgElement) {
            return;
        }
        if (imgElement.complete) {
            setImageLoaded(true);
        }
    }, []);

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
                ref = {imgRef}
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
                            ${props.isDecorative && !imageLoaded ? "invisible" : ""}
                        `
                    ),
                    props.nativeImgProps.className
                )}
            />
            {
                props.filterProps && imageLoaded && (
                    <div
                        {...props.filterProps}
                        className = {twMerge(helpers.formatClassName(
                            `
                                absolute
                                w-full h-full
                                left-0 top-0
                            `
                        ), props.filterProps.className)}
                    ></div>
                ) 
            }
        </picture>
    );
}
