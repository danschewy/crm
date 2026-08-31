export const THEME_CHOICES = [
	{ value: "brand", label: "Brand" },
	{ value: "light", label: "Light mode" },
	{ value: "dark", label: "Dark mode" },
] as const;

export const THEME_OPTIONS = THEME_CHOICES.map(({ value }) => value);

export type ThemeOption = (typeof THEME_OPTIONS)[number];

export function visibleTheme(
	theme: string | undefined,
	resolvedTheme: string | undefined,
): ThemeOption | "" {
	const active = theme === "system" ? resolvedTheme : theme;
	return THEME_OPTIONS.find((option) => option === active) ?? "";
}
