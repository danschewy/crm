"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";
import { THEME_OPTIONS } from "@/lib/theme-options";

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="brand"
			enableSystem
			disableTransitionOnChange
			themes={[...THEME_OPTIONS]}
			{...props}
		>
			{children}
		</NextThemesProvider>
	);
}
