"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#for-parents", label: "For Parents" },
  { href: "#games", label: "Games" },
  { href: "#research", label: "Research" },
] as const;

export function Navbar() {
  const scrolled = useScrolled();

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-200 bg-muted",
        scrolled && "shadow-sm"
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-display text-xl text-foreground">BrainSpark</span>
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            {label}
          </Link>
        ))}
      </div>

      <Button className="rounded-full px-5 font-bold shadow-none">
        Try For Free →
      </Button>
    </nav>
  );
}
