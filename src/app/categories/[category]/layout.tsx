import { Metadata } from "next";
import { notFound } from "next/navigation";
import { RootAbout } from "~/components/RootAbout";
import { RootCategories } from "~/components/RootCategories";
import { dataHelpers } from "~/data/data-helpers";
import { helpers } from "~/helpers";

type Props = {
    params: {
        category: string
    },
    children: React.ReactNode
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    return {
        title: helpers.addBrandDetails(props.params.category)
    };
}

export default async function CategoryLayout(props: Props) {
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
