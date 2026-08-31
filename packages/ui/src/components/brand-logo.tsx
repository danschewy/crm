import Image, { type StaticImageData } from "next/image";

export function BrandLogo({
	brandMark,
	size = "sm",
}: {
	brandMark: StaticImageData;
	size?: "sm" | "default" | "hero";
}) {
	return (
		<span
			className="relative inline-flex size-5 shrink-0 data-[size=default]:size-6 data-[size=hero]:size-32"
			data-size={size}
		>
			<Image
				alt=""
				aria-hidden
				className="size-full object-contain"
				src={brandMark}
			/>
		</span>
	);
}
