import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define which routes require the user to be logged in
const isProtectedRoute = createRouteMatcher([
  '/watchlist(.*)'
]);

// FIX: Make this async and use `await auth.protect()`
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); 
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
