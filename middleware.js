import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const publicRoutes = ["/", "/features", "/pricing", "/login", "/signup"];

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token");
  if (!token || !token.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
