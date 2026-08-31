import { ThemeLogo } from "@crm/ui/components/theme-logo";
import { cn } from "@crm/ui/lib/utils";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import satacaMark from "@/assets/sataca-mark.webp";
import { AuthShader } from "@/components/auth-shader";

export function AuthShell({
	children,
	portrait,
}: {
	children: ReactNode;
	portrait?: StaticImageData;
}) {
	return (
		<main
			className={cn(
				"grid min-h-svh bg-background text-foreground lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)]",
				portrait ? "brand" : "dark",
			)}
		>
			<section className="relative hidden min-h-svh overflow-hidden bg-muted p-8 lg:flex lg:flex-col lg:justify-between xl:p-12">
				{portrait ? (
					<>
						<Image
							alt="Ken Cowan"
							className="object-cover object-top"
							fill
							priority
							sizes="(min-width: 1024px) calc(100vw - 520px), 0px"
							src={portrait}
						/>
						<div className="absolute inset-0 bg-linear-to-t from-background via-background/25 to-background/10" />
					</>
				) : (
					<AuthShader />
				)}

				<div className="relative flex gap-2 text-sm/5">
					<Link href="/" aria-label="Homepage" className="flex">
						<ThemeLogo brandMark={satacaMark} />
					</Link>
				</div>

				<div className="relative flex max-w-lg flex-col gap-8">
					<div className="flex flex-col gap-4">
						<p className="font-mono text-xs/4 text-muted-foreground uppercase">
							CRM
						</p>
						<h1 className="max-w-[14ch] text-5xl/14 font-semibold text-balance">
							Every customer, one place.
						</h1>
					</div>
				</div>

				<p className="relative font-mono text-xs/4 text-muted-foreground">
					Made with love by{" "}
					<a
						href="https://trycomp.ai"
						target="_blank"
						rel="noreferrer"
						className="underline underline-offset-4 hover:text-foreground"
					>
						Comp AI
					</a>
				</p>
			</section>

			<section className="flex min-h-svh flex-col bg-background px-6 py-8 sm:px-10 lg:px-14">
				<div className="flex gap-2 text-sm/5 max-lg:hidden lg:invisible">
					<ThemeLogo brandMark={satacaMark} />
				</div>

				<div className="flex flex-1 items-center justify-center py-12">
					<div className="flex w-full max-w-sm flex-col gap-8">{children}</div>
				</div>
			</section>
		</main>
	);
}

export function AuthHeading({
	title,
	description,
}: {
	title: string;
	description: ReactNode;
}) {
	return (
		<div className="flex flex-col gap-3 text-left">
			<Link href="/" aria-label="Homepage" className="flex">
				<ThemeLogo brandMark={satacaMark} size="default" />
			</Link>
			<div className="flex flex-col gap-1">
				<h2 className="text-2xl/8 font-semibold tracking-tight text-balance">
					{title}
				</h2>
				<p className="max-w-[32ch] text-sm/5 text-muted-foreground text-pretty">
					{description}
				</p>
			</div>
		</div>
	);
}
