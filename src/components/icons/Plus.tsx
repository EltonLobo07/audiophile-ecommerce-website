import { twMerge } from "tailwind-merge";

type Props = Omit<JSX.IntrinsicElements["svg"], "children">;

export function Plus(props: Props) {
    return (
        <svg
            xmlns = "http://www.w3.org/2000/svg"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "1.5"
            viewBox = "0 0 24 24"
            {...props}
            className = {twMerge(
                "w-6 h-6",
                props.className
            )}
        >
            <path
                strokeLinecap = "round"
                strokeLinejoin = "round"
                d = "M12 4.5v15m7.5-7.5h-15"
            ></path>
        </svg>
    );
}
