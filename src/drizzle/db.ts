import { env } from "@/data/env/server"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "@/drizzle/schema"

const queryClient = postgres(env.DATABASE_URL, { 
  prepare: false // This is critical for Supabase connection pooling
})

export const db = drizzle(queryClient, { schema })