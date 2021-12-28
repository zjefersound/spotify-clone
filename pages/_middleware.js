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
}