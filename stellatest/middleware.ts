import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Define protected routes
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    "/admin",
    "/template"
  ];
  console.log("test");
  // Prevent authenticated users from accessing login page
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If the user tries to access a protected route but has no token, redirect to login
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Allow the request to proceed
}

// Define the paths where the middleware should run
// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*"], // Adjust based on your protected pages
// };


// Apply middleware to specific routes
export const config = {
  matcher: [
    "/admin", "/admin/:path",  // Matches both `/admin` and `/admin/`
    "/auth/:path*",
    "/dashboard/:path*", "/dashboard/:path*",
    "/profile/:path*",
    "/settings",
    "/template/:path*",
    "/login"
  ],
};