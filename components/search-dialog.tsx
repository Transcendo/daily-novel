"use client";

import type {
	SearchItemType,
	SharedProps,
} from "fumadocs-ui/components/dialog/search";
import {
	SearchDialog,
	SearchDialogClose,
	SearchDialogContent,
	SearchDialogFooter,
	SearchDialogHeader,
	SearchDialogInput,
	SearchDialogList,
	SearchDialogListItem,
	SearchDialogOverlay,
	useSearch,
} from "fumadocs-ui/components/dialog/search";
import { useDocsSearch } from "fumadocs-core/search/client";
import { create } from "@orama/orama";
import { createTokenizer } from "@orama/tokenizers/mandarin";
import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { usePages } from "@/components/search-pages";

function initOrama() {
	return create({
		schema: { _: "string" },
		components: {
			tokenizer: createTokenizer(),
		},
	});
}

export default function CustomSearchDialog(props: SharedProps) {
	const { search, setSearch, query } = useDocsSearch({
		type: "static",
		initOrama,
	});
	const pages = usePages();
	const router = useRouter();

	const pageTreeAction = useMemo<SearchItemType | undefined>(() => {
		if (search.length === 0) return;

		const normalized = search.toLowerCase();
		for (const page of pages) {
			if (!page.name.toLowerCase().includes(normalized)) continue;

			return {
				id: "quick-action",
				type: "action",
				node: (
					<div className="inline-flex items-center gap-2 text-fd-muted-foreground">
						<ArrowRight className="size-4" />
						<p>
							跳转到{" "}
							<span className="font-medium text-fd-foreground">
								{page.name}
							</span>
						</p>
					</div>
				),
				onSelect: () => router.push(page.url),
			};
		}
	}, [router, search, pages]);

	return (
		<SearchDialog
			search={search}
			onSearchChange={setSearch}
			isLoading={query.isLoading}
			{...props}
		>
			<SearchDialogOverlay className="z-200" />
			<SearchDialogContent className="z-200">
				<SearchDialogHeader>
					<LoadingSearchIcon />
					<SearchDialogInput />
					<SearchDialogClose />
				</SearchDialogHeader>
				<SearchDialogList
					items={
						query.data !== "empty" || pageTreeAction
							? [
									...(pageTreeAction ? [pageTreeAction] : []),
									...(Array.isArray(query.data) ? query.data : []),
								]
							: null
					}
					Item={({ item, onClick }) => (
						<SearchDialogListItem
							item={item}
							onClick={onClick}
							className={
								item.type !== "action"
									? "max-h-24 [&>div:last-child]:line-clamp-2"
									: undefined
							}
						/>
					)}
				/>
				<SearchDialogFooter>
					<span className="text-xs text-fd-muted-foreground">
						搜索由本地 Fumadocs + Orama 索引提供
					</span>
				</SearchDialogFooter>
			</SearchDialogContent>
		</SearchDialog>
	);
}

function LoadingSearchIcon() {
	const { isLoading } = useSearch();

	return (
		<Search
			className={
				isLoading
					? "size-5 animate-pulse text-foreground duration-400"
					: "size-5 text-fd-muted-foreground"
			}
		/>
	);
}
