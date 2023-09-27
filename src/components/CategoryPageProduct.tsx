import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { BtnLikeLink } from "~/components/BtnLikeLink";
import { CustomImage } from "~/components/CustomImage";

type Props = {
    category: string,
    product: {
        new: boolean,
        name: string,
        slug: string,
        description: string,
        images: Record<"desktop" | "tablet" | "mobile", string>
    },
    imgOnTheRight?: boolean,
    className?: string
};

export function CategoryPageProduct(props: Props) {
    const laptopRowHeight = "laptopAndUp:h-[35rem]";

    const newProduct = (
        props.product.new && (
            <span
                className = {helpers.formatClassName(
                    `
                        cfont-overline
                        text-dark-orange
                        mb-2 tabAndUp:mb-0
                        laptopAndUp:mt-auto
                    `
                )}
            >
                new product
            </span>
        )
    );

    return (
        <section
            aria-label = {props.product.name}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        flex
                        flex-col-reverse 
                        ${props.imgOnTheRight ? "laptopAndUp:flex-row" : "laptopAndUp:flex-row-reverse"}
                        laptopAndUp:gap-x-[125px]
                        gap-y-[32px] tabAndUp:gap-y-[52px] laptopAndUp:gap-y-0
                        mb-[7.5rem] laptopAndUp:mb-40
                    `
                ),
                props.className
            )}
        >
            <div
                className = {helpers.formatClassName(
                    `
                        laptopAndUp:w-1/3
                        tabAndUp:mx-auto laptopAndUp:mx-0
                        tabAndUp:max-w-[35.75rem] laptopAndUp:max-w-[27.8125rem] 
                        laptopAndUp:flex-grow 
                        flex
                        flex-col
                        items-center laptopAndUp:items-start
                        text-center laptopAndUp:text-start
                        gap-y-4
                        text-wrap
                        ${laptopRowHeight}
                        laptopAndUp:overflow-y-auto
                        p-[4px]
                    `
                )}
            >
                {newProduct}
                <h3
                    className = {helpers.formatClassName(
                        `
                            cfont-h4-5
                            tabAndUp:cfont-h2
                            text-black
                            mb-2 tabAndUp:mb-4
                            ${newProduct ? "" : "laptopAndUp:mt-auto"}
                        `
                    )}
                >
                    {props.product.name}
                </h3>
                <p
                    className = {helpers.formatClassName(
                        `
                            cfont-body
                            text-[#7D7D7D]
                            mb-2 laptopAndUp:mb-6
                        `
                    )}
                >
                    {props.product.description}
                </p>
                <BtnLikeLink
                    href = {`/categories/${props.category}/${props.product.slug}`}
                    className = {helpers.formatClassName(
                        `
                            text-white
                            bg-dark-orange hover:bg-light-orange
                            laptopAndUp:mb-auto
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
                            bg-grayish-white
                            rounded-2
                            laptopAndUp:w-1/3 flex-grow
                            h-[20.4375rem] tabAndUp:h-[22rem] ${laptopRowHeight}
                        `
                    )
                }}
                nativeImgProps = {{
                    alt: `${props.product.name} sample`,
                    className: helpers.formatClassName(
                        `
                            rounded-inherit
                            object-contain tabAndUp:object-center
                        `
                    )
                }}
                images = {props.product.images}
            />
        </section>
    );
}
