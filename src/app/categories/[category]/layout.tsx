import { notFound } from "next/navigation";
import { RootAbout } from "~/components/RootAbout";
import { RootCategories } from "~/components/RootCategories";
import { dataHelpers } from "~/data/data-helpers";

type Props = {
    params: {
        category: string
    },
    children: React.ReactNode
};

export default async function CategoryLayout(props: Props) {
    console.log(props.params.category);
    console.log(await dataHelpers.isCategoryPresent(props.params.category));
    if (!(await dataHelpers.isCategoryPresent(props.params.category))) {
        notFound();
    }

    return (
        <>
            {props.children}
            <RootCategories
                className = "mb-[7.5rem] laptopAndUp:mb-40"
            />
            <RootAbout 
                className = "mb-[7.5rem] laptopAndUp:mb-[12.5rem]"
            />
        </>
    );
}
