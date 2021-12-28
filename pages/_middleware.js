import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;
  // Allow the requests if:
  // 1. if it's a req for next-auth
  // 2. the token exists
  if (pathname.includes('/api/auth' || token)) {
    return NextResponse.next();
  }

  const unprotectedRoutes = ['/login'];
  // Check unprotected routes
  if (!token && !unprotectedRoutes.includes(pathname)) {
    return NextResponse.redirect('/login');
  }

  /**
   * Note:
   * 
   * We might have 3 types of routes:
   * - private: Can only be accessed if logged in 
   * - only-public: Cannot be accessed if logged in
   * - public: Can be accessed from any user
   * 
   * They should be save in a proper variable and be treated separatedly 
   */
}