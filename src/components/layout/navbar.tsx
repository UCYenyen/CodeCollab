"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useScrolled } from "@/hooks/use-scrolled";
import { useNavbarUser } from "@/hooks/use-navbar-user";
import { cn } from "@/lib/utils";
import { NavAccountButton } from "./nav-account-button";
import { NavMobileMenu } from "./nav-mobile-menu";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", pageTitle: "Account", showInDesktopNavbar: false },
  { href: "/#how-it-works", label: "How It Works", pageTitle: "Home", showInDesktopNavbar: true },
  { href: "/#for-parents", label: "For Parents", pageTitle: "Home", showInDesktopNavbar: true },
  { href: "/games", label: "See All Games", pageTitle: "Games", showInDesktopNavbar: true },
  { href: "/researches", label: "See All Researches", pageTitle: "Researches", showInDesktopNavbar: true },
] as const;

export function Navbar() {
  const scrolled = useScrolled();
  const user = useNavbarUser();

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-200 bg-background border-b-3",
        scrolled && "shadow-sm"
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-display text-xl md:text-3xl text-foreground">
          Brain<span className="text-primary">Spark</span>
        </span>
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map(({ href, label, showInDesktopNavbar }) =>
          showInDesktopNavbar === true && (
            <Link
              key={href}
              href={href}
              className="text-md text-center font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          )
        )}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="hidden md:block">
              <NavAccountButton user={user} />
            </div>
            <Button asChild className="hidden md:flex rounded-full text-md px-5 font-bold shadow-none">
              <Link href="/game">Try For Free →</Link>
            </Button>
          </>
        ) : (
          <Button asChild className="hidden md:flex rounded-full text-md px-5 font-bold shadow-none">
            <Link href="/auth/sign-in">Try For Free →</Link>
          </Button>
        )}
        <NavMobileMenu links={NAV_LINKS} user={user} />
      </div>
    </nav>
  );
}
