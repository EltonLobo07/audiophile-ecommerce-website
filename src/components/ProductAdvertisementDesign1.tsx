import { ProductAdvertisementProps } from "~/components/ProductAdvertisements";
import { helpers } from "~/helpers";
import { CirclesPattern } from "~/components/icons/CirclesPattern";
import { BtnLikeLink } from "~/components/BtnLikeLink";
import { CustomImage } from "~/components/CustomImage";

export function ProductAdvertisementDesign1(props: ProductAdvertisementProps) {
    return (
        <div
            className = {helpers.formatClassName(
                `
                    relative
                    overflow-hidden
                    bg-dark-orange
                    rounded-2
                    px-[8px] laptopAndUp:px-[5.9375rem]
                    flex
                    flex-col-reverse laptopAndUp:flex-row-reverse
                    laptopAndUp:items-start
                    laptopAndUp:justify-between
                    gap-y-8 laptopAndUp:gap-y-0
                    pt-[3.4375rem] tabAndUp:pt-[3.25rem] laptopAndUp:pt-24
                    pb-[3.4375rem] tabAndUp:pb-16 laptopAndUp:pb-0
                `
            )}
        >
            <CirclesPattern 
                className = {helpers.formatClassName(
                    //   The width and height are set looking at the design, not math involved
                    `
                        w-[37rem] tabAndUp:w-[54rem] laptopAndUp:w-[59rem] 
                        h-[37rem] tabAndUp:h-[54rem] laptopAndUp:h-[59rem]
                        absolute
                        left-1/2 laptopAndUp:left-[20.0625rem]
                        top-[9.90625rem] tabAndUp:top-[10.65625rem] laptopAndUp:top-auto
                        laptopAndUp:bottom-[calc(15.40625rem-8.5rem)]
                        -translate-x-1/2
                        -translate-y-1/2 laptopAndUp:translate-y-1/2
                    `
                )}
            />
            <div
                className = {helpers.formatClassName(
                    `
                        mx-auto laptopAndUp:mx-0
                        max-w-[min(21.875rem,100%)]
                        flex 
                        flex-col 
                        gap-y-6 
                        items-center laptopAndUp:items-start
                        text-center laptopAndUp:text-start
                        text-wrap
                        relative
                        laptopAndUp:max-h-[calc(30.8125rem-1.5rem)]
                        laptopAndUp:overflow-y-auto
                        laptopAndUp:translate-y-6
                    `                    
                )}
            >
                <h3
                    className = {helpers.formatClassName(
                        `
                            text-white
                            cfont-h2-3 tabAndUp:cfont-h1
                        `
                    )}
                >
                    {props.product.name}
                </h3>
                <p
                    className = {helpers.formatClassName(
                        `
                            text-[#F5DED2]
                            cfont-body
                        `
                    )}
                >
                    {props.product.description}
                </p>
                <BtnLikeLink
                    href = {`/${props.product.category}/${props.product.slug}`}
                    className = {helpers.formatClassName(
                        `
                            bg-black hover:bg-shady-character
                            tabAndUp:mt-4
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
                            w-[min(10.8125rem,100%)] tabAndUp:w-[12.375rem] laptopAndUp:w-[25.625rem]
                            h-[12.9375rem] tabAndUp:h-[14.8125rem] laptopAndUp:h-[30.8125rem]
                            mx-auto laptopAndUp:mx-0
                            laptopAndUp:ml-[1.3125rem]
                            laptopAndUp:translate-y-2
                        `
                    )
                }}
                nativeImgProps = {{
                    alt: "",
                    className: "object-contain"
                }}
                images = {props.product.images}
            />
        </div>
    );
}
