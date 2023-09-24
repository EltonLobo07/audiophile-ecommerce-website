import "~/app/globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import React from "react";
import { helpers } from "~/helpers";
import { RootHeader } from "~/components/RootHeader";
import { RootFooter } from "~/components/RootFooter";
import { ShowModalTypeContextProvider } from "~/components/ShowModalTypeContextProvider";
import { CartContextProvider } from "~/components/CartContextProvider";
import { CustomModal } from "~/components/CustomModal";
import { RootCategoriesUnorderedList } from "~/components/RootCategoriesUnorderedList";
import { dataHelpers } from "~/data/data-helpers";

const manrope = Manrope({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-manrope"
});

export const metadata: Metadata = {
	title: "Audiophile"
};

type Props = {
	children: React.ReactNode
};

export default async function RootLayout(props: Props) {
	const rootCategoryNamesAndImages = await dataHelpers.getCategoryNamesAndImages();

	return (
		<html 
			lang = "en"
			className = {helpers.formatClassName(
				`
					h-full
					${manrope.variable}
				`
			)}
		>
			<body 
				className = {helpers.formatClassName(
					`
						min-h-full
						flex flex-col
					`
				)}
			>
				<CartContextProvider>
					<ShowModalTypeContextProvider>
						<RootHeader 
							className = "sticky top-0 z-10"
						/>
						<CustomModal 
							rootHeader = {
								<RootHeader
									useCloseModalLink
								/>
							}
							rootCategoryUnorderedList = {
								<RootCategoriesUnorderedList 
									useModalCloseLink
									categoryNamesAndImages = {rootCategoryNamesAndImages}
								/>
							}
							className = "relative z-10"
						/>
						<main
							className = {helpers.formatClassName(
								`
									flex-grow
								`
							)}
						>
							{props.children}
						</main>
					</ShowModalTypeContextProvider>
				</CartContextProvider>
				<RootFooter />
			</body>
		</html>
	);
}
