import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define exactly which routes require a logged-in user
// We use a glob pattern (.*) to cover all sub-pages
const isProtectedRoute = createRouteMatcher([
  "/app(.*)",
  "/onboarding(.*)",
  "/forum(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // 2. Protect the route if it matches our list
  // auth.protect() is smarter than manual redirects; it uses your 
  // NEXT_PUBLIC_CLERK_SIGN_IN_URL automatically and prevents loops.
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files (images, css, etc.)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes to ensure they are handled
    '/(api|trpc)(.*)',
  ],
};