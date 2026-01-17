import { createEnv } from "@t3-oss/env-nextjs"
import z from "zod"

export const env = createEnv({
 server: {
  DATABASE_URL: z.string().optional(),
  DB_PASSWORD: z.string().optional(),
  DB_HOST: z.string().optional(),
  DB_PORT: z.string().optional(),
  DB_USER: z.string().optional(),
  DB_NAME: z.string().optional(),
  ARCJET_KEY: z.string().optional(),
  CLERK_SECRET_KEY: z.string().min(1),
  HUME_API_KEY: z.string().optional(),
  HUME_SECRET_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
},
  createFinalSchema: env => {
    return z.object(env).transform(val => {
      const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, DATABASE_URL, ...rest } = val
      
      // Use DATABASE_URL if provided, otherwise construct from individual variables
      const finalDatabaseUrl = DATABASE_URL || 
        (DB_USER && DB_PASSWORD && DB_HOST && DB_PORT && DB_NAME 
          ? `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
          : undefined)
      
      return {
        ...rest,
        DATABASE_URL: finalDatabaseUrl,
      }
    })
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
})
