import { twMerge } from "tailwind-merge";
import { MaxWidthContainer } from "~/components/MaxWidthContainer";
import { helpers } from "~/helpers";

type Props = Omit<Parameters<typeof MaxWidthContainer>[0], "children">;

export function MaxWidthConstrainedDivider(props: Props) {
    return (
        <MaxWidthContainer 
            {...props}
            className = {twMerge(
                helpers.formatClassName(
                    `   
                        absolute top-0 left-0 right-0
                        h-[1px] 
                        bg-[#333333]
                    `
                ),
                props.className
            )}
        />
    );
}
