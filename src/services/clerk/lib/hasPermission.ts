import { auth } from "@clerk/nextjs/server"

type Permission =
  | "unlimited_resume_analysis"
  | "unlimited_interviews"
  | "unlimited_questions"
  | "1_interview"
  | "5_questions"

export async function hasPermission(permission: Permission) {
  // 1. BYPASS FOR DEVELOPMENT
  // This ensures you never see "Plan Limit Reached" while coding
  if (process.env.NODE_ENV === "development") {
    return true
  }

  // 2. ORIGINAL CLERK LOGIC (For Production)
  const { has } = await auth()
  return has({ feature: permission })
}