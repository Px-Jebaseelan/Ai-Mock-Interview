import { createEnv } from "@t3-oss/env-nextjs"
import z from "zod"

export const env = createEnv({
  client: {
  NEXT_PUBLIC_HUME_CONFIG_ID: z.string().optional(), // Change from min(1) to optional()
  NEXT_PUBLIC_HUME_API_KEY: z.string().optional(),
  NEXT_PUBLIC_HUME_SECRET_KEY: z.string().optional(),
},
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_HUME_CONFIG_ID: process.env.NEXT_PUBLIC_HUME_CONFIG_ID,
  },
})
