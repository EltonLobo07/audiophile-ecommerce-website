import { twMerge } from "tailwind-merge";
import { CustomLink } from "~/components/CustomLink";
import { dataHelpers } from "~/data/data-helpers";
import { CustomModalCloseLink } from "~/components/CustomModalCloseLink";

type Props = 
    Omit<JSX.IntrinsicElements["nav"], "children"> & 
    {
        unorderedListClassName?: string,
        useModalCloseLink?: boolean,
        changeColorOfCurPathLink?: boolean
    };

export async function RootNav(props: Props) {
    const categories = await dataHelpers.getCategories();
    const {
        unorderedListClassName,
        useModalCloseLink,
        changeColorOfCurPathLink,
        ...navProps
    } = props;

    const Link = useModalCloseLink ? CustomModalCloseLink : CustomLink;

    return (
        <nav
            {...navProps}
            className = {twMerge(
                "cfont-subtitle",
                props.className
            )}
        >
            <ul
                className = {twMerge(
                    "flex gap-x-[2.125rem]",
                    unorderedListClassName
                )}
            >
                <li>
                    <Link
                        changeColorOfCurPathLink = {props.changeColorOfCurPathLink}
                        href = "/"
                    >
                        home
                    </Link>
                </li>
                {
                    categories.map(category => (
                        <li
                            key = {category}
                        >
                            <Link
                                changeColorOfCurPathLink = {props.changeColorOfCurPathLink}
                                href = {`/categories/${category}`}
                            >
                                {category}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}
