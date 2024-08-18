import { clerkMiddleware , currentUser } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
});


// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
};
