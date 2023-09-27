import { CategoryPageProduct } from "~/components/CategoryPageProduct";
import { MaxWidthConstrainedDivider } from "~/components/MaxWidthConstrainedDivider";
import { MaxWidthContainer } from "~/components/MaxWidthContainer";
import { dataHelpers } from "~/data/data-helpers";
import { helpers } from "~/helpers";

export async function generateStaticParams() {
    const categories = await dataHelpers.getCategories();
    return categories.map(category => ({category}));
}

type Props = {
    params: {
        category: string
    }
};

export default async function CategoryPage(props: Props) {
    const products = await dataHelpers.getProductsByCategory(props.params.category);

    return (
        <section
            aria-label = {props.params.category}
            className = "relative"
        >   
            <MaxWidthConstrainedDivider />
            <h2
                className = {helpers.formatClassName(
                    `
                        text-white bg-chaos-black
                        cfont-h4-5 tabAndUp:cfont-h2
                        pt-[33px] tabAndUp:pt-[106px] laptopAndUp:pt-[99px]
                        pb-[32px] tabAndUp:pb-[98px]
                        mb-16 tabAndUp:mb-[7.5rem] laptopAndUp:mb-40
                    `
                )}
            >
                <MaxWidthContainer
                    className = {helpers.formatClassName(
                        `
                            text-center
                            text-wrap
                        `
                    )}
                >
                    {props.params.category}
                </MaxWidthContainer>
            </h2>
            {
                <MaxWidthContainer>
                    <ul>
                        {
                            products.map((product, productNum) => (
                                <li
                                    key = {product.slug}
                                >
                                    <CategoryPageProduct 
                                        category = {props.params.category}
                                        product = {product}
                                        imgOnTheRight = {productNum % 2 !== 0}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </MaxWidthContainer>
            }
        </section>
    );
}
