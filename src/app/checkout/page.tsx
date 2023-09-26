import { CheckoutClientCompsWrapper } from "~/components/CheckoutClientCompsWrapper";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { helpers } from "~/helpers";

export default function CheckoutPage() {
    const mainSectionTitle = "checkout and cart summary";

    return (
        <section
            aria-label = {mainSectionTitle}
            className = {helpers.formatClassName(
                `
                    relative
                    flex
                    flex-col laptopAndUp:flex-row
                    laptopAndUp:gap-x-[1.875rem]
                    gap-y-8
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
            <CheckoutClientCompsWrapper />
        </section>
    );
}
