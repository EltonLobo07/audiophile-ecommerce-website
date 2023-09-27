import { twMerge } from "tailwind-merge";

type Props = Omit<JSX.IntrinsicElements["svg"], "children">;

export function Hamburger(props: Props) {
    return (
        <svg
            xmlns = "http://www.w3.org/2000/svg"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "3"
            viewBox = "0 0 24 24"
            {...props}
            className = {twMerge(
                "w-[24px] h-[24px]",
                props.className
            )}
        >
        <path
            strokeLinecap = "round"
            strokeLinejoin = "round"
            d = "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        ></path>
        </svg>        
    );
}
