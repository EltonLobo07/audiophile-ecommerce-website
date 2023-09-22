import "~/app/globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import React from "react";
import { helpers } from "~/helpers";
import { RootHeader } from "~/components/RootHeader";
import { RootFooter } from "~/components/RootFooter";
import { ShowModalTypeContextProvider } from "~/components/ShowModalTypeContextProvider";

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

export default function RootLayout(props: Props) {
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
				<ShowModalTypeContextProvider>
					<RootHeader />
				</ShowModalTypeContextProvider>
				<main
					className = {helpers.formatClassName(
						`
							flex-grow
						`
					)}
				>
					{props.children}
				</main>
				<RootFooter />
			</body>
		</html>
	);
}
