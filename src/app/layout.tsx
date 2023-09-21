import "~/src/app/globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import React from "react";
import { helpers } from "~/lib/helpers";

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
				className = "h-full"
			>
				{props.children}
			</body>
		</html>
	);
}
