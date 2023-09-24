import { MaxWidthContainer } from "~/components/MaxWidthContainer";
import { helpers } from "~/helpers";
import { RootCategoryCard } from "~/components/RootCategoryCard";

type Props = {
    categoryNamesAndImages: {
        images: Record<"desktop" | "tablet" | "mobile", string>,
        name: string
    }[],
    useModalCloseLink?: boolean
};

export function RootCategoriesUnorderedList(props: Props) {
    return (
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
                    props.categoryNamesAndImages.map(categoryNameAndImage => (
                        <RootCategoryCard 
                            key = {categoryNameAndImage.name}
                            category = {categoryNameAndImage}
                            useModalCloseLink = {props.useModalCloseLink}
                        />
                    ))
                }
            </ul>
        </MaxWidthContainer>
    );
}
