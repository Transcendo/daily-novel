"use client";

import { createContext, use } from "react";

export interface PageEntry {
	name: string;
	url: string;
}

export const PagesContext = createContext<PageEntry[]>([]);

export function usePages() {
	return use(PagesContext);
}
