import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_FILE = /\.(.*)$/;

// Remake verifyJWT compatible with edge
const verifyJWT = async (jwt) => {
  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload;
  } catch (error) {
    return null;
  }
};

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip public files and auth routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/register") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwt = req.cookies.get(process.env.COOKIE_NAME);
  const isAuth = jwt ? await verifyJWT(jwt.value) : null;

  if (!isAuth && pathname !== "/signin") {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }

  if (isAuth && pathname === "/signin") {
    req.nextUrl.pathname = "/home";
    return NextResponse.redirect(req.nextUrl);
  }

  if (isAuth && pathname === "/") {
    req.nextUrl.pathname = "/home";
    return NextResponse.redirect(req.nextUrl);
  }

  // Tous les autres cas
  return NextResponse.next();
}
