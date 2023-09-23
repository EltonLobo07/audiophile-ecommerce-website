import { twMerge } from "tailwind-merge";
import { helpers } from "~/helpers";
import { 
    VISUALLY_HIDDEN, 
    VisuallyHidden 
} from "~/components/VisuallyHidden";

type Props = {
    inTheBox: {item: string, quantity: number}[],
    className?: string
};

export function InTheBoxTable(props: Props) {
    return (
        <table
            className = {twMerge(
                helpers.formatClassName(
                    `
                        cfont-body
                    `
                ),
                props.className
            )}
        >
            <caption
                className = "relative"
            >
                <VisuallyHidden
                    inline
                >
                    associated items along with the quantity
                </VisuallyHidden>
            </caption>
            <thead
                className = "relative"
            >
                <tr
                    style = {VISUALLY_HIDDEN}
                >
                    <th>
                        quantity
                    </th>
                    <th>
                        associated item name
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    props.inTheBox.map(itemAndQuantity => (
                        <tr
                            key = {itemAndQuantity.item}
                        >
                            <td
                                className = {helpers.formatClassName(
                                    `
                                        text-dark-orange
                                        pr-6
                                    `
                                )}
                            >    
                                <span>
                                    {itemAndQuantity.quantity}
                                </span>
                                <span
                                    aria-hidden
                                >
                                    x
                                </span>
                            </td>
                            <td
                                className = {helpers.formatClassName(
                                    `
                                        text-[#7D7D7D]
                                        capitalize
                                    `
                                )}
                            >
                                {itemAndQuantity.item}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}
