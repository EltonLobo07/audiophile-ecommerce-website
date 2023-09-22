import { twMerge } from "tailwind-merge";

type Props = Omit<JSX.IntrinsicElements["svg"], "children">;

export function CirclesPattern(props: Props) {
    return (
        <svg 
            xmlns = "http://www.w3.org/2000/svg" 
            viewBox = "0 0 944 944"
            {...props}
            className = {twMerge(
                "w-[59rem] h-[59rem]",
                props.className
            )}
        >
            <g 
                fill = "none" 
                fillRule = "evenodd" 
                stroke = "#FFF" 
                opacity = "0.202">
                <circle 
                    cx = "472" 
                    cy = "472" 
                    r = "235.5">
                </circle>
                <circle 
                    cx = "472" 
                    cy = "472" 
                    r = "270.5">
                </circle>
                <circle 
                    cx = "472" 
                    cy = "472" 
                    r = "471.5">
                </circle>
            </g>
        </svg>
    );
}
