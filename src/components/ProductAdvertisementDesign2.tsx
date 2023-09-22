import { ProductAdvertisementProps } from "~/components/ProductAdvertisements";
import { helpers } from "~/helpers";
import { BtnLikeLink } from "./BtnLikeLink";
import { CustomImage } from "./CustomImage";

export function ProductAdvertisementDesign2(props: ProductAdvertisementProps) {
    return (
        <div
            className = {helpers.formatClassName(
                `
                    h-80 
                    relative
                    rounded-2
                    isolate
                    flex
                    px-[8px]
                `
            )}
        >
            {/*
                I guess the figma design file has an inward box shadow applied. 
                For now, I will add a tiny amount of black color so that the content looks darker
            */}
            <div
                className = {helpers.formatClassName(
                    `
                        absolute 
                        w-full h-full 
                        top-0 left-0 
                        bg-black/30
                        z-10 
                        rounded-inherit
                    `
                )}
            ></div>
            <div
                className = {helpers.formatClassName(
                    `
                        relative z-10
                        ml-[16px] tabAndUp:ml-[54px] laptopAndUp:ml-[87px]
                        my-auto 
                        flex flex-col gap-y-8 
                      text-black
                        text-wrap
                    `
                )}
            >
                <h3
                    className = {helpers.formatClassName(
                        `
                            cfont-h4
                        `
                    )}
                >
                    {props.product.name}
                </h3>
                <BtnLikeLink
                    href = {`/categories/${props.product.category}/${props.product.slug}`}
                    className = {helpers.formatClassName(
                        `
                            text-black hover:text-white
                            border 
                            border-current hover:border-black  
                            hover:bg-black
                            w-fit
                        `
                    )}
                >
                    see product
                </BtnLikeLink>
            </div>
            <CustomImage 
                nativePictureProps = {{
                    className: helpers.formatClassName(
                        `
                            absolute
                            w-full h-full
                            top-0 left-0 
                            rounded-inherit
                        `
                    )
                }}
                nativeImgProps = {{
                    alt: "",
                    className: helpers.formatClassName(
                        `
                            object-bottom
                            rounded-inherit
                        `
                    )
                }}
                images = {props.product.images}
            />
        </div>
    );
}
