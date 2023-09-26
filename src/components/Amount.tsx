import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";

type Props = Omit<JSX.IntrinsicElements["span"], "children"> & {children: `${number}` | number};

export function Amount(props: Props) {
    const {
        children,
        ...otherProps
    } = props;

    const amount = Number(props.children);
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

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
            {formatter.format(amount)}
        </span>
    );
}
