import { helpers } from "~/helpers";
import { MaxWidthContainer } from "./MaxWidthContainer";

type Props = {
    type: "root" | "category" | "product"
};

export function CustomNotFound(props: Props) {
    return (
        <MaxWidthContainer
            className = {helpers.formatClassName(
                `
                    py-20 tabAndUp:py-[7.5rem] laptopAndUp:py-40
                    flex
                    flex-col
                    text-center
                    text-wrap
                    gap-y-2
                `
            )}
        >

            <h2
                className = {helpers.formatClassName(
                    `
                        cfont-h2
                        text-black
                    `
                )}
            >
                404
            </h2>
            <p
                className = {helpers.formatClassName(
                    `
                        cfont-body
                        text-platinum-granite
                    `
                )}
            >
                {
                    props.type === "root"
                    ? "This page could not be found"
                    : props.type === "category"
                      ? "The section asssociated to the category could not be found"
                      : "The section associated to the product could not be found. Select a product from one of the categories below"
                }
            </p>
        </MaxWidthContainer>
    );
}
