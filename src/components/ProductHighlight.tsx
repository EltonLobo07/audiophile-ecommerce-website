import { dataHelpers } from "~/data/data-helpers";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { MaxWidthConstrainedDivider } from "~/components/MaxWidthConstrainedDivider";
import { helpers } from "~/helpers";
import { BtnLikeLink } from "~/components/BtnLikeLink";
import { MaxWidthContainer } from "~/components/MaxWidthContainer";
import { CustomImage } from "~/components/CustomImage";
import { twMerge } from "tailwind-merge";

type Props = {
    className?: string
};

export async function ProductHighlight(props: Props) {
    const product = await dataHelpers.getHomePageProductHighlight();
    const sectionTitle = "Today's highlighted product";

    const commonCustomImgAndShadowClassName = helpers.formatClassName(
        `
            max-w-[26rem]
            tabAndUp:max-w-[50.75rem]
            laptopAndUp:max-w-full
            mx-auto laptopAndUp:mx-0
        `
    );

    return (
        <section
            aria-label = {sectionTitle}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        relative
                        text-wrap
                        h-[31.9375rem] tabAndUp:h-[40rem] laptopAndUp:h-[39.5625rem]
                        bg-chaos-black
                    `
                ),
                props.className
            )}
        >
            <VisuallyHidden
                inline = {false}
            >
                <h2>
                    {sectionTitle}
                </h2>
            </VisuallyHidden>
            <MaxWidthContainer
                className = {helpers.formatClassName(
                    `
                        relative
                        h-full overflow-y-auto
                        flex
                    `
                )}
            >
                {/*
                    Placed image inside the max width container so that the image
                    doesn't grow in width on large width screen
                */}
                <CustomImage 
                    nativePictureProps = {{
                        className: helpers.formatClassName(
                            `
                                absolute 
                                inset-0
                                ${commonCustomImgAndShadowClassName}
                            `
                        )
                    }}
                    nativeImgProps = {{
                        alt: "",
                        className: helpers.formatClassName(
                            `
                                object-bottom
                            `
                        )
                    }}
                    images = {product.images}
                />
                {/*
                    The below filter allows the image to blend with the background. 
                    For everything to work properly, make sure the filter is just above
                    the image all the time
                */}
                <div
                    className = {helpers.formatClassName(
                        `
                            absolute 
                            w-full h-full
                            left-0 right-0
                            bg-black opacity-[0.375]
                            ${commonCustomImgAndShadowClassName}
                        `
                    )}
                ></div>
                <div
                    className = {helpers.formatClassName(
                        `
                            relative
                            flex
                            flex-col
                            gap-y-4
                            items-center laptopAndUp:items-start
                            text-center laptopAndUp:text-start
                            mx-auto laptopAndUp:mx-0
                            my-auto
                            max-h-full overflow-y-auto
                            tabAndUp:max-w-[min(100%,25rem)]
                        `
                    )}
                >
                    <span
                        className = {helpers.formatClassName(
                            `
                                inline-block
                                tabAndUp:mb-2
                                cfont-overline
                                text-[#8D8D8D]
                            `
                        )}
                    >
                        new product
                    </span>
                    <h3
                        className = {helpers.formatClassName(
                            `
                                cfont-h2-3 tabAndUp:cfont-h1
                                mb-2
                                text-white
                            `
                        )}
                    >
                        {product.name}
                    </h3>
                    <p
                        className = {helpers.formatClassName(
                            `
                                cfont-body
                                text-[#C6C6C6]
                                mb-3 tabAndUp:mb-6
                            `
                        )}
                    >
                        {product.shortDescription}
                    </p>
                    <BtnLikeLink
                        href = {`/categories/${product.category}/${product.slug}`}
                        className = {helpers.formatClassName(
                            `
                                w-fit
                                bg-dark-orange hover:bg-light-orange
                            `
                        )}
                    >
                        see product
                    </BtnLikeLink>
                </div>
            </MaxWidthContainer>
            <MaxWidthConstrainedDivider />
        </section>
    );
}
