import { HomeLayout } from "fumadocs-ui/layouts/home";
import { ArrowRight, BookOpen, CalendarDays, NotebookPen, PenLine } from "lucide-react";
import Link from "next/link";
import catalog from "@/lib/daily-novel-catalog.json";
import { docsLayoutProps } from "@/lib/site-config";

const latest = catalog.novels.at(-1);
const latestThree = catalog.novels.slice(-3).reverse();

export default function HomePage() {
	return (
		<HomeLayout
			{...docsLayoutProps}
			className="min-h-dvh bg-[#f7f1e8] text-[#211811] dark:bg-[#14100d] dark:text-[#fff7eb]"
		>
			<main className="mx-auto flex w-full max-w-6xl flex-col px-5 pt-10 pb-14 sm:px-6 sm:pt-12 sm:pb-16">
				<section className="grid gap-10 py-8 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
					<div className="max-w-3xl">
						<p className="inline-flex items-center gap-2 border border-[#211811]/15 bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#8a4b22] shadow-sm dark:border-white/15 dark:bg-white/8 dark:text-[#e8b36f]">
							<span className="size-1.5 bg-[#b85c38]" />
							Daily Short Fiction Archive
						</p>
						<h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.06] sm:text-6xl">
							把每天写下来的小说，整理成可以持续阅读的作品档案。
						</h1>
						<p className="mt-6 max-w-2xl text-base leading-7 text-[#5b4a3a] sm:text-lg dark:text-[#dccdb9]">
							Daily Novel 不是临时文件夹。它把雨桦每日短篇、题材卡和复盘接入 Fumadocs 站点，保留原稿，也保留每天写作训练的轨迹。
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Link className="inline-flex items-center gap-2 bg-[#211811] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3a2b20]" href="/novels">
								进入小说归档
								<ArrowRight className="size-4" />
							</Link>
							<Link className="inline-flex items-center gap-2 border border-[#211811]/20 bg-white/80 px-5 py-3 text-sm font-medium transition hover:border-[#211811]/45 dark:border-white/20 dark:bg-white/8" href="/cards">
								查看题材卡
							</Link>
						</div>
						<div className="mt-7 grid gap-3 text-sm text-[#5b4a3a] sm:grid-cols-3 dark:text-[#dccdb9]">
							<div className="flex items-center gap-2"><PenLine className="size-4 text-[#b85c38]" />{catalog.totals.novels} 篇成稿</div>
							<div className="flex items-center gap-2"><NotebookPen className="size-4 text-[#a66f2b]" />{catalog.totals.cards} 张题材卡</div>
							<div className="flex items-center gap-2"><BookOpen className="size-4 text-[#6f7f3f]" />{catalog.totals.reviews} 篇复盘</div>
						</div>
					</div>

					<div className="relative">
						<div className="absolute -left-5 top-5 h-20 w-20 border-2 border-[#d8a24a]" />
						<div className="absolute -right-3 bottom-16 h-16 w-16 bg-[#b85c38]" />
						<div className="relative border border-[#211811]/12 bg-[#211811] p-6 shadow-[16px_16px_0_#d8a24a] dark:border-white/15">
							<p className="text-xs uppercase tracking-[0.2em] text-[#e8b36f]">Latest Story</p>
							<h2 className="mt-4 text-3xl font-semibold text-white">{latest ? latest.title : "等待第一篇小说"}</h2>
							<p className="mt-4 flex items-center gap-2 text-sm text-[#e8ded0]"><CalendarDays className="size-4" />{latest?.date}</p>
							<p className="mt-5 text-sm leading-7 text-[#e8ded0]">当前归档共 {catalog.totals.novelCharsNonspace} 非空字符 / {catalog.totals.novelCharsChinese} 中文字。站点由本地每日任务自动同步、验证、构建并推送。</p>
							{latest ? <Link className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#e8b36f]" href={latest.href}>阅读最新一篇 <ArrowRight className="size-4" /></Link> : null}
						</div>
					</div>
				</section>

				<section className="border-t border-[#211811]/12 py-10 dark:border-white/12">
					<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div>
							<p className="text-sm font-medium text-[#b85c38]">最近更新</p>
							<h2 className="mt-2 text-3xl font-semibold">最近三篇短篇小说</h2>
						</div>
						<Link className="inline-flex items-center gap-2 text-sm font-medium text-[#8a4b22] hover:text-[#211811] dark:text-[#e8b36f] dark:hover:text-white" href="/novels">
							查看全部
							<ArrowRight className="size-4" />
						</Link>
					</div>
					<div className="mt-6 grid gap-4 md:grid-cols-3">
						{latestThree.map((story) => (
							<Link className="group border border-[#211811]/12 bg-white/80 p-6 transition hover:-translate-y-0.5 hover:border-[#211811]/35 dark:border-white/12 dark:bg-white/7" href={story.href} key={story.date}>
								<p className="text-sm font-semibold text-[#b85c38]">{story.date}</p>
								<h3 className="mt-5 text-xl font-semibold">{story.title}</h3>
								<p className="mt-3 text-sm leading-6 text-[#5b4a3a] dark:text-[#dccdb9]">{story.charsNonspace} 非空字符 / {story.charsChinese} 中文字</p>
								<span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#8a4b22] group-hover:text-[#211811] dark:text-[#e8b36f] dark:group-hover:text-white">阅读 <ArrowRight className="size-4" /></span>
							</Link>
						))}
					</div>
				</section>
			</main>
		</HomeLayout>
	);
}
