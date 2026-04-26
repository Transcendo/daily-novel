import { defineConfig, defineDocs, frontmatterSchema } from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import {
	createFileSystemGeneratorCache,
	createGenerator,
	remarkAutoTypeTable,
} from "fumadocs-typescript";
import { z } from "zod";

const pageSchema = frontmatterSchema.extend({
	category: z.string().optional(),
	tags: z.array(z.string()).optional(),
	lastReviewed: z.string().optional(),
	stability: z.enum(["stable", "evolving", "speculative"]).optional(),
	sources: z.array(z.string()).optional(),
	image: z.string().optional(),
	imageCredit: z.string().optional(),
});

export const docs = defineDocs({
	dir: "./content/docs",
	docs: {
		schema: pageSchema,
		postprocess: {
			extractLinkReferences: true,
			includeProcessedMarkdown: true,
		},
		async: true,
	},
});

const generator = createGenerator({
	cache: createFileSystemGeneratorCache(".next/fumadocs-typescript"),
});

export default defineConfig({
	mdxOptions: {
		remarkNpmOptions: {
			persist: {
				id: "persist-install",
			},
		},
		remarkPlugins: [[remarkAutoTypeTable, { generator }]],
	},
	plugins: [lastModified()],
});
