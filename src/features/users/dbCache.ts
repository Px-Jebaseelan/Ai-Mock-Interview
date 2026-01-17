import { revalidateTag } from "next/cache"
import { getUserGlobalTag, getUserIdTag } from "./cacheKeys"

export { getUserGlobalTag, getUserIdTag } from "./cacheKeys"

export async function revalidateUserCache(id: string) {
  "use server"
  revalidateTag(getUserGlobalTag())
  revalidateTag(getUserIdTag(id))
}
