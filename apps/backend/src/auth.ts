import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
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
  plugins: [
    organization({
      creatorRole: "owner",
      organizationLimit: 1,
    }),
  ],
  user: {
    additionalFields: {
      deletedAt: { type: "date", required: false },
      consentGivenAt: { type: "date", required: false },
    },
  },
  organization: {
    additionalFields: {
      currencyCode: { type: "string", required: false, defaultValue: "NOK" },
    },
  },
  experimental: {
    joins: false,
  },
});
