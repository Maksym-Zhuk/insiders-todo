import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const AUTH_PATHS = ["/login", "/register"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated =
    request.cookies.has("accessToken") || request.cookies.has("refreshToken")
  const isAuthPath = AUTH_PATHS.includes(pathname)

  if (!isAuthenticated && !isAuthPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuthenticated && isAuthPath) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
}
