import { twMerge } from "tailwind-merge";

type Props = Omit<JSX.IntrinsicElements["svg"], "children">;

export function Check(props: Props) {
    return (
        <svg
            xmlns = "http://www.w3.org/2000/svg"
            fill = "none"
            stroke = "currentColor"
            strokeLinecap = "round"
            strokeLinejoin = "round"
            strokeWidth = "2"
            viewBox = "0 0 24 24"
            {...props}
            className = {twMerge(
                "w-[24px] h-[24px]",
                props.className
            )}
        >
            <path 
                d = "M20 6L9 17 4 12"
            ></path>
        </svg>
    );
}
