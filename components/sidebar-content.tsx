import type { Folder, Root } from "fumadocs-core/page-tree";
import type { LucideIcon } from "lucide-react";
import { BookOpen, CalendarDays, NotebookPen } from "lucide-react";
import type { ReactNode, SVGProps } from "react";
import catalog from "@/lib/daily-novel-catalog.json";

export interface SubpageItem {
	title: string;
	href?: string;
	icon?: ((props?: SVGProps<any>) => ReactNode) | LucideIcon;
	group?: boolean;
}

export interface ListItem {
	title: string;
	href?: string;
	icon: ((props?: SVGProps<any>) => ReactNode) | LucideIcon;
	group?: boolean;
	separator?: boolean;
	isNew?: boolean;
	subpages?: SubpageItem[];
	external?: boolean;
}

interface Content {
	title: string;
	href?: string;
	expandSectionForPathPrefix?: string;
	Icon: ((props?: SVGProps<any>) => ReactNode) | LucideIcon;
	isNew?: boolean;
	list: ListItem[];
}

export function getPageTree(): Root {
	return {
		$id: "root",
		name: "docs",
		children: [
			{
				type: "folder",
				root: true,
				name: "Daily Novel",
				description: "雨桦每日短篇小说归档。",
				children: contents.map(contentToPageTree),
			},
		],
	};
}

function contentToPageTree(content: Content): Folder {
	return {
		type: "folder",
		icon: <content.Icon />,
		name: content.title,
		index: content.href
			? {
					icon: <content.Icon />,
					name: content.title,
					type: "page",
					url: content.href,
				}
			: undefined,
		children: content.list
			.filter((item) => !item.group && (item.href || item.separator))
			.filter((item) => !item.external)
			.map((item) =>
				item.separator
					? ({ type: "separator", name: item.title } as const)
					: ({
							type: "page",
							url: item.href!,
							name: item.title,
							icon: <item.icon />,
						} as const),
			),
	};
}

const recentNovels: ListItem[] = catalog.novels
	.slice(-7)
	.reverse()
	.map((story) => ({
		title: `${story.date} · ${story.title}`,
		href: story.href,
		icon: BookOpen,
	}));

const recentCards: ListItem[] = catalog.cards
	.slice(-7)
	.reverse()
	.map((card) => ({
		title: card.date,
		href: card.href,
		icon: NotebookPen,
	}));

const recentReviews: ListItem[] = catalog.reviews
	.slice(-7)
	.reverse()
	.map((review) => ({
		title: review.date,
		href: review.href,
		icon: CalendarDays,
	}));

export const contents: Content[] = [
	{
		title: "小说归档",
		href: "/novels",
		expandSectionForPathPrefix: "/novels",
		Icon: BookOpen,
		list: recentNovels,
	},
	{
		title: "题材卡",
		href: "/cards",
		expandSectionForPathPrefix: "/cards",
		Icon: NotebookPen,
		list: recentCards,
	},
	{
		title: "写作复盘",
		href: "/reviews",
		expandSectionForPathPrefix: "/reviews",
		Icon: CalendarDays,
		list: recentReviews,
	},
];
