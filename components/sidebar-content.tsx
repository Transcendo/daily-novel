import type { Folder, Root } from "fumadocs-core/page-tree";
import type { LucideIcon } from "lucide-react";
import {
	BookOpen,
	BrainCircuit,
	Compass,
	FileText,
	GitBranch,
	Layers3,
	LibraryBig,
	Palette,
	Radar,
	ShieldCheck,
	Sparkles,
} from "lucide-react";
import type { ReactNode, SVGProps } from "react";

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
	/** Navigates to a non-docs URL without a docs MDX page. */
	external?: boolean;
}

interface Content {
	title: string;
	href?: string;
	/** Expand this sidebar section when pathname is this URL or a child path. */
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
				name: "AI Knowledge",
				description: "普通人也能读懂的 AI 学习目录。",
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
					? ({
							type: "separator",
							name: item.title,
						} as const)
					: ({
							type: "page",
							url: item.href!,
							name: item.title,
							icon: <item.icon />,
						} as const),
			),
	};
}

export const contents: Content[] = [
	{
		title: "开始学习",
		href: "/learn",
		expandSectionForPathPrefix: "/learn",
		Icon: Compass,
		list: [
			{
				title: "学习路线",
				href: "/learn/learning-path",
				icon: Radar,
			},
		],
	},
	{
		title: "AI 术语百科",
		href: "/glossary",
		expandSectionForPathPrefix: "/glossary",
		Icon: LibraryBig,
		isNew: true,
		list: [
			{
				title: "核心词条",
				href: "/glossary",
				icon: LibraryBig,
				isNew: true,
			},
			{
				title: "知识图谱",
				href: "/graph",
				icon: GitBranch,
			},
		],
	},
	{
		title: "AI 基础概念",
		href: "/fundamentals",
		expandSectionForPathPrefix: "/fundamentals",
		Icon: BrainCircuit,
		list: [],
	},
	{
		title: "机器学习基础",
		href: "/machine-learning",
		expandSectionForPathPrefix: "/machine-learning",
		Icon: BookOpen,
		list: [],
	},
	{
		title: "模型与训练机制",
		href: "/model-mechanisms",
		expandSectionForPathPrefix: "/model-mechanisms",
		Icon: Layers3,
		list: [],
	},
	{
		title: "大模型与提示工程",
		href: "/llm-prompting",
		expandSectionForPathPrefix: "/llm-prompting",
		Icon: Sparkles,
		list: [],
	},
	{
		title: "生成式与多模态",
		href: "/generative-multimodal",
		expandSectionForPathPrefix: "/generative-multimodal",
		Icon: Palette,
		list: [],
	},
	{
		title: "智能体、产品与公司",
		href: "/agents-products",
		expandSectionForPathPrefix: "/agents-products",
		Icon: Radar,
		list: [],
	},
	{
		title: "前沿、安全与治理",
		href: "/frontier",
		expandSectionForPathPrefix: "/frontier",
		Icon: ShieldCheck,
		list: [],
	},
	{
		title: "算力与基础设施",
		href: "/infrastructure",
		expandSectionForPathPrefix: "/infrastructure",
		Icon: Layers3,
		list: [],
	},
	{
		title: "资料与来源",
		href: "/resources",
		expandSectionForPathPrefix: "/resources",
		Icon: LibraryBig,
		list: [
			{
				title: "资料来源清单",
				href: "/resources/source-list",
				icon: FileText,
			},
		],
	},
];
