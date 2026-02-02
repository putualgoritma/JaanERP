import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const locales = ["en", "de", "id"];
const defaultLocale = "id";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "de", "id"],
  // Used when no locale matches
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  function middleware(req) {
    console.log("middleware ini pathname : ", req.nextUrl.pathname);
    //console.log("ini data token : ", req.nextauth.token);

    if (!req.nextauth.token.role) {
      return NextResponse.redirect(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/users") &&
      !req.nextauth.token.role.includes("user_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/contacts") &&
      !req.nextauth.token.role.includes("contact_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/roles") &&
      !req.nextauth.token.role.includes("role_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/permissions") &&
      !req.nextauth.token.role.includes("permission_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/accountings") &&
      !req.nextauth.token.role.includes("accounting_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/savings") &&
      !req.nextauth.token.role.includes("saving_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/savingInterests") &&
      !req.nextauth.token.role.includes("savingInterest_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/deposites") &&
      !req.nextauth.token.role.includes("deposite_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/depositeTypes") &&
      !req.nextauth.token.role.includes("depositeType_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/loans") &&
      !req.nextauth.token.role.includes("loan_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/installments") &&
      !req.nextauth.token.role.includes("installment_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/loanTypes") &&
      !req.nextauth.token.role.includes("loanType_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/principalSavings") &&
      !req.nextauth.token.role.includes("principalSaving_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/mandatorySavings") &&
      !req.nextauth.token.role.includes("mandatorySaving_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/voluntarySavings") &&
      !req.nextauth.token.role.includes("voluntarySaving_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/shuSettings") &&
      !req.nextauth.token.role.includes("shuSetting_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/ledgers") &&
      !req.nextauth.token.role.includes("ledger_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/receivables") &&
      !req.nextauth.token.role.includes("receivable_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/payables") &&
      !req.nextauth.token.role.includes("payable_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/reports") &&
      !req.nextauth.token.role.includes("report_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/accounts") &&
      !req.nextauth.token.role.includes("account_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else if (
      req.nextUrl.pathname.startsWith("/closeBooks") &&
      !req.nextauth.token.role.includes("closeBook_access")
    ) {
      return NextResponse.rewrite(
        new URL(process.env.NEXTAUTH_URL)
      );
    } else {
      return intlMiddleware(req);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "api/auth/signin",
    },
  }
);

export default function middleware(req) {
  // Define a regex pattern for private URLs
  const excludePattern = "^(/(" + locales.join("|") + "))?/admin/?.*?$";
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = false;

  if (isPublicPage) {
    // Apply Next-Intl middleware for public pages
    return intlMiddleware(req);
  } else {
    // Apply Next-Auth middleware for private pages
    return authMiddleware(req);
  }
}

export const config = {
  // Skip paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
