import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/", "/sign-in", "/sign-up", "/produkty", "/produkty/buty", "/produkty/ubrania", "/about", "/zwroty", "/api/buty", "/api/ubrania"]
  });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
