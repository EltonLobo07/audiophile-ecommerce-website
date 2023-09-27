import { notFound } from "next/navigation";
import { Amount } from "~/components/Amount";
import { CustomImage } from "~/components/CustomImage";
import { GoBackBtn } from "~/components/GoBackBtn";
import { InTheBoxTable } from "~/components/InTheBoxTable";
import { OtherProduct } from "~/components/OtherProduct";
import { QuantityAndAddToCart } from "~/components/QuantityAndAddToCart";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { dataHelpers } from "~/data/data-helpers";
import { helpers } from "~/helpers";

export async function generateStaticParams() {
    const products = await dataHelpers.getProducts();
    return products.map(product => ({
        category: product.category,
        product: product.slug
    }))
}

type Props = {
    params: {
        category: string,
        product: string
    }
};

function getFeatureParagraphsAndLineBreaks(text: string): JSX.Element[] {
    const featuresJSX: JSX.Element[] = [];
    const featuresStrNewLineIndices = helpers.getNewLineIndices(text);
    let startIdx = 0;
    for (let i = 0; i < featuresStrNewLineIndices.length; i += 1) {
        const curNewLineIdx = featuresStrNewLineIndices[i];
        const slice = text.slice(startIdx, curNewLineIdx);
        if (slice) {
            featuresJSX.push(
                <p
                    key = {`${startIdx},${curNewLineIdx}`}
                >
                    {slice}
                </p>
            );
        }
        featuresJSX.push(
            <br 
                key = {`${curNewLineIdx}`}
            />
        );
        startIdx = curNewLineIdx + 1;
    }
    const slice = text.slice(startIdx, text.length);
    if (slice) {
        featuresJSX.push(
            <p
                key = {`${startIdx},${text.length}`}
            >
                {slice}
            </p>
        );
    }
    return featuresJSX;
}

export default async function ProductPage(props: Props) {
    if (!(await dataHelpers.isProductOfCategoryPresent({
        category: props.params.category,
        productSlug: props.params.product
    }))) {
        notFound();
    }
    const product = await dataHelpers.getProduct({
        productSlug: props.params.product,
        category: props.params.category
    });
    if (!product) {
        return (
            <div>
                Product not found
            </div>
        );
    }
    const mainSectionTitle = "product details";
    const primaryDetailsSectionTitle = "primary details";
    const secondaryDetailsSectionTitle = "secondary details";
    const imagesSectionTitle = "images of the product";
    const similarOrRelatedProductsSectionTitle = "similar or related products";
    const galeryImageBgColor = "bg-grayish-white";
    const tabLaptopHeight = "tabAndUp:h-[30rem] laptopAndUp:h-[35rem]";
    const featureInTheBoxHeaderClassName = helpers.formatClassName(
        `
            cfont-h5 tabAndUp:cfont-h3
            text-black
            laptopAndUp:mb-8
        `
    ); 
    const newProduct = product.new && (
        <span
            className = {helpers.formatClassName(
                `
                    cfont-overline
                    text-dark-orange
                    tabAndUp:mt-auto
                    mb-2 tabAndUp:mb-0
                `
            )}
        >
            new product
        </span>
    );

    return (
        <>
            <GoBackBtn
                className = {helpers.formatClassName(
                    `
                        mt-4 tabAndUp:mt-[2.125rem] laptopAndUp:mt-20
                        mb-6 laptopAndUp:mb-14
                    `
                )}
            />
            <section
                aria-label = {mainSectionTitle}
                className = {helpers.formatClassName(
                    `
                        relative
                        mb-[7.5rem] laptopAndUp:mb-40
                    `
                )}
            >
                <VisuallyHidden
                    inline = {false}
                >
                    <h2>
                        {mainSectionTitle}
                    </h2>
                </VisuallyHidden>
                <section
                    aria-label = {primaryDetailsSectionTitle}
                    className = {helpers.formatClassName(
                        `
                            relative
                            flex
                            flex-col-reverse tabAndUp:flex-row-reverse
                            tabAndUp:gap-x-[69px] laptopAndUp:gap-x-[125px]
                            ${newProduct ? "gap-y-[32px]" : "gap-y-[40px]"} tabAndUp:gap-y-0
                        `
                    )}
                >
                    <VisuallyHidden
                        inline = {false}
                    >
                        <h3>
                            {primaryDetailsSectionTitle}
                        </h3>
                    </VisuallyHidden>
                    <section
                        aria-label = {product.name}
                        className = {helpers.formatClassName(
                            `
                                tabAndUp:flex-shrink-0
                                tabAndUp:w-[21.25rem]
                                laptopAndUp:w-[27.8125rem]
                                flex 
                                flex-col
                                gap-y-4
                                text-wrap
                                ${tabLaptopHeight}
                                tabAndUp:overflow-y-auto
                                mb-[5.5rem] tabAndUp:mb-[7.5rem] laptopAndUp:mb-40
                                p-[4px]
                            `
                        )}
                    >
                        {newProduct}
                        <h4
                            className = {helpers.formatClassName(
                                `
                                    text-black
                                    cfont-h4-5 laptopAndUp:cfont-h2
                                    ${newProduct ? "" : "mt-auto"}
                                    mb-2 tabAndUp:mb-4
                                `
                            )}
                        >
                            {product.name}
                        </h4>
                        <p
                            className = {helpers.formatClassName(
                                `
                                    text-[#7D7D7D]
                                    cfont-body
                                    mb-2 tabAndUp:mb-4
                                `
                            )}
                        >
                            {product.description}
                        </p>
                        <Amount
                            className = "mb-4 laptopAndUp:mb-8"
                        >
                            {product.price}
                        </Amount>
                        <QuantityAndAddToCart
                            product = {{
                                name: product.shortName,
                                image: product.cartImage,
                                price: product.price,
                                slug: product.slug
                            }}
                            className = "tabAndUp:mb-auto"
                        />
                    </section>
                    <CustomImage
                        nativePictureProps = {{
                            className: helpers.formatClassName(
                                `
                                    rounded-2
                                    bg-grayish-white
                                    w-full tabAndUp:flex-grow
                                    aspect-square tabAndUp:aspect-auto
                                    max-h-[26.25rem] tabAndUp:max-h-none
                                    ${tabLaptopHeight}
                                `
                            )
                        }} 
                        nativeImgProps = {{
                            alt: `${product.name} sample`,
                            className: helpers.formatClassName(
                                `
                                    rounded-inherit
                                    object-contain
                                `
                            )
                        }}
                        images = {product.images}
                    />
                </section>
                <section
                    aria-label = {secondaryDetailsSectionTitle}
                    className = {helpers.formatClassName(
                        `
                            relative
                            flex
                            flex-col laptopAndUp:flex-row
                            gap-x-[7.8125rem]
                            gap-y-[5.5rem] tabAndUp:gap-y-[7.5rem]
                            text-wrap
                            mb-[5.5rem] tabAndUp:mb-[7.5rem] laptopAndUp:mb-40
                        `
                    )}
                >
                    <VisuallyHidden
                        inline = {false}
                    >
                        <h3>
                            {secondaryDetailsSectionTitle}
                        </h3>
                    </VisuallyHidden>
                    <section>
                        <h4
                            className = {helpers.formatClassName(
                                `
                                    ${featureInTheBoxHeaderClassName}
                                    mb-6 tabAndUp:mb-8
                                `
                            )}
                        >
                            features
                        </h4>
                        <div
                            className = {helpers.formatClassName(
                                `
                                    cfont-body
                                    text-[#7D7D7D]
                                    laptopAndUp:w-[39.6875rem]
                                `
                            )}
                        >
                            {getFeatureParagraphsAndLineBreaks(product.features)}
                        </div>
                    </section>
                    <section
                        className = {helpers.formatClassName(
                            `
                                flex
                                tabAndUp:max-w-[34.375rem]
                                flex-col tabAndUp:flex-row laptopAndUp:flex-col
                                tabAndUp:justify-between laptopAndUp:justify-normal
                                tabAndUp:gap-x-2 laptopAndUp:gap-x-0
                            `
                        )}
                    >
                        <h4
                            className = {helpers.formatClassName(
                                `
                                    ${featureInTheBoxHeaderClassName}
                                    mb-6 tabAndUp:mb-0
                                `
                            )}
                        >
                            in the box
                        </h4>
                        <InTheBoxTable 
                            inTheBox = {product.includes}
                            className = "w-fit"
                        />
                    </section>
                </section>
                <section
                    aria-label = {imagesSectionTitle}
                    className = {helpers.formatClassName(
                        `
                            flex
                            flex-col tabAndUp:flex-row
                            tabAndUp:gap-x-[18px] laptopAndUp:gap-x-[30px]
                            gap-y-[20px]
                            tabAndUp:h-[368px] laptopAndUp:h-[592px]
                            mb-[7.5rem] laptopAndUp:mb-40
                        `
                    )}
                >
                    <VisuallyHidden
                        inline = {false}
                    >
                        <h3>
                            {imagesSectionTitle}
                        </h3>
                    </VisuallyHidden>
                    <div
                        className = {helpers.formatClassName(
                            `
                                w-full tabAndUp:w-[100px]
                                tabAndUp:flex-grow
                                tabAndUp:h-full
                                flex
                                flex-col
                                gap-y-[20px] laptopAndUp:gap-y-[32px]
                            `
                        )}
                    >
                        <CustomImage
                            nativePictureProps = {{
                                className: helpers.formatClassName(
                                    `
                                        w-full
                                        h-[174px] tabAndUp:h-[100px]
                                        tabAndUp:flex-grow
                                        rounded-[8px]
                                        ${galeryImageBgColor}
                                    `
                                )
                            }}
                            nativeImgProps = {{
                                alt: "sample image number 1",
                                className: helpers.formatClassName(
                                    `
                                        rounded-inherit
                                    `
                                )
                            }}
                            images = {product.gallery[0]}
                        />
                        <CustomImage
                            nativePictureProps = {{
                                className: helpers.formatClassName(
                                    `
                                        w-full
                                        h-[174px] tabAndUp:h-[100px]
                                        tabAndUp:flex-grow
                                        rounded-[8px]
                                        ${galeryImageBgColor}
                                    `
                                )
                            }}
                            nativeImgProps = {{
                                alt: "sample image number 2",
                                className: helpers.formatClassName(
                                    `
                                        rounded-inherit
                                    `
                                )
                            }} 
                            images = {product.gallery[1]}
                        />
                    </div>
                    <CustomImage 
                        nativePictureProps = {{
                            className: helpers.formatClassName(
                                `
                                    w-full tabAndUp:w-[100px]
                                    tabAndUp:flex-grow-[1.75]
                                    h-[368px] tabAndUp:h-full
                                    rounded-[8px]
                                    ${galeryImageBgColor}
                                `
                            )
                        }}
                        nativeImgProps = {{
                            alt: "sample image number 3",
                            className: helpers.formatClassName(
                                `
                                    rounded-inherit
                                `
                            )
                        }}
                        images = {product.gallery[2]}
                    />
                </section>
                <section
                    aria-label = {similarOrRelatedProductsSectionTitle}
                >
                    <VisuallyHidden
                        inline = {false}
                    >
                        <h3>
                            {similarOrRelatedProductsSectionTitle}
                        </h3>
                    </VisuallyHidden>
                    <div
                        aria-hidden
                        className = {helpers.formatClassName(
                            `
                                cfont-h5 tabAndUp:cfont-h3
                                text-black
                                mb-10 tabAndUp:mb-14 laptopAndUp:mb-16
                                text-center
                            `
                        )}
                    >
                        you may also like
                    </div>
                    <ul
                        className = {helpers.formatClassName(
                            `
                                flex
                                flex-col tabAndUp:flex-row
                                tabAndUp:gap-x-[0.6875rem] laptopAndUp:gap-x-[1.875rem]
                                gap-y-14 tabAndUp:gap-y-0
                            `
                        )}
                    >
                        {
                            product.others.map(otherProduct => (
                                <li
                                    key = {otherProduct.slug}
                                    className = {helpers.formatClassName(
                                        `
                                            w-full tabAndUp:w-[6.25rem]
                                            tabAndUp:flex-grow
                                        `
                                    )}
                                >
                                    <OtherProduct
                                        product = {otherProduct}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </section>
        </>
    );
}
