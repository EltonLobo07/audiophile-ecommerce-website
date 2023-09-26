import { Metadata } from "next";
import { ProductAdvertisements } from "~/components/ProductAdvertisements";
import { ProductHighlight } from "~/components/ProductHighlight";
import { RootAbout } from "~/components/RootAbout";
import { RootCategories } from "~/components/RootCategories";
import { helpers } from "~/helpers";

export const metadata: Metadata = {
	title: helpers.addBrandDetails("Modern audio gadgets")
};

export default function Page() {
	return (
		<>
			<ProductHighlight 
				className = "mb-10 tabAndUp:mb-24 laptopAndUp:mb-[7.5rem]"
			/>
			<RootCategories
				className = "mb-[7.5rem] tabAndUp:mb-24 laptopAndUp:mb-[10.5rem]"
			/>
			<ProductAdvertisements 
				className = "mb-[7.5rem] tabAndUp:mb-24 laptopAndUp:mb-[12.5rem]"
			/>
			<RootAbout 
				className = "mb-[7.5rem] tabAndUp:mb-24 laptopAndUp:mb-[12.5rem]"
			/>
		</>
	);
}
