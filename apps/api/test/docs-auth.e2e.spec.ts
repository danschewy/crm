import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import type { INestApplication } from "@nestjs/common";
import { createAuthMiddleware } from "better-auth/api";
import { applySetCookies } from "better-auth/cookies";
import request from "supertest";

const fallback = (key: string, value: string) => {
	if (!process.env[key]) {
		process.env[key] = value;
	}
};

fallback(
	"DATABASE_URL",
	"postgresql://postgres:postgres@localhost:5432/crm?schema=public",
);
fallback("BETTER_AUTH_SECRET", "test-secret-at-least-32-characters-long");
fallback("API_URL", "http://localhost:3001");
fallback("APP_URL", "http://localhost:3000");
fallback("ALLOWED_SIGN_IN", "example.com");

describe("API documentation authentication", () => {
	let app: INestApplication;
	let cookie: string;
	let removeUser: () => Promise<unknown>;

	beforeAll(async () => {
		const [{ auth }, { db }] = await Promise.all([
			import("@crm/auth"),
			import("@crm/db"),
		]);
		const context = await auth.$context;
		const id = `docs-auth-${crypto.randomUUID()}`;
		const token = `${id}-token`;
		const now = new Date();

		await db.user.create({
			data: {
				id,
				name: "Documentation Reader",
				email: `${id}@example.com`,
				emailVerified: true,
				createdAt: now,
				updatedAt: now,
			},
		});
		await db.session.create({
			data: {
				id: `${id}-session`,
				token,
				userId: id,
				expiresAt: new Date(now.getTime() + 60_000),
				createdAt: now,
				updatedAt: now,
			},
		});

		const serialize = createAuthMiddleware(async (ctx) =>
			ctx.setSignedCookie(
				context.authCookies.sessionToken.name,
				token,
				context.secret,
				context.authCookies.sessionToken.attributes,
			),
		);
		const headers = new Headers();
		applySetCookies(headers, [await serialize({ headers: new Headers() })]);
		cookie = headers.get("cookie") ?? "";
		removeUser = () => db.user.delete({ where: { id } });

		const { createApp } = await import("../src/create-app");
		app = await createApp();
	});

	afterAll(async () => {
		await removeUser();
		await app.close();
	});

	it("rejects anonymous requests to the Swagger UI and OpenAPI schema", async () => {
		await request(app.getHttpServer()).get("/").expect(401);
		await request(app.getHttpServer()).get("/index.html").expect(401);
		await request(app.getHttpServer()).get("/openapi.json").expect(401);
		await request(app.getHttpServer()).get("/openapi.json/").expect(401);
		await request(app.getHttpServer()).get("/OPENAPI.JSON").expect(401);
		await request(app.getHttpServer()).get("/swagger-ui-init.js").expect(401);
		await request(app.getHttpServer()).get("/SWAGGER-UI-INIT.JS").expect(401);
	});

	it("serves the Swagger UI and OpenAPI schema to an authenticated session", async () => {
		const page = await request(app.getHttpServer())
			.get("/")
			.set("cookie", cookie)
			.expect(200);
		expect(page.text).toContain("Swagger UI");
		await request(app.getHttpServer())
			.get("/index.html")
			.set("cookie", cookie)
			.expect(200);
		await request(app.getHttpServer())
			.get("/swagger-ui-init.js")
			.set("cookie", cookie)
			.expect(200);

		const schema = await request(app.getHttpServer())
			.get("/openapi.json")
			.set("cookie", cookie)
			.expect(200);
		expect(schema.body.info.title).toBe("CRM API");
	});
});
