import { VisuallyHidden } from "~/components/VisuallyHidden";
import { dataHelpers } from "~/data/data-helpers";
import { RootCategoriesUnorderedList } from "./RootCategoriesUnorderedList";

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
            <RootCategoriesUnorderedList 
                categoryNamesAndImages = {categoryNamesAndImages}
            />
        </section>
    );
}
