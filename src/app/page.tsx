import { ProductAdvertisements } from "~/components/ProductAdvertisements";
import { ProductHighlight } from "~/components/ProductHighlight";
import { RootCategories } from "~/components/RootCategories";

export default function Page() {
	return (
		<>
			<ProductHighlight 
				className = "mb-10 tabAndUp:mb-24 laptopAndUp:mb-[7.5rem]"
			/>
			<RootCategories
				className = "mb-[7.5rem] tabAndUp:mb-24 laptopAndUp:mb-[10.5rem]"
			/>
			<ProductAdvertisements />
		</>
	);
}
