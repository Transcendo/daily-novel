import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createMDX } from "fumadocs-mdx/next";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "daily-novel";
const basePath = isGithubPages ? `/${repoName}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	trailingSlash: true,
	basePath,
	assetPrefix: basePath || undefined,
	turbopack: {
		root: __dirname,
	},
	experimental: {
		optimizePackageImports: [
			"lucide-react",
			"framer-motion",
			"@radix-ui/react-tabs",
			"@radix-ui/react-scroll-area",
		],
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "http",
				hostname: "**",
			},
		],
	},
};

const withMDX = createMDX({
	contentDirBasePath: "/content/docs",
});
export default withMDX(nextConfig);
