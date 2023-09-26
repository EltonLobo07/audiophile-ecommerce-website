import { GoBackBtn } from "~/components/GoBackBtn";
import { MaxWidthContainer } from "~/components/MaxWidthContainer";
import { helpers } from "~/helpers";

type Props = {
    children: React.ReactNode
};

export default function CheckoutLayout(props: Props) {
    return (
        <div
            className = {helpers.formatClassName(
                `
                    bg-grayish-white
                    min-h-full
                `
            )}
        >
            <MaxWidthContainer
                className = {helpers.formatClassName(
                    `
                        pb-24 tabAndUp:pb-[7.25rem] laptopAndUp:pb-[8.75rem]
                        flex
                        flex-col
                    `
                )}
            >
                <GoBackBtn 
                    className = {helpers.formatClassName(
                        `
                            mt-4 tabAndUp:mt-12 laptopAndUp:mt-[4.875rem]
                            mb-6 laptopAndUp:mb-[2.375rem]
                            w-fit
                        `
                    )}
                />
                {props.children}
            </MaxWidthContainer>
        </div>
    );
}
