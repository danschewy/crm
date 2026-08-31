import { expect, test } from "bun:test";
import { BrandLogo } from "@crm/ui/components/brand-logo";
import { renderToStaticMarkup } from "react-dom/server";

const brandMark = {
	src: "/sataca-mark.webp",
	height: 256,
	width: 256,
};

test("the SATACA mark stays visible in every theme", () => {
	const markup = renderToStaticMarkup(<BrandLogo brandMark={brandMark} />);

	expect(markup).toContain("sataca-mark.webp");
	expect(markup).not.toContain("<svg");
	expect(markup).not.toContain("[.brand_&]");
});
