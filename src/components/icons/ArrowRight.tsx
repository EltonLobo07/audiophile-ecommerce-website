import { twMerge } from "tailwind-merge";

type Props = Omit<JSX.IntrinsicElements["svg"], "children">;

export function ArrowRight(props: Props) {
    return (
        <svg 
            xmlns = "http://www.w3.org/2000/svg"
            viewBox = "0 0 8 12" 
            {...props}
            className = {twMerge(
                "w-2 h-3",
                props.className
            )}
        >
            <path
                fill = "none"
                fillRule = "evenodd"
                stroke = "#D87D4A"
                strokeWidth = "2"
                d = "M1.322 1l5 5-5 5"
            ></path>
        </svg>
    );
}
