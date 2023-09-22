import { VisuallyHidden } from "~/components/VisuallyHidden";
import { MaxWidthContainer } from "~/components/MaxWidthContainer";
import { helpers } from "~/helpers";
import { dataHelpers } from "~/data/data-helpers";
import { RootCategoryCard } from "./RootCategoryCard";

type Props = {
    className?: string
};

export async function RootCategories(props: Props) {
    const sectionTitle = "product categories";
    const categoryNamesAndImages = await dataHelpers.getCategoryNamesAndImages();

    return (
        <section
            aria-label = {sectionTitle}
            className = {props.className}
        >
            <VisuallyHidden
                inline = {false}
            >
                <h2>
                    {sectionTitle}
                </h2>
            </VisuallyHidden>
            <MaxWidthContainer>
                <ul
                    className = {helpers.formatClassName(
                        `
                            flex 
                            flex-col tabAndUp:flex-row 
                            gap-x-2 tabAndUp:gap-x-[0.625rem] laptopAndUp:gap-x-[1.875rem] 
                            gap-y-4
                        `
                    )}
                >
                    {
                        categoryNamesAndImages.map(categoryNameAndImage => (
                            <RootCategoryCard 
                                key = {categoryNameAndImage.name}
                                category = {categoryNameAndImage}
                            />
                        ))
                    }
                </ul>
            </MaxWidthContainer>
        </section>
    );
}
