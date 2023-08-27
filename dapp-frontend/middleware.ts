import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req: any) {
    
    if (
      req.nextUrl.pathname === "/manage" &&
      !req.nextauth.token?.roles?.includes("Admin")
    ) {
      return new NextResponse("You are not authorized!");
    }

  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/manage"] };
