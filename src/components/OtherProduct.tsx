import { helpers } from "~/helpers";
import { CustomImage } from "./CustomImage";
import { BtnLikeLink } from "./BtnLikeLink";

type Props = {
    product: {
        name: string,
        slug: string,
        category: string,
        images: Record<"desktop" | "tablet" | "mobile", string>
    }
};

export function OtherProduct(props: Props) {
    return (
        <section
            className = {helpers.formatClassName(
                `
                    flex
                    flex-col-reverse
                    gap-y-[32px] tabAndUp:gap-y-[40px]
                `
            )}
        >
            <div
                className = {helpers.formatClassName(
                    `
                        mx-auto
                        text-center
                        text-wrap
                        flex
                        flex-col
                        gap-y-8
                    `
                )}
            >
                <span
                    className = {helpers.formatClassName(
                        `
                            cfont-h5
                            text-black
                        `
                    )}
                >
                    {props.product.name}
                </span>
                <BtnLikeLink
                    href = {`/categories/${props.product.category}/${props.product.slug}`}
                    className = {helpers.formatClassName(
                        `
                            bg-dark-orange hover:bg-light-orange
                            text-white
                            cfont-subtitle
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
                            w-full
                            h-[7.5rem] tabAndUp:h-[19.875rem]
                        `
                    )
                }}
                nativeImgProps = {{
                    alt: `${props.product.name} sample`,
                    className: helpers.formatClassName(
                        `
                            rounded-inherit
                            object-contain
                        `
                    )
                }}
                images = {props.product.images}
            />
        </section>
    );
}
