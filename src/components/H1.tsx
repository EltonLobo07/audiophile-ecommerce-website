import { twMerge } from "tailwind-merge";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { RootLogo } from "~/src/components/icons/RootLogo";

type Props = Omit<JSX.IntrinsicElements["h1"], "children">;

export function H1(props: Props) {
    return (
        <h1
            {...props}
            className = {twMerge(
                "relative",
                props.className
            )}
        >
            <VisuallyHidden
                inline
            >
                audiophile
            </VisuallyHidden>
            <RootLogo 
                aria-label = "logo"
            />
        </h1>
    );
}
