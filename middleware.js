import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getUserOrgIdAndRole } from "./app/actions/auth";

const publicRoutes = ["/", "/features", "/pricing"];
const authRoutes = ["/login", "/signup"];
const onboardingRoute = "/onboarding";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token");
  const isLoggedIn = token && token.value;

  if (isLoggedIn) {
    try {
      const { payload } = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      try {
        const userData = await getUserOrgIdAndRole(payload.email);
        if (userData && userData.data && !userData.data[0].organization_id) {
          if (path !== onboardingRoute) {
            return NextResponse.redirect(new URL(onboardingRoute, request.url));
          }
        } else if (authRoutes.includes(path) || path === onboardingRoute) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch (err) {
        console.log(err);
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
