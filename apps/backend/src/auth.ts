/**
 * Better-auth config: email+password, Organization plugin (tenant = org).
 * MVP scope: one org per user, creator role owner, no Teams/Admin/OAuth/invite flow.
 * Backend-only; do not add plugins or auth methods without product scope.
 */
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { eq } from "drizzle-orm";
import { db } from "./db";
import * as schema from "./db/schema";
import { env } from "./env";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
      organization: schema.organization,
      member: schema.member,
      invitation: schema.invitation,
    },
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  basePath: "/auth",
  trustedOrigins: [env.CORS_ORIGIN, "https://*.vercel.app"],
  plugins: [
    organization({
      creatorRole: "owner",
      organizationLimit: 1,
      schema: {
        organization: {
          additionalFields: {
            currencyCode: { type: "string", required: false, defaultValue: "NOK" },
          },
        },
      },
    }),
  ],
  user: {
    additionalFields: {
      deletedAt: { type: "date", required: false },
      consentGivenAt: { type: "date", required: false },
    },
  },
  advanced: {
    cookiePrefix: "smartfaktura",
    defaultCookieAttributes: {
      sameSite: "lax",
      httpOnly: true,
      secure: env.BETTER_AUTH_URL.startsWith("https"),
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await auth.api.createOrganization({
            body: {
              name: "My Company",
              slug: `org-${user.id}`,
              userId: user.id,
            },
          });
        },
      },
    },
    session: {
      create: {
        before: async (session) => {
          try {
            const members = await db
              .select({ organizationId: schema.member.organizationId })
              .from(schema.member)
              .where(eq(schema.member.userId, session.userId));
            if (members.length === 1) {
              return { data: { ...session, activeOrganizationId: members[0].organizationId } };
            }
          } catch (err) {
            console.error("[AUTH] Failed to resolve active organization for session", err);
          }
          return { data: session };
        },
      },
    },
  },
});
