import { twMerge } from "tailwind-merge";
import { twStyles } from "~/src/app/tw-styles";
import { CustomLink } from "~/src/components/CustomLink";
import { dataHelpers } from "~/src/data/data-helpers";

type Props = Omit<JSX.IntrinsicElements["nav"], "children"> & {unorderedListClassName?: string};

export async function RootNav(props: Props) {
    const categories = await dataHelpers.getCategories();
    const {
        unorderedListClassName,
        ...navProps
    } = props;

    return (
        <nav
            {...navProps}
            className = {twMerge(
                twStyles.SubTitle,
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
                    <CustomLink
                        href = "/"
                    >
                        home
                    </CustomLink>
                </li>
                {
                    categories.map(category => (
                        <li
                            key = {category}
                        >
                            <CustomLink
                                href = {`/categories/${category}`}
                            >
                                {category}
                            </CustomLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}
