import Link from "next/link";
import {
	glossaryCategories,
	glossaryTermEntries,
	type GlossaryTermEntry,
} from "@/lib/ai-glossary";

const selectedTerms = [
	"AI",
	"Machine Learning",
	"Deep Learning",
	"LLM",
	"Transformer",
	"Token",
	"RAG",
	"Embedding",
	"Agents",
	"Alignment",
	"Generative AI / Gen AI",
	"GPU",
] as const;

const nodePositions: Record<string, { x: number; y: number }> = {
	AI: { x: 50, y: 17 },
	"Machine Learning": { x: 25, y: 36 },
	"Deep Learning": { x: 23, y: 58 },
	LLM: { x: 50, y: 48 },
	Transformer: { x: 49, y: 70 },
	Token: { x: 70, y: 38 },
	RAG: { x: 74, y: 58 },
	Embedding: { x: 80, y: 76 },
	Agents: { x: 31, y: 79 },
	Alignment: { x: 14, y: 22 },
	"Generative AI / Gen AI": { x: 74, y: 20 },
	GPU: { x: 12, y: 72 },
};

const edges = [
	["AI", "Machine Learning"],
	["AI", "Generative AI / Gen AI"],
	["AI", "Alignment"],
	["Machine Learning", "Deep Learning"],
	["Deep Learning", "LLM"],
	["LLM", "Transformer"],
	["LLM", "Token"],
	["LLM", "RAG"],
	["RAG", "Embedding"],
	["LLM", "Agents"],
	["Agents", "Alignment"],
	["GPU", "Deep Learning"],
	["GPU", "LLM"],
] as const;

function getTerm(term: string): GlossaryTermEntry {
	const entry = glossaryTermEntries.find((item) => item.term === term);
	if (!entry) throw new Error(`Missing concept graph term: ${term}`);
	return entry;
}

function getNodeHref(term: GlossaryTermEntry) {
	if (term.hasDetailPage) return term.href;
	const category = glossaryCategories.find((item) => item.id === term.category);
	return category?.href ?? "/glossary";
}

export function ConceptGraph() {
	const terms = selectedTerms.map(getTerm);

	return (
		<section className="border-t border-[#11140f]/12 py-10 dark:border-white/12">
			<div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
				<div>
					<p className="text-sm font-medium text-[#be3a34]">概念图谱</p>
					<h2 className="mt-2 text-3xl font-semibold">
						先看关系，再进入词条。
					</h2>
					<p className="mt-4 max-w-xl text-sm leading-6 text-[#596157] dark:text-[#c9d0c4]">
						AI 不是一串孤立名词。图谱把基础概念、模型机制、使用方法、智能体和治理问题连起来，帮助你判断一个词应该放在哪个位置。
					</p>
					<div className="mt-5 flex flex-wrap gap-2">
						<Link
							className="border border-[#11140f]/20 bg-white px-3 py-2 text-sm font-medium text-[#11140f] transition hover:border-[#11140f]/45 dark:border-white/20 dark:bg-white/8 dark:text-white"
							href="/glossary"
						>
							进入术语百科
						</Link>
						<Link
							className="border border-transparent px-3 py-2 text-sm font-medium text-[#315f4a] transition hover:text-[#11140f] dark:text-[#8bd8ae] dark:hover:text-white"
							href="/graph"
						>
							查看全站图谱
						</Link>
					</div>
				</div>
				<div className="relative min-h-[420px] overflow-hidden border border-[#11140f]/12 bg-white p-4 shadow-[10px_10px_0_#2f9e44] dark:border-white/12 dark:bg-white/7 dark:shadow-[10px_10px_0_#8bd8ae]">
					<svg
						aria-hidden="true"
						className="absolute inset-0 h-full w-full"
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
					>
						{edges.map(([source, target]) => {
							const a = nodePositions[source];
							const b = nodePositions[target];
							return (
								<line
									key={`${source}-${target}`}
									x1={a.x}
									y1={a.y}
									x2={b.x}
									y2={b.y}
									stroke="currentColor"
									strokeOpacity="0.16"
									strokeWidth="0.42"
									vectorEffect="non-scaling-stroke"
								/>
							);
						})}
					</svg>
					{terms.map((term) => {
						const pos = nodePositions[term.term];
						return (
							<Link
								className="absolute z-10 max-w-36 -translate-x-1/2 -translate-y-1/2 border border-[#11140f]/18 bg-[#f6f7f5] px-3 py-2 text-center text-xs font-semibold leading-4 text-[#11140f] shadow-sm transition hover:border-[#11140f]/45 hover:bg-[#f0c419] hover:shadow-md dark:border-white/18 dark:bg-[#10130f] dark:text-white dark:hover:bg-[#315f4a]"
								href={getNodeHref(term)}
								key={term.term}
								style={{
									left: `${pos.x}%`,
									top: `${pos.y}%`,
								}}
							>
								<span className="block">{term.term}</span>
								<span className="mt-0.5 block font-normal text-current/65">
									{term.zh}
								</span>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
