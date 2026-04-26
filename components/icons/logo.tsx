import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

export const ContentShowLogo = ({
	className,
	...props
}: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			{...props}
			className={cn("size-8", className)}
			width="64"
			height="64"
			viewBox="0 0 64 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="52" height="52" x="6" y="6" fill="#11140F" rx="8" />
			<path
				d="M14 17h4c6.9 0 11.1 1.9 14 5.8v24.6C29.1 43.8 24.9 42 18 42h-4V17Z"
				fill="#F5F7EE"
			/>
			<path
				d="M32 22.8C34.9 18.9 39.1 17 46 17h4v25h-4c-6.9 0-11.1 1.8-14 5.4V22.8Z"
				fill="#F0C419"
			/>
			<path
				d="M20 24h7M20 30h8M20 36h6"
				stroke="#315F4A"
				strokeLinecap="round"
				strokeWidth="2.5"
			/>
			<path
				d="M32 22.75v24.7"
				stroke="#11140F"
				strokeLinecap="round"
				strokeOpacity="0.38"
				strokeWidth="2"
			/>
			<circle cx="44" cy="25" r="3.25" fill="#E84D3D" />
			<path
				d="M39 34h8M38.5 39.5h5.5"
				stroke="#11140F"
				strokeLinecap="round"
				strokeOpacity="0.8"
				strokeWidth="2.5"
			/>
		</svg>
	);
};

export const Logo = ContentShowLogo;

export const LogoStroke = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			{...props}
			className={cn("size-7 w-7", className)}
			viewBox="0 0 64 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="7"
				y="7"
				width="50"
				height="50"
				rx="8"
				stroke="currentColor"
				strokeWidth="3"
			/>
			<path
				d="M15 19h4c6.4 0 10.2 1.7 13 5.1 2.8-3.4 6.6-5.1 13-5.1h4v23h-4c-6.4 0-10.2 1.6-13 4.8-2.8-3.2-6.6-4.8-13-4.8h-4V19Z"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="3"
			/>
			<path d="M32 24v22" stroke="currentColor" strokeWidth="2" />
			<circle cx="44" cy="26" r="3" fill="currentColor" />
		</svg>
	);
};

export const BetterAuthLogo = ContentShowLogo;
