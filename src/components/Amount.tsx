import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";

type Props = Omit<JSX.IntrinsicElements["span"], "children"> & {children: `${number}` | number};

export function Amount(props: Props) {
    const {
        children,
        ...otherProps
    } = props;

    const currency = "$";

    return (
        <span
            {...otherProps}
            className = {twMerge(
                helpers.formatClassName(
                    `
                        cfont-h6
                    `
                ),
                otherProps.className
            )}
        >
            {`${currency} ${children}`}
        </span>
    );
}
