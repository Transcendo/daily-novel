"use client";

import { useSearchContext } from "fumadocs-ui/contexts/search";
import { Search } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlobalSearchButton({
	children = "搜索小说",
	className,
}: {
	children?: ReactNode;
	className?: string;
}) {
	const { setOpenSearch } = useSearchContext();

	return (
		<button
			type="button"
			className={cn(
				"inline-flex items-center gap-2 border border-[#11140f]/20 bg-white px-5 py-3 text-sm font-medium text-[#11140f] transition hover:border-[#11140f]/45 dark:border-white/20 dark:bg-white/8 dark:text-white",
				className,
			)}
			onClick={() => setOpenSearch(true)}
		>
			<Search className="size-4" />
			{children}
			<kbd className="ml-1 border border-current/20 px-1.5 py-0.5 font-mono text-[10px] text-current/55">
				⌘K
			</kbd>
		</button>
	);
}
