import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from "@/drizzle/db"
import { JobInfoTable } from "@/drizzle/schema"
import { JobInfoForm } from "@/features/jobInfos/components/JobInfoForm"
import { getJobInfoUserTag } from "@/features/jobInfos/dbCache"
import { formatExperienceLevel } from "@/features/jobInfos/lib/formatters"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { desc, eq } from "drizzle-orm"
import { ArrowRightIcon, Loader2Icon, PlusIcon } from "lucide-react"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import Link from "next/link"
import { Suspense } from "react"

/**
 * MAIN DASHBOARD PAGE
 * This page acts as the destination after a user clicks "Get Started" 
 * or "Go to Dashboard" on your landing page.
 */
export default function AppPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen-header flex items-center justify-center">
          <Loader2Icon className="size-24 animate-spin text-primary" />
        </div>
      }
    >
      <JobInfos />
    </Suspense>
  )
}

async function JobInfos() {
  // 1. Check Auth - If not logged in, Clerk takes over
  const { userId, redirectToSignIn } = await getCurrentUser()
  if (userId == null) return redirectToSignIn()

  // 2. Fetch User's Jobs from Postgres
  const jobInfos = await getJobInfos(userId)

  // 3. If they have no jobs, show the Welcome/Onboarding screen
  if (jobInfos.length === 0) {
    return <NoJobInfos />
  }

  // 4. Show the list of job descriptions
  return (
    <div className="container my-4">
      <div className="flex gap-2 justify-between mb-6 items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          Select a job description
        </h1>
        <Button asChild>
          <Link href="/app/job-infos/new">
            <PlusIcon className="mr-2 size-4" />
            Create Job Description
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobInfos.map((jobInfo) => (
          <Link
            className="group transition-all"
            href={`/app/job-infos/${jobInfo.id}`}
            key={jobInfo.id}
          >
            <Card className="h-full hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between h-full">
                <div className="space-y-4 h-full flex-1">
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {jobInfo.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground line-clamp-2">
                    {jobInfo.description}
                  </CardContent>
                  <CardFooter className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">
                      {formatExperienceLevel(jobInfo.experienceLevel)}
                    </Badge>
                    {jobInfo.title && (
                      <Badge variant="outline">{jobInfo.title}</Badge>
                    )}
                  </CardFooter>
                </div>
                <div className="pr-6">
                  <ArrowRightIcon className="size-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Card>
          </Link>
        ))}

        {/* Dash border "Add New" Card */}
        <Link href="/app/job-infos/new">
          <Card className="h-full flex items-center justify-center border-dashed border-2 bg-transparent hover:border-primary/50 hover:bg-accent/50 transition-all shadow-none py-12">
            <div className="text-lg font-medium flex items-center gap-2">
              <PlusIcon className="size-6 text-primary" />
              New Job Description
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}

function NoJobInfos() {
  return (
    <div className="container my-4 max-w-5xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 font-bold tracking-tight">
        Welcome to Landr
      </h1>
      <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
        To get started, enter information about the type of job you are wanting
        to apply for. This can be specific information copied directly from a
        job listing or general information such as the tech stack you want to
        work in. The more specific you are in the description, the closer the
        test interviews will be to the real thing.
      </p>
      <Card className="border-2 shadow-lg">
        <CardContent className="pt-6">
          <JobInfoForm />
        </CardContent>
      </Card>
    </div>
  )
}

async function getJobInfos(userId: string) {
  "use cache"
  cacheTag(getJobInfoUserTag(userId))

  return db.query.JobInfoTable.findMany({
    where: eq(JobInfoTable.userId, userId),
    orderBy: desc(JobInfoTable.updatedAt),
  })
}