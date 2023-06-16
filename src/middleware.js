import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/sign-in", "/sign-up", "/produkty", "/about", "/zwroty", "/api/buty", "/api/ubrania"]
  });

export const config = {
  matcher: ["/(api|trpc)(.*)", "/koszyk"],
  // /((?!.*\\..*|_next).*)", "/(api|trpc)(.*)
};
