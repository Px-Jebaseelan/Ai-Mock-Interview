"use server"

import { db } from "@/drizzle/db"
import { UserTable } from "@/drizzle/schema"
import { revalidateTag } from "next/cache"
import { getUserIdTag } from "./cacheKeys"

export async function syncUser(data: { id: string; name: string; email: string; imageUrl?: string }) {
  
  await db.insert(UserTable).values({
    id: data.id,
    name: data.name,
    email: data.email,
    imageUrl: data.imageUrl,
  }).onConflictDoUpdate({
    target: [UserTable.id],
    set: {
      name: data.name,
      email: data.email,
      imageUrl: data.imageUrl,
    }
  })
  
  revalidateTag(getUserIdTag(data.id))
}