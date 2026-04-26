import defaultMdxComponents from "fumadocs-ui/mdx";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Card, Cards } from "fumadocs-ui/components/card";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/page";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GraphView } from "@/components/graph-view";
import {
	GlossaryBrowser,
	GlossaryCategoryTerms,
	GlossaryCoreLinks,
} from "@/components/glossary-browser";
import { Callout } from "@/components/ui/callout";
import { buildGraph } from "@/lib/build-graph";
import { createMetadata } from "@/lib/metadata";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}) {
	const { slug } = await params;
	const page = source.getPage(slug);

	if (!page) {
		return notFound();
	}

	const { body: MDX, toc } = await page.data.load();
	const graph = slug.length === 1 && slug[0] === "graph" ? buildGraph() : null;

	return (
		<DocsPage
			toc={toc}
			full={page.data.full ?? false}
			tableOfContent={{
				style: "clerk",
			}}
			breadcrumb={{ enabled: false }}
			editOnGithub={{
				owner: "Transcendo",
				repo: "content-show",
				sha: "main",
				path: `content/${page.path}`,
			}}
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			{page.data.description && (
				<DocsDescription>{page.data.description}</DocsDescription>
			)}
			<DocsBody>
				<MDX
					components={{
						...defaultMdxComponents,
						Accordion,
						Accordions,
						Callout: ({
							children,
							type,
							...props
						}: {
							children: React.ReactNode;
							type?: "info" | "warn" | "error" | "success" | "warning";
							[key: string]: any;
						}) => (
							<Callout type={type} {...props}>
								{children}
							</Callout>
						),
						Card,
						Cards,
						GlossaryBrowser,
						GlossaryCategoryTerms,
						GlossaryCoreLinks,
						GraphView: () => (graph ? <GraphView graph={graph} /> : null),
						ImageZoom,
						InlineTOC: () => <InlineTOC items={toc} />,
						Step,
						Steps,
						Tab,
						Tabs,
						iframe: (props: React.ComponentProps<"iframe">) => (
							<iframe
								title="Embedded content"
								{...props}
								className="h-[500px] w-full"
							/>
						),
						img: (props: React.ComponentProps<"img">) => (
							<ImageZoom {...(props as React.ComponentProps<typeof ImageZoom>)} />
						),
						Link: ({
							className,
							...props
						}: React.ComponentProps<typeof Link>) => (
							<Link
								className={cn(
									"font-medium underline underline-offset-4",
									className,
								)}
								{...props}
							/>
						),
					}}
				/>
			</DocsBody>
		</DocsPage>
	);
}

export async function generateStaticParams() {
	return source.generateParams().filter((item) => item.slug?.length);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}) {
	const { slug } = await params;
	const page = source.getPage(slug);
	if (!page) return notFound();

	return createMetadata({
		title: page.data.title,
		description: page.data.description,
		openGraph: {
			title: page.data.title,
			description: page.data.description,
			type: "article",
		},
		twitter: {
			card: "summary_large_image",
			title: page.data.title,
			description: page.data.description,
		},
	});
}
