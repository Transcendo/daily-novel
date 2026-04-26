import Link from "next/link";
import {
	glossaryCategories,
	glossaryCoreTerms,
	glossaryTagOrder,
	glossaryTermEntries,
	glossaryTermCount,
	glossaryTermsByCategory,
	type GlossaryCategoryId,
	type GlossaryTermEntry,
} from "@/lib/ai-glossary";

const tagClassName: Record<string, string> = {
	通识:
		"border-cyan-200 bg-cyan-50 text-cyan-900 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-100",
	技术:
		"border-indigo-200 bg-indigo-50 text-indigo-950 dark:border-indigo-400/30 dark:bg-indigo-400/10 dark:text-indigo-100",
	产品:
		"border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-100",
	公司:
		"border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100",
	商业:
		"border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-100",
};

export function GlossaryBrowser() {
	const tagCounts = glossaryTagOrder.map((tag) => ({
		tag,
		count: glossaryTermEntries.filter((term) => term.tag === tag).length,
	}));

	return (
		<div className="not-prose my-8 space-y-8">
			<div className="border border-fd-border bg-fd-card p-5">
				<div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
					<div>
						<p className="text-sm font-medium text-fd-muted-foreground">
							AI 术语百科
						</p>
						<p className="mt-2 text-3xl font-semibold text-fd-foreground">
							{glossaryTermCount} 个公开术语
						</p>
						<p className="mt-3 max-w-2xl text-sm leading-6 text-fd-muted-foreground">
							所有词先提供短解释，核心词再升级成来源清晰、图文并茂的独立页面。
						</p>
					</div>
					<div className="flex flex-wrap gap-2 md:max-w-sm md:justify-end">
						{tagCounts.map(({ tag, count }) => (
							<span
								className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium ${tagClassName[tag]}`}
								key={tag}
							>
								{tag}
								<span className="text-current/65">{count}</span>
							</span>
						))}
					</div>
				</div>
			</div>

			<nav
				aria-label="AI glossary categories"
				className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
			>
				{glossaryTermsByCategory.map((category) => (
					<a
						className="group border border-fd-border bg-fd-card p-4 text-sm transition hover:border-fd-foreground/35 hover:bg-fd-accent/40"
						href={`#${category.id}`}
						key={category.id}
					>
						<span className="font-semibold text-fd-foreground">
							{category.title}
						</span>
						<span className="mt-2 block text-fd-muted-foreground">
							{category.terms.length} 个词
						</span>
					</a>
				))}
			</nav>

			<div className="space-y-10">
				{glossaryTermsByCategory.map((category) => (
					<section className="scroll-mt-24" id={category.id} key={category.id}>
						<div className="mb-4 flex flex-col gap-2 border-b border-fd-border pb-3 md:flex-row md:items-end md:justify-between">
							<div>
								<h2 className="text-2xl font-semibold text-fd-foreground">
									{category.title}
								</h2>
								<p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
									{category.description}
								</p>
							</div>
							<Link
								className="text-sm font-medium text-fd-foreground underline underline-offset-4"
								href={category.href}
							>
								读这一类
							</Link>
						</div>
						<TermGrid terms={category.terms} />
					</section>
				))}
			</div>
		</div>
	);
}

export function GlossaryCategoryTerms({
	category,
}: {
	category: GlossaryCategoryId;
}) {
	const categoryInfo = glossaryCategories.find((item) => item.id === category);
	const terms = glossaryTermEntries.filter((term) => term.category === category);

	if (!categoryInfo) return null;

	return (
		<div className="not-prose my-8 space-y-4">
			<div className="border-l-4 border-fd-foreground bg-fd-muted/40 px-4 py-3">
				<p className="text-sm font-medium text-fd-foreground">
					{categoryInfo.title}共 {terms.length} 个词
				</p>
				<p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
					{categoryInfo.description}
				</p>
			</div>
			<TermGrid terms={terms} compact />
		</div>
	);
}

export function GlossaryCoreLinks() {
	return (
		<div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
			{glossaryCoreTerms.map((term) => (
				<Link
					className="group border border-fd-border bg-fd-card p-4 transition hover:border-fd-foreground/35 hover:bg-fd-accent/40"
					href={term.hasDetailPage ? term.href : "/glossary"}
					key={term.term}
				>
					<div className="flex items-start gap-3">
						<div>
							<p className="text-base font-semibold text-fd-foreground">
								{term.term}
								<span className="ml-2 font-normal text-fd-muted-foreground">
									{term.zh}
								</span>
							</p>
							<p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
								{term.summary}
							</p>
						</div>
						<span className="ml-auto shrink-0 rounded-md border border-fd-border px-2 py-0.5 text-xs text-fd-muted-foreground">
							{term.hasDetailPage ? "深讲" : "待扩写"}
						</span>
					</div>
				</Link>
			))}
		</div>
	);
}

function TermGrid({
	terms,
	compact = false,
}: {
	terms: GlossaryTermEntry[];
	compact?: boolean;
}) {
	return (
		<div className="grid gap-3 md:grid-cols-2">
			{terms.map((term) => (
				<article
					className="border border-fd-border bg-fd-card p-4 shadow-sm"
					key={term.term}
				>
					<div className="flex flex-wrap items-center gap-2">
						<h3 className="text-base font-semibold text-fd-foreground">
							{term.term}
						</h3>
						<span className="text-sm text-fd-muted-foreground">{term.zh}</span>
						<span
							className={`ml-auto rounded-md border px-2 py-0.5 text-xs font-medium ${tagClassName[term.tag]}`}
						>
							{term.tag}
						</span>
					</div>
					<p className="mt-3 text-sm leading-6 text-fd-foreground">
						{term.summary}
					</p>
					{!compact && (
						<div className="mt-3 space-y-2 text-sm leading-6 text-fd-muted-foreground">
							<p>{term.beginnerExplanation}</p>
							<p>
								<span className="font-medium text-fd-foreground">
									常见误解：
								</span>
								{term.commonMisunderstanding}
							</p>
						</div>
					)}
					<div className="mt-3 flex flex-wrap gap-1.5">
						{term.depth === "core" && (
							<span className="rounded-md border border-fd-primary/30 bg-fd-primary/10 px-2 py-0.5 text-xs font-medium text-fd-primary">
								核心词
							</span>
						)}
						{term.relatedTerms.map((related) => (
							<span
								className="rounded-md border border-fd-border bg-fd-muted/40 px-2 py-0.5 text-xs text-fd-muted-foreground"
								key={related}
							>
								{related}
							</span>
						))}
					</div>
					{term.hasDetailPage && (
						<Link
							className="mt-4 inline-flex text-sm font-medium text-fd-foreground underline underline-offset-4"
							href={term.href}
						>
							阅读全文
						</Link>
					)}
				</article>
			))}
		</div>
	);
}
