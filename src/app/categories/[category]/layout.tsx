import { RootAbout } from "~/components/RootAbout";
import { RootCategories } from "~/components/RootCategories";

type Props = {
    children: React.ReactNode
};

export default function CategoryLayout(props: Props) {
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
