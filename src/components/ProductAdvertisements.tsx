import { twMerge } from "tailwind-merge";
import { dataHelpers } from "~/data/data-helpers";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { MaxWidthContainer } from "~/components/MaxWidthContainer";
import { helpers } from "~/helpers";
import { ProductAdvertisementDesign1 } from "~/components/ProductAdvertisementDesign1";
import { ProductAdvertisementDesign2 } from "~/components/ProductAdvertisementDesign2";
import { ProductAdvertisementDesign3 } from "~/components/ProductAdvertisementDesign3";

type Props = {
    className?: string
};

export type ProductAdvertisementProps = {
    product: Record<
        | "name"
        | "slug"
        | "category"
        | "description",
        string
    > & Record<"images", Record<"desktop" | "tablet" | "mobile", string>>,
    className?: string
};

const advertisementDesigns = [
    ProductAdvertisementDesign1,
    ProductAdvertisementDesign2,
    ProductAdvertisementDesign3
];

export async function ProductAdvertisements(props: Props) {
    const productsToAdvertise = await dataHelpers.getProductsToAdvertise();
    const sectionTitle = "product advertisements";
    let advertisementIdx = 0;
    
    return (
        <section
            title = {sectionTitle}
            className = {twMerge(
                "relative",
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
                        flex 
                        flex-col 
                        gap-y-6 tabAndUp:gap-y-8 laptopAndUp:gap-y-12
                    `
                )}
            >
                {
                    productsToAdvertise.map(product => {
                        const ProductAdvertisement = advertisementDesigns[advertisementIdx];
                        advertisementIdx = (advertisementIdx + 1) % advertisementDesigns.length;
                        return (
                            <section
                                key = {product.slug}
                            >
                                <ProductAdvertisement
                                    product = {product}
                                />
                            </section>
                        );
                    })
                }
            </MaxWidthContainer>
        </section>
    );
}
