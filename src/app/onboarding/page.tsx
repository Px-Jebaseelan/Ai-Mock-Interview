import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { redirect } from "next/navigation"
import { OnboardingClient } from "./_client"

export const dynamic = 'force-dynamic'; 

export default async function OnboardingPage() {
  const { userId, user } = await getCurrentUser({ allData: true })

  if (userId == null) return redirect("/")
  
  // If user already exists in Postgres, go to the app
  if (user != null) return redirect("/app")

  return (
    <div className="container flex flex-col items-center justify-center h-screen gap-4">
      <OnboardingClient userId={userId} />
    </div>
  )
}