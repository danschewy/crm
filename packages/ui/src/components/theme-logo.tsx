import Logo from "@crm/ui/components/logo";
import Image, { type StaticImageData } from "next/image";

export function ThemeLogo({
	brandMark,
	size = "sm",
}: {
	brandMark: StaticImageData;
	size?: "sm" | "default";
}) {
	return (
		<span
			className="relative inline-flex size-5 shrink-0 data-[size=default]:size-6"
			data-size={size}
		>
			<Logo aria-hidden className="size-full [.brand_&]:hidden" />
			<Image
				alt=""
				aria-hidden
				className="hidden size-full object-contain [.brand_&]:block"
				src={brandMark}
			/>
		</span>
	);
}
