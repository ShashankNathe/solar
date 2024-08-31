import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const publicRoutes = ["/", "/features", "/pricing"];
const authRoutes = ["/login", "/signup"];

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token");
  const isLoggedIn = token && token.value;

  if (isLoggedIn) {
    try {
      await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      if (authRoutes.includes(path)) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (publicRoutes.includes(path) || authRoutes.includes(path)) {
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
