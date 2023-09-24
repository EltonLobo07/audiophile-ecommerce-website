import { helpers } from "~/helpers";
import { CustomImage } from "~/components/CustomImage";
import { CustomLink } from "~/components/CustomLink";
import { ArrowRight } from "~/components/icons/ArrowRight";
import Image from "next/image";
import { CustomModalCloseLink } from "~/components/CustomModalCloseLink";

type Props = {
    category: {
        name: string, 
        images: Record<"desktop" | "tablet" | "mobile", string>
    },
    useModalCloseLink?: boolean
};

function areAllPathsTheSame(images: Props["category"]["images"]) {
    return images.desktop === images.tablet && images.tablet === images.mobile;
}

export function RootCategoryCard(props: Props) {
    const commonImgContainerClassName = helpers.formatClassName(
        `
            mx-auto
            w-[10.3125rem] laptopAndUp:w-52 
            h-[9.25rem] laptopAndUp:h-48        
        `
    );
    const nativeImgAlt = `sample from ${props.category.name} category`;
    const nativeImgClassName = "object-top";
    const Link = props.useModalCloseLink ? CustomModalCloseLink : CustomLink;

    return (
        <li
            className = {helpers.formatClassName(
                `
                    flex-grow
                    pb-[22px] laptopAndUp:pb-[30px]
                    relative
                    flex flex-col gap-y-1
                    text-wrap
                `
            )}
        >
            <div
                className = {helpers.formatClassName(
                    `
                        w-full 
                        h-[75%] 
                        rounded-2 
                        bg-grayish-white
                        absolute
                        bottom-0
                    `
                )}
            ></div>
            {
                areAllPathsTheSame(props.category.images)
                ? (
                    <div
                        className = {helpers.formatClassName(
                            `
                                relative
                                ${commonImgContainerClassName}
                            `
                        )}
                    >
                        <Image 
                            fill
                            src = {props.category.images.desktop}
                            alt = {nativeImgAlt}
                            className = {nativeImgClassName}
                            sizes = "(min-width: 69.375rem) 13rem, 10.3125rem"
                        />
                    </div>
                ) : (
                    <CustomImage
                        nativePictureProps = {{
                            className: commonImgContainerClassName
                        }}
                        nativeImgProps = {{
                            alt: nativeImgAlt,
                            className: nativeImgClassName
                        }}
                        images = {props.category.images}
                    />
                )
            }
            <div
                className = {helpers.formatClassName(
                    `
                        flex 
                        flex-col
                        items-center 
                        gap-y-4 
                        relative
                    `
                )}
            >
                <div
                    className = "cfont-h6"
                >
                    {props.category.name}
                </div>
                <Link
                    href = {`/categories/${props.category.name}`}
                    className = {helpers.formatClassName(
                        `
                            flex
                            gap-x-1
                            items-center
                            text-[#787878]
                            cfont-subtitle
                        `
                    )}
                >
                    shop 
                    <ArrowRight />
                </Link>
            </div>
        </li>
    );
}
