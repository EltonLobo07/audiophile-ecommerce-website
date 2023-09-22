import { ProductAdvertisementProps } from "~/components/ProductAdvertisements";
import { helpers } from "~/helpers";
import { BtnLikeLink } from "~/components/BtnLikeLink";
import { CustomImage } from "~/components/CustomImage";

export function ProductAdvertisementDesign3(props: ProductAdvertisementProps) {
    return (
        <div
            className = {helpers.formatClassName(
                `   
                    flex
                    flex-col-reverse tabAndUp:flex-row-reverse
                    tabAndUp:gap-x-3 laptopAndUp:gap-x-[1.875rem]
                    gap-y-6
                `
            )}
        >
            <div
                className = {helpers.formatClassName(
                    `
                        bg-grayish-white
                        rounded-2
                        px-[24px] tabAndUp:px-[40px] laptopAndUp:px-[95px]
                        w-full tabAndUp:w-1/3 tabAndUp:flex-grow 
                        min-h-[12.5rem]
                        py-[4px]
                        tabAndUp:h-80 tabAndUp:overflow-y-auto
                        flex
                        flex-col
                        gap-y-8
                        text-wrap
                    `
                )}
            >
                <h3
                    className = {helpers.formatClassName(
                        `
                            mt-auto
                            text-black
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
                            mb-auto
                            border
                            w-fit
                            text-black hover:text-white
                            border-current hover:border-black
                            hover:bg-black
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
                            w-full tabAndUp:w-1/3 tabAndUp:flex-grow
                            h-[12.5rem] tabAndUp:h-80
                            rounded-2
                        `
                    )
                }}
                nativeImgProps = {{
                    alt: "",
                    className: "rounded-inherit"
                }}
                images = {props.product.images}
            />
        </div>
    );
}
