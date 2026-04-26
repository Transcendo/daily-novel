import type { LinkItemType } from "fumadocs-ui/layouts/shared";
import { ContentShowLogo } from "@/components/icons/logo";

export const siteName = "Daily Novel";

export const topNavLinks: LinkItemType[] = [
	{
		text: "首页",
		url: "/",
		active: "url",
	},
	{
		text: "小说归档",
		url: "/novels",
		active: "nested-url",
	},
	{
		text: "题材卡",
		url: "/cards",
		active: "nested-url",
	},
	{
		text: "写作复盘",
		url: "/reviews",
		active: "nested-url",
	},
];

export const docsLayoutProps = {
	githubUrl: "https://github.com/Transcendo/daily-novel",
	links: topNavLinks,
	nav: {
		title: (
			<>
				<ContentShowLogo aria-hidden="true" className="size-7 shrink-0" />
				<span>{siteName}</span>
			</>
		),
		url: "/",
	},
	searchToggle: {
		enabled: false,
	},
	themeSwitch: {
		enabled: true,
	},
} as const;
