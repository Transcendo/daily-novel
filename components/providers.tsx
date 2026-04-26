"use client";

import { RootProvider } from "fumadocs-ui/provider/next";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { PagesContext, type PageEntry } from "@/components/search-pages";

const SearchDialog = dynamic(() => import("@/components/search-dialog"), {
	ssr: false,
});

export function Providers({
	children,
	pages,
}: {
	children: ReactNode;
	pages: PageEntry[];
}) {
	return (
		<ThemeProvider
			attribute="class"
			enableSystem={true}
			disableTransitionOnChange
		>
			<PagesContext value={pages}>
				<RootProvider
					search={{
						SearchDialog,
						hotKey: [
							{
								display: "K",
								key: "k",
							},
						],
					}}
				>
					{children}
				</RootProvider>
			</PagesContext>
		</ThemeProvider>
	);
}
