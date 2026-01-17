"use client"

import { syncUser } from "@/features/users/actions"
import { useUser } from "@clerk/nextjs"
import { Loader2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

export function OnboardingClient({ userId }: { userId: string }) {
  const router = useRouter()
  const { user: clerkUser, isLoaded } = useUser()
  const hasRun = useRef(false)

  useEffect(() => {
    // Wait for Clerk to load and ensure we only run this once
    if (!isLoaded || !clerkUser || hasRun.current) return
    hasRun.current = true

    const performSync = async () => {
      try {
        await syncUser({
          id: userId,
          name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || "User",
          email: clerkUser.primaryEmailAddress?.emailAddress ?? "",
          imageUrl: clerkUser.imageUrl,
        })
        
        // Success! Go to the app
        router.push("/app")
        router.refresh()
      } catch (error) {
        console.error("Onboarding Sync Error:", error)
        hasRun.current = false // Allow retry on error
      }
    }

    performSync()
  }, [isLoaded, clerkUser, userId, router])

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Loader2Icon className="animate-spin size-24 text-primary" />
      <h1 className="text-2xl font-bold">Creating your account...</h1>
      <p className="text-muted-foreground">We&apos;re syncing your profile...</p>
    </div>
  )
}