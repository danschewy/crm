import { describe, expect, it } from "bun:test";
import {
	THEME_CHOICES,
	THEME_OPTIONS,
	visibleTheme,
} from "../lib/theme-options";

describe("theme options", () => {
	it("offers the SATACA brand beside the original appearances", () => {
		expect(THEME_OPTIONS).toEqual(["brand", "light", "dark"]);
		expect(THEME_CHOICES.map(({ label }) => label)).toEqual([
			"Brand",
			"Light mode",
			"Dark mode",
		]);
	});

	it("shows the resolved appearance for an existing system preference", () => {
		expect(visibleTheme("system", "dark")).toBe("dark");
		expect(visibleTheme("system", "light")).toBe("light");
	});

	it("keeps an explicit theme selected", () => {
		expect(visibleTheme("brand", "dark")).toBe("brand");
		expect(visibleTheme("light", "dark")).toBe("light");
	});
});
