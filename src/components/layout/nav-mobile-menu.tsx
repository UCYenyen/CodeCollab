"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { NavUserAvatar } from "./nav-user-avatar";
import type { NavLink, NavLinkGroup, NavMobileMenuProps } from "@/types/navbar";

function groupLinks(links: ReadonlyArray<NavLink>): NavLinkGroup[] {
  const map = new Map<string, NavLink[]>();
  for (const link of links) {
    const key = link.pageTitle ?? "";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(link);
  }
  return Array.from(map.entries()).map(([pageTitle, links]) => ({ pageTitle, links }));
}

export function NavMobileMenu({ links, user }: NavMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/auth/sign-in");
    router.refresh();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 px-0 flex flex-col">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="px-6 py-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg text-foreground">
              Brain<span className="text-primary">Spark</span>
            </span>
          </Link>
        </div>

        <Separator />

        <nav className="flex flex-col gap-3 px-3 py-4 flex-1">
          {groupLinks(links).map(({ pageTitle, links: group }) => (
            <div key={pageTitle} className="flex flex-col gap-0.5">
              {pageTitle && (
                <p className="px-3 pb-1 text-xs font-extrabold uppercase tracking-wider text-primary">
                  {pageTitle}
                </p>
              )}
              {group.map(({ href, label }) => (
                <SheetClose asChild key={href}>
                  <Link
                    href={href}
                    className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    {label}
                  </Link>
                </SheetClose>
              ))}
            </div>
          ))}
        </nav>

        <Separator />

        <div className="px-3 py-4">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 rounded-xl border-2 border-border bg-muted px-3 py-2.5">
                <NavUserAvatar user={user} size="default" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">
                    {user.fullName ?? "Account"}
                  </p>
                  {user.email && (
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  )}
                </div>
              </div>
              <Button
                variant="default"
                className="w-full justify-start text-card hover:text-muted-card hover:bg-primary/80"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <SheetClose asChild>
              <Button asChild className="w-full rounded-full font-bold shadow-none">
                <Link href="/auth/sign-in">Try For Free →</Link>
              </Button>
            </SheetClose>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
