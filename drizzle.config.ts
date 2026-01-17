import { env } from "@/data/env/server"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./src/drizzle/migrations",
  // This glob pattern picks up all files in the schema folder
  schema: "./src/drizzle/schema/*", 
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})